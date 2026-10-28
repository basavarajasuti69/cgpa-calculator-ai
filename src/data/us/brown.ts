import type { USInstitutionConfig } from '../types';

const brown: USInstitutionConfig = {
  id: 'brown',
  name: 'Brown University',
  region: 'US',
  institution: 'Brown University',
  catalogYear: 2026,
  termSystem: 'semester',
  creditUnit: 'credit hours',
  scale: 4.0,
  gradeTable: [],
  gpaFormula: 'No official institutional GPA in the traditional sense for the standard Brown grading approach (S/NC system historically); policies may vary.',
  sources: [{ title: 'Brown University Undergraduate Catalog', url: 'https://catalog.brown.edu/', retrieved: '2026-10-28' }],
  status: 'no official GPA',
  lastVerified: '2026-10-28',
  notes: 'Brown has historically emphasized Satisfactory/No Credit; no single official GPA published for standard evaluation. Use unofficial estimate only.',
  gpaPublished: false,
};

export default brown;
