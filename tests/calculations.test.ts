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
