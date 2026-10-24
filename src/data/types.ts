/* ============================================================================
   CGPA Calculator AI — data types (multi-university architecture)
   ============================================================================
   Universities, schemes, branches, semesters, subjects, credits, grade tables
   and formulas all live here as data. Adding Anna University, JNTU or Mumbai
   University is a data-only change: add a new file following this shape.
   ============================================================================ */

export type GradeEntry = {
  letter: string;      // e.g. 'S', 'A', 'F', 'Absent'
  gradePoint: number;  // 0-10 (or 0-4 for 4-point universities)
  minMarks?: number;   // inclusive lower bound of mark range
  maxMarks?: number;   // inclusive upper bound of mark range
};

export type GradeScale = Record<string, number>; // letter -> grade point

export interface Subject {
  code: string;
  name: string;
  credits: number;
  type: 'core' | 'lab' | 'elective' | 'minor' | 'major';
}

export interface Semester {
  semester: number; // 1..8
  name: string;
  subjects: Subject[];
}

export interface Branch {
  id: string; // e.g. 'cse'
  name: string; // e.g. 'Computer Science & Engineering'
  short: string; // e.g. 'CSE'
  semesters: Semester[];
}

export type FormulaType = 'credit-weighted' | 'marks-based' | 'four-point';

export interface Scheme {
  id: string; // e.g. '2022'
  name: string; // e.g. 'VTU 2022 Scheme'
  status: 'verified' | 'draft';
  branches: Branch[];
  gradeTable: GradeEntry[];
  gradeScale: GradeScale; // derived letter -> point lookup
  formulaType: FormulaType;
  cgpaToPercentage: { multiplier: number; formula?: string; note?: string; alternatives?: Array<{ formula: string; note: string }> }; // Percentage = CGPA × multiplier, or custom formula
  lateralEntry: { skipFirstNSemesters: number };
  sourceUrl: string;
  lastVerified: string; // ISO date
  excludedGradeLetters?: string[]; // grades excluded from GPA/CGPA denominator (e.g. U, RA for Anna)
  cgpaFormulaNote?: string; // note about unverified percentage formula
  classThresholds?: Array<{ class: string; minCGPA?: number; maxCGPA?: number; label: string; conditions?: string }>;
}

export interface University {
  id: string; // e.g. 'vtu'
  name: string;
  domain: string;
  status: 'verified' | 'draft';
  schemes: Scheme[];
}

export const VTU_GRADE_TABLE: GradeEntry[] = [
  { letter: 'S', gradePoint: 10, minMarks: 90, maxMarks: 100 },
  { letter: 'A', gradePoint: 9,  minMarks: 80, maxMarks: 89 },
  { letter: 'B', gradePoint: 8,  minMarks: 70, maxMarks: 79 },
  { letter: 'C', gradePoint: 7,  minMarks: 60, maxMarks: 69 },
  { letter: 'D', gradePoint: 6,  minMarks: 50, maxMarks: 59 },
  { letter: 'E', gradePoint: 5,  minMarks: 40, maxMarks: 49 },
  { letter: 'F', gradePoint: 0,  minMarks: 0,  maxMarks: 39 },
  { letter: 'Absent', gradePoint: 0, minMarks: 0, maxMarks: 0 },
];

export function gradeTableToScale(entries: GradeEntry[]): GradeScale {
  const scale: GradeScale = {};
  for (const e of entries) {
    scale[e.letter] = e.gradePoint;
    if (e.letter.toUpperCase() !== e.letter) scale[e.letter.toUpperCase()] = e.gradePoint;
  }
  return scale;
}

export function marksToGradePoint(marks: number, entries: GradeEntry[]): number {
  for (const e of entries) {
    if (e.minMarks !== undefined && e.maxMarks !== undefined) {
      if (marks >= e.minMarks && marks <= e.maxMarks) return e.gradePoint;
    }
  }
  return 0;
}

export function letterToGradePoint(letter: string, entries: GradeEntry[]): number | null {
  const e = entries.find((x) => x.letter.toUpperCase() === String(letter).trim().toUpperCase());
  return e ? e.gradePoint : null;
}
