// =========================================================
// Hyunchul Park — site behavior
// =========================================================

// Run dark mode init as early as possible to avoid flash
(function () {
  const html = document.documentElement;
  const savedTheme = localStorage.getItem("theme");
  const sysDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (savedTheme === "dark" || (!savedTheme && sysDark)) {
    html.classList.add("dark");
  }
})();

(function () {
  // ---------- Theme toggle (dark mode) ----------
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const html = document.documentElement;
      const isDark = html.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // ---------- Topnav active link ----------
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".topnav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  // ---------- Footer year ----------
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ---------- Last updated ----------
  const lu = document.getElementById("last-updated");
  if (lu) {
    const d = new Date(document.lastModified);
    lu.textContent = "Last updated: " +
      d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  }

  // ---------- Email click-to-copy ----------
  document.querySelectorAll(".copy-email").forEach((el) => {
    const email = el.dataset.email || el.textContent.trim();
    el.title = "Click to copy";
    el.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(email);
        const original = el.textContent;
        el.textContent = "Copied!";
        el.classList.add("copied");
        setTimeout(() => {
          el.textContent = original;
          el.classList.remove("copied");
        }, 1500);
      } catch (err) {
        // Fallback: open the user's mail client
        window.location.href = "mailto:" + email;
      }
    });
  });

  // ---------- News deep-link helpers (shared by preview + news page) ----------
  function newsSlug(date, title) {
    return (date + "-" + title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  function newsItemData(li) {
    const date = (li.querySelector(".news-date")?.textContent || "").trim();
    let title = (li.querySelector(".news-text > strong:first-child")?.textContent || "").trim();
    title = title.replace(/\.$/, "");
    return { date, title, slug: newsSlug(date, title) };
  }

  // ---------- News page: give each entry a stable anchor id ----------
  const newsItemsOnPage = document.querySelectorAll(".news-list--cols li");
  if (newsItemsOnPage.length) {
    newsItemsOnPage.forEach((li) => {
      const { slug } = newsItemData(li);
      if (slug && !li.id) li.id = slug;
    });
    // ids are assigned after parse, so the browser's initial anchor jump
    // missed it — scroll to the target now if the URL carries a matching hash.
    if (location.hash.length > 1) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) el.scrollIntoView();
    }
  }

  // ---------- Recent news preview (auto-sync from news.html) ----------
  const newsTarget = document.getElementById("news-preview");
  if (newsTarget) {
    fetch("news.html")
      .then((r) => { if (!r.ok) throw new Error("fetch"); return r.text(); })
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const items = doc.querySelectorAll(".news-list--cols li");
        if (items.length === 0) throw new Error("empty");
        newsTarget.innerHTML = "";
        Array.from(items).slice(0, 6).forEach((li) => {
          const { date, title, slug } = newsItemData(li);
          const newLi = document.createElement("li");
          const dSpan = document.createElement("span");
          dSpan.className = "news-date";
          dSpan.textContent = date;
          const tSpan = document.createElement("span");
          tSpan.className = "news-text";
          const a = document.createElement("a");
          a.href = "news.html#" + slug;
          a.textContent = title;
          tSpan.appendChild(a);
          newLi.appendChild(dSpan);
          newLi.appendChild(tSpan);
          newsTarget.appendChild(newLi);
        });
      })
      .catch(() => {
        newsTarget.innerHTML =
          '<li class="muted">See the <a href="news.html">News page</a> for recent updates.</li>';
      });
  }

  // ---------- Carousels ----------
  document.querySelectorAll(".carousel").forEach((c) => {
    const slug = c.dataset.slug;
    const count = parseInt(c.dataset.count, 10) || 0;
    if (!slug || count === 0) return;

    const stage = document.createElement("div");
    stage.className = "carousel-stage";

    for (let n = 1; n <= count; n++) {
      const img = document.createElement("img");
      img.src = `assets/news/${slug}-${n}.jpg`;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      if (n === 1) img.classList.add("active");
      stage.appendChild(img);
    }
    c.appendChild(stage);

    if (count > 1) {
      const prev = document.createElement("button");
      prev.className = "carousel-btn prev";
      prev.type = "button";
      prev.setAttribute("aria-label", "Previous image");
      prev.textContent = "‹";

      const next = document.createElement("button");
      next.className = "carousel-btn next";
      next.type = "button";
      next.setAttribute("aria-label", "Next image");
      next.textContent = "›";

      const counter = document.createElement("div");
      counter.className = "carousel-counter";
      counter.textContent = `1 / ${count}`;

      c.appendChild(prev);
      c.appendChild(next);
      c.appendChild(counter);

      const imgs = stage.querySelectorAll("img");
      let i = 0;
      const show = (n) => {
        i = (n + count) % count;
        imgs.forEach((img, idx) => img.classList.toggle("active", idx === i));
        counter.textContent = `${i + 1} / ${count}`;
      };
      prev.addEventListener("click", () => show(i - 1));
      next.addEventListener("click", () => show(i + 1));

      c.tabIndex = 0;
      c.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); show(i - 1); }
        else if (e.key === "ArrowRight") { e.preventDefault(); show(i + 1); }
      });
    }
  });
})();
