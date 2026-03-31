# 1181 Site Repo

See `work-with-claude-code/classes/ENGL-1181/CLAUDE.md` for full course context.

## In-Class / Presentation Mode (`inclass.css` + `inclass.js`)

Reusable CSS and JS (both in repo root) for standalone in-class activity and presentation pages.

### What it does
- Adds a floating "Presentation Mode" button (bottom-right)
- When activated: scales `.presentation-content` to fit the viewport (no scrolling), and requests a Wake Lock to prevent the screen from sleeping
- Escape key exits presentation mode
- Button fades to low opacity in presentation mode so it doesn't distract

### Standalone pages
These pages do **not** use `nav.js`, `footer.js`, or `style.css`. They are self-contained with their own styling and are linked from a page within the site nav (e.g., `genre-remix-links.html`).

This avoids layout conflicts with the sidebar/topnav that nav.js injects.

### How to use on a new standalone page
1. Do **not** include `style.css`, `nav.js`, or `footer.js`
2. Add `<link rel="stylesheet" href="/inclass.css" />` in the `<head>`
3. Add `<script src="/inclass.js"></script>` before `</body>`
4. Wrap the displayable content in a `<div class="presentation-content">`
5. Create a linking page (with nav.js/style.css) in the in-class directory that links to the standalone page, and add that linking page to the nav
