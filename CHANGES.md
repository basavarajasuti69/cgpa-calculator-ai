# Changes - Theme Redesign (Parts 1-5)

## Part 1: Theme system
- Semantic design tokens in `src/styles/global.css` with `@theme` for light and `[data-theme="dark"]` overrides
- Inline theme script in `src/layouts/Layout.astro` applied before first paint (no flash)
- `color-scheme` meta tags updated for light/dark

## Part 2: Fonts
- Single Inter/Roboto Mono stack via `@font-face` in global.css
- Preload fonts, consolidated typography tokens
- Removed dark-specific font overrides

## Part 3: Logo & favicon
- Master SVG logo at `public/logo.svg`
- All derived assets generated (favicon.ico, PNG sizes 16/32/48/96, apple-touch-icon, maskable/icon variants)
- `public/site.webmanifest` updated with theme colors

## Part 4: Header/footer layout
- Opaque sticky header in `src/components/Nav.astro` with single theme toggle
- Footer redesigned with semantic tokens
- `src/pages/my-results.astro` with empty state and CTA

## Part 4b: Universities section
- Updated `src/pages/universities.astro` with proper header spacing (scroll offset)
- Equal card heights, data-driven copy
- Consistent styling with theme tokens

## Part 5: Visual regression & checks
- Playwright tests for screenshots across viewports (360, 768, 1280) in light and dark modes
- Contrast checks for critical UI elements
- This changelog documenting all changes
