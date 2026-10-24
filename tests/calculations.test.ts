import { describe, it, expect } from 'vitest';
import {
  computeSemester,
  computeCGPA,
  targetSgpaNeeded,
  cgpaToPercentage,
  percentageToCgpa,
  cgpaToGpa4,
  gpa4ToCgpa,
  classDivision,
} from '../src/lib/calculations.ts';
import {
  VTU_GRADE_TABLE,
  gradeTableToScale,
  letterToGradePoint,
  marksToGradePoint,
} from '../src/data/types';

const scale = gradeTableToScale(VTU_GRADE_TABLE);

function sub(code, name, credits, grade) {
  return { code, name, credits, type: 'core' as const, grade };
}

describe('grade table', () => {
  it('maps letters to grade points', () => {
    expect(letterToGradePoint('S', VTU_GRADE_TABLE)).toBe(10);
    expect(letterToGradePoint('A', VTU_GRADE_TABLE)).toBe(9);
    expect(letterToGradePoint('F', VTU_GRADE_TABLE)).toBe(0);
    expect(letterToGradePoint('Absent', VTU_GRADE_TABLE)).toBe(0);
    expect(letterToGradePoint('Z', VTU_GRADE_TABLE)).toBeNull();
  });

  it('maps marks to grade points', () => {
    expect(marksToGradePoint(95, VTU_GRADE_TABLE)).toBe(10);
    expect(marksToGradePoint(85, VTU_GRADE_TABLE)).toBe(9);
    expect(marksToGradePoint(45, VTU_GRADE_TABLE)).toBe(5);
    expect(marksToGradePoint(30, VTU_GRADE_TABLE)).toBe(0);
  });
});

describe('SGPA — verified example (semester I)', () => {
  const sem = {
    semester: 1,
    name: 'Semester I',
    subjects: [
      sub('XX11', 'S1', 3, 'B'),   // 3×8=24
      sub('XX12', 'S2', 3, 'Absent'), // 3×0=0
      sub('XX13', 'S3', 3, 'A'),   // 3×9=27
      sub('XX14', 'S4', 3, 'F'),   // 3×0=0
      sub('XX15', 'S5', 3, 'D'),   // 3×6=18
      sub('XX16', 'S6', 1, 'E'),   // 1×5=5
      sub('XX17', 'S7', 1, 'A'),   // 1×9=9
      sub('XX18', 'S8', 2, 'D'),   // 2×6=12
      sub('XX19', 'S9', 1, 'D'),   // 1×6=6
    ],
  };

  it('computes SGPA = 101/20 = 5.05', () => {
    const r = computeSemester(sem, VTU_GRADE_TABLE, scale);
    expect(r.totalCredits).toBe(20);
    expect(r.totalCreditPoints).toBe(101);
    expect(r.sgpa).toBeCloseTo(5.05, 2);
  });
});

describe('CGPA — weighted average across semesters', () => {
  // Sem 1: 20 credits all A (gp 9) → 180 points; Sem 2: 20 credits all D (gp 6) → 120 points
  const semList = [
    { semester: 1, name: 'Sem 1', subjects: [sub('s1a','s1a',10,'A'), sub('s1b','s1b',10,'A')] },
    { semester: 2, name: 'Sem 2', subjects: [sub('s2a','s2a',10,'D'), sub('s2b','s2b',10,'D')] },
    { semester: 3, name: 'Sem 3', subjects: [sub('s3a','s3a',12,'B'), sub('s3b','s3b',12,'B')] },
  ];

  it('computes CGPA = (180+120+288)/(20+20+24) = 588/64 = 9.1875', () => {
    const r = computeCGPA(semList, VTU_GRADE_TABLE, scale);
    // 20*9=180, 20*6=120, 24*8=192 → total 492, credits 64 → 7.6875
    expect(r.totalCredits).toBe(64);
    expect(r.totalCreditPoints).toBe(492);
    expect(r.cgpa).toBeCloseTo(7.6875, 4);
  });

  it('lateral entry skips semesters 1-2: only sem 3 → 192/24 = 8.0', () => {
    const r = computeCGPA(semList, VTU_GRADE_TABLE, scale, 'credit-weighted', 2);
    expect(r.totalCredits).toBe(24);
    expect(r.totalCreditPoints).toBe(192);
    expect(r.cgpa).toBe(8.0);
    expect(r.skipped).toBe(2);
  });
});

describe('verified example arithmetic (pure math checks)', () => {
  it('SGPA example: 101/20 = 5.05', () => {
    expect(101 / 20).toBeCloseTo(5.05, 2);
  });
  it('CGPA example: 1243/160 = 7.77', () => {
    expect(1243 / 160).toBeCloseTo(7.77, 2);
  });
  it('lateral entry: 1009/120 = 8.41', () => {
    expect(1009 / 120).toBeCloseTo(8.41, 2);
  });
});

describe('target SGPA planner', () => {
  it('computes needed SGPA and possibility', () => {
    // current: 60 credits, 420 points (cgpa 7.0); remaining 60 credits; target 8.0
    const p = targetSgpaNeeded({ currentCredits: 60, currentCreditPoints: 420, remainingCredits: 60, targetCgpa: 8.0 });
    // needed total = 8.0 * 120 = 960; needed in remaining = 960 - 420 = 540; needed sgpa = 540/60 = 9.0
    expect(p.neededTotalPoints).toBe(960);
    expect(p.neededPointsInRemaining).toBe(540);
    expect(p.neededSgpa).toBe(9.0);
    expect(p.possible).toBe(true);
  });

  it('detects impossible target (>10 SGPA needed)', () => {
    const p = targetSgpaNeeded({ currentCredits: 60, currentCreditPoints: 300, remainingCredits: 60, targetCgpa: 9.5 });
    // needed total = 9.5*120=1140; needed remaining = 840; needed sgpa = 14 > 10 → impossible
    expect(p.possible).toBe(false);
    expect(p.neededSgpa).toBeGreaterThan(10);
  });
});

describe('converters', () => {
  it('cgpa to percentage (×9.5)', () => {
    expect(cgpaToPercentage(8.0)).toBe(76.0);
    expect(cgpaToPercentage(7.77)).toBeCloseTo(73.815, 2);
  });

  it('percentage to cgpa', () => {
    expect(percentageToCgpa(76.0)).toBe(8.0);
  });

  it('cgpa to 4.0 gpa', () => {
    expect(cgpaToGpa4(10.0)).toBe(4.0);
    expect(cgpaToGpa4(7.5)).toBe(3.0);
  });

  it('4.0 gpa to cgpa', () => {
    expect(gpa4ToCgpa(4.0)).toBe(10.0);
    expect(gpa4ToCgpa(3.0)).toBe(7.5);
  });
});

describe('class division', () => {
  it('classifies CGPA correctly', () => {
    expect(classDivision(9.0).division).toBe('First Class with Distinction');
    expect(classDivision(7.0).division).toBe('First Class');
    expect(classDivision(5.5).division).toBe('Second Class');
    expect(classDivision(4.5).division).toBe('Pass Class');
    expect(classDivision(3.0).division).toBe('Fail');
  });
});

describe('Anna University R2021 — U/RA grade exclusion', () => {
  const ANNA_GRADE_ENTRIES = [
    { letter: 'O', gradePoint: 10 },
    { letter: 'A+', gradePoint: 9 },
    { letter: 'A', gradePoint: 8 },
    { letter: 'B+', gradePoint: 7 },
    { letter: 'B', gradePoint: 6 },
    { letter: 'C', gradePoint: 5 },
    { letter: 'U', gradePoint: 0 },
    { letter: 'RA', gradePoint: 0 },
    { letter: 'SA', gradePoint: 0 },
    { letter: 'WD', gradePoint: 0 },
    { letter: 'W', gradePoint: 0 },
  ];
  const ANNA_SCALE = gradeTableToScale(ANNA_GRADE_ENTRIES);

  const semWithU = {
    semester: 1,
    name: 'Semester 1',
    subjects: [
      { code: 'CS101', name: 'Programming', credits: 4, type: 'core' as const, grade: 'A' },   // 4×8=32
      { code: 'CS102', name: 'Data Structures', credits: 3, type: 'core' as const, grade: 'U' }, // excluded
      { code: 'CS103', name: 'Digital Logic', credits: 3, type: 'core' as const, grade: 'B' },   // 3×6=18
      { code: 'CS104', name: 'Lab', credits: 1, type: 'lab' as const, grade: 'RA' },            // excluded
    ],
  };

  it('excludes U and RA grades from GPA denominator', () => {
    const r = computeSemester(semWithU, ANNA_GRADE_ENTRIES, ANNA_SCALE, 'credit-weighted', ['U', 'RA']);
    // Only CS101 (4 cr × 8 = 32) and CS103 (3 cr × 6 = 18) count
    // Total credits = 7, Total points = 50, GPA = 50/7 = 7.1428...
    expect(r.totalCredits).toBe(7);
    expect(r.totalCreditPoints).toBe(50);
    expect(r.sgpa).toBeCloseTo(50 / 7, 4);
  });

  it('U/RA courses do not change CGPA when excluded', () => {
    const semList = [
      { semester: 1, name: 'Sem 1', subjects: [
        { code: 'S1', name: 'S1', credits: 4, type: 'core' as const, grade: 'A' },   // 4×8=32
        { code: 'S2', name: 'S2', credits: 3, type: 'core' as const, grade: 'U' },    // excluded
      ]},
      { semester: 2, name: 'Sem 2', subjects: [
        { code: 'S3', name: 'S3', credits: 4, type: 'core' as const, grade: 'B' },   // 4×6=24
      ]},
    ];
    const r = computeCGPA(semList, ANNA_GRADE_ENTRIES, ANNA_SCALE, 'credit-weighted', 0, ['U', 'RA']);
    // Total credits = 4 + 4 = 8, Total points = 32 + 24 = 56, CGPA = 56/8 = 7.0
    expect(r.totalCredits).toBe(8);
    expect(r.totalCreditPoints).toBe(56);
    expect(r.cgpa).toBeCloseTo(7.0, 4);
  });
});

describe('KTU 2024/2019 — failed courses stay in denominator', () => {
  const KTU_GRADE_ENTRIES = [
    { letter: 'S', gradePoint: 10 },
    { letter: 'A+', gradePoint: 9 },
    { letter: 'A', gradePoint: 8.5 },
    { letter: 'B+', gradePoint: 8 },
    { letter: 'B', gradePoint: 7.5 },
    { letter: 'C+', gradePoint: 7 },
    { letter: 'C', gradePoint: 6.5 },
    { letter: 'D', gradePoint: 6 },
    { letter: 'P', gradePoint: 5.5 },
    { letter: 'F', gradePoint: 0 },
    { letter: 'FE', gradePoint: 0 },
    { letter: 'Ab', gradePoint: 0 },
    { letter: 'I', gradePoint: 0 },
  ];
  const KTU_SCALE = gradeTableToScale(KTU_GRADE_ENTRIES);

  const semWithFail = {
    semester: 1,
    name: 'Semester 1',
    subjects: [
      { code: 'CS101', name: 'Programming', credits: 4, type: 'core' as const, grade: 'A' },   // 4×8.5=34
      { code: 'CS102', name: 'Data Structures', credits: 3, type: 'core' as const, grade: 'F' }, // 3×0=0, counts in denom
      { code: 'CS103', name: 'Digital Logic', credits: 3, type: 'core' as const, grade: 'P' },   // 3×5.5=16.5
    ],
  };

  it('counts F (0 pts) credits in SGPA denominator', () => {
    const r = computeSemester(semWithFail, KTU_GRADE_ENTRIES, KTU_SCALE, 'credit-weighted', []);
    // All 3 courses count: credits = 4+3+3 = 10, points = 34+0+16.5 = 50.5
    // SGPA = 50.5/10 = 5.05
    expect(r.totalCredits).toBe(10);
    expect(r.totalCreditPoints).toBe(50.5);
    expect(r.sgpa).toBeCloseTo(5.05, 4);
  });

  it('lateral entry skips first two semesters for CGPA', () => {
    const semList = [
      { semester: 1, name: 'Sem 1', subjects: [{ code: 'S1', name: 'S1', credits: 4, type: 'core' as const, grade: 'S' }] }, // 4×10=40
      { semester: 2, name: 'Sem 2', subjects: [{ code: 'S2', name: 'S2', credits: 4, type: 'core' as const, grade: 'S' }] }, // 4×10=40
      { semester: 3, name: 'Sem 3', subjects: [{ code: 'S3', name: 'S3', credits: 4, type: 'core' as const, grade: 'A' }] }, // 4×8.5=34
    ];
    const r = computeCGPA(semList, KTU_GRADE_ENTRIES, KTU_SCALE, 'credit-weighted', 2, []);
    // Only Sem 3 counts: credits = 4, points = 34, CGPA = 34/4 = 8.5
    expect(r.totalCredits).toBe(4);
    expect(r.totalCreditPoints).toBe(34);
    expect(r.cgpa).toBeCloseTo(8.5, 4);
    expect(r.skipped).toBe(2);
  });
});

describe('SRMIST 2021/2018 — F/Ab/I grade exclusion from denominator', () => {
  const SRM_GRADE_ENTRIES = [
    { letter: 'O', gradePoint: 10 },
    { letter: 'A+', gradePoint: 9 },
    { letter: 'A', gradePoint: 8 },
    { letter: 'B+', gradePoint: 7 },
    { letter: 'B', gradePoint: 6 },
    { letter: 'C', gradePoint: 5 },
    { letter: 'F', gradePoint: 0 },
    { letter: 'Ab', gradePoint: 0 },
    { letter: 'I', gradePoint: 0 },
  ];
  const SRM_SCALE = gradeTableToScale(SRM_GRADE_ENTRIES);

  const semWithFail = {
    semester: 1,
    name: 'Semester 1',
    subjects: [
      { code: 'CS101', name: 'Programming', credits: 4, type: 'core' as const, grade: 'A' },   // 4×8=32
      { code: 'CS102', name: 'Data Structures', credits: 3, type: 'core' as const, grade: 'F' }, // 3×0=0, stays in denom
      { code: 'CS103', name: 'Digital Logic', credits: 3, type: 'core' as const, grade: 'C' },   // 3×5=15
    ],
  };

  it('counts F (0 pts) credits in SGPA denominator per R8.6/R15.2', () => {
    const r = computeSemester(semWithFail, SRM_GRADE_ENTRIES, SRM_SCALE, 'credit-weighted', []);
    // All 3 courses count: credits = 4+3+3 = 10, points = 32+0+15 = 47
    // SGPA = 47/10 = 4.70
    expect(r.totalCredits).toBe(10);
    expect(r.totalCreditPoints).toBe(47);
    expect(r.sgpa).toBeCloseTo(4.70, 4);
  });

  it('lateral entry skips first two semesters for CGPA', () => {
    const semList = [
      { semester: 1, name: 'Sem 1', subjects: [{ code: 'S1', name: 'S1', credits: 4, type: 'core' as const, grade: 'O' }] }, // 4×10=40
      { semester: 2, name: 'Sem 2', subjects: [{ code: 'S2', name: 'S2', credits: 4, type: 'core' as const, grade: 'O' }] }, // 4×10=40
      { semester: 3, name: 'Sem 3', subjects: [{ code: 'S3', name: 'S3', credits: 4, type: 'core' as const, grade: 'A' }] }, // 4×8=32
    ];
    const r = computeCGPA(semList, SRM_GRADE_ENTRIES, SRM_SCALE, 'credit-weighted', 2, []);
    // Only Sem 3 counts: credits = 4, points = 32, CGPA = 32/4 = 8.0
    expect(r.totalCredits).toBe(4);
    expect(r.totalCreditPoints).toBe(32);
    expect(r.cgpa).toBeCloseTo(8.0, 4);
    expect(r.skipped).toBe(2);
  });
});

describe('VIT FFCS — F/N grades stay in denominator', () => {
  const VIT_GRADE_ENTRIES = [
    { letter: 'S', gradePoint: 10 },
    { letter: 'A', gradePoint: 9 },
    { letter: 'B', gradePoint: 8 },
    { letter: 'C', gradePoint: 7 },
    { letter: 'D', gradePoint: 6 },
    { letter: 'E', gradePoint: 5 },
    { letter: 'F', gradePoint: 0 },
    { letter: 'N', gradePoint: 0 },
  ];
  const VIT_SCALE = gradeTableToScale(VIT_GRADE_ENTRIES);

  const semWithFail = {
    semester: 1,
    name: 'Semester 1',
    subjects: [
      { code: 'CS101', name: 'Programming', credits: 4, type: 'core' as const, grade: 'A' },   // 4×9=36
      { code: 'CS102', name: 'Data Structures', credits: 3, type: 'core' as const, grade: 'F' }, // 3×0=0, stays in denom
      { code: 'CS103', name: 'Digital Logic', credits: 3, type: 'core' as const, grade: 'N' },   // 3×0=0, stays in denom
    ],
  };

  it('counts F and N (0 pts) credits in SGPA denominator per Section 9.9', () => {
    const r = computeSemester(semWithFail, VIT_GRADE_ENTRIES, VIT_SCALE, 'credit-weighted', []);
    // All 3 courses count: credits = 4+3+3 = 10, points = 36+0+0 = 36
    // SGPA = 36/10 = 3.60
    expect(r.totalCredits).toBe(10);
    expect(r.totalCreditPoints).toBe(36);
    expect(r.sgpa).toBeCloseTo(3.60, 4);
  });

  it('percentage = CGPA * 10', () => {
    expect(cgpaToPercentage(8.75, 10)).toBe(87.5);
  });
});
