# DEPLOY_NOTES.md

## Live
- Deployed to Cloudflare Workers: https://cgpa-calculator-ai.cgpa-calculator-ai.workers.dev
- Custom domain: https://cgpacalculatorai.com
- Build: astro build (server output with Cloudflare adapter)

## New pages (US)
- /us (hub)
- /us/gpa-calculator (generic 4.0)
- /us/indian-cgpa-to-4-0 (estimate only)
- /us/gpa-planner
- /us/[school]/gpa-calculator for: penn, stanford, mit, yale, brown

## Status
- standard-4: draft (generic)
- penn, stanford, mit: draft (unverified against live catalogs in this pass; marked draft)
- yale, brown: no official GPA (unofficial estimate)
- Indian universities unchanged

## Notes
- All US school pages marked draft/no official GPA are not presented as verified.
- GA4 added; privacy/consent updates pending per requirements.
- Internal links use relative paths.
