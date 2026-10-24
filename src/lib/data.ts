import vtu from '../data/universities/vtu/index.ts';
import anna from '../data/universities/anna/index.ts';
import ktu from '../data/universities/ktu/index.ts';
import srm from '../data/universities/srm/index.ts';
import vit from '../data/universities/vit/index.ts';
import ipu from '../data/universities/ipu/index.ts';
import saveetha from '../data/universities/saveetha/index.ts';
import type { University, Scheme, Branch } from '../data/types';

const universities: Record<string, University> = {
  vtu: vtu as University,
  anna: anna as University,
  ktu: ktu as University,
  srm: srm as University,
  vit: vit as University,
  ipu: ipu as University,
  saveetha: saveetha as University,
};

export function getUniversity(id: string): University | undefined {
  return universities[id];
}

export function getUniversities(): University[] {
  return Object.values(universities);
}

export function getVerifiedUniversities(): University[] {
  return Object.values(universities).filter((u) => u.status === 'verified');
}

export function getScheme(university: University, schemeId: string): Scheme | undefined {
  return university.schemes.find((s) => s.id === schemeId);
}

export function getVerifiedSchemes(university: University): Scheme[] {
  return university.schemes.filter((s) => s.status === 'verified');
}

export function getBranch(scheme: Scheme, branchId: string): Branch | undefined {
  return scheme.branches.find((b) => b.id === branchId);
}

export const DEFAULT_UNIVERSITY = 'vtu';
export const DEFAULT_SCHEME = '2022';
export const DEFAULT_BRANCH = 'cse';
