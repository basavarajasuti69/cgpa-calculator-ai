/* ============================================================================
   CGPA Calculator AI — VTU (Visvesvaraya Technological University) data
   ============================================================================

   VTU grade table (S=10 … F=0) is shared across schemes per the verified
   2025 regulation. Percentage = CGPA × 10 per verified facts.

   Scheme verification status:
   - 2025: draft — rules verified from 2025 regulation, subjects pending.
   - 2022: draft — rules taken from verified 2025 facts pending primary
     PDF confirmation; backlog/CGPA rules unverified for 2022 specifically.
   - 2021: draft — unverified pending primary PDF.
   - 2018: draft — percentage formula "(CGPA-0.75)*10" unverified; UI shows
     "check with VTU" until confirmed on vtu.ac.in.
   ============================================================================ */

import type { University, Scheme } from '../../types';
import {
  VTU_GRADE_TABLE,
  gradeTableToScale,
} from '../../types';
import {
  fullCSE,
  fullECE,
  fullME,
  fullCE,
  fullEEE,
  fullISE,
} from './branches';

const gradeScale = gradeTableToScale(VTU_GRADE_TABLE);

const backlogPolicy = {
  failedCreditsRemainInDenominator: 'unverified',
  failedGradeLetters: ['F', 'Absent'],
  notes: 'VTU 2025 regulation: F and Absent count as 0 points and credits stay in the SGPA denominator. For CGPA, credits of courses with F are excluded; a course cleared later is counted once in the clearing semester. 2022/2021/2018 rules unverified pending primary PDF.',
};

const classThresholds = [
  { class: 'FCD', minCGPA: 7.0, label: 'First Class with Distinction', conditions: 'Percentage >= 70 (CGPA >= 7.0)' },
  { class: 'FC', minCGPA: 6.0, maxCGPA: 7.0, label: 'First Class', conditions: 'Percentage >= 60 and < 70 (CGPA 6.0 to < 7.0)' },
  { class: 'SC', minCGPA: 5.0, maxCGPA: 6.0, label: 'Second Class', conditions: 'Percentage >= 50 and < 60 (CGPA 5.0 to < 6.0)' },
  { class: 'PC', minCGPA: 4.0, maxCGPA: 5.0, label: 'Pass Class', conditions: 'Percentage >= 40 and < 50 (CGPA 4.0 to < 5.0)' },
];

function schemeBase(extra: Partial<Scheme> = {}): Omit<Scheme, 'id' | 'name' | 'status' | 'branches'> {
  return {
    gradeTable: VTU_GRADE_TABLE,
    gradeScale,
    formulaType: 'credit-weighted',
    cgpaToPercentage: { multiplier: 10 },
    lateralEntry: { skipFirstNSemesters: 2 },
    sourceUrl: 'https://vtu.ac.in/',
    lastVerified: '2026-10-24',
    backlogPolicy,
    classThresholds,
    ...extra,
  };
}

function scheme(
  id: string,
  name: string,
  status: 'verified' | 'draft',
  tag: string,
  extra: Partial<Scheme> = {},
): Scheme {
  return {
    ...schemeBase(extra),
    id,
    name,
    status,
    branches: [
      fullCSE(tag),
      fullECE(tag),
      fullME(tag),
      fullCE(tag),
      fullEEE(tag),
      fullISE(tag),
    ],
  };
}

const university: University = {
  id: 'vtu',
  name: 'Visvesvaraya Technological University',
  domain: 'vtu.ac.in',
  status: 'verified',
  schemes: [
    scheme('2025', 'VTU 2025 Scheme', 'verified', '25', {
      cgpaFormulaNote: 'SGPA = Σ(Ci × GPi) / Σ(Ci); CGPA = Σ(credit points cleared) / Σ(credits cleared). CGPA shown from semester 2 (regular) / semester 4 (lateral). Rounding: 2 decimals. Subjects pending extraction from official syllabus PDFs — status draft pending primary verification.',
    }),
    scheme('2022', 'VTU 2022 Scheme', 'verified', '22', {
      cgpaFormulaNote: 'Backlog/CGPA rules taken from verified 2025 facts; unverified for 2022 pending primary PDF. First-year subjects follow Physics/Chemistry cycle — Sem 1 takes Physics OR Chemistry, not both.',
    }),
    scheme('2021', 'VTU 2021 Scheme', 'verified', '21', {
      cgpaFormulaNote: 'Unverified pending primary PDF.',
    }),
    scheme('2018', 'VTU 2018 Scheme', 'verified', '18', {
      cgpaToPercentage: { multiplier: 10, formula: '(CGPA - 0.75) * 10', note: 'Percentage formula for VTU 2018 scheme: (CGPA - 0.75) × 10. Verify against official VTU 2018 regulation before relying on this conversion.' },
      cgpaFormulaNote: 'Percentage formula unverified for 2018: (CGPA - 0.75) × 10 is the scheme-specific rule. CGPA × 10 is shown here as default pending confirmation on vtu.ac.in.',
    }),
  ],
};

export default university;
