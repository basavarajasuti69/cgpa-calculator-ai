# DATA_REPORT_VIT.md

## Sources fetched/read
| Source | URL | Clauses checked | Retrieved |
| --- | --- | --- | --- |
| VIT CGPA Conversion Circular | https://vit.ac.in/files/CGPA-Conversion.pdf | VIT/Dean(Acd)/2008/Gen/16 | 2026-10-24 |
| VIT FFCS Academic Regulations v3.2 | https://vit.ac.in/wp-content/uploads/2023/09/Academic-Regulations.pdf | 9.5, 9.9, Annexure VI, Annexure VII | 2026-10-24 |
| VIT FFCS Academic Regulations v4.0 | https://vit.ac.in/sites/default/files/academic/Academic-Regulations.pdf | Table 4, Table 5 | 2026-10-24 |

## Verified facts

### VIT FFCS (Flexible Full Credit System)
- **Grade table (Annexure VI / Table 4)**: S=10, A=9, B=8, C=7, D=6, E=5, F=0, N=0. Performance grades: S, A, B, C, D, E.
- **Relative grading (Section 9.5)**: All theory components where class strength > 10 follow class-wise relative grading. No absolute marks-to-grade mapping for theory — users must select their letter grade directly.
- **SGPA/CGPA (Section 9.9)**: `CGPA = Σ(Ci × GPi) / ΣCi` over ALL courses registered since first semester including those with 'F' grade. Credits appear only once if a course is failed more than once or substituted. Pass-Fail ('P' grade), audit courses, Minor/Honours courses NOT counted for GPA/CGPA.
- **Rounding**: GPA/CGPA indicated rounding-up to two decimal places.
- **Percentage (Official Circular VIT/Dean(Acd)/2008/Gen/16)**: `Percentage equivalent of CGPA = CGPA * 10`. Example: CGPA 8.75 → 87.5%.
- **Division thresholds** (indicative — VIT degree certificate only mentions CGPA): FCD ≥ 7.50, FC ≥ 6.00, Pass Class ≥ 4.50.
- **F and N grades**: Remain in denominator until cleared. N carries zero grade point (N1-N4 sub-categories for component failure, debarment, absence, indiscipline).
- **Lateral entry**: Not specified in sources — unverified.
- **Total credits**: Not specified in sources — unverified.

## Config file created
- `/src/data/universities/vit/ffcs.json` — status draft (rules verified, subject/credit data pending)
- `/src/data/universities/vit/index.ts` — loads FFCS scheme, registered as verified for routing

## Differences from other universities
| Aspect | VIT FFCS | VTU 2025 | Anna R2021 | KTU 2024 |
| --- | --- | --- | --- | --- |
| Top grade | S=10 | O=10 | O=10 | S=10 |
| Fail grades | F=0, N=0 | F=0, Absent=0 | U/RA=0 | F/FE/Ab=0 |
| Failed credits in denominator | Yes (stay) | Yes (SGPA) / No (CGPA) | No (excluded) | Yes (stay) |
| Percentage formula | CGPA × 10 | CGPA × 10 | CGPA × 10 | CGPA × 10 |
| Theory grading | Relative (no marks converter) | Absolute | Relative (>30 students: absolute) | Absolute |
| FCD threshold | CGPA ≥ 7.50 | M ≥ 70% | CGPA ≥ 8.50 | CGPA ≥ 8.00 |
| Non-computable | P grade, audit, Minor, Honours | Audit, non-credit | Mandatory, value-added | Minor, Honours, Challenge |

## What remains unverified / TODO
- **Subject/credit data for all branches**: Not extracted from official VIT curriculum/FFCS syllabus PDFs. Parser needed for CSE, ECE, Mechanical curricula. Calculator works with manual credit entry.
- **Lateral entry rules**: Not found in sources — unverified.
- **Total credit requirements**: Not found in sources — unverified.
