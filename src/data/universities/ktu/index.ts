/* ============================================================================
   CGPA Calculator AI — KTU (APJ Abdul Kalam Technological University) data
   ============================================================================
   KTU uses schemes (2015, 2019, 2024) instead of regulations.
   Each scheme is loaded as a Scheme with a placeholder CSE branch so the
   calculator works in credit-weighted mode. Subject/credit data still needs
   to be extracted from official curriculum PDFs.
   ============================================================================ */

import type { University, Scheme, Branch } from '../../../data/types';
import { gradeTableToScale } from '../../../data/types';
import s2024Config from './2024.json' assert { type: 'json' };
import s2019Config from './2019.json' assert { type: 'json' };
import s2015Config from './2015.json' assert { type: 'json' };

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
    ...(reg.cgpaToPercentage.alternatives && { _cgpaAlternatives: reg.cgpaToPercentage.alternatives }),
    ...(reg.cgpaToPercentage.note && { _cgpaNote: reg.cgpaToPercentage.note }),
    ...(reg.backlogPolicy && { _backlogPolicy: reg.backlogPolicy }),
    ...(reg.classThresholds && { _classThresholds: reg.classThresholds }),
    ...(reg.nonComputableCourses && { _nonComputableCourses: reg.nonComputableCourses }),
    ...(reg.mandatoryActivityCredits !== undefined && { _mandatoryActivityCredits: reg.mandatoryActivityCredits }),
    ...(reg.mandatoryActivityExcludedFromCGPA !== undefined && { _mandatoryActivityExcludedFromCGPA: reg.mandatoryActivityExcludedFromCGPA }),
    ...(reg.creditRelaxation && { _creditRelaxation: reg.creditRelaxation }),
    ...(reg.level5Elective && { _level5Elective: reg.level5Elective }),
    ...(reg.totalCredits && { _totalCredits: reg.totalCredits }),
    ...(reg.rounding && { _rounding: reg.rounding }),
  } as Scheme;
}

const s2024 = (s2024Config as any).regulation ?? s2024Config;
const s2019 = (s2019Config as any).regulation ?? s2019Config;
const s2015 = (s2015Config as any).regulation ?? s2015Config;

const schemes: Scheme[] = [
  buildScheme(s2024, '2024'),
  buildScheme(s2019, '2019'),
  buildScheme(s2015, '2015'),
];

const university: University = {
  id: 'ktu',
  name: 'APJ Abdul Kalam Technological University',
  domain: 'ktu.edu.in',
  status: 'verified',
  schemes,
};

export default university;
