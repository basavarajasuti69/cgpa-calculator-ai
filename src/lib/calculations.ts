/* ============================================================================
   CGPA Calculator AI — data-driven calculation engine
   ============================================================================
   Pure, deterministic, never rounds grade points before the formula.
   Supports pluggable formula types: credit-weighted (VTU), marks-based,
   four-point. Adding a new university formula is a data + strategy change.
   ============================================================================ */

import type {
  FormulaType,
  GradeEntry,
  GradeScale,
  Semester,
  Subject,
} from '../data/types';
import {
  gradeTableToScale,
  letterToGradePoint,
  marksToGradePoint,
} from '../data/types';

export interface SubjectResult {
  code: string;
  name: string;
  credits: number;
  type: Subject['type'];
  grade?: string;
  marks?: number;
  gradePoint: number | null;
  creditPoints: number; // credits * gradePoint (0 if no grade yet)
}

export interface SemesterResult {
  semester: number;
  name: string;
  subjects: SubjectResult[];
  totalCredits: number; // only subjects with a resolved grade
  totalCreditPoints: number;
  sgpa: number;
}

export interface CGPASummary {
  semesters: SemesterResult[];
  totalCredits: number;
  totalCreditPoints: number;
  cgpa: number;
  skipped: number; // semesters skipped (lateral entry)
}

export interface TargetPlan {
  currentCredits: number;
  currentCreditPoints: number;
  remainingCredits: number;
  targetCgpa: number;
  neededTotalPoints: number;
  neededPointsInRemaining: number;
  neededSgpa: number;
  possible: boolean;
}

/* ------------------------------------------------------------------ */
/* Resolve one subject to a grade point                               */
/* ------------------------------------------------------------------ */
export function resolveSubjectGP(
  sub: Subject,
  entries: GradeEntry[],
  scale: GradeScale,
): SubjectResult {
  const gp =
    sub.grade !== undefined && sub.grade !== ''
      ? letterToGradePoint(sub.grade, entries)
      : sub.marks !== undefined
        ? marksToGradePoint(sub.marks, entries)
        : null;
  const creditPoints = gp !== null ? sub.credits * gp : 0;
  return {
    code: sub.code,
    name: sub.name,
    credits: sub.credits,
    type: sub.type,
    grade: sub.grade,
    marks: sub.marks,
    gradePoint: gp,
    creditPoints,
  };
}

/* ------------------------------------------------------------------ */
/* SGPA for a single semester                                         */
/*   SGPA = Σ(credits × gradePoint) / Σ(credits)                      */
/* Grades in excludedGradeLetters are excluded from both numerator    */
/* and denominator (e.g. Anna U/RA).                                  */
/* ------------------------------------------------------------------ */
export function computeSemester(
  sem: Semester,
  entries: GradeEntry[],
  scale: GradeScale,
  formulaType: FormulaType = 'credit-weighted',
  excludedGradeLetters: string[] = [],
): SemesterResult {
  const results = sem.subjects.map((s) => resolveSubjectGP(s, entries, scale));
  const excluded = new Set(excludedGradeLetters.map((g) => g.toUpperCase()));

  let totalCredits = 0;
  let totalCreditPoints = 0;
  for (const r of results) {
    if (r.gradePoint !== null && !excluded.has(String(r.grade ?? '').toUpperCase())) {
      totalCredits += r.credits;
      totalCreditPoints += r.creditPoints;
    }
  }

  // For four-point, inputs are already on 4.0 scale; formula is identical.
  const sgpa = totalCredits > 0 ? totalCreditPoints / totalCredits : 0;

  return {
    semester: sem.semester,
    name: sem.name,
    subjects: results,
    totalCredits,
    totalCreditPoints,
    sgpa,
  };
}

/* ------------------------------------------------------------------ */
/* CGPA across multiple semesters                                     */
/*   CGPA = Σ(credit points all included semesters) / Σ(credits)      */
/* Supports lateral entry: skip first N semesters.                    */
/* ------------------------------------------------------------------ */
export function computeCGPA(
  semesters: Semester[],
  entries: GradeEntry[],
  scale: GradeScale,
  formulaType: FormulaType = 'credit-weighted',
  skipFirstNSemesters = 0,
  excludedGradeLetters: string[] = [],
): CGPASummary {
  const included = semesters.slice(skipFirstNSemesters);
  const results = included.map((s) =>
    computeSemester(s, entries, scale, formulaType, excludedGradeLetters),
  );

  let totalCredits = 0;
  let totalCreditPoints = 0;
  for (const r of results) {
    totalCredits += r.totalCredits;
    totalCreditPoints += r.totalCreditPoints;
  }

  return {
    semesters: results,
    totalCredits,
    totalCreditPoints,
    cgpa: totalCredits > 0 ? totalCreditPoints / totalCredits : 0,
    skipped: skipFirstNSemesters,
  };
}

/* ------------------------------------------------------------------ */
/* What SGPA is needed in remaining semesters to reach a target CGPA? */
/* ------------------------------------------------------------------ */
export function targetSgpaNeeded({
  currentCredits,
  currentCreditPoints,
  remainingCredits,
  targetCgpa,
}: {
  currentCredits: number;
  currentCreditPoints: number;
  remainingCredits: number;
  targetCgpa: number;
}): TargetPlan {
  const neededTotalPoints = targetCgpa * (currentCredits + remainingCredits);
  const neededPointsInRemaining = neededTotalPoints - currentCreditPoints;
  const neededSgpa = remainingCredits > 0 ? neededPointsInRemaining / remainingCredits : 0;

  return {
    currentCredits,
    currentCreditPoints,
    remainingCredits,
    targetCgpa,
    neededTotalPoints,
    neededPointsInRemaining,
    neededSgpa,
    possible: neededSgpa <= 10 && neededSgpa >= 0,
  };
}

/* ------------------------------------------------------------------ */
/* Converters                                                         */
/* ------------------------------------------------------------------ */

/* CGPA -> Percentage (scheme-defined multiplier)                     */
export function cgpaToPercentage(cgpa: number, multiplier = 9.5): number {
  return cgpa * multiplier;
}

/* Percentage -> CGPA                                                 */
export function percentageToCgpa(percentage: number, multiplier = 9.5): number {
  return percentage / multiplier;
}

/* CGPA -> 4.0 GPA                                                    */
export function cgpaToGpa4(cgpa: number): number {
  return (cgpa / 10) * 4;
}

/* GPA 4.0 -> CGPA                                                    */
export function gpa4ToCgpa(gpa4: number): number {
  return (gpa4 / 4) * 10;
}

/* Class / division from CGPA (VTU-style, overridable per scheme)     */
export interface ClassDivision {
  division: string;
  label: string;
}

export function classDivision(cgpa: number): ClassDivision {
  if (cgpa >= 8.5) return { division: 'First Class with Distinction', label: 'FCD' };
  if (cgpa >= 6.5) return { division: 'First Class', label: 'FC' };
  if (cgpa >= 5.0) return { division: 'Second Class', label: 'SC' };
  if (cgpa >= 4.0) return { division: 'Pass Class', label: 'PC' };
  return { division: 'Fail', label: 'Fail' };
}

/* Display rounding only (never before formula)                       */
export function display(value: number, decimals = 2): string {
  return value.toFixed(decimals);
}
