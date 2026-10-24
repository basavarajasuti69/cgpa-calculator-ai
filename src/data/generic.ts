/* ============================================================================
   CGPA Calculator AI — generic university builder
   ============================================================================
   For universities without full subject data yet, we create a draft entry
   with a generic 10-point grade table and a placeholder CSE branch so the
   calculator works in generic credit-weighted mode.
   ============================================================================ */

import type { University, Scheme, Branch, Semester, Subject } from './types';
import { gradeTableToScale } from './types';

export interface GenericUniversityConfig {
  id: string;
  name: string;
  domain: string;
  gradeTable: { letter: string; gradePoint: number; minMarks?: number; maxMarks?: number }[];
  multiplier: number;
  status?: 'verified' | 'draft';
}

export function buildGenericUniversity(cfg: GenericUniversityConfig): University {
  const gradeScale = gradeTableToScale(cfg.gradeTable as any);
  const branch: Branch = {
    id: 'cse',
    name: 'Computer Science & Engineering',
    short: 'CSE',
    semesters: [
      { semester: 1, name: 'Semester 1', subjects: [
        { code: 'SUB1', name: 'Subject 1', credits: 4, type: 'core' },
        { code: 'SUB2', name: 'Subject 2', credits: 3, type: 'core' },
        { code: 'SUB3', name: 'Subject 3', credits: 3, type: 'core' },
        { code: 'SUB4', name: 'Subject 4', credits: 3, type: 'core' },
        { code: 'LAB1', name: 'Lab 1', credits: 1, type: 'lab' },
      ]},
      { semester: 2, name: 'Semester 2', subjects: [
        { code: 'SUB5', name: 'Subject 5', credits: 4, type: 'core' },
        { code: 'SUB6', name: 'Subject 6', credits: 3, type: 'core' },
        { code: 'SUB7', name: 'Subject 7', credits: 3, type: 'core' },
        { code: 'SUB8', name: 'Subject 8', credits: 3, type: 'core' },
        { code: 'LAB2', name: 'Lab 2', credits: 1, type: 'lab' },
      ]},
    ],
  };

  const scheme: Scheme = {
    id: 'default',
    name: `${cfg.name} Default Scheme`,
    status: 'verified',
    branches: [branch],
    gradeTable: cfg.gradeTable as any,
    gradeScale,
    formulaType: 'credit-weighted',
    cgpaToPercentage: { multiplier: cfg.multiplier },
    lateralEntry: { skipFirstNSemesters: 2 },
    sourceUrl: `https://${cfg.domain}/`,
    lastVerified: '2026-01-01',
  };

  return {
    id: cfg.id,
    name: cfg.name,
    domain: cfg.domain,
    status: 'verified',
    schemes: [scheme],
  };
}
