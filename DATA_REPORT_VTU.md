# DATA_REPORT_VTU.md

## Sources fetched/read
| Scheme | Primary source(s) | Clauses checked | Retrieved |
| --- | --- | --- | --- |
| 2025 | https://vtu.ac.in/wp-content/uploads/2026/05/B.E.B.Tech2025.pdf | 25OB22.0, 25OB25.0, 25OB26.0, 25OB27.0 | 2026-10-24 |
| 2022 | https://vtu.ac.in/wp-content/uploads/2023/04/BE-BTech-Regulations-2022-05.04.2023.pdf | 22OB 6.6, 22OB 6.7, 22OB 6.8, Annexure-I | 2026-10-24 |
| 2021 (draft) | https://vtu.ac.in/wp-content/uploads/2021/12/BE-BTech-Regulation-2021-draft.pdf | 21OB12.0, 21OB12.1, 21OB12.2, 21OB12.3 | 2026-10-24 |
| 2017/2018 | https://jyothyit.ac.in/wp-content/uploads/2023/06/VTU-BE-2017-Scheme-Regulations.pdf (college copy). Official 2018 on vtu.ac.in not fully located/read. | 17OB 6.0, 17OB 6.2, 17OB 7.1, 17OB 7.2 | 2026-10-24 |
| Schemes/Syllabi | https://vtu.ac.in/b-e-scheme-syllabus/, https://vtu.ac.in/pdf/UG2024/phycyc.pdf, https://vtu.ac.in/pdf/2025syll3to8/ (referenced), https://vtu.ac.in/pdf/2022syll/{COURSECODE}.pdf | scheme index | 2026-10-24 |

## Verified facts (implemented exactly)
### 2025 (VTU Regulations B.E./B.Tech. 2025)
- **Grade table (25OB22.0, Table 22.0.1)**: O=10 (90-100), A+=9 (80-89), A=8 (70-79), B+=7 (60-69), B=6 (55-59), C=5 (50-54), P=4 (40-49), F=0 (0-39). Pass requires GP >= 4.
- **Credits/CGPA start**: Total 160 (regular), 120 (lateral). CGPA shown from sem 2 (regular), sem 4 (lateral). Min CGPA for degree >= 4.0 (25OB13.0).
- **SGPA (25OB25.0)**: `SGPA = Σ(Ci×Gi)/ΣCi` of semester. F and Absent(AB) count as 0 points; **credits of F/Absent remain in SGPA denominator**.
- **CGPA (25OB25.0)**: `CGPA = Σ(Ci×Gi)/ΣCi` over considered semesters. **Credits of courses with F are excluded from CGPA denominator**; a course cleared later counted once in semester where cleared. Rounding to 2 decimals.
- **Official examples (25OB25.0)**:
  - Sem I: credit points 101 (20 credits, 14 excluding F), Sem II: 178 (26 credits, 25 excluding F) → CGPA = (101+178)/(14+25)=279/39=7.15, SGPA I=5.05, SGPA II=6.85
  - Full program: points 101,178,220,165,204,185,184,169 = 1406, 1406/160=8.79 (regular). Lateral: 1127/120=9.39
- **Percentage (25OB26.0)**: `Percentage = CGPA × 10` (e.g. 8.20 → 82.0%)
- **Class (25OB27.0)**: FCD ≥ 70%, FC 60-<70%, SC 50-<60%, Pass 40-<50%
- **Other grades (25OB23.0)**: AB, DX (attendance<75%), NS (CIE not satisfied), NP, PP (non-credit/audit pass), W - not part of 10-point scale; audit/non-credit/excluded per rules. UI should allow marking course as "not graded - exclude" for DX/NS/W/NP/PP.

### 2022 (VTU Regulations 2022)
- **Grade table (typical 10-point, Annexure-I)**: O=10 (90-100), A+=9 (80-89), A=8 (70-79), B+=7 (60-69), B=6 (55-59), C=5 (50-54), P=4 (40-49), F=0 (0-39). Other grades: AU, PP (pass non-credit), NP, DX (repeat), AB, IC, W as placeholders (0 credits) per regulation text.
- **SGPA/CGPA (22OB 6.6, Annexure-I)**: SGPA formula as weighted by course credits/grade points in semester. CGPA computed considering courses undergone; Annexure-I illustrative example shows F-credits excluded from CGPA denominator in two-semester calculation (same pattern as 2025). **Backlog policy for 2022 marked "draft" pending full confirmation from Annexure details in all cases** - config records `backlogPolicy` noting uncertainty.
- **Percentage/class (22OB 6.7/6.8)**: `Percentage = CGPA × 10`; FCD ≥70, FC 60-<70, SC 50-<60, Pass 40-≤50.
- **Examples (Annexure-I)**: Sem I SGPA 5.05 (101/20), Sem II SGPA 6.85 (178/26), CGPA (101+178)/(14+25)=7.15. Full program totals give ~8.76 in shown example (1402/160) and lateral 1127/120=9.39.

### 2021 (draft regulation read)
- **Grade table**: S=10 (90-100), A=9 (80-89), B=8 (70-79), C=7 (60-69), D=6 (45-59), E=4 (40-44), F=0 (0-39). GP>=4 required to pass (per definitions).
- **Credits**: 160 (regular), 120 (lateral entry).
- **SGPA/CGPA (21OB12.1)**: SGPA = sum(CourseCredits×GradePoints)/sum(CourseCredits) for all courses in semester. CGPA = sum(CourseCredits×GradePoints) for **all courses excluding those with F grades until that semester** / sum(CourseCredits) for **all courses excluding those with F grades until that semester** (F-credits excluded from CGPA denominator). Rounded to 2 decimals.
- **Percentage (21OB12.2)**: `Percentage = (CGPA - 0.75) × 10` (example 8.20 → 74.5%). Marked as formula from draft; stored.
- **Class (21OB12.3)**: FCD ≥70%, FC 60-<70%, SC 50-<60%, Pass Class 42.5-<50%.

### 2018 / 2017 (college copy)
- **Grade table (17OB 6.0/6.2)**: S=10 (90-100), A=9 (80-89), B=8 (70-79), C=7 (60-69), D=6 (45-59), E=4 (40-44), F=0 (0-39).
- **Reappear/backlog (17OB 6.2 illustration)**: **Reappeared course's credit points are ADDED to the original semester's SGPA** (example shown: original calculation gives SGPA effect leading to 162+21 over 25 credits = 7.32). This is different from 2025 policy.
- **Percentage (17OB 7.1)**: Formula line present but full expression not clearly extracted in the text snippet; **stored as unverified `"(CGPA-0.75)*10"` and UI must show "check with VTU"** per requirement.
- **Class (17OB 7.2)**: FCD ≥70%, FC ≥60% <70%, SC <60%.
- **Credits**: Unverified in extracted text; stored as `unverified`.

## Config files created
- `/data/universities/vtu/2025.json` (status: draft; all rules from 2025 regulation captured)
- `/data/universities/vtu/2022.json` (status: draft; rules captured with backlogPolicy noted where confirmation needed)
- `/data/universities/vtu/2021.json` (status: draft; grade table, CGPA F-exclusion, (CGPA-0.75)*10 percentage from draft)
- `/data/universities/vtu/2018.json` (status: draft; 2017-based grade table, reappear rule captured, percentage formula marked unverified with note)

## What remains unverified / TODO
- **2018 official percentage formula and credit totals**: not found on vtu.ac.in in fetched documents; set to unverified, UI must show "check with VTU".
- **2022 full backlog/reappear handling details**: regulation states semester-SGPA weighted CGPA; Annexure-I example matches 2025-style F-exclusion pattern but needs full confirmation across all cases - recorded in backlogPolicy as draft/uncertain.
- **2021 is draft regulation copy** - treat as draft until final 2021 version confirmed on vtu.ac.in.
- **Subject lists/credits for all branches/schemes**: not fully extracted from scheme PDFs in this pass. A parser script is needed to extract per-row data from PDFs (phycyc.pdf, 2025syll3to8 PDFs, 2022syll per course) and validate sums; where unparseable, mark "unverified" and allow manual credit entry.
