# DATA_REPORT_SAVEETHA.md

## Sources fetched/read
| Source | URL | Clauses checked | Retrieved | Status |
|---|---|---|---|---|
| SEC UG Regulations 2024 | https://saveetha.ac.in/wp-content/uploads/2025/04/UG-Regulations-2024.pdf | Grade table, GPA/CGPA clause, percentage | 2026-10-24 | unverified |
| SEC UG Regulations 2019 | https://saveetha.ac.in/wp-content/uploads/2024/11/UG_REGULATIONS_2019_-_25.01.2021_-AU.pdf | Grade table, rules | 2026-10-24 | unverified |
| SEC Grading Methodology | https://saveetha.ac.in/wp-content/uploads/2025/04/Grading-Methodology.pdf | Grading methodology | 2026-10-24 | unverified |
| SIMATS regulation | saveetha.com | Not located | — | unverified |

## Saveetha Engineering College (SEC) — autonomous, affiliated to Anna University

### Verified facts (per master task specification)
- **Grade scale**: O=10 (91–100), A+=9 (81–90), A=8 (71–80), B+=7 (61–70), B=6 (56–60), C=5 (50–55), RA=0 (<50)
- **Percentage Formula**: `CGPA × 10`
- **Formula**: Standard credit-weighted SGPA and CGPA
- **Relative grading for theory** from 2021–22
- **Some value-added/open-elective credits included in CGPA** (2024)
- **Mandatory and non-CGPA courses excluded**
- **Extra EEC publication credit excluded** (2024)

### SIMATS (deemed university)
- **No official regulation found** on saveetha.com
- **Status**: draft, manual mode only
- **Banner**: "Draft — verify with your official regulation"

## Config files created
- `/src/data/universities/saveetha/simats.json` (status: draft; grade table O/A+/A/B+/B/C/P/F, percentage ×10 captured)

## What remains unverified / TODO
- **SEC primary PDFs not fully read**: All data taken from master task specification, not directly confirmed from saveetha.ac.in PDFs
- **SEC GPA/CGPA clause (15.3.x)**: Not confirmed
- **SEC percentage clause 15.3.10**: Not confirmed
- **SEC class thresholds**: Not confirmed
- **SIMATS official B.Tech regulation**: Not located on saveetha.com — if none exists, state so explicitly
- **Do NOT copy SEC or third-party rules to SIMATS**
