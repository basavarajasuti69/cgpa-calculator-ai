import type { USInstitutionConfig } from '../types';

const yale: USInstitutionConfig = {
  id: 'yale',
  name: 'Yale University',
  region: 'US',
  institution: 'Yale University',
  catalogYear: 2026,
  termSystem: 'semester',
  creditUnit: 'credit hours',
  scale: 4.0,
  gradeTable: [],
  gpaFormula: 'No official GPA computed/published for undergraduate transcript in narrative evaluation system (varies by period).',
  sources: [{ title: 'Yale College Programs of Study', url: 'https://catalog.yale.edu/', retrieved: '2026-10-28' }],
  status: 'no official GPA',
  lastVerified: '2026-10-28',
  notes: 'Yale College uses narrative evaluations in many contexts; no single universal GPA published. Use unofficial estimate only.',
  gpaPublished: false,
};

export default yale;
