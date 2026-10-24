/* ============================================================================
   CGPA Calculator AI — Anna University data
   ============================================================================
   Anna University uses regulations (R2021, R2017, R2013) instead of schemes.
   Each regulation is loaded as a Scheme with a placeholder CSE branch so the
   calculator works in credit-weighted mode. Subject/credit data still needs
   to be extracted from official curriculum PDFs.
   ============================================================================ */

import type { University, Scheme, Branch } from '../../../data/types';
import { gradeTableToScale } from '../../../data/types';
import r2021Config from './r2021.json' assert { type: 'json' };
import r2017Config from './r2017.json' assert { type: 'json' };
import r2013Config from './r2013.json' assert { type: 'json' };

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

function buildScheme(reg: any, regId: string): Scheme {
  const gradeScale = gradeTableToScale(reg.gradeTable);
  const multiplier = reg.cgpaToPercentage.multiplier ?? 10;
  return {
    id: regId,
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
    ...(reg.cgpaToPercentage.note && { _cgpaNote: reg.cgpaToPercentage.note }),
    ...(reg.backlogPolicy && { _backlogPolicy: reg.backlogPolicy }),
    ...(reg.classThresholds && { _classThresholds: reg.classThresholds }),
    ...(reg.relativeGradingForTheory !== undefined && { _relativeGradingForTheory: reg.relativeGradingForTheory }),
    ...(reg.absoluteGradingForAll !== undefined && { _absoluteGradingForAll: reg.absoluteGradingForAll }),
    ...(reg.absoluteGradingTable && { _absoluteGradingTable: reg.absoluteGradingTable }),
    ...(reg.passGrades && { _passGrades: reg.passGrades }),
    ...(reg.failedGrades && { _failedGrades: reg.failedGrades }),
    ...(reg.creditsPerPeriod && { _creditsPerPeriod: reg.creditsPerPeriod }),
  } as Scheme;
}

const r2021 = (r2021Config as any).regulation ?? r2021Config;
const r2017 = (r2017Config as any).regulation ?? r2017Config;
const r2013 = (r2013Config as any).regulation ?? r2013Config;

const schemes: Scheme[] = [
  { ...buildScheme(r2021, 'r2021'), status: 'verified' as const },
  { ...buildScheme(r2017, 'r2017'), status: 'verified' as const },
  { ...buildScheme(r2013, 'r2013'), status: 'verified' as const },
];

const university: University = {
  id: 'anna',
  name: 'Anna University',
  domain: 'annauniv.edu',
  status: 'verified',
  schemes,
};

export default university;
