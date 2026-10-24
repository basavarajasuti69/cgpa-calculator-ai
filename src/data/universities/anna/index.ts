import { buildGenericUniversity } from '../../generic';

const gradeTable = [
  { letter: 'O', gradePoint: 10, minMarks: 91, maxMarks: 100 },
  { letter: 'A+', gradePoint: 9, minMarks: 81, maxMarks: 90 },
  { letter: 'A', gradePoint: 8, minMarks: 71, maxMarks: 80 },
  { letter: 'B+', gradePoint: 7, minMarks: 61, maxMarks: 70 },
  { letter: 'B', gradePoint: 6, minMarks: 50, maxMarks: 60 },
  { letter: 'C', gradePoint: 5, minMarks: 40, maxMarks: 49 },
  { letter: 'U', gradePoint: 0, minMarks: 0, maxMarks: 39 },
  { letter: 'Absent', gradePoint: 0, minMarks: 0, maxMarks: 0 },
];

export default buildGenericUniversity({
  id: 'anna',
  name: 'Anna University',
  domain: 'annauniv.edu',
  gradeTable,
  multiplier: 10, // Anna University: Percentage = CGPA * 10
  status: 'draft',
});
