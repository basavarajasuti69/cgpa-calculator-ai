import type { USInstitutionConfig } from '../types';

const penn: USInstitutionConfig = {
  id: 'penn',
  name: 'University of Pennsylvania',
  region: 'US',
  institution: 'University of Pennsylvania',
  catalogYear: 2026,
  termSystem: 'semester',
  creditUnit: 'credit units',
  scale: 4.0,
  gradeTable: [
    { grade: 'A+', points: 4.0 },
    { grade: 'A', points: 4.0 },
    { grade: 'A-', points: 3.7 },
    { grade: 'B+', points: 3.3 },
    { grade: 'B', points: 3.0 },
    { grade: 'B-', points: 2.7 },
    { grade: 'C+', points: 2.3 },
    { grade: 'C', points: 2.0 },
    { grade: 'C-', points: 1.7 },
    { grade: 'D+', points: 1.3 },
    { grade: 'D', points: 1.0 },
    { grade: 'F', points: 0.0 },
  ],
  noPlusMinus: false,
  gpaFormula: 'sum(credits x points)/sum(credits attempted)',
  excludedGrades: [
    { grade: 'P', excluded: true },
    { grade: 'NP', excluded: true },
    { grade: 'S', excluded: true },
    { grade: 'U', excluded: true },
    { grade: 'W', excluded: true },
    { grade: 'I', excluded: true },
  ],
  notes: 'Policies vary by school within Penn. No D-.',
  sources: [{ title: 'University of Pennsylvania Catalog', url: 'https://catalog.upenn.edu/', retrieved: '2026-10-28' }],
  status: 'draft',
  lastVerified: '2026-10-28',
  gpaPublished: true,
};

export default penn;
