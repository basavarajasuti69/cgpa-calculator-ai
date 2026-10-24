import { buildGenericUniversity } from '../../generic';

const gradeTable = [
  { letter: 'O', gradePoint: 10, minMarks: 90, maxMarks: 100 },
  { letter: 'A+', gradePoint: 9, minMarks: 85, maxMarks: 89 },
  { letter: 'A', gradePoint: 8.5, minMarks: 80, maxMarks: 84 },
  { letter: 'B+', gradePoint: 8, minMarks: 75, maxMarks: 79 },
  { letter: 'B', gradePoint: 7.5, minMarks: 70, maxMarks: 74 },
  { letter: 'C+', gradePoint: 7, minMarks: 65, maxMarks: 69 },
  { letter: 'C', gradePoint: 6.5, minMarks: 60, maxMarks: 64 },
  { letter: 'D', gradePoint: 6, minMarks: 55, maxMarks: 59 },
  { letter: 'E', gradePoint: 5.5, minMarks: 50, maxMarks: 54 },
  { letter: 'F', gradePoint: 0, minMarks: 0, maxMarks: 49 },
  { letter: 'Absent', gradePoint: 0, minMarks: 0, maxMarks: 0 },
];

export default buildGenericUniversity({
  id: 'ktu',
  name: 'APJ Abdul Kalam Technological University (KTU)',
  domain: 'ktu.edu.in',
  gradeTable,
  multiplier: 10,
  status: 'draft',
});
