/* ============================================================================
   CGPA Calculator AI — VTU branch / semester builders
   ============================================================================ */

import type { Branch, Semester, Subject } from '../../types';

type SubjectInput = {
  code: string;
  name: string;
  credits: number;
  type: Subject['type'];
};

type SemesterInput = {
  semester: number;
  name: string;
  subjects: SubjectInput[];
};

function sem(n: number, name: string, subjects: SubjectInput[]): Semester {
  return { semester: n, name, subjects: subjects.map((s) => ({ ...s })) };
}

function buildBranch(id: string, name: string, short: string, semesters: SemesterInput[]): Branch {
  return {
    id,
    name,
    short,
    semesters: semesters.map((s) => sem(s.semester, s.name, s.subjects)),
  };
}

/* Common first-year (semesters 1-2) shared across branches and schemes. */
function firstYear(tag: string, branchPrefix: string): SemesterInput[] {
  return [
    {
      semester: 1,
      name: 'Semester 1',
      subjects: [
        { code: `MAT${tag}1`, name: 'Engineering Mathematics I', credits: 4, type: 'core' },
        { code: `PHY${tag}2`, name: 'Engineering Physics', credits: 3, type: 'core' },
        { code: `CYC${tag}3`, name: 'Engineering Chemistry', credits: 3, type: 'core' },
        { code: `CIV${tag}4`, name: 'Elements of Civil Engineering', credits: 3, type: 'core' },
        { code: `MEE${tag}5`, name: 'Elements of Mechanical Engineering', credits: 3, type: 'core' },
        { code: `PHYL${tag}6`, name: 'Engineering Physics Lab', credits: 1, type: 'lab' },
        { code: `CYCL${tag}7`, name: 'Engineering Chemistry Lab', credits: 1, type: 'lab' },
        { code: `WSL${tag}8`, name: 'Workshop Practice', credits: 1, type: 'lab' },
      ],
    },
    {
      semester: 2,
      name: 'Semester 2',
      subjects: [
        { code: `MAT${tag}9`, name: 'Engineering Mathematics II', credits: 4, type: 'core' },
        { code: `PHY${tag}10`, name: 'Engineering Physics', credits: 3, type: 'core' },
        { code: `CYC${tag}11`, name: 'Engineering Chemistry', credits: 3, type: 'core' },
        { code: `CIV${tag}12`, name: 'Elements of Civil Engineering', credits: 3, type: 'core' },
        { code: `MEE${tag}13`, name: 'Elements of Mechanical Engineering', credits: 3, type: 'core' },
        { code: `PHYL${tag}14`, name: 'Engineering Physics Lab', credits: 1, type: 'lab' },
        { code: `CYCL${tag}15`, name: 'Engineering Chemistry Lab', credits: 1, type: 'lab' },
        { code: `WSL${tag}16`, name: 'Workshop Practice', credits: 1, type: 'lab' },
      ],
    },
  ];
}

/* CSE subjects for semesters 3-8 */
function cseMid(tag: string): SemesterInput[] {
  return [
    { semester: 3, name: 'Semester 3', subjects: [
      { code: `MAT${tag}17`, name: 'Engineering Mathematics III', credits: 4, type: 'core' },
      { code: `CS${tag}18`, name: 'Data Structures using C', credits: 3, type: 'core' },
      { code: `CS${tag}19`, name: 'Digital Logic Design', credits: 3, type: 'core' },
      { code: `CS${tag}20`, name: 'Discrete Mathematical Structures', credits: 3, type: 'core' },
      { code: `CS${tag}21`, name: 'Computer Organization', credits: 3, type: 'core' },
      { code: `CSL${tag}22`, name: 'Data Structures Lab', credits: 1, type: 'lab' },
      { code: `CSL${tag}23`, name: 'Digital Logic Lab', credits: 1, type: 'lab' },
    ]},
    { semester: 4, name: 'Semester 4', subjects: [
      { code: `MAT${tag}24`, name: 'Engineering Mathematics IV', credits: 4, type: 'core' },
      { code: `CS${tag}25`, name: 'Design and Analysis of Algorithms', credits: 3, type: 'core' },
      { code: `CS${tag}26`, name: 'Object Oriented Programming with Java', credits: 3, type: 'core' },
      { code: `CS${tag}27`, name: 'Database Management Systems', credits: 3, type: 'core' },
      { code: `CS${tag}28`, name: 'Operating Systems', credits: 3, type: 'core' },
      { code: `CSL${tag}29`, name: 'Algorithms Lab', credits: 1, type: 'lab' },
      { code: `CSL${tag}30`, name: 'DBMS Lab', credits: 1, type: 'lab' },
    ]},
    { semester: 5, name: 'Semester 5', subjects: [
      { code: `CS${tag}31`, name: 'Software Engineering', credits: 3, type: 'core' },
      { code: `CS${tag}32`, name: 'Computer Networks', credits: 3, type: 'core' },
      { code: `CS${tag}33`, name: 'Finite Automata and Formal Languages', credits: 3, type: 'core' },
      { code: `CS${tag}34`, name: 'Python Programming', credits: 3, type: 'core' },
      { code: `CS${tag}35`, name: 'Unix System Programming', credits: 3, type: 'core' },
      { code: `CSL${tag}36`, name: 'Computer Networks Lab', credits: 1, type: 'lab' },
      { code: `CSL${tag}37`, name: 'Python Lab', credits: 1, type: 'lab' },
    ]},
    { semester: 6, name: 'Semester 6', subjects: [
      { code: `CS${tag}38`, name: 'Web Technology', credits: 3, type: 'core' },
      { code: `CS${tag}39`, name: 'Machine Learning', credits: 3, type: 'core' },
      { code: `CS${tag}40`, name: 'Compiler Design', credits: 3, type: 'core' },
      { code: `CS${tag}41`, name: 'Advanced DBMS', credits: 3, type: 'core' },
      { code: `CS${tag}42`, name: 'Elective I', credits: 3, type: 'elective' },
      { code: `CSL${tag}43`, name: 'Web Technology Lab', credits: 1, type: 'lab' },
      { code: `CSL${tag}44`, name: 'Machine Learning Lab', credits: 1, type: 'lab' },
    ]},
    { semester: 7, name: 'Semester 7', subjects: [
      { code: `CS${tag}45`, name: 'Cloud Computing', credits: 3, type: 'core' },
      { code: `CS${tag}46`, name: 'Big Data Analytics', credits: 3, type: 'core' },
      { code: `CS${tag}47`, name: 'Elective II', credits: 3, type: 'elective' },
      { code: `CS${tag}48`, name: 'Elective III', credits: 3, type: 'elective' },
      { code: `CS${tag}49`, name: 'Internship / Professional Practice', credits: 2, type: 'core' },
      { code: `CSL${tag}50`, name: 'Cloud Computing Lab', credits: 1, type: 'lab' },
      { code: `CSL${tag}51`, name: 'Mini Project', credits: 2, type: 'lab' },
    ]},
    { semester: 8, name: 'Semester 8', subjects: [
      { code: `CS${tag}52`, name: 'Elective IV', credits: 3, type: 'elective' },
      { code: `CS${tag}53`, name: 'Elective V', credits: 3, type: 'elective' },
      { code: `CS${tag}54`, name: 'Major Project Phase II', credits: 6, type: 'major' },
      { code: `CS${tag}55`, name: 'Seminar', credits: 1, type: 'core' },
    ]},
  ];
}

/* ECE subjects for semesters 3-8 */
function eceMid(tag: string): SemesterInput[] {
  return [
    { semester: 3, name: 'Semester 3', subjects: [
      { code: `MAT${tag}17`, name: 'Engineering Mathematics III', credits: 4, type: 'core' },
      { code: `EC${tag}18`, name: 'Electronic Devices', credits: 3, type: 'core' },
      { code: `EC${tag}19`, name: 'Network Theory', credits: 3, type: 'core' },
      { code: `EC${tag}20`, name: 'Digital Electronics', credits: 3, type: 'core' },
      { code: `EC${tag}21`, name: 'Signals and Systems', credits: 3, type: 'core' },
      { code: `ECL${tag}22`, name: 'Electronic Devices Lab', credits: 1, type: 'lab' },
      { code: `ECL${tag}23`, name: 'Digital Electronics Lab', credits: 1, type: 'lab' },
    ]},
    { semester: 4, name: 'Semester 4', subjects: [
      { code: `MAT${tag}24`, name: 'Engineering Mathematics IV', credits: 4, type: 'core' },
      { code: `EC${tag}25`, name: 'Analog Circuits', credits: 3, type: 'core' },
      { code: `EC${tag}26`, name: 'Microcontrollers', credits: 3, type: 'core' },
      { code: `EC${tag}27`, name: 'Communication Theory', credits: 3, type: 'core' },
      { code: `EC${tag}28`, name: 'Electromagnetic Theory', credits: 3, type: 'core' },
      { code: `ECL${tag}29`, name: 'Analog Circuits Lab', credits: 1, type: 'lab' },
      { code: `ECL${tag}30`, name: 'Microcontrollers Lab', credits: 1, type: 'lab' },
    ]},
    { semester: 5, name: 'Semester 5', subjects: [
      { code: `EC${tag}31`, name: 'Digital Signal Processing', credits: 3, type: 'core' },
      { code: `EC${tag}32`, name: 'VLSI Design', credits: 3, type: 'core' },
      { code: `EC${tag}33`, name: 'Antenna and Wave Propagation', credits: 3, type: 'core' },
      { code: `EC${tag}34`, name: 'Embedded Systems', credits: 3, type: 'core' },
      { code: `EC${tag}35`, name: 'Control Systems', credits: 3, type: 'core' },
      { code: `ECL${tag}36`, name: 'DSP Lab', credits: 1, type: 'lab' },
      { code: `ECL${tag}37`, name: 'VLSI Lab', credits: 1, type: 'lab' },
    ]},
    { semester: 6, name: 'Semester 6', subjects: [
      { code: `EC${tag}38`, name: 'Wireless Communication', credits: 3, type: 'core' },
      { code: `EC${tag}39`, name: 'IoT and Applications', credits: 3, type: 'core' },
      { code: `EC${tag}40`, name: 'Microwave Engineering', credits: 3, type: 'core' },
      { code: `EC${tag}41`, name: 'Elective I', credits: 3, type: 'elective' },
      { code: `ECL${tag}42`, name: 'Communication Lab', credits: 1, type: 'lab' },
      { code: `ECL${tag}43`, name: 'IoT Lab', credits: 1, type: 'lab' },
    ]},
    { semester: 7, name: 'Semester 7', subjects: [
      { code: `EC${tag}44`, name: 'Optical Communication', credits: 3, type: 'core' },
      { code: `EC${tag}45`, name: 'Elective II', credits: 3, type: 'elective' },
      { code: `EC${tag}46`, name: 'Elective III', credits: 3, type: 'elective' },
      { code: `EC${tag}47`, name: 'Internship / Professional Practice', credits: 2, type: 'core' },
      { code: `ECL${tag}48`, name: 'Project Phase I', credits: 2, type: 'lab' },
    ]},
    { semester: 8, name: 'Semester 8', subjects: [
      { code: `EC${tag}49`, name: 'Elective IV', credits: 3, type: 'elective' },
      { code: `EC${tag}50`, name: 'Elective V', credits: 3, type: 'elective' },
      { code: `EC${tag}51`, name: 'Major Project Phase II', credits: 6, type: 'major' },
      { code: `EC${tag}52`, name: 'Seminar', credits: 1, type: 'core' },
    ]},
  ];
}

/* ME subjects for semesters 3-8 */
function meMid(tag: string): SemesterInput[] {
  return [
    { semester: 3, name: 'Semester 3', subjects: [
      { code: `MAT${tag}17`, name: 'Engineering Mathematics III', credits: 4, type: 'core' },
      { code: `ME${tag}18`, name: 'Thermodynamics', credits: 3, type: 'core' },
      { code: `ME${tag}19`, name: 'Fluid Mechanics', credits: 3, type: 'core' },
      { code: `ME${tag}20`, name: 'Manufacturing Process', credits: 3, type: 'core' },
      { code: `ME${tag}21`, name: 'Machine Drawing', credits: 2, type: 'core' },
      { code: `MEL${tag}22`, name: 'Thermodynamics Lab', credits: 1, type: 'lab' },
      { code: `MEL${tag}23`, name: 'Manufacturing Lab', credits: 1, type: 'lab' },
    ]},
    { semester: 4, name: 'Semester 4', subjects: [
      { code: `MAT${tag}24`, name: 'Engineering Mathematics IV', credits: 4, type: 'core' },
      { code: `ME${tag}25`, name: 'Heat Transfer', credits: 3, type: 'core' },
      { code: `ME${tag}26`, name: 'Machine Design', credits: 3, type: 'core' },
      { code: `ME${tag}27`, name: 'Dynamics of Machinery', credits: 3, type: 'core' },
      { code: `ME${tag}28`, name: 'Metrology', credits: 3, type: 'core' },
      { code: `MEL${tag}29`, name: 'Heat Transfer Lab', credits: 1, type: 'lab' },
      { code: `MEL${tag}30`, name: 'Machine Design Lab', credits: 1, type: 'lab' },
    ]},
    { semester: 5, name: 'Semester 5', subjects: [
      { code: `ME${tag}31`, name: 'I.C. Engines', credits: 3, type: 'core' },
      { code: `ME${tag}32`, name: 'Refrigeration & Air Conditioning', credits: 3, type: 'core' },
      { code: `ME${tag}33`, name: 'CAD/CAM', credits: 3, type: 'core' },
      { code: `ME${tag}34`, name: 'Operations Research', credits: 3, type: 'core' },
      { code: `ME${tag}35`, name: 'Elective I', credits: 3, type: 'elective' },
      { code: `MEL${tag}36`, name: 'CAD Lab', credits: 1, type: 'lab' },
      { code: `MEL${tag}37`, name: 'I.C. Engines Lab', credits: 1, type: 'lab' },
    ]},
    { semester: 6, name: 'Semester 6', subjects: [
      { code: `ME${tag}38`, name: 'Finite Element Method', credits: 3, type: 'core' },
      { code: `ME${tag}39`, name: 'Automobile Engineering', credits: 3, type: 'core' },
      { code: `ME${tag}40`, name: 'Elective II', credits: 3, type: 'elective' },
      { code: `ME${tag}41`, name: 'Elective III', credits: 3, type: 'elective' },
      { code: `MEL${tag}42`, name: 'FEM Lab', credits: 1, type: 'lab' },
      { code: `MEL${tag}43`, name: 'Project Phase I', credits: 2, type: 'lab' },
    ]},
    { semester: 7, name: 'Semester 7', subjects: [
      { code: `ME${tag}44`, name: 'Elective IV', credits: 3, type: 'elective' },
      { code: `ME${tag}45`, name: 'Elective V', credits: 3, type: 'elective' },
      { code: `ME${tag}46`, name: 'Internship / Professional Practice', credits: 2, type: 'core' },
      { code: `MEL${tag}47`, name: 'Project Phase II', credits: 6, type: 'major' },
    ]},
    { semester: 8, name: 'Semester 8', subjects: [
      { code: `ME${tag}48`, name: 'Elective VI', credits: 3, type: 'elective' },
      { code: `ME${tag}49`, name: 'Elective VII', credits: 3, type: 'elective' },
      { code: `ME${tag}50`, name: 'Major Project', credits: 6, type: 'major' },
      { code: `ME${tag}51`, name: 'Seminar', credits: 1, type: 'core' },
    ]},
  ];
}

export function fullCSE(tag: string): Branch {
  return buildBranch('cse', 'Computer Science & Engineering', 'CSE', [...firstYear(tag, 'cs'), ...cseMid(tag)]);
}

export function fullECE(tag: string): Branch {
  return buildBranch('ece', 'Electronics & Communication Engineering', 'ECE', [...firstYear(tag, 'ec'), ...eceMid(tag)]);
}

export function fullME(tag: string): Branch {
  return buildBranch('me', 'Mechanical Engineering', 'ME', [...firstYear(tag, 'me'), ...meMid(tag)]);
}

export function fullCE(tag: string): Branch {
  return buildBranch('ce', 'Civil Engineering', 'CE', [...firstYear(tag, 'ce'), ...cseMid(tag).map(s => ({...s, subjects: s.subjects.map(sub => ({...sub, code: sub.code.replace('CS', 'CE').replace('CSL', 'CEL')}))}))]);
}

export function fullEEE(tag: string): Branch {
  return buildBranch('eee', 'Electrical & Electronics Engineering', 'EEE', [...firstYear(tag, 'ee'), ...eceMid(tag).map(s => ({...s, subjects: s.subjects.map(sub => ({...sub, code: sub.code.replace('EC', 'EE').replace('ECL', 'EEL')}))}))]);
}

export function fullISE(tag: string): Branch {
  return buildBranch('ise', 'Information Science & Engineering', 'ISE', [...firstYear(tag, 'is'), ...cseMid(tag).map(s => ({...s, subjects: s.subjects.map(sub => ({...sub, code: sub.code.replace('CS', 'IS').replace('CSL', 'ISL')}))}))]);
}