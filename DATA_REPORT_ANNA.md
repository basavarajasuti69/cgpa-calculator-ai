# DATA_REPORT_ANNA.md

## Sources fetched/read
| Regulation | Primary source | Clauses checked | Retrieved |
| --- | --- | --- | --- |
| R2021 (amended) | https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf | 15, 15.1, 15.1.2, 15.5, 15.5.3, 16.2, 4.12 | 2026-10-24 |
| R2021 (original) | https://cac.annauniv.edu/aidetails/reg/UG%20R%202021.pdf | comparison with amended version | 2026-10-24 |
| R2017 | https://cac.annauniv.edu/aidetails/reg/2017/00.%20UG%20(Aff)%20Reg%20(2017)%20-%205.9.18.pdf | 15.1, 16.2, 4.4 | 2026-10-24 |
| R2013 | https://cac.annauniv.edu/aidetails/reg/UG%20R-2013%20-Aff.pdf | 14.1.1, 16 | 2026-10-24 |

## Verified facts

### R2021 (Anna University)
- **Grade points (clause 15.1)**: O=10, A+=9, A=8, B+=7, B=6, C=5, U(RA)=0, SA=0, WD/W=0. Pass grades: O, A+, A, B+, B, C.
- **GPA/CGPA (clause 15.5)**: `GPA/CGPA = Σ(Ci×GPi)/ΣCi` over **courses successfully cleared only**. U grades excluded from both numerator and denominator. Course cleared later counted once at clearing semester.
- **Percentage (clause 15.5.3)**: `Percentage of Marks = CGPA × 10`.
- **Class (clause 16.2)**:
  - FCD: CGPA ≥ 8.50, all courses passed in first appearance within 5 years (4 lateral; 6 Sandwich), never prevented for attendance
  - FC: CGPA ≥ 6.50, all courses passed within duration
  - SC: all other qualifying students
- **Absolute grading (clause 15.1.2)**: Only for labs, project work, internship, and courses with ≤30 passed students: O 91-100, A+ 81-90, A 71-80, B+ 61-70, B 56-60, C 50-55, U <50. Theory uses RELATIVE grading (BOX-COX normalization) — no marks-to-grade converter for theory.
- **Excluded from CGPA**: mandatory courses, value-added courses, Hons/Minor additional courses (unless completed), internship credits beyond curriculum (clauses 15.3, 15.4, 15.5).
- **Skill-based course drop (clause 4.12)**: 2 skill courses → drop 1 PE/OE (3 cr), GP = (2×higher + 1×lower)/3. 3 skill courses → drop 2 PE/OE (3 cr each), GP = average of three skill courses.
- **Credits (clause 4.4)**: 1 lecture period = 1 credit, 1 tutorial period = 1 credit, 2 lab periods = 1 credit. Total from curriculum.
- **Duration (clause 5.1)**: 8 semesters regular (max 14), 6 semesters lateral (max 12).

### R2017 (Anna University)
- **Grade table (clause 15.1)**: O=10 (91-100), A+=9 (81-90), A=8 (71-80), B+=7 (61-70), B=6 (50-60), RA=0 (<50), SA=0, W=0. Pass grades: O, A+, A, B+, B.
- **GPA/CGPA (clause 15)**: RA grades excluded for calculating GPA and CGPA. Formula: Σ(Ci×GPi)/ΣCi over cleared courses.
- **Percentage**: **NOT FOUND** in R2017 regulation — stored as unverified, UI must show "check with Anna University".
- **Class (clause 16.2)**:
  - FCD: CGPA ≥ 8.50, first appearance within 5 years (4 lateral), never prevented for attendance
  - FC: CGPA ≥ 7.00, within 6 years (5 lateral)
  - SC: all other qualifying students
- **Credits (clause 4.4)**: 1 lecture period = 1 credit, 2 tutorial periods = 1 credit, 2 lab periods = 1 credit.
- **Duration**: 8 semesters regular (max 14), 6 semesters lateral (max 12).

### R2013 (Anna University)
- **Grade table (clause 14.1.1)**: S=10 (91-100), A=9 (81-90), B=8 (71-80), C=7 (61-70), D=6 (57-60), E=5 (50-56), U=0 (<50), W=0. Pass grades: S, A, B, C, D, E.
- **GPA/CGPA (clause 14.1.1)**: U and W grades excluded for calculating GPA and CGPA. Formula: Σ(Ci×GPi)/ΣCi over cleared courses.
- **Percentage**: **NOT FOUND** in R2013 regulation — stored as unverified, UI must show "check with Anna University".
- **Class (clause 16)**:
  - FCD: CGPA ≥ 8.50, first appearance within 4 years (3 lateral)
  - FC: CGPA ≥ 6.50, within 5 years (4 lateral)
  - SC: all other qualifying students
- **Credits (clause 4.2)**: 1 credit per lecture period per week, 1 per tutorial period per week, 1 for 2 lab periods per week (2 credits for 3-4 periods).
- **Duration**: 8 semesters regular (max 14), 6 semesters lateral (max 12).

## Config files created
- `/src/data/universities/anna/r2021.json` — status draft (rules verified, subject data pending)
- `/src/data/universities/anna/r2017.json` — status draft (rules verified, subject data pending)
- `/src/data/universities/anna/r2013.json` — status draft (rules verified, subject data pending)
- `/src/data/universities/anna/index.ts` — loads regulations as schemes, registers as verified for routing

## Differences between R2021, R2017 and R2013

| Aspect | R2021 | R2017 | R2013 |
| --- | --- | --- | --- |
| Top grade | O (10) | O (10) | S (10) |
| Second grade | A+ (9) | A+ (9) | A (9) |
| Third grade | A (8) | A (8) | B (8) |
| Fourth grade | B+ (7) | B+ (7) | C (7) |
| Fifth grade | B (6) | B (6) | D (6) |
| Sixth grade | C (5) | — | E (5) |
| Fail grade | U/RA (0) | RA (0) | U/RA (0) |
| Attendance grade | SA (0) | SA (0) | SA (0) |
| Withdrawal | WD/W (0) | W (0) | W (0) |
| Theory grading | Relative (no marks converter) | Absolute | Absolute |
| Labs/project grading | Absolute | Absolute | Absolute |
| Percentage formula | CGPA × 10 (verified) | unverified | unverified |
| FCD cutoff | CGPA ≥ 8.50 | CGPA ≥ 8.50 | CGPA ≥ 8.50 |
| FC cutoff | CGPA ≥ 6.50 | CGPA ≥ 7.00 | CGPA ≥ 6.50 |
| Skill-based drop | Yes (clause 4.12) | No | No |
| Hons/Minor | Yes (clause 4.10) | No | No |

## What remains unverified / TODO
- **Subject/credit data for all branches**: Not extracted from official curriculum PDFs. Parser needed for R2021 CSE, AI&DS, IT, ECE, EEE, Mechanical, Civil curricula. Calculator works with manual credit entry in the meantime.
- **R2013/R2017 percentage conversion formula**: Not found in the regulations. Marked unverified.
- **R2021 original vs amended differences**: Original R2021 PDF downloaded but not fully diffed against amended version.
