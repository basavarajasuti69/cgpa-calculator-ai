import type { USInstitutionConfig } from '../types';

const stanford: USInstitutionConfig = {
  id: 'stanford',
  name: 'Stanford University',
  region: 'US',
  institution: 'Stanford University',
  catalogYear: 2026,
  termSystem: 'quarter',
  creditUnit: 'units',
  scale: 4.0,
  gradeTable: [
    { grade: 'A+', points: 4.3 },
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
    { grade: 'D-', points: 0.7 },
    { grade: 'F', points: 0.0 },
  ],
  gpaFormula: 'sum(units x points)/sum(units attempted)',
  excludedGrades: [
    { grade: 'P', excluded: true },
    { grade: 'NP', excluded: true },
    { grade: 'S', excluded: true },
    { grade: 'U', excluded: true },
    { grade: 'W', excluded: true },
    { grade: 'I', excluded: true },
  ],
  notes: 'Applies to most of Stanford except GSB, Law, and M.D. programs. GPA published on undergraduate transcript since Spring 2015-16 (confirm current policy).',
  sources: [{ title: 'Stanford Bulletin - Grading System', url: 'https://bulletin.stanford.edu/', retrieved: '2026-10-28' }],
  status: 'draft',
  lastVerified: '2026-10-28',
  gpaPublished: true,
};

export default stanford;
