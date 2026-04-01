# ENGL 1181 — WCAG AA Accessibility Audit

**Date:** April 2026
**Standard:** WCAG 2.1 AA

## Summary

This site is in strong accessibility shape. The shared nav.js framework dynamically injects skip links, main landmarks, ARIA labels, and a dark mode toggle on all pages. All color combinations pass AA contrast ratios in both light and dark modes (many exceed AAA). Inline links are underlined for distinguishability. Reduced motion preferences are respected.

One heading hierarchy issue was found and fixed on the conferences page.

## Audit Results

| Category | Status | Notes |
|----------|--------|-------|
| Color contrast (light mode) | PASS | All combinations 6.5:1 or higher |
| Color contrast (dark mode) | PASS | All combinations 8.2:1 or higher |
| Language attribute (`lang`) | PASS | All pages including 404/not_found |
| Skip links | PASS | Injected dynamically by nav.js |
| Main landmark | PASS | Injected dynamically by nav.js |
| Heading hierarchy | FIXED | Conferences page had h3 before h2 (callout boxes). Changed to h2 with inline sizing. |
| Image alt text | PASS | No images missing alt attributes |
| Link distinguishability | PASS | Inline links in `p` and `li` have underlines via CSS |
| Focus indicators | PASS | `:focus-visible` with 2px solid outline on all interactive elements |
| Keyboard navigation | PASS | All interactive elements reachable via keyboard |
| Reduced motion | PASS | `@media (prefers-reduced-motion: reduce)` present in style.css |
| ARIA labels | PASS | Navigation regions, buttons, toggles have appropriate labels (via nav.js) |
| Empty links | PASS | None found |
| Form labels | PASS | No unlabeled form elements |
| Iframe titles | PASS | Calendar iframes have titles |
| Tabindex | PASS | No positive tabindex values |
| Duplicate IDs | PASS | None found |

## Changes Made

- Changed `<h3>` to `<h2>` (with inline font-size) in conference page callout boxes to fix heading hierarchy (h1 → h2, not h1 → h3)
- Same fix applied to ENGL 1190 conferences page for consistency

## Also Completed This Session

- Full external link audit (`external-links-check.md`) with broken link replacements across 14 files
