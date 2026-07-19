(function () {
  "use strict";

  /* ---------------- Mobile sidebar toggle ---------------- */
  var toggle = document.querySelector(".nav-toggle");
  var sidebar = document.querySelector(".sidebar");
  var backdrop = document.querySelector(".sidebar-backdrop");

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
  }

  if (toggle && sidebar) {
    toggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
      if (backdrop) backdrop.classList.toggle("open");
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeSidebar);

  /* ---------------- Framework tab switcher (FastAPI / Express) ---------------- */
  var STORAGE_KEY = "cachedocs-framework";
  var savedLang = null;
  try {
    savedLang = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* localStorage unavailable (e.g. file:// in some browsers) — ignore */
  }

  function setLanguage(lang, persist) {
    var groups = document.querySelectorAll(".framework-tabs");
    groups.forEach(function (group) {
      var buttons = group.querySelectorAll(".framework-tab-btn");
      var panels = group.querySelectorAll(".framework-tab-panel");
      var found = false;
      buttons.forEach(function (btn) {
        if (btn.getAttribute("data-lang") === lang) {
          btn.classList.add("active");
          found = true;
        } else {
          btn.classList.remove("active");
        }
      });
      // fall back to the first available tab if this group doesn't have `lang`
      var targetLang = found ? lang : buttons.length ? buttons[0].getAttribute("data-lang") : null;
      panels.forEach(function (panel) {
        panel.classList.toggle("active", panel.getAttribute("data-lang") === targetLang);
      });
      if (!found) {
        buttons.forEach(function (btn) {
          btn.classList.toggle("active", btn.getAttribute("data-lang") === targetLang);
        });
      }
    });
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {
        /* ignore */
      }
    }
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".framework-tab-btn");
    if (!btn) return;
    var lang = btn.getAttribute("data-lang");
    setLanguage(lang, true);
  });

  if (savedLang) setLanguage(savedLang, false);

  /* ---------------- Copy-to-clipboard on code blocks ---------------- */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var block = btn.closest(".code-block, .framework-tab-panel");
      if (!block) return;
      var codeEl = block.querySelector("pre code") || block.querySelector("pre");
      if (!codeEl) return;
      var text = codeEl.innerText;
      var restore = btn.textContent;
      var doCopy = function () {
        btn.textContent = "Copied!";
        setTimeout(function () {
          btn.textContent = restore;
        }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(doCopy, doCopy);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) { /* noop */ }
        document.body.removeChild(ta);
        doCopy();
      }
    });
  });

  /* ---------------- Auto-generated "On this page" TOC + scrollspy ---------------- */
  var tocInner = document.querySelector(".toc-inner .toc-links");
  var content = document.querySelector("main.content");

  if (tocInner && content) {
    var headings = content.querySelectorAll("h2[id], h3[id]");
    var links = [];
    headings.forEach(function (h) {
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      if (h.tagName === "H3") a.classList.add("sub");
      tocInner.appendChild(a);
      links.push({ link: a, heading: h });
    });

    if (links.length) {
      var onScroll = function () {
        var pos = window.scrollY + 100;
        var current = links[0];
        links.forEach(function (item) {
          if (item.heading.offsetTop <= pos) current = item;
        });
        links.forEach(function (item) {
          item.link.classList.toggle("active", item === current);
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  /* ---------------- Prism (if loaded) ---------------- */
  if (window.Prism && window.Prism.highlightAll) {
    window.Prism.highlightAll();
  }
})();
