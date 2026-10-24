/* ============================================================================
   CGPA Calculator AI — SRMIST (SRM Institute of Science and Technology) data
   ============================================================================
   SRMIST uses regulations (2018, 2021) instead of schemes.
   Each regulation is loaded as a Scheme with a placeholder CSE branch so the
   calculator works in credit-weighted mode. Subject/credit data still needs
   to be extracted from official curriculum PDFs.
   ============================================================================ */

import type { University, Scheme, Branch } from '../../../data/types';
import { gradeTableToScale } from '../../../data/types';
import r2021Config from './2021.json' with { type: 'json' };
import r2018Config from './2018.json' with { type: 'json' };

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
  const multiplier = reg.cgpaToPercentage?.multiplier ?? 10;
  const cgpaToPercentage = {
    multiplier,
    ...(reg.cgpaToPercentage?.formula ? { formula: reg.cgpaToPercentage.formula } : {}),
    ...(reg.cgpaToPercentage?.note ? { note: reg.cgpaToPercentage.note } : {}),
    ...(reg.cgpaToPercentage?.alternatives ? { alternatives: reg.cgpaToPercentage.alternatives } : {}),
  };
  return {
    id: schemeId,
    name: reg.name,
    status: reg.status,
    branches: [cseBranch],
    gradeTable: reg.gradeTable,
    gradeScale,
    formulaType: reg.formulaType,
    cgpaToPercentage,
    lateralEntry: reg.lateralEntry ?? { skipFirstNSemesters: 0 },
    sourceUrl: reg.sourceUrl,
    lastVerified: reg.lastVerified,
    cgpaFormulaNote: reg.cgpaFormulaNote ?? reg.cgpaToPercentage?.note ?? null,
    classThresholds: reg.classThresholds ?? [],
    excludedGradeLetters: reg.backlogPolicy?.failedGradeLetters ?? [],
  } as Scheme;
}

const r2021 = (r2021Config as any).regulation ?? r2021Config;
const r2018 = (r2018Config as any).regulation ?? r2018Config;

const schemes: Scheme[] = [
  { ...buildScheme(r2021, '2021'), status: 'draft' as const },
  { ...buildScheme(r2018, '2018'), status: 'draft' as const },
];

const university: University = {
  id: 'srm',
  name: 'SRM Institute of Science and Technology',
  domain: 'srmist.edu.in',
  status: 'draft',
  schemes,
};

export default university;
