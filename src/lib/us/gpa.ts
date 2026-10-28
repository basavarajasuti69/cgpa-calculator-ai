/* ============================================================================
   US GPA calculation engine
   ============================================================================ */

export interface USCourse {
  name?: string;
  credits: number;
  grade: string;
}

export interface USGPAResult {
  totalCredits: number;
  totalPoints: number;
  gpa: number;
  courses: Array<USCourse & { points: number; included: boolean }>;
}

export function computeUSGPA(courses: USCourse[], gradeTable: Array<{ grade: string; points: number }>, excluded: Set<string> = new Set()): USGPAResult {
  let totalCredits = 0;
  let totalPoints = 0;
  const resultCourses = courses.map((c) => {
    const g = gradeTable.find((gt) => gt.grade.toUpperCase() === String(c.grade).trim().toUpperCase());
    const points = g ? g.points : 0;
    const included = !excluded.has(String(c.grade).trim().toUpperCase()) && points >= 0; // simple
    if (included && c.credits > 0) {
      totalCredits += c.credits;
      totalPoints += points * c.credits;
    }
    return { ...c, points, included };
  });
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  return { totalCredits, totalPoints, gpa, courses: resultCourses };
}

export function quarterToSemester(quarterUnits: number): number {
  return quarterUnits * (2/3);
}

export function semesterToQuarter(semesterCredits: number): number {
  return semesterCredits * 1.5;
}

export function indianCGPAToUS4(cgpa: number): { estimate: number; method: string } {
  // Marked as estimate - do not claim official conversion
  const estimate = Math.min(4.0, Math.max(0, cgpa / 10 * 4));
  return { estimate, method: 'Linear scaling (CGPA/10)*4 - ESTIMATE ONLY. Official conversions vary by evaluator (WES/ECE). See https://www.wes.org/' };
}

export function gpaNeededForTarget(currentGPA: number, currentCredits: number, targetGPA: number, plannedCredits: number): { neededGPA: number; possible: boolean } {
  const neededPoints = targetGPA * (currentCredits + plannedCredits) - currentGPA * currentCredits;
  const neededGPA = plannedCredits > 0 ? neededPoints / plannedCredits : 0;
  return { neededGPA, possible: neededGPA >= 0 && neededGPA <= 4.0 };
}
