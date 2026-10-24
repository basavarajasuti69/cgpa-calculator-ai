/* ============================================================================
   CGPA Calculator AI — GGSIPU (Guru Gobind Singh Indraprastha University) data
   ============================================================================
   IPU uses Ordinance 11 for semester-system programmes including B.Tech.
   Loaded as a Scheme with a placeholder CSE branch so the calculator works
   in credit-weighted mode. Subject/credit data still needs to be extracted
   from official USICT/affiliated college syllabus PDFs.
   ============================================================================ */

import type { University, Scheme, Branch } from '../../../data/types';
import { gradeTableToScale } from '../../../data/types';
import ord11Config from './ordinance11.json' assert { type: 'json' };

// Placeholder CSE branch until curriculum data is extracted
const cseBranch: Branch = {
  id: 'cse',
  name: 'Computer Science & Engineering',
  short: 'CSE',
  semesters: [
    { semester: 1, name: 'Semester 1', subjects: [] },
    { semester: 2, name: 'Semester 2', subjects: [] },
    { semester: 3, name: 'Semester 3', subjects: [] },
    { semester: 4, name: 'Semester 4', subjects: [] },
    { semester: 5, name: 'Semester 5', subjects: [] },
    { semester: 6, name: 'Semester 6', subjects: [] },
    { semester: 7, name: 'Semester 7', subjects: [] },
    { semester: 8, name: 'Semester 8', subjects: [] },
  ],
};

function buildScheme(reg: any, schemeId: string): Scheme {
  const gradeScale = gradeTableToScale(reg.gradeTable);
  const multiplier = reg.cgpaToPercentage.multiplier ?? 10;
  return {
    id: schemeId,
    name: reg.name,
    status: reg.status,
    branches: [cseBranch],
    gradeTable: reg.gradeTable,
    gradeScale,
    formulaType: reg.formulaType,
    cgpaToPercentage: { multiplier },
    lateralEntry: reg.lateralEntry,
    sourceUrl: reg.sourceUrl,
    lastVerified: reg.lastVerified,
    ...(reg.cgpaToPercentage.formula && { _cgpaFormula: reg.cgpaToPercentage.formula }),
    ...(reg.cgpaToPercentage.percentageAlternatives && { _cgpaAlternatives: reg.cgpaToPercentage.percentageAlternatives }),
    ...(reg.backlogPolicy && { _backlogPolicy: reg.backlogPolicy }),
    ...(reg.classThresholds && { _classThresholds: reg.classThresholds }),
    ...(reg.nonComputableCourses && { _nonComputableCourses: reg.nonComputableCourses }),
    ...(reg.auditExcludedFromCGPA !== undefined && { _auditExcludedFromCGPA: reg.auditExcludedFromCGPA }),
    ...(reg.passGrades && { _passGrades: reg.passGrades }),
    ...(reg.failedGrades && { _failedGrades: reg.failedGrades }),
    ...(reg.totalCredits && { _totalCredits: reg.totalCredits }),
    ...(reg.rounding && { _rounding: reg.rounding }),
  } as Scheme;
}

const ord11 = (ord11Config as any).regulation ?? ord11Config;

const schemes: Scheme[] = [
  { ...buildScheme(ord11, 'ordinance11'), status: 'verified' as const },
];

const university: University = {
  id: 'ipu',
  name: 'Guru Gobind Singh Indraprastha University (IPU)',
  domain: 'ipu.ac.in',
  status: 'verified',
  schemes,
};

export default university;
