# DATA_REPORT_KTU.md

## Sources fetched/read
| Scheme | Primary source(s) | Clauses checked | Retrieved | Status |
|---|---|---|---|---|
| 2019 | https://ktu.edu.in/academics/scheme (official scheme page) | Grade table, SGPA/CGPA, percentage, backlog | 2026-10-24 | draft |
| 2024 | https://ktu.edu.in/academics/scheme (official scheme page) | Grade table, credit relaxation, Level 5 elective | 2026-10-24 | draft |
| 2015 | Official 2015 regulation PDF not located on ktu.edu.in | — | — | unverified |
| Cross-check | https://mbits.ac.in/wp-content/uploads/2024/10/KTU-Regulations.pdf | Grade table comparison | 2026-10-24 | cross-check only |
| Circular | U.O.No. 3078/2023 (June 2023) — referenced but not fully confirmed | CGPA × 10 amendment applicability | 2026-10-24 | unverified |

## Verified facts (implemented exactly)

### KTU 2024 Scheme
- **Grade table**: S=10 (≥90%), A+=9.0 (85–<90), A=8.5 (80–<85), B+=8.0 (75–<80), B=7.5 (70–<75), C+=7.0 (65–<70), C=6.5 (60–<65), D=6.0 (55–<60), P=5.5 (50–<55), F=0, FE=0, Ab=0
- **Credits earned only with P or better**
- **SGPA**: `sum(Ci × GPi) / sum(Ci)` over ALL courses of semester including F/FE/Ab with 0 points. Credits of failed courses STAY in denominator
- **CGPA**: `sum(Ci × GPi) / sum(Ci)` over all courses of curriculum up to that semester. Failed courses accounted (0 points)
- **Lateral entry**: First and second semester credits NOT counted
- **Percentage**: `CGPA × 10`
- **2024 credit relaxation**: Students with ≥160 credits (157 academic + 3 activity) may graduate; unacquired credits get GP 0 in SGPA/CGPA
- **Level 5 elective**: 3 credits + 2 bonus credits only if CIE ≥ 80% OR viva ≥ 70% AND combined grade ≥ B
- **Excluded from SGPA/CGPA**: Minor, Honours, Challenge-exam credits; mandatory student activity credits (3 in 2024)
- **Total credits**: 167 academic + 3 activity = 170 total
- **Class (indicative)**: FCD ≥ 8.0; FC ≥ 6.5 and < 8.0

### KTU 2019 Scheme
- **Grade table**: Same as 2024 (S=10, A+=9, A=8.5, B+=8, B=7.5, C+=7, C=6.5, D=6, P=5.5, F=0, FE=0, I=0)
- **SGPA/CGPA**: Failed courses stay in both denominators (F/FE/Ab/I = 0 points)
- **Lateral entry**: Semesters 1–2 not counted
- **Percentage**: Regulation text states `10 × CGPA − 2.5` (clause R6.16/R6.21). June 2023 circular (U.O.No. 3078/2023) may amend to `10 × CGPA` — UNVERIFIED whether it applies to 2019 batches
- **Excluded from SGPA/CGPA**: Minor, Honours, Challenge-exam credits; mandatory student activity credits (2 in 2019)
- **Total credits**: 160 academic + 2 activity = 162 total

### KTU 2015 Scheme
- **Status**: NOT verified — official 2015 regulation PDF not located
- **Grade table**: Unknown — third-party tables with "O" grade or A=8.5/B=7/C=6 are NOT in the official 2019/2024 regulations and must not be used
- **No calculator page generated** until confirmed

## Config files created
- `/src/data/universities/ktu/2024.json` (status: draft; grade table, percentage ×10, credit relaxation, Level 5 elective captured)
- `/src/data/universities/ktu/2019.json` (status: draft; grade table, percentage alternatives [CGPA×10−2.5 default, CGPA×10 alternative], lateral entry captured)
- `/src/data/universities/ktu/2015.json` (status: draft; empty grade table, no page generated)

## What remains unverified / TODO
- **June 2023 amendment applicability**: Whether U.O.No. 3078/2023 applies `10 × CGPA` to 2015/2019 batches — stored as alternative, default kept as regulation text
- **KTU 2015 entire regulation**: Not located — no page generated, manual mode only if created
- **Subject/credit data for CSE/ECE/EEE/ME/CE branches**: Not extracted from scheme PDFs — manual mode only
- **Semester credit totals validation**: Stated totals (2019: 17,21,22,22,23,24,15,16; 2024: 20,24,25,24,23,23,17,11) not yet validated against parsed curricula
