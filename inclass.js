/* ==========================================================================
   Handout / Presentation Mode — JS
   Pair with handout.css. Include on any in-class or presentation page.
   Adds a toggle button, manages Wake Lock, and scales content to viewport.
   ========================================================================== */

(function () {
  "use strict";

  let wakeLock = null;

  // Create the toggle button
  const btn = document.createElement("button");
  btn.className = "presentation-toggle";
  btn.setAttribute("aria-label", "Toggle presentation mode");
  btn.textContent = "Presentation Mode";
  document.body.appendChild(btn);

  async function requestWakeLock() {
    try {
      if ("wakeLock" in navigator) {
        wakeLock = await navigator.wakeLock.request("screen");
        wakeLock.addEventListener("release", () => { wakeLock = null; });
      }
    } catch (e) {
      // Wake Lock may fail if tab is not visible; that's fine
    }
  }

  async function releaseWakeLock() {
    if (wakeLock) {
      await wakeLock.release();
      wakeLock = null;
    }
  }

  // Re-acquire wake lock if the page regains visibility while in presentation mode
  document.addEventListener("visibilitychange", () => {
    if (document.body.classList.contains("presentation-mode") && document.visibilityState === "visible") {
      requestWakeLock();
    }
  });

  function enterPresentation() {
    document.body.classList.add("presentation-mode");
    btn.textContent = "Exit Presentation";
    requestWakeLock();
    scaleContent();
  }

  function exitPresentation() {
    document.body.classList.remove("presentation-mode");
    btn.textContent = "Presentation Mode";
    releaseWakeLock();
    resetScale();
  }

  btn.addEventListener("click", () => {
    if (document.body.classList.contains("presentation-mode")) {
      exitPresentation();
    } else {
      enterPresentation();
    }
  });

  // Escape key exits presentation mode
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("presentation-mode")) {
      exitPresentation();
    }
  });

  // Scale .presentation-content to fit viewport without scrolling
  function scaleContent() {
    const el = document.querySelector(".presentation-content");
    if (!el) return;

    // Reset any previous transform so we measure natural size
    el.style.transform = "";
    el.style.transformOrigin = "top left";

    requestAnimationFrame(() => {
      const vh = window.innerHeight - 48; // leave room for padding
      const vw = window.innerWidth - 48;
      const contentH = el.scrollHeight;
      const contentW = el.scrollWidth;

      const scale = Math.min(1, vh / contentH, vw / contentW);
      el.style.transform = "scale(" + scale + ")";
    });
  }

  function resetScale() {
    const el = document.querySelector(".presentation-content");
    if (el) {
      el.style.transform = "";
    }
  }

  window.addEventListener("resize", () => {
    if (document.body.classList.contains("presentation-mode")) {
      scaleContent();
    }
  });
})();
