# DATA_REPORT_ANNA.md

## Sources fetched/read
| Regulation | Primary source(s) | Clauses checked | Retrieved | Status |
|---|---|---|---|---|
| R2021 | https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf | Grade table, GPA/CGPA, percentage, excluded categories | 2026-10-24 | draft |
| R2021 (amended) | https://cac.annauniv.edu/aidetails/reg/UG%20R%202021.pdf | Amendments to R2021 | 2026-10-24 | unverified |
| R2017 | https://cac.annauniv.edu/aidetails/reg/2017/00.%20UG%20(Aff)%20Reg%20(2017)%20-%205.9.18.pdf | Grade table, percentage, class cutoffs | 2026-10-24 | unverified |
| R2013 | Official regulation on cac.annauniv.edu (not yet located) | Grade table, percentage rule | — | unverified |
| Curriculum | cac.annauniv.edu / coe1.annauniv.edu (R2021 curriculum PDFs) | Per-branch credits per semester | — | pending |

## Verified facts (implemented exactly)

### R2021
- **Grade table**: O=10 (91–100), A+=9 (81–90), A=8 (71–80), B+=7 (61–70), B=6 (56–60), C=5 (50–55), U/RA=0 (<50), SA=0, WD/W=0
- **Pass grades**: O, A+, A, B+, B, C
- **GPA/CGPA**: `sum(Ci × GPi) / sum(Ci)` over courses **successfully cleared** only. U/RA grades excluded from both GPA and CGPA (their credits do NOT enter the denominator)
- **Percentage**: `CGPA × 10` (clause 15.5.3)
- **Class (indicative)**: FCD ≥ 8.50 with first-attempt passes within 5 years (4 lateral); FC ≥ 6.50; otherwise SC
- **Excluded from CGPA**: Mandatory courses (languages, well-being), value-added courses, Hons/Minor additional courses (unless Hons/Minor completed), internship credits optionally earned beyond curriculum
- **Credits**: Lecture = 1, Tutorial = 1, Lab period = 0.5. Total per programme from curriculum
- **Absolute grading**: Only for labs, project work, and courses with ≤30 passed students: O 91–100, A+ 81–90, A 71–80, B+ 61–70, B 56–60, C 50–55, U <50
- **Theory uses relative grading** — NO marks-to-grade converter for theory
- **Skill-based course drop rule** (clause 4.12): One dropped PE/OE for two 2-credit skill courses = (2 × higher GP + 1 × lower GP) / 3 over 3 credits

### R2017
- **Grade table**: O=10, A+=9, A=8, B+=7, B=6, RA=0 (no C grade) — per partial extraction
- **Percentage**: UNVERIFIED — not confirmed from primary PDF
- **Class cutoffs**: UNVERIFIED
- **Status**: draft — pending full primary PDF read

### R2013
- **Grade table**: S=10 (91–100), A=9 (81–90), B=8 (71–80), C=7 (61–70), D=6 (57–60), E=5 (50–56), U=0 (<50), W=0 — per third-party extraction (padeepz.net), NOT yet confirmed from primary source
- **Percentage**: UNVERIFIED
- **Status**: draft — pending primary source confirmation

## Config files created
- `/src/data/universities/anna/r2021.json` (status: draft; grade table, excluded grades U/RA/SA/WD/W, percentage ×10 captured)
- `/src/data/universities/anna/r2017.json` (status: draft; grade table partial, percentage unverified)
- `/src/data/universities/anna/r2013.json` (status: draft; grade table from third-party only, percentage unverified)

## What remains unverified / TODO
- **R2021 full primary PDF**: Not fully read in this pass — grade table and percentage confirmed from OpenCGPA and Anna University ACOE circular, but full regulation clauses need confirmation
- **R2017 marks ranges, percentage rule, class cutoffs**: Not confirmed from primary PDF
- **R2013 entire regulation**: Not located on cac.annauniv.edu
- **Subject/credit data for all branches**: Not extracted from curriculum PDFs — manual mode only
- **Skill-based course drop rule**: Not yet wired into calculator UI (optional input needed)
