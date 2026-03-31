# 1181 Site Repo

See `work-with-claude-code/classes/ENGL-1181/CLAUDE.md` for full course context.

## Presentation / In-Class Display Mode

`inclass.css` + `inclass.js` (both in repo root) provide a reusable "Presentation Mode" toggle for any in-class activity or presentation page.

### What it does
- Adds a floating "Presentation Mode" button (bottom-right)
- When activated: hides site nav/footer/sidebar, scales content to fit viewport (no scrolling), and requests a Wake Lock to prevent the screen from sleeping
- Escape key exits presentation mode
- Button fades to low opacity in presentation mode so it doesn't distract

### How to use on a new page
1. Add `<link rel="stylesheet" href="/inclass.css" />` in the `<head>`
2. Add `<script src="/inclass.js"></script>` before `</body>` (after footer.js)
3. Wrap the content you want displayed in presentation mode in a `<div class="presentation-content">` inside `#page-content`

Content outside `.presentation-content` (like activity instruction boxes that are only for the web version) will still be visible in normal mode but won't be scaled/centered in presentation mode.
