import type { USInstitutionConfig } from '../types';

const mit: USInstitutionConfig = {
  id: 'mit',
  name: 'Massachusetts Institute of Technology',
  region: 'US',
  institution: 'Massachusetts Institute of Technology',
  catalogYear: 2026,
  termSystem: 'semester',
  creditUnit: 'credit units',
  scale: 5.0,
  gradeTable: [
    { grade: 'A', points: 5.0 },
    { grade: 'B', points: 4.0 },
    { grade: 'C', points: 3.0 },
    { grade: 'D', points: 2.0 },
    { grade: 'F', points: 0.0 },
  ],
  gpaFormula: 'sum(units x points)/sum(units attempted) (5.0 scale per MIT grading conventions as commonly published; verify against current MIT Registrar)',
  notes: 'MIT is commonly described as using a 5.0 scale (A=5,B=4,C=3,D=2). Confirm from MIT Registrar for current policy.',
  sources: [{ title: 'MIT Registrar', url: 'https://registrar.mit.edu/', retrieved: '2026-10-28' }],
  status: 'draft',
  lastVerified: '2026-10-28',
  gpaPublished: true,
};

export default mit;
