/* ============================================================================
   CGPA Calculator AI — VTU (Visvesvaraya Technological University) data
   ============================================================================ */

import type { University, Scheme } from '../../types';
import {
  VTU_GRADE_TABLE,
  gradeTableToScale,
} from '../../types';
import {
  fullCSE,
  fullECE,
  fullME,
  fullCE,
  fullEEE,
  fullISE,
} from './branches';

const gradeScale = gradeTableToScale(VTU_GRADE_TABLE);

const schemeBase: Omit<Scheme, 'id' | 'name' | 'status' | 'branches'> = {
  gradeTable: VTU_GRADE_TABLE,
  gradeScale,
  formulaType: 'credit-weighted',
  cgpaToPercentage: { multiplier: 9.5 },
  lateralEntry: { skipFirstNSemesters: 2 },
  sourceUrl: 'https://vtu.ac.in/',
  lastVerified: '2026-01-01',
};

function scheme(
  id: string,
  name: string,
  status: 'verified' | 'draft',
  tag: string,
): Scheme {
  return {
    ...schemeBase,
    id,
    name,
    status,
    branches: [
      fullCSE(tag),
      fullECE(tag),
      fullME(tag),
      fullCE(tag),
      fullEEE(tag),
      fullISE(tag),
    ],
  };
}

const university: University = {
  id: 'vtu',
  name: 'Visvesvaraya Technological University',
  domain: 'vtu.ac.in',
  status: 'verified',
  schemes: [
    scheme('2025', 'VTU 2025 Scheme', 'verified', '25'),
    scheme('2022', 'VTU 2022 Scheme', 'verified', '22'),
    scheme('2021', 'VTU 2021 Scheme', 'verified', '21'),
    scheme('2018', 'VTU 2018 Scheme', 'verified', '18'),
  ],
};

export default university;
