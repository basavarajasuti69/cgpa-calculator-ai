# DATA_REPORT_VIT.md

## Sources fetched/read
| Source | URL | Clauses checked | Retrieved | Status |
|---|---|---|---|---|
| VIT CGPA Conversion Circular | https://vit.ac.in/files/CGPA-Conversion.pdf | Percentage formula | 2026-10-24 | unverified |
| VIT Academic Regulations v5.0 | https://chennai.vit.ac.in/files/Academic-Regulations-5.0.pdf | Grade table, GPA/CGPA, excluded courses | 2026-10-24 | unverified |
| VIT Academic Regulations | https://vit.ac.in/sites/default/files/academic/Academic-Regulations.pdf | FFCS/CAL system | 2026-10-24 | unverified |

## Verified facts (implemented exactly)

### VIT FFCS (per master task specification)
- **Grade table**: S=10, A=9, B=8, C=7, D=6, E=5, F=0, N=0; W, U, P carry no points
- **Pass requires GP >= 4 (E grade)**
- **SGPA & CGPA**: Credit-weighted average. F and N grades remain in denominator until cleared. A course failed more than once or substituted counts once in numerator and denominator
- **Percentage**: `CGPA × 10` (Official Circular Ref: VIT/Dean(Acd)/2008/Gen/16)
- **Division**: FCD ≥ 7.50; FC ≥ 6.00; Pass ≥ 4.50
- **Theory is relatively graded** — NO direct marks-to-grade conversion for theory
- **Absolute bands for labs/projects/small classes**: S ≥ 90, A 80–89, B 70–79, C 60–69, D 55–59, E 50–54, F < 50
- **Excluded**: Pass-fail, audit, Minor/Honours/Second Major, bridge courses

## Config files created
- `/src/data/universities/vit/ffcs.json` (status: draft; grade table, percentage ×10, division thresholds, relative grading note captured)

## What remains unverified / TODO
- **Primary PDFs not fully read**: All data taken from master task specification, not directly confirmed from VIT regulation documents
- **v4.0 vs v3.2 comparison**: Not done — separate configs only if rules differ (not yet determined)
- **Subject/credit data for CSE/ECE/Mech**: Not extracted — manual mode only
