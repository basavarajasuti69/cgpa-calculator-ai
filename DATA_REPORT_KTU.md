# DATA_REPORT_KTU.md

## Sources fetched/read
| Scheme | Primary source(s) | Clauses checked | Retrieved |
| --- | --- | --- | --- |
| 2019 | https://mbits.ac.in/wp-content/uploads/2024/10/KTU-Regulations.pdf (college copy of 2019 text) | R6.16, R6.21 | 2026-10-24 |
| 2019 | http://www.ee.cet.ac.in/downloads/ktuDocs/B.tech_regulation2019.pdf (college mirror) | R6.16, R6.21 | 2026-10-24 |
| 2019 amendment | http://www.ee.cet.ac.in/downloads/ktuDocs/1584-2023-KTU_R.6.21%20CGPA%20to%20Percentage%20Conversion.pdf | U.O.No. 1584/2023/KTU, R6.21 amendment | 2026-10-24 |
| 2024 | http://me.cet.ac.in/downloads/26-09-2025/B.Tech%20Academic%20Regulations%20KTU%202024%20Scheme.pdf | R 7.21, R 9.1, R 9.2, R 9.3, R 3.20, R 3.23, R 3.3 | 2026-10-24 |
| 2024 | https://mbits.ac.in/wp-content/uploads/2024/10/KTU-Regulations.pdf | R 7.21, R 9.1, R 9.2, R 9.3 | 2026-10-24 |
| Scheme index | https://ktu.edu.in/academics/scheme | 2015, 2019, 2024 schemes listed | 2026-10-24 |
| 2015 amendment rec. | https://www.ktustudents.in/2023/07/apjaktu-academic-cgpa-to-percentage.html | U.O.No. 1867/2023/KTU (third-party mirror) | 2026-10-24 |

Note: Official ktu.edu.in regulation PDFs were not directly downloadable in this pass; college mirrors (mbits.ac.in, ee.cet.ac.in, me.cet.ac.in) were used to read regulation text. 2015 official regulation was NOT located.

## Verified facts

### KTU 2019 Scheme
- **Grade table (R6.16)**: S=10 (90%+), A+=9 (85-<90), A=8.5 (80-<85), B+=8 (75-<80), B=7.5 (70-<75), C+=7 (65-<70), C=6.5 (60-<65), D=6 (55-<60), P=5.5 (50-<55), F=0 (<50% overall or <40% ESE), FE=0 (failed due to eligibility/CIE only), I=0 (could not appear for ESE but eligible)
- **Pass grades**: P or better earns credits
- **SGPA (R6.21)**: `SGPA = Σ(Ci×GPi)/ΣCi` over ALL courses of the semester including F, FE, I (grade point 0). Credits of failed courses STAY in denominator.
- **CGPA (R6.21)**: Same formula over all courses up to that semester; failed courses accounted (0 points). Lateral entry: first and second semester credits NOT counted.
- **Percentage**: Regulation text R6.16/R6.21 says `10 * CGPA – 2.5`. **Amended by U.O.No. 1584/2023/KTU (29.06.2023)** to `CGPA * 10` per 23rd Academic Council resolution (item 023.3.13). Default = `CGPA * 10`; original `10*CGPA - 2.5` stored as alternative.
- **Classification**: FCD CGPA ≥ 8.0; First Class CGPA ≥ 6.5
- **Activity credits**: 2 credits (mandatory, not counted for CGPA)
- **Total credits**: 160 academic + 2 activity = 162
- **Semester credits**: S1=17, S2=21, S3=22, S4=22, S5=23, S6=24, S7=15, S8=16
- **Rounding**: SGPA/CGPA to two decimal places (R 9.4 in 2024 text; applied to 2019 too)

### KTU 2024 Scheme
- **Grade table (R 7.21)**: S=10 (90%+), A+=9 (85-<90), A=8.5 (80-<85), B+=8 (75-<80), B=7.5 (70-<75), C+=7 (65-<70), C=6.5 (60-<65), D=6 (55-<60), P=5.5 (50-<54), F=0 (<50% overall or <40% ESE), FE=0 (Failed due to eligibility/CIE only), Ab=0 (Absent but eligible/deferred ESE)
- **Pass grades**: S, A+, A, B+, B, C+, C, D, P
- **SGPA (R 9.1)**: `SGPA = Σ(Ci×GPi)/ΣCi` over ALL courses including F, Ab, FE (grade point 0). Credits stay in denominator.
- **CGPA (R 9.2)**: Same formula; lateral entry: first and second semester credits NOT included; 44 credits awarded from qualifying Diploma/Degree.
- **Percentage (R 7.21)**: `Equivalent Percentage Mark = 10 * CGPA`
- **Classification**: FCD CGPA ≥ 8.0; First Class CGPA ≥ 6.5 and < 8.0
- **Activity credits**: 3 credits (mandatory, not counted for CGPA)
- **Total credits**: 170 (167 academic + 3 activity)
- **Credit relaxation (R 3.3)**: Graduate with minimum 160 credits (157 academic + 3 activity); credit shortfall allowance up to 10 credits; unacquired credits get GP=0 in SGPA/CGPA
- **Level 5 elective (R 3.20, R 3.23)**: 3 base credits + 2 bonus credits if CIE ≥ 80% OR viva ≥ 70% AND combined grade ≥ B
- **Non-computable**: Minor, Honours, Challenge exams excluded from SGPA/CGPA (R 9.3)
- **Semester credits**: S1=20, S2=24, S3=25, S4=24, S5=23, S6=23, S7=17, S8=11

### KTU 2015 Scheme
- Official 2015 regulation PDF **NOT located** on ktu.edu.in or mirrors in this pass
- All rules unverified
- Percentage: U.O.No. 1867/2023/KTU (27.07.2023, third-party mirror) recommended CGPA*10 for 2015 scheme — NOT confirmed on ktu.edu.in
- Grade table: unverified

## Config files created
- `/src/data/universities/ktu/2024.json` — status draft (rules verified, subject data pending)
- `/src/data/universities/ktu/2019.json` — status draft (rules verified, subject data pending)
- `/src/data/universities/ktu/2015.json` — status draft (regulation not located; all unverified)
- `/src/data/universities/ktu/index.ts` — loads schemes, registers university as verified for routing

## Differences between 2015, 2019 and 2024

| Aspect | 2015 | 2019 | 2024 |
| --- | --- | --- | --- |
| Official regulation located | No | Yes (college mirror) | Yes (college mirror + cet) |
| Grade table | unverified | S=10...P=5.5,F=0,FE=0,I=0 | S=10...P=5.5,F=0,FE=0,Ab=0 |
| Fail grade for absent | unverified | I (could not appear ESE) | Ab (absent but eligible) |
| SGPA/CGPA formula | unverified | Σ(Ci×GPi)/ΣCi incl. failed | Σ(Ci×GPi)/ΣCi incl. failed |
| Failed credits in denominator | unverified | Yes (stay) | Yes (stay) |
| Percentage (default) | unverified | CGPA * 10 (amended Jun 2023) | CGPA * 10 |
| Percentage (original) | unverified | 10*CGPA - 2.5 | n/a |
| Percentage amendment | unverified | U.O. 1584/2023 (Jun 2023) | n/a (regulation text) |
| 2015 percentage rec. | unverified | U.O. 1867/2023 recommends CGPA*10 | n/a |
| FCD cutoff | unverified | CGPA ≥ 8.0 | CGPA ≥ 8.0 |
| FC cutoff | unverified | CGPA ≥ 6.5 | CGPA ≥ 6.5 and < 8.0 |
| Activity credits | unverified | 2 (excluded from CGPA) | 3 (excluded from CGPA) |
| Total credits | unverified | 160 + 2 | 167 + 3 = 170 |
| Credit relaxation | unverified | No | Yes (160 credits min) |
| Level 5 elective | unverified | No | Yes (3+2 bonus) |
| Lateral entry skip | unverified | First 2 semesters | First 2 semesters |
| Lateral awarded credits | unverified | not specified | 44 credits |

## What remains unverified / TODO
- **2015 official regulation**: Not located; grade table, percentage rule, credits all unverified
- **Subject/credit data for all branches**: Not extracted from official KTU curriculum PDFs. Parser needed for 2019 and 2024 CSE, ECE, EEE, ME, CE curricula. Calculator works with manual credit entry.
- **June 2023 amendment on ktu.edu.in**: Found on college mirror (ee.cet.ac.in), not directly on ktu.edu.in. Recorded as found from U.O. document but source is a mirror.
