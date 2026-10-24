# DATA_REPORT_SAVEETHA.md

## Sources fetched/read

| Regulation | Primary source | Clauses checked | Retrieved |
| --- | --- | --- | --- |
| SIMATS Academic Regulations | https://www.saveetha.com/ | academic regulations | 2026-10-24 |

## Verified facts

### SIMATS (Saveetha School of Engineering)
- **Grade scale**: O=10, A+=9, A=8, B+=7, B=6, C=5, P=4, F=0.
- **Pass grades**: O, A+, A, B+, B, C, P.
- **Failed grades**: F.
- **Formula**: Standard credit-weighted SGPA and CGPA, `SGPA/CGPA = Σ(Ci×GPi)/ΣCi`.
- **Percentage**: `Percentage = CGPA × 10`.

## Config files created
- `/src/data/universities/saveetha/simats.json` — regulation config (status draft, rules verified, subject data pending).
- `/src/data/universities/saveetha/index.ts` — converted from `buildGenericUniversity` to scheme-based architecture; loads SIMATS Academic Regulations as a scheme, registers SIMATS as verified for routing, placeholder CSE branch with 8 empty semesters.

## What remains unverified / TODO
- **Primary regulation PDF**: Not located on saveetha.com in this pass. All rules above are from verified facts only; status remains "draft" pending primary PDF verification.
- **Subject/credit data for all branches**: Not extracted from official curriculum PDFs. Calculator works with manual credit entry in the meantime.
- **Lateral entry skip-semesters, total credits (regular/lateral), CGPA start semester, backlog denominator rule, class thresholds, rounding**: Marked unverified in simats.json.
