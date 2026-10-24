/* ============================================================================
   CGPA Calculator AI — data validation script
   ============================================================================
   Validates every university config:
   - grade table ranges don't overlap
   - source URL present
   - lastVerified present
   - each scheme has at least one branch with subjects
   Run: npx tsx scripts/validate-data.ts
   ============================================================================ */

import vtu from '../src/data/universities/vtu/index.ts';
import anna from '../src/data/universities/anna/index.ts';
import ktu from '../src/data/universities/ktu/index.ts';
import srm from '../src/data/universities/srm/index.ts';
import vit from '../src/data/universities/vit/index.ts';
import ipu from '../src/data/universities/ipu/index.ts';
import saveetha from '../src/data/universities/saveetha/index.ts';
import type { University } from '../src/data/types';

const universities: Record<string, University> = {
  vtu: vtu as University,
  anna: anna as University,
  ktu: ktu as University,
  srm: srm as University,
  vit: vit as University,
  ipu: ipu as University,
  saveetha: saveetha as University,
};

let failures = 0;

function fail(msg: string) {
  console.error('✗', msg);
  failures += 1;
}

function pass(msg: string) {
  console.log('✓', msg);
}

function rangesOverlap(a: { min?: number; max?: number }, b: { min?: number; max?: number }): boolean {
  if (a.min === undefined || a.max === undefined || b.min === undefined || b.max === undefined) return false;
  return !(a.max < b.min || b.max < a.min);
}

for (const uni of Object.values(universities)) {
  console.log(`\nUniversity: ${uni.name} (${uni.id}) [${uni.status}]`);

  if (!uni.domain) fail(`${uni.id}: missing domain`);
  else pass(`${uni.id}: domain present`);

  if (!uni.schemes || uni.schemes.length === 0) {
    fail(`${uni.id}: no schemes`);
    continue;
  }

  for (const scheme of uni.schemes) {
    console.log(`  Scheme: ${scheme.name} (${scheme.id}) [${scheme.status}]`);

    if (!scheme.sourceUrl) fail(`  ${uni.id}/${scheme.id}: missing sourceUrl`);
    else pass(`  ${uni.id}/${scheme.id}: sourceUrl present`);

    if (!scheme.lastVerified) fail(`  ${uni.id}/${scheme.id}: missing lastVerified`);
    else pass(`  ${uni.id}/${scheme.id}: lastVerified present`);

    // Grade table validation
    const entries = scheme.gradeTable;
    if (!entries || entries.length === 0) {
      fail(`  ${uni.id}/${scheme.id}: empty gradeTable`);
      continue;
    }

    // Check for overlapping mark ranges
    const ranged = entries.filter((e) => e.minMarks !== undefined && e.maxMarks !== undefined);
    for (let i = 0; i < ranged.length; i++) {
      for (let j = i + 1; j < ranged.length; j++) {
        if (rangesOverlap(ranged[i] as any, ranged[j] as any)) {
          fail(`  ${uni.id}/${scheme.id}: overlapping ranges ${ranged[i].letter} and ${ranged[j].letter}`);
        }
      }
    }
    pass(`  ${uni.id}/${scheme.id}: grade table has ${entries.length} entries`);

    // Branches validation
    if (!scheme.branches || scheme.branches.length === 0) {
      fail(`  ${uni.id}/${scheme.id}: no branches`);
      continue;
    }

    for (const branch of scheme.branches) {
      console.log(`    Branch: ${branch.name} (${branch.id})`);
      if (!branch.semesters || branch.semesters.length === 0) {
        fail(`    ${uni.id}/${scheme.id}/${branch.id}: no semesters`);
        continue;
      }

      let totalCredits = 0;
      let subjectCount = 0;
      for (const sem of branch.semesters) {
        for (const sub of sem.subjects) {
          totalCredits += sub.credits;
          subjectCount += 1;
          if (sub.credits <= 0) {
            fail(`    ${uni.id}/${scheme.id}/${branch.id}/${sem.name}: ${sub.code} has non-positive credits`);
          }
        }
      }
      pass(`    ${uni.id}/${scheme.id}/${branch.id}: ${subjectCount} subjects, ${totalCredits} total credits`);
    }
  }
}

console.log(`\n${failures === 0 ? 'All checks passed' : `${failures} failure(s) found`}`);
process.exit(failures === 0 ? 0 : 1);
