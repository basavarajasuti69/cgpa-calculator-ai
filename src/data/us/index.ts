import standard4 from './standard4';
import penn from './penn';
import stanford from './stanford';
import mit from './mit';
import yale from './yale';
import brown from './brown';

export const usInstitutions = [
  standard4,
  penn,
  stanford,
  mit,
  yale,
  brown,
];

export function getUSInstitution(id: string) {
  return usInstitutions.find((u) => u.id === id);
}

export { standard4, penn, stanford, mit, yale, brown };
