// =========================================================
// Hyunchul Park — site behavior
// =========================================================

(function () {
  // Highlight current page in topnav
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".topnav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Build carousels from data attributes:
  //   <div class="carousel" data-slug="2025-01-trb-award" data-count="6"></div>
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

      // Keyboard support when carousel is focused
      c.tabIndex = 0;
      c.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); show(i - 1); }
        else if (e.key === "ArrowRight") { e.preventDefault(); show(i + 1); }
      });
    }
  });
})();
