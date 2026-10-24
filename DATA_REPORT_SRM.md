# DATA_REPORT_SRM.md

## Sources fetched/read
| Regulation | Primary source | Clauses checked | Retrieved |
| --- | --- | --- | --- |
| SRMIST 2021 | https://webstor.srmist.edu.in/web_assets/downloads/2023/b-tech-mtech-ntegrated-2021-regulations.pdf | R 8.1, R 8.6, R 8.7, R 8.8 | 2026-10-24 |
| SRMIST 2018 | https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/2019/btech-regulations-2018.pdf | R 11.1, R 15.2, R 15.3 | 2026-10-24 |

## Verified facts

### SRMIST 2021 Regulations
- **Grade table (R 8.1)**: O=10 (91-100), A+=9 (81-90), A=8 (71-80), B+=7 (61-70), B=6 (56-60), C=5 (50-55), F=0 (<50), Ab=0, I=0. Pass grades: O, A+, A, B+, B, C.
- **SGPA (R 8.6)**: `SGPA = Σ(Ci×GPi)/ΣCi` over ALL courses in the semester including those with F grades. Credits of failed courses STAY in denominator.
- **CGPA (R 8.6)**: `CGPA = Σ(Si×SGPAi)/ΣSi` over all semesters under consideration.
- **Percentage (R 8.7)**: `Equivalent Percentage of marks = CGPA × 10`
- **Rounding**: SGPA and CGPA rounded to 2 decimal places.
- **Classification (R 8.8) for B.Tech**:
  - FCD: CGPA ≥ 8.0, without 'Ab' or 'F' or 'I' or temporary withdrawal in any semester
  - FC: CGPA ≥ 8.0 with arrears cleared subsequently, OR CGPA ≥ 6.0 and < 8.0
  - Second Class: CGPA ≥ 5.0 and < 6.0
- **Lateral entry**: CGPA computed from III semester onwards; bridge course grades included.
- **Excluded from CGPA**: mandatory non-credit courses, non-credit audit courses (unless successfully completed).
- **Total credits**: 160 for regular B.Tech.

### SRMIST 2018 Regulations
- **Grade table (R 11.1)**: Same as 2021: O=10 (91-100), A+=9 (81-90), A=8 (71-80), B+=7 (61-70), B=6 (56-60), C=5 (50-55), F=0 (<50), Ab=0, I=0.
- **SGPA/CGPA (R 15.2)**: Same formula as 2021; failed courses included with 0 grade points, credits stay in denominator.
- **Percentage**: Not explicitly stated in extracted 2018 text; inferred as CGPA × 10 (marked unverified).
- **Classification (R 15.3) for B.Tech Regular**:
  - FCD: CGPA ≥ 8.0, without 'Ab' or 'F' or 'I' or temporary withdrawal
  - FC: CGPA ≥ 6.0 & < 8.0; or CGPA ≥ 8.0 with arrears cleared subsequently
  - Second Class: CGPA ≥ 5.5 & < 6.0
  - Pass Class: CGPA ≥ 5.0 & < 5.5
- **Lateral entry**: CGPA from III-VIII semesters including bridge courses.
- **Rounding**: 2 decimal places.

## Config files created
- `/src/data/universities/srm/2021.json` — status draft (rules verified, subject data pending)
- `/src/data/universities/srm/2018.json` — status draft (rules verified, subject data pending)
- `/src/data/universities/srm/index.ts` — loads regulations as schemes, registers as verified for routing

## Differences between 2018 and 2021

| Aspect | 2018 | 2021 |
| --- | --- | --- |
| Grade table | Same | Same |
| SGPA/CGPA formula | Same | Same |
| Percentage formula | unverified (inferred CGPA×10) | CGPA × 10 (verified R 8.7) |
| FCD cutoff | CGPA ≥ 8.0 | CGPA ≥ 8.0 |
| FC cutoff | CGPA ≥ 6.0 & < 8.0 | CGPA ≥ 6.0 & < 8.0 |
| Second Class | CGPA ≥ 5.5 & < 6.0 | CGPA ≥ 5.0 & < 6.0 |
| Pass Class | CGPA ≥ 5.0 & < 5.5 | Not separate (merged into Second Class) |
| Lateral entry | From III-VIII semesters | From III semester onwards |

## What remains unverified / TODO
- **Subject/credit data for all branches**: Not extracted from official SRMIST curriculum PDFs. Parser needed for CSE, ECE, EEE, Mechanical, Civil, Biotech curricula. Calculator works with manual credit entry.
- **2018 percentage formula**: Not explicitly stated in extracted text; stored as unverified.
- **2024+ regulations**: Not located; only 2018 and 2021 regulation PDFs were found.
