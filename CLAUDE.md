# 1181 Site Repo

See `work-with-claude-code/classes/ENGL-1181/CLAUDE.md` for full course context.

## Log every change to this repo

Changes here get written up at:

`~/MEGA/work-with-claude-code/classes/ENGL-1181/changelog/index.html`

Newest entry first. Add an entry **in the same session as the change**, not later — the reasoning is what the log is for, and it evaporates fast.

An entry covers what changed, what outside event prompted it, a table of the specifics, anything students were seeing wrong, what was checked and found clean, anything flagged but not fixed, and whether it's been pushed. Full spec in `classes/CLAUDE.md` under "Class Website Change Logs."

**Textbook links:** readings live in the departmental OER at <https://macomb.pressbooks.pub/engl1181/>. Chapter numbers have moved between editions and will move again. Current verified links are in `classes/ENGL-1181/1181-oer-chapter-links.md` — check there before adding or editing a reading link. Anything still pointing at `sites.google.com/view/1181a/` is dead.

## In-Class Activity Pages

In-class activities can have up to three types of pages:

### 1. Instructions page (in the site nav)
- A normal site page using `style.css`, `nav.js`, and `footer.js`
- Lives in `/resources/in-class/` and is listed in the nav under In-Class Activities
- Contains the full, scrollable activity instructions
- If the activity has standalone companion pages (projector view, handouts, examples), link them at the **top** of the page as pill-shaped links (`.activity-pill`) that work in both light and dark mode
  - **Student-facing links first** (examples, handouts) — use `.pill-primary` (filled accent color, stands out)
  - **Instructor-only links second** (projector view) — use `.pill-outline` (outlined, less prominent since only the instructor uses it)
  - See `genre-remix.html` for the pattern using site CSS variables

### 2. Projector page (standalone)
- A standalone page — does **not** use `style.css`, `nav.js`, or `footer.js`
- Self-contained styling: dark-on-light, high contrast, large text for crappy projectors
- Content is simplified from the instructions page — just the key info at a glance
- Uses a two-column CSS grid layout to fit everything on one screen without scrolling
- Includes `inclass.css` and `inclass.js` for the Wake Lock (keeps the screen from sleeping)
- Should include a footer note directing students to the class website for full instructions
- See `genre-remix-projector.html` for the pattern

### 3. Handout/example pages (standalone)
- Standalone pages — no `style.css`, `nav.js`, or `footer.js`
- Self-contained styling appropriate to the content (e.g., the recipe sample is styled to look like a real recipe page)
- These are genre samples, handouts, or reference materials students open directly via link
- Do **not** need `inclass.css`/`inclass.js` (no presentation mode needed)
- See `recipe-remix-activity.html` for an example

### Summary
- The instructions page is the hub — it lives in the site nav and links out to companion pages
- Projector and handout/example pages are standalone so they don't fight with the site layout
- Only projector pages get `inclass.css`/`inclass.js` (wake lock + presentation toggle)

## `inclass.css` + `inclass.js`

Located in repo root. Used **only** on projector pages.

### What it does
- Adds a floating "Presentation Mode" button that toggles `body.presentation-mode` class
- Requests a Wake Lock to prevent the screen from sleeping while projecting
- Escape key exits presentation mode
- Button fades to low opacity so it doesn't distract

### How to use on a new projector page
1. Do **not** include `style.css`, `nav.js`, or `footer.js`
2. Add `<link rel="stylesheet" href="/inclass.css" />` in the `<head>`
3. Add `<script src="/inclass.js"></script>` before `</body>`
4. Wrap content in a `<div class="presentation-content">`
5. The page's own `<style>` block handles all layout — `inclass.css` only provides the toggle button and presentation-mode base styles
