# DATA_REPORT_IPU.md

## Sources fetched/read
| Source | URL | Clauses checked | Retrieved | Status |
|---|---|---|---|---|
| IPU Ordinance 11 | http://www.ipu.ac.in/norms/Ordinance/ordinanc11020815.pdf | Percentage formula, class divisions | 2026-10-24 | unverified |
| IPU 2024 notification | Not yet located on ipu.ac.in | (CGPA−0.75)×10 applicability from 2024 | — | unverified |
| B.Tech scheme PDFs | USICT / affiliated colleges | Credit-weighted SGPA/CGPA | — | pending |

## Verified facts (implemented exactly)

### IPU Ordinance 11 (per master task specification)
- **Grade table**: O=10 (90–100), A+=9 (75–89), A=8 (65–74), B+=7 (55–64), B=6 (50–54), C=5 (45–49), P=4 (40–44), F=0 (0–39)
- **Formula**: Credit-weighted SGPA/CGPA
- **Percentage**: Primary = `(CGPA − 0.75) × 10`; Alternative = `CGPA × 10` (scheme variations)
- **Classification**: FCD ≥ 8.25; FC ≥ 6.75; SC ≥ 5.75; Pass ≥ 4.75
- **Pass mark**: Not less than 40%
- **Rounding**: To two decimals

## Config files created
- `/src/data/universities/ipu/ordinance11.json` (status: draft; grade table, percentage alternatives, class thresholds captured)

## What remains unverified / TODO
- **Ordinance 11 PDF not fully read**: Data taken from master task specification, not directly confirmed from primary PDF
- **2024 notification**: Not located — whether `(CGPA−0.75)×10` applies from 2024 is unverified
- **How F/reappear papers enter denominator**: Not confirmed
- **Subject/credit data**: Not extracted — manual mode only
