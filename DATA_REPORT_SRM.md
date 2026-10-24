# DATA_REPORT_SRM.md

## Sources fetched/read
| Scheme | Primary source(s) | Clauses checked | Retrieved | Status |
|---|---|---|---|---|
| 2018 | https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/2019/btech-regulations-2018.pdf | Grade table, GPA/CGPA, percentage, class | 2026-10-24 | unverified |
| 2021 | https://webstor.srmist.edu.in/web_assets/downloads/2023/b-tech-mtech-ntegrated-2021-regulations.pdf | Grade table, percentage (R8.7), class | 2026-10-24 | unverified |
| Curriculum | https://webstor.srmist.edu.in/web_assets/downloads/2023/academic-curricula-2021.pdf | Per-branch credits | — | pending |
| First-year syllabi | https://webstor.srmist.edu.in/web_assets/downloads/2023/first-year-syllabus-all-programmes-2021.pdf | First-year courses | — | pending |

## Verified facts (implemented exactly)

### SRM 2021 / 2018 (per master task specification)
- **Grade table**: O=10 (91–100), A+=9 (81–90), A=8 (71–80), B+=7 (61–70), B=6 (56–60), C=5 (50–55), P=4, F=0, Ab=0, I=0
- **Pass requires GP >= 4 (P grade)**
- **SGPA & CGPA**: Credit-weighted average. Courses with F grade count as 0 grade points, credits remain in denominator until cleared
- **Percentage**: `CGPA × 10`
- **Classification**: FCD ≥ 8.50 (no history of arrears/first attempt); FC ≥ 6.50; Pass ≥ 5.00
- **Excluded from SGPA/CGPA**: Non-credit audit courses, value-added courses marked non-graded (PP/NP)
- **Credits**: Lecture = 1, Tutorial = 1, Practical = 0.5

## Config files created
- `/src/data/universities/srm/2021.json` (status: draft; grade table, percentage ×10, class thresholds FCD≥8.50/FC≥6.50/Pass≥5.00 captured)
- `/src/data/universities/srm/2018.json` (status: draft; same rules, unverified pending primary PDF)

## What remains unverified / TODO
- **Primary PDF not fully read**: Grade table and rules taken from master task specification, not directly confirmed from SRMIST regulation PDFs
- **2018 percentage rule**: Not found — marked unverified
- **Subject/credit data for CSE/ECE/EEE/ME/Civil/Biotech**: Not extracted — manual mode only
