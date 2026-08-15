// nav.js — Top nav (desktop), Bottom nav (mobile), and full-screen mobile sidenav
// Drop-in: <script src="/nav.js"></script> just before </body>

(() => {
  if (window.__NAV_INITED__) return;
  window.__NAV_INITED__ = true;

  // -------------------- Theme Management (runs immediately) --------------------
  const THEME_KEY = 'theme-preference';
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const getStoredTheme = () => localStorage.getItem(THEME_KEY);
  const getSystemTheme = () => darkModeQuery.matches ? 'dark' : 'light';

  // Apply saved theme immediately to prevent flash
  const savedTheme = getStoredTheme();
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    document.documentElement.setAttribute('data-theme', getSystemTheme());
  }

  // Listen for system theme changes (only if user hasn't set a preference)
  darkModeQuery.addEventListener('change', () => {
    if (!getStoredTheme()) {
      document.documentElement.setAttribute('data-theme', getSystemTheme());
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    try {
      // -------------------- Data --------------------
      const TOP_NAV = [
        { label: "Home",           href: "/index.html" },
        { label: "Calendar",       href: "/calendar/index.html" },
        { label: "Assignments",    href: "/assignments/index.html" },
        { label: "Class Policies", href: "/policies/index.html" },
        { label: "Resources",      href: "/resources/index.html" }
      ];

      const SIDENAV = [
        {
          label: "Assignments",
          href: "/assignments/index.html",
          children: [
            { label: "Introduction Assignment", href: "/assignments/introduction.html" },
            { label: "Tech-free Writing", href: "/assignments/techfreewriting.html" },
            {
              label: "Weekly Writing",
              href: "/assignments/weeklywriting.html",
              children: Array.from({ length: 8 }, (_, i) => ({
                label: `Weekly Writing ${i + 1}`,
                href: `/assignments/ww${i + 1}.html`
              }))
            },
            { label: "Macomb Scavenger Hunt", href: "/assignments/msh.html" },
            {
              label: "Project 1: Genre Analysis",
              href: "/assignments/project1.html",
              children: [
                { label: "Genre Analysis Essay",       href: "/assignments/genre-analysis.html" },
                { label: "Rough Draft",                href: "/assignments/rough-draft.html" },
                { label: "Peer Review",                href: "/assignments/peer-review.html" },
                { label: "Revised Draft",              href: "/assignments/revised-draft.html" },
                { label: "Reflection & Checklist",      href: "/assignments/reflection.html" },
                { label: "Individual Conferences",     href: "/assignments/conferences.html" },
                { label: "Example Organization",       href: "/assignments/p1-example-organization.html" },
                { label: "Example Essays",             href: "/assignments/example-p1.html" },
                { label: "MLA Style & Citations",      href: "/assignments/mla-style.html" }
              ]
            },
            { 
              label: "Project 2: Genre Remix", 
              href: "/assignments/p2.html", 
              children: [
                { label: "Project 2 Overview",    href: "/assignments/p2.html"},
                { label: "Genre Remix",           href: "/assignments/p2-remix.html"},
                { label: "Poster Presentation",   href: "/assignments/p2-poster.html"},
                { label: "Checklist",             href: "/assignments/p2-checklist.html"},
                { label: "Design Resources",      href: "/assignments/p2-design-resources.html"},
                { label: "Example Projects",      href: "/assignments/example-p2.html"}
              ]
            },
            { label: "Final Portfolio",
              href: "/assignments/final-portfolio.html",
              children: [
                { label: "Final Portfolio Overview",       href: "/assignments/final-portfolio.html"},
                { label: "Genre Analysis Essay (Final)",   href: "/assignments/fp-genre-analysis.html"},
                { label: "Final Reflection",               href: "/assignments/fp-reflection.html"},
                { label: "Final Portfolio Grading",        href: "/assignments/fp-grading.html"},
                { label: "Submitting Your Portfolio",      href: "/assignments/fp-submitting.html"}
              ]
            },
            { label: "Extra Credit", href: "/assignments/extra-credit.html" }
          ]
        },
        {
          label: "Resources",
          href: "/resources/index.html",
          children: [
            { label: "Technology & Tech Support", href: "/resources/technology.html" },
            { label: "Example Assignments",       href: "/resources/example-assignments.html" },
            { 
              label: "Generative AI",       
              href: "/resources/gen-ai-considerations.html",

              children: [
                {label: "GenAI Considerations",     href: "/resources/gen-ai-considerations.html"},
                {label: "GenAI Brainstorming",      href: "/resources/gen-ai-brainstorming.html"},
                {label: "GenAI Revision",           href: "/resources/gen-ai-revision.html"},
                {label: "GenAI Tools",              href: "/resources/gen-ai-tools.html"},
                {label: "GenAI Transparency",       href: "/resources/gen-ai-transparency.html"}
              ]
              },
              { 
              label: "Revising Your Writing",       
              href: "/resources/revising/index.html",
              children: [
                {label: "Revision Overview",    href: "/resources/revising/index.html"},
                {label: "Revision & Rhetoric",  href: "/resources/revising/revising-rhetorical.html"},
                {label: "Revision & Feedback",  href: "/resources/revising/revising-and-feedback.html"},
                {label: "Clarity & Flow",       href: "/resources/revising/clarity-and-flow.html"},
                {label: "Paragraphs & Transitions",  href: "/resources/revising/paragraphs-and-transitions.html"},
                {label: "Reverse Outline",      href: "/resources/revising/reverse-outline.html"},
                {label: "Paper Skeleton",       href: "/resources/revising/paper-skeleton.html"},
                {label: "Proofreading & LOCs",       href: "/resources/revising/proofreading.html"},
                {label: "Sentence Structure",    href: "/resources/revising/sentence-structure.html"},
                {label: "Sentence Fragments",    href: "/resources/revising/fragments.html"},
                {label: "Paragraph Revision",    href: "/resources/revising/paragraph-revision.html"}
              ]
              },
            { 
              label: "In-Class Activities",       
              href: "/resources/in-class/index.html",
              children: [
                {label: "In-Class Activities",  href: "/resources/in-class/index.html"},
                {label: "Team Names",           href: "/resources/in-class/team-names.html"},
                {label: "GenAI Tools",          href: "/resources/in-class/gen-ai-tools.html"},
                {label: "AI Ethics Debate",     href: "/resources/in-class/ai-ethics-debate.html"},
                {label: "AI Human vs. AI",      href: "/resources/in-class/ai-human-vs-ai.html"},
                {label: "Different Audiences",  href: "/resources/in-class/different-audiences.html"},
                {label: "The Smartest Move",    href: "/resources/in-class/the-smartest-move.html"},
                {label: "Example News",         href: "/resources/in-class/example-news.html"},
                {label: "Children's Books",     href: "/resources/in-class/childrens-books.html"},
                {label: "Newsletters",          href: "/resources/in-class/newsletters.html"},
                {label: "Genre Scavenger Hunt", href: "/resources/in-class/genre-scavenger-hunt.html"},
                {label: "Magazine Ads",         href: "/resources/in-class/analyzing-ads.html"},
                {label: "Genre Remix",          href: "/resources/in-class/genre-remix.html"}
              ]
              },
              {label: "Additional Readings & Videos",  href: "/resources/additional-readings-and-videos.html"},
              {label: "Letters of Recommendation",  href: "/resources/letters-of-recommendation.html"}
          ]
        },
        {
          label: "Calendars",
          href: "/calendar/index.html",
          children: [
            { label: "M/W Class",              href: "/calendar/mw-calendar.html" },
            { label: "Thursday Class (Hybrid)", href: "/calendar/hybrid-calendar.html" }
          ]
        },
        {
          label: "Class Information & Policies",
          href: "/policies/index.html",
          children: [
            { label: "Class Information",
              href: "/policies/class-overview.html",
              children: [
              { label: "Class Overview",            href: "/policies/class-overview.html" },
              { label: "Office Hours",              href: "/policies/office-hours.html" },
              { label: "Virtual Office Hours",      href: "/policies/virtual-office-hours.html" },
              { label: "Frequently Asked Quetions", href: "/policies/faqs.html" }
              ]
            },
            { label: "Class Policies",
              children: [
              { label: "Attendance",                href: "/policies/attendance.html" },
              { label: "Late Work Policy",          href: "/policies/late-work.html" },
              { label: "Academic Integrity Policy", href: "/policies/academic-integrity.html" },
              { label: "GenAI Policy",              href: "/policies/gen-ai-policy.html" },
              { label: "Grading",                   href: "/policies/grading.html" },
              { label: "Instructor GenAI Use",     href: "/policies/instructor-genai.html" }
                ]
            },
          ]
        }
      ];

      // -------------------- Utilities --------------------
      const esc = (s) =>
        String(s).replace(/[&<>"']/g, (m) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));

      const trimLabel = (s) => String(s || "").replace(/\s+/g, " ").trim();

      // prune empty-label items so no link renders without discernible text
      const prune = (nodes = []) =>
        nodes
          .filter(n => n && trimLabel(n.label).length > 0)
          .map(n => ({ ...n, children: prune(n.children || []) }));

      const path = location.pathname.toLowerCase().replace(/\/+$/, "");
      const last = path.split("/").pop() || "index.html";
      const clean = (s) => String(s || "").toLowerCase().replace(/^\.?\//, "");

      const isCurrent = (href) => {
        if (!href) return false;
        const h = clean(href);
        const hBare = h.split("#")[0].split("?")[0];
        // For index.html, compare full paths to avoid matching across directories.
        // Without this, the check below ("is the current filename the same as this
        // link's filename?") makes Home current on EVERY section landing page,
        // since /calendar/index.html and /assignments/index.html are all named
        // index.html. Home then highlights alongside the section you're actually
        // in. 1170 has carried this guard for a while; 1181 never got it.
        if (hBare === "index.html") {
          return path === "/index.html" || path === "/" || path === "";
        }
        if (last === hBare) return true;
        if (path.endsWith("/" + hBare)) return true;
        const stem = hBare.endsWith(".html") ? hBare.slice(0, -5) : hBare;
        return path.endsWith("/" + stem) || path.endsWith("/" + stem + "/") || path.endsWith("/" + stem + "/index.html");
      };

      const containsCurrent = (node) => node && (isCurrent(node.href) || (node.children || []).some(containsCurrent));

      const sectionDir = (href) => {
        if (!href) return "/";
        const u = new URL(href, location.href);
        let p = u.pathname.toLowerCase().replace(/\/+$/, "");
        if (p.endsWith(".html")) p = p.slice(0, p.lastIndexOf("/"));
        return p || "/";
      };

      const isNavActive = (href) => {
        if (!href) return false;
        if (isCurrent(href)) return true;
        const cur = new URL(location.href).pathname.toLowerCase().replace(/\/+$/, "");
        const dir = sectionDir(href);
        // Home should only be active on the actual home page, not subfolders
        if (dir === "/") {
          return cur === "/" || cur === "" || cur === "/index.html" || cur === "/index";
        }
        return cur.startsWith(dir);
      };

      const menuTitleFor = (label) => {
        const L = String(label || "").toLowerCase();
        if (L.includes("polic")) return "Policies Menu";
        if (L.includes("calendar")) return "Calendar Menu";
        return `${label} Menu`;
      };

      // Icons for bottomnav
      const iconFor = (label, href = "") => {
        const L = String(label || "").toLowerCase();
        const H = String(href || "").toLowerCase();
        if (L.includes("polic") || H.includes("/polic"))
          return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><line x1="12" y1="10.5" x2="12" y2="16.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="7.2" r="1.6" fill="currentColor"/></svg>`;
        if (L.includes("home"))
          return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 10v9h14v-9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        if (L.includes("assign"))
          return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
        if (L.includes("calendar"))
          return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="7" y="13" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.6"/></svg>`;
        if (L.includes("resource"))
          return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5h9l5 5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.8"/><path d="M14 5v5h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/></svg>`;
      };

      // -------------------- Renderers --------------------
      const renderTopNav = () => `
        <nav class="topnav" role="navigation" aria-label="Top">
          <div class="topnav-inner">
            <a class="brand" href="/index.html">ENGL 1181</a>
            <ul class="menu">
              ${TOP_NAV.map(i => `
                <li><a href="${esc(i.href)}"${isNavActive(i.href) ? ' aria-current="page"' : ''}>${esc(i.label)}</a></li>
              `).join("")}
            </ul>
          </div>
        </nav>`;

      const renderBottomNav = () => `
        <nav class="bottomnav" role="navigation" aria-label="Primary">
          <ul class="bottomnav__inner">
            ${TOP_NAV.map(i => `
              <li>
                <a class="bn-item" href="${esc(i.href)}"${isNavActive(i.href) ? ' aria-current="page"' : ''}>
                  <span class="bn-ico">${iconFor(i.label, i.href)}</span>
                  <span class="bn-label">${esc(i.label)}</span>
                </a>
              </li>`).join("")}
          </ul>
        </nav>`;

      const caretSVG = `<svg class="caret" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`.trim();

      const renderList = (children, level = 3) => !children?.length ? "" : `
        <ul class="nav-level-${level}">
          ${children.map(node => {
            const hasKids = !!node.children?.length;
            const open = hasKids && containsCurrent(node);
            if (hasKids)
              return `<li class="subgroup" data-subopen="${open}" data-current-branch="${open}">
                <button class="sub-toggle" type="button" aria-expanded="${open}">${esc(node.label)}${caretSVG}</button>
                ${renderList(node.children, level + 1)}
              </li>`;
            return `<li><a href="${esc(node.href)}"${isCurrent(node.href) ? ' aria-current="page"' : ''}>${esc(node.label)}</a></li>`;
          }).join("")}
        </ul>`;

      const renderLevel2Item = (it) => {
        if (it.children?.length) {
          const open = isCurrent(it.href) || it.children.some(containsCurrent);
          return `<li class="subgroup" data-subopen="${open}" data-current-branch="${open}" data-level="2">
            <button class="sub-toggle" type="button" aria-expanded="${open}">${esc(it.label)}${caretSVG}</button>
            ${renderList(it.children, 3)}
          </li>`;
        }
        return `<li><a href="${esc(it.href)}"${isCurrent(it.href) ? ' aria-current="page"' : ''}>${esc(it.label)}</a></li>`;
      };

      const renderSideGroup = (g) => {
        const level2 = g.children ? [...g.children] : [];
        if (g.href) level2.unshift({ label: "Overview", href: g.href });
        const open = isCurrent(g.href) || level2.some((c) => containsCurrent(c) || isCurrent(c.href));
        return `<li class="group" data-open="${open}">
          <button class="group-toggle" type="button" aria-expanded="${open}">${esc(g.label)}</button>
          <ul class="nav-level-2">${level2.map(renderLevel2Item).join("")}</ul>
        </li>`;
      };

      // The checkbox is kept only as the CSS state flag (every drawer rule keys off
      // `#sidenav-toggle:checked`). It is not an operable control any more: the
      // buttons below flip it in JS, so it's taken out of the tab order and hidden
      // from assistive tech.
      // The scrim is a plain <div>. It used to be a <label> marked aria-hidden —
      // interactive but hidden from AT, which is an ARIA violation. Clicking it now
      // closes the drawer via script; keyboard users use Escape or the Close button.
      const renderSideNav = (items, title = "Section Menu") => `
        <input type="checkbox" id="sidenav-toggle" class="nav-toggle" tabindex="-1" aria-hidden="true" />
        <nav id="sidenav" class="sidenav sidenav--fullscreen" role="navigation" aria-label="${esc(title)}">
          <div class="sidenav__bar">
            <div class="sidenav__title">${esc(title)}</div>
            <button type="button" class="sidenav-close" aria-label="Close ${esc(title)}">
              <span class="x" aria-hidden="true">×</span>
              <span>Close</span>
            </button>
          </div>
          <ul class="nav-level-1">${items.map(renderSideGroup).join("")}</ul>
        </nav>
        <div class="sidenav-scrim"></div>`;

      // -------------------- Injection --------------------
      if (!document.querySelector(".topnav")) document.body.insertAdjacentHTML("afterbegin", renderTopNav());
      // Skip link for accessibility (WCAG 2.4.1) - inserted after topnav so it appears first in DOM
      if (!document.querySelector(".skip-link")) {
        document.body.insertAdjacentHTML("afterbegin", '<a href="#page-content" class="skip-link">Skip to main content</a>');
      }
      if (!document.querySelector(".bottomnav")) document.body.insertAdjacentHTML("beforeend", renderBottomNav());

      let layout = document.querySelector(".layout");
      if (!layout) {
        layout = document.createElement("div");
        layout.className = "layout";
        document.body.appendChild(layout);
      }

      const noSidenav = document.body.classList.contains("no-sidenav");
      const pruned = prune(SIDENAV); // avoid empty-label links
      const curPath = new URL(location.href).pathname.toLowerCase().replace(/\/+$/, "") || "/";
      let itemsForSidenav = null;
      if (document.body.classList.contains("sidenav-show-all")) itemsForSidenav = pruned;
      else {
        const byContains = pruned.find(containsCurrent);
        const byDir = !byContains && pruned.find(g => curPath.startsWith(sectionDir(g.href)));
        itemsForSidenav = byContains ? [byContains] : byDir ? [byDir] : null;
      }

      const sectionTitle = itemsForSidenav?.length ? menuTitleFor(itemsForSidenav[0].label) : "Section Menu";
      if (!noSidenav && itemsForSidenav && !document.querySelector(".sidenav"))
        layout.insertAdjacentHTML("beforeend", renderSideNav(itemsForSidenav, sectionTitle));

      if (!document.querySelector("main.content")) {
        const openBtn = itemsForSidenav ? `<button type="button" class="open-sidenav-btn" aria-controls="sidenav" aria-expanded="false"><span aria-hidden="true">☰</span> ${esc(sectionTitle)}</button>` : "";
        layout.insertAdjacentHTML("beforeend", `<main class="content">${openBtn}</main>`);
      }

      if (!itemsForSidenav) layout.classList.add("centered-layout");

      const main = document.querySelector("main.content");
      const explicit = document.getElementById("page-content");
      // explicit !== main matters: index.html supplies its own
      // <main class="content" id="page-content">, so both lookups find the SAME
      // element. Without this guard the line below appends a node to itself,
      // which throws HierarchyRequestError and aborts the rest of init inside
      // the catch — silently, on the home page only.
      if (explicit && explicit !== main && explicit.parentElement !== main) main.appendChild(explicit);

      // -------------------- Behavior --------------------
      // Match your CSS mobile breakpoint so .bottomnav mode is consistent with layout
      (function () {
        const apply = () => {
          if (window.matchMedia('(max-width: 740px)').matches) {
            document.documentElement.classList.add('bottomnav-mode');
          } else {
            document.documentElement.classList.remove('bottomnav-mode');
          }
        };
        apply();
        window.addEventListener('resize', apply);
      })();

      // Mobile scroll lock for the sidenav drawer
      const mm = window.matchMedia("(max-width: 900px)");
      let lockedY = 0;
      const checkbox = document.getElementById("sidenav-toggle");

      const lockBody = () => {
        if (!mm.matches) return;
        lockedY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${lockedY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
      };
      const unlockBody = () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        window.scrollTo(0, lockedY);
      };
      // -------------------- Drawer open/close + focus management --------------------
      // The drawer is opened and closed here rather than by the checkbox's own label
      // clicks, so that focus can be moved into the drawer on open and returned to the
      // opening button on close. Without this, focus stays on the page behind the
      // overlay and Tab walks through content the user can't see.
      (function initDrawer() {
        if (!checkbox) return;
        const drawer = document.getElementById("sidenav");
        const openBtnEl = document.querySelector(".open-sidenav-btn");
        const closeBtnEl = drawer && drawer.querySelector(".sidenav-close");
        const scrimEl = document.querySelector(".sidenav-scrim");
        if (!drawer) return;

        let lastFocus = null;

        // Only things actually on screen — filters out collapsed sub-menus.
        const focusables = () =>
          Array.from(drawer.querySelectorAll('a[href], button:not([disabled])'))
            .filter((el) => el.offsetParent !== null);

        const setDrawer = (open) => {
          if (checkbox.checked === open) return;
          checkbox.checked = open;
          if (openBtnEl) openBtnEl.setAttribute("aria-expanded", open ? "true" : "false");

          if (open) {
            lastFocus = document.activeElement;
            lockBody();
            // Let the CSS :checked rules apply before we try to focus inside.
            requestAnimationFrame(() => {
              const target = closeBtnEl || focusables()[0];
              if (target) target.focus();
            });
          } else {
            unlockBody();
            // offsetParent guards against handing focus back to something that got
            // hidden while the drawer was open.
            const usable = lastFocus && lastFocus.isConnected && lastFocus.offsetParent !== null;
            const back = usable ? lastFocus : openBtnEl;
            lastFocus = null;
            if (back && back.focus) back.focus();
          }
        };

        if (openBtnEl) openBtnEl.addEventListener("click", () => setDrawer(true));
        if (closeBtnEl) closeBtnEl.addEventListener("click", () => setDrawer(false));
        if (scrimEl) scrimEl.addEventListener("click", () => setDrawer(false));

        // Following a link should close the drawer behind you.
        drawer.addEventListener("click", (e) => {
          if (e.target.closest("a[href]")) setDrawer(false);
        });

        document.addEventListener("keydown", (e) => {
          // Above 900px the sidenav is a normal static sidebar, not a drawer.
          if (!checkbox.checked || !mm.matches) return;
          if (e.key === "Escape") { e.preventDefault(); setDrawer(false); return; }
          if (e.key !== "Tab") return;
          const f = focusables();
          if (!f.length) return;
          const first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
          else if (!drawer.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
        });

        // If the drawer is somehow open when we grow past the breakpoint, reset it.
        mm.addEventListener("change", () => { if (!mm.matches && checkbox.checked) setDrawer(false); });
      })();

      // Sidenav group toggling
      const sidenavEl = document.querySelector(".sidenav");
      if (!noSidenav && sidenavEl) {
        const groups = Array.from(sidenavEl.querySelectorAll(".group"));
        const setOpen = (g, open) => {
          g.dataset.open = open ? "true" : "false";
          g.querySelector(".group-toggle").setAttribute("aria-expanded", open ? "true" : "false");
        };
        const openOnly = (target) => groups.forEach((g) => setOpen(g, g === target));
        groups.forEach((g) => {
          const btn = g.querySelector(".group-toggle");
          if (!btn) return;
          btn.addEventListener("click", () => {
            const isOpen = g.dataset.open === "true";
            openOnly(isOpen ? null : g);
          });
        });

        // Level-2 single-open behavior; normal toggle for deeper levels
        sidenavEl.addEventListener("click", (e) => {
          const btn = e.target.closest(".sub-toggle");
          if (!btn) return;
          const li = btn.closest(".subgroup");
          const ul = li.parentElement;
          const isLevel2 = ul.classList.contains("nav-level-2");
          const isOpen = li.dataset.subopen === "true";
          if (isLevel2) {
            ul.querySelectorAll(".subgroup").forEach((sib) => {
              const sb = sib.querySelector(".sub-toggle");
              sib.dataset.subopen = sib === li ? "true" : "false";
              if (sb) sb.setAttribute("aria-expanded", sib === li ? "true" : "false");
            });
          } else {
            li.dataset.subopen = isOpen ? "false" : "true";
            btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
          }
        });
      }

      if (document.body.classList.contains("sidenav-show-all"))
        document.body.classList.add("sidenav-force-open");

    } catch (err) {
      console.error("nav.js initialization error:", err);
    }

    // -------------------- Dark Mode Toggle --------------------
    // Deliberately outside the try/catch above: the toggle is independent of the
    // nav, so a nav rendering error must not take the theme button down with it.
    // All appearance lives in style.css (.theme-toggle) — do not set inline styles
    // here, inline declarations beat the stylesheet and the rules go dead.
    (function initThemeToggle() {
      const STORAGE_KEY = 'theme-preference';

      // Get user's preference: localStorage > system preference > light
      const getPreference = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      };

      // Apply theme to document
      const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
      };

      // Save preference
      const savePreference = (theme) => {
        localStorage.setItem(STORAGE_KEY, theme);
      };

      // Create toggle button
      const createToggleButton = () => {
        if (document.querySelector('.theme-toggle')) return;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'theme-toggle';
        btn.setAttribute('aria-label', 'Toggle dark mode');
        btn.setAttribute('title', 'Toggle dark mode');
        btn.innerHTML = `
            <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        `;

        btn.addEventListener('click', () => {
          const current = document.documentElement.getAttribute('data-theme') || 'light';
          const next = current === 'dark' ? 'light' : 'dark';
          applyTheme(next);
          savePreference(next);
          btn.setAttribute('aria-label', `Switch to ${next === 'dark' ? 'light' : 'dark'} mode`);
        });

        // Lives in the top bar, so it is laid out rather than floating over the
        // page — it can't collide with content or with the mobile drawer.
        // Only if the nav failed to render does it fall back to floating.
        const host = document.querySelector('.topnav-inner');
        if (host) {
          host.appendChild(btn);
        } else {
          btn.classList.add('theme-toggle--floating');
          document.body.appendChild(btn);
        }
      };

      // Listen for system preference changes (only if no stored preference)
      const watchSystemPreference = () => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
          }
        });
      };

      // Initialize
      applyTheme(getPreference());
      createToggleButton();
      watchSystemPreference();
    })();
  });
})();
