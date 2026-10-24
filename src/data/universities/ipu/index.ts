import { buildGenericUniversity } from '../../generic';

const gradeTable = [
  { letter: 'O', gradePoint: 10, minMarks: 90, maxMarks: 100 },
  { letter: 'A+', gradePoint: 9, minMarks: 80, maxMarks: 89 },
  { letter: 'A', gradePoint: 8, minMarks: 70, maxMarks: 79 },
  { letter: 'B+', gradePoint: 7, minMarks: 60, maxMarks: 69 },
  { letter: 'B', gradePoint: 6, minMarks: 50, maxMarks: 59 },
  { letter: 'C', gradePoint: 5, minMarks: 40, maxMarks: 49 },
  { letter: 'F', gradePoint: 0, minMarks: 0, maxMarks: 39 },
  { letter: 'Absent', gradePoint: 0, minMarks: 0, maxMarks: 0 },
];

export default buildGenericUniversity({
  id: 'ipu',
  name: 'Guru Gobind Singh Indraprastha University (IPU)',
  domain: 'ipu.ac.in',
  gradeTable,
  multiplier: 10,
  status: 'draft',
});
