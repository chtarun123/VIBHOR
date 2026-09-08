/* VIBHOR — Home page */
(function () {
  "use strict";
  const D = window.HERITAGE;
  const qs = D.qs;

  document.addEventListener("DOMContentLoaded", () => {
    /* stats */
    const states = new Set();
    Object.values(D.regions).forEach((r) => r.states.forEach((s) => states.add(s)));
    const stats = qs("#heroStats");
    if (stats) {
      stats.innerHTML = `
        <div class="stat"><b>4</b><span>Regions</span></div>
        <div class="stat"><b>${D.categories.length}</b><span>Categories</span></div>
        <div class="stat"><b>${D.items.length}</b><span>Heritage Stories</span></div>
        <div class="stat"><b>${states.size}+</b><span>States & UTs</span></div>`;
    }

    /* collage strip */
    const collage = qs("#collage");
    if (collage) {
      collage.innerHTML = Object.values(D.regions).map((r) => `
        <figure>
          <img src="${r.image}" alt="${esc(r.name)}">
          <figcaption>${esc(r.name)}</figcaption>
        </figure>`).join("");
    }

    /* region cards */
    const regions = qs("#regionsGrid");
    if (regions) {
      regions.innerHTML = Object.values(D.regions).map((r) => {
        const count = D.items.filter((i) => i.region === r.key).length;
        return `
        <a class="region-card reveal" href="region.html?r=${r.key}">
          <img src="${r.image}" alt="${esc(r.name)}" loading="lazy">
          <div class="rc-veil"></div>
          <span class="rc-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>
          </span>
          <div class="rc-body">
            <span class="rc-kicker">Region 0${Object.keys(D.regions).indexOf(r.key) + 1}</span>
            <h3>${esc(r.name)}</h3>
            <p>${esc(r.blurb)}</p>
            <div class="rc-meta">
              <span>✦ ${r.states.length} states</span>
              <span>✦ ${count} heritage stories</span>
              <span>✦ 12 categories</span>
            </div>
          </div>
        </a>`;
      }).join("");
    }

    /* category grid */
    const cats = qs("#catsGrid");
    if (cats) {
      cats.innerHTML = D.categories.map((c) => {
        const count = D.items.filter((i) => i.cat === c.id).length;
        return `
        <a class="cat-card reveal" href="region.html?c=${c.id}">
          <img src="${c.image}" alt="${esc(c.name)}" loading="lazy">
          <div class="cc-veil"></div>
          <span class="cc-count">${count} stories</span>
          <div class="cc-body">
            <div class="cc-icon">${c.icon}</div>
            <h3>${esc(c.name)}</h3>
            <p>${esc(c.blurb)}</p>
          </div>
        </a>`;
      }).join("");
    }

    /* featured treasures — one signature story from each region */
    const feat = qs("#featuredGrid");
    if (feat) {
      const picks = [];
      const byRegion = { north: [], south: [], east: [], west: [] };
      D.items.forEach((i) => byRegion[i.region].push(i));
      const order = {
        north: ["monuments", "dances", "festivals", "temples"],
        south: ["temples", "dances", "foods", "festivals"],
        east: ["festivals", "dances", "temples", "crafts"],
        west: ["dances", "forts", "foods", "monuments"]
      };
      ["north", "south", "east", "west"].forEach((rg) => {
        for (const cat of order[rg]) {
          const it = byRegion[rg].find((i) => i.cat === cat);
          if (it) { picks.push(it); break; }
        }
      });
      feat.innerHTML = picks.map(D.itemCardHTML).join("");
    }
  });

  function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
})();
