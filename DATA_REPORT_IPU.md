# DATA_REPORT_IPU.md

## Sources fetched/read

| Regulation | Primary source | Clauses checked | Retrieved |
| --- | --- | --- | --- |
| Ordinance 11 (2015-16 onwards) | https://www.ipu.ac.in/norms/Ordinance/ordinanc11020815.pdf | 4.4, 11.5, 13 | 2026-10-24 |

## Verified facts

### IPU Ordinance 11 (Semester System)
- **Applies to**: Semester-system programmes including B.Tech (USICT and affiliated colleges).
- **Grade table**: O=10 (90-100), A+=9 (75-89), A=8 (65-74), B+=7 (55-64), B=6 (50-54), C=5 (45-49), P=4 (40-44), F=0 (0-39), Absent=0.
- **Pass grades**: O, A+, A, B+, B, C, P.
- **Failed grades**: F, Absent.
- **GPA/CGPA**: Credit-weighted, `SGPA/CGPA = Σ(Ci×GPi)/ΣCi`.
- **Percentage**: `Percentage = CGPA × 10` (clause 13 / official ordinance).
- **Alternative percentage**: `(CGPA - 0.75) × 10` — **NOT found** in Ordinance 11. Stored as alternative with visible note; official ordinance states CGPA × 10 only.
- **Class / division (clause 13)**:
  - Third Division (TD): CGPA 4.00 - 4.99
  - Second Division (SD): CGPA 5.00 - 6.49
  - First Division (FD): CGPA ≥ 6.50
  - Exemplary Performance (EP): CGPA = 10.00, all courses passed in first attempt, no academic break.
- **Non-computable courses**: audit papers (excluded from CGPA).
- **Backlog policy**: Ordinance 11 does not explicitly state whether failed course credits remain in the SGPA/CGPA denominator. Marked unverified; failed grade letters F, Absent.
- **Lateral entry**: skip first N semesters — unverified.
- **Total credits**: regular and lateral — unverified.
- **CGPA start semester**: regular 1; lateral unverified.
- **Rounding**: two decimal digits.
- **Source URL**: https://www.ipu.ac.in/norms/Ordinance/ordinanc11020815.pdf

## Config files created
- `/src/data/universities/ipu/ordinance11.json` — regulation config (status draft, rules verified, subject data pending).
- `/src/data/universities/ipu/index.ts` — loads Ordinance 11 as a scheme, registers IPU as verified for routing, placeholder CSE branch with 8 empty semesters.

## What remains unverified / TODO
- **Subject/credit data for all branches**: Not extracted from official USICT/affiliated college syllabus PDFs. Calculator works with manual credit entry in the meantime.
- **Lateral entry skip-semesters, total credits (regular/lateral), backlog denominator rule**: Marked unverified in ordinance11.json.
