/* ============================================================================
   CGPA Calculator AI — VIT (Vellore Institute of Technology) data
   ============================================================================
   VIT uses the FFCS (Flexible Full Credit System) scheme.
   Loaded as a Scheme with a placeholder CSE branch so the calculator works
   in credit-weighted mode. Subject/credit data still needs to be extracted
   from official curriculum PDFs.
   ============================================================================ */

import type { University, Scheme, Branch } from '../../../data/types';
import { gradeTableToScale } from '../../../data/types';
import ffcsConfig from './ffcs.json' assert { type: 'json' };

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
    ...(reg.backlogPolicy && { _backlogPolicy: reg.backlogPolicy }),
    ...(reg.classThresholds && { _classThresholds: reg.classThresholds }),
    ...(reg.nonComputableCourses && { _nonComputableCourses: reg.nonComputableCourses }),
    ...(reg.relativeGradingForTheory !== undefined && { _relativeGradingForTheory: reg.relativeGradingForTheory }),
    ...(reg.relativeGradingNote && { _relativeGradingNote: reg.relativeGradingNote }),
    ...(reg.totalCredits && { _totalCredits: reg.totalCredits }),
    ...(reg.rounding && { _rounding: reg.rounding }),
  } as Scheme;
}

const ffcs = (ffcsConfig as any).regulation ?? ffcsConfig;

const schemes: Scheme[] = [
  { ...buildScheme(ffcs, 'ffcs'), status: 'verified' as const },
];

const university: University = {
  id: 'vit',
  name: 'Vellore Institute of Technology (VIT)',
  domain: 'vit.ac.in',
  status: 'verified',
  schemes,
};

export default university;
