/* VIBHOR — Region page (drill-down: region → category → state → items) */
(function () {
  "use strict";
  const D = window.HERITAGE;
  const qs = D.qs;

  let state = { region: D.param("r") || "", cat: D.param("c") || "", stateName: D.param("state") || "" };
  if (state.region && !D.regions[state.region]) state.region = "";
  if (state.cat && !D.catOf(state.cat)) state.cat = "";

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderDrilldown();
    renderResults();
    qs("#drilldown").addEventListener("click", (e) => {
      const chip = e.target.closest("[data-filter]");
      if (!chip) return;
      const { kind, val } = chip.dataset;
      if (kind === "region") state.region = val === "all" ? "" : val;
      if (kind === "cat") state.cat = val === "all" ? "" : val;
      state.stateName = "";
      renderHeader(); renderDrilldown(); renderResults();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  function currentStates() {
    if (state.region) return D.regions[state.region].states;
    const pool = state.cat ? D.items.filter((i) => i.cat === state.cat) : D.items;
    const s = new Set(pool.map((i) => i.state));
    return Array.from(s).sort();
  }

  function renderHeader() {
    const head = qs("#pageHeader");
    let bg = "images/hero.jpg", name = "Explore India", sub = D.tagline, chips = "";
    if (state.region) {
      const r = D.regions[state.region];
      bg = r.image; name = r.name; sub = r.tagline + ". " + r.blurb;
      chips = `<span class="ph-chip">📍 ${r.states.length} states</span><span class="ph-chip">✦ ${D.items.filter(i=>i.region===r.key).length} stories</span><span class="ph-chip">12 categories</span>`;
    } else if (state.cat) {
      const c = D.catOf(state.cat);
      bg = c.image; name = c.name; sub = c.blurb + " — across all four regions of India.";
      chips = `<span class="ph-chip">📍 ${new Set(D.items.filter(i=>i.cat===state.cat).map(i=>i.state)).size} states</span><span class="ph-chip">✦ ${D.items.filter(i=>i.cat===state.cat).length} stories</span>`;
    } else {
      name = "One India. Four Regions.";
      sub = "Choose a region, a category or a state — and let the journey unfold. Every card leads to a full story.";
    }
    head.innerHTML = `
      <div class="ph-bg" style="background-image:url('${bg}')"></div>
      <div class="container ph-inner">
        <nav class="breadcrumb">
          <a href="index.html">Home</a><span class="sep">/</span>
          ${state.region ? `<span class="current">${esc(D.regions[state.region].name)}</span>` : state.cat ? `<span class="current">${esc(D.catOf(state.cat).name)}</span>` : `<span class="current">Explore</span>`}
          ${state.cat && state.region ? `<span class="sep">/</span><span class="current">${esc(D.catOf(state.cat).name)}</span>` : ""}
          ${state.stateName ? `<span class="sep">/</span><span class="current">${esc(state.stateName)}</span>` : ""}
        </nav>
        <h1>${esc(name)}</h1>
        <p class="ph-sub">${esc(sub)}</p>
        <div class="ph-chips">${chips}</div>
      </div>`;
  }

  function renderDrilldown() {
    const dd = qs("#drilldown");
    const regionChips = `<button class="chip ${!state.region ? "active" : ""}" data-filter="region" data-val="all">All Regions</button>` +
      Object.values(D.regions).map((r) => `<button class="chip ${state.region === r.key ? "active" : ""}" data-filter="region" data-val="${r.key}">${esc(r.name)}</button>`).join("");
    const catChips = `<button class="chip ${!state.cat ? "active" : ""}" data-filter="cat" data-val="all">All Categories</button>` +
      D.categories.map((c) => `<button class="chip ${state.cat === c.id ? "active" : ""}" data-filter="cat" data-val="${c.id}">${c.icon} ${esc(c.name)}</button>`).join("");
    const states = currentStates();
    dd.innerHTML = `
      <div class="drill-row"><span class="drill-label">Region</span><div class="chip-row">${regionChips}</div></div>
      <div class="drill-row"><span class="drill-label">Category</span><div class="chip-row">${catChips}</div></div>
      <div class="drill-row">
        <span class="drill-label">State</span>
        <div class="select-wrap">
          <select class="select" id="stateSelect" aria-label="Select state">
            <option value="">All States</option>
            ${states.map((s) => `<option value="${esc(s)}" ${state.stateName === s ? "selected" : ""}>${esc(s)}</option>`).join("")}
          </select>
        </div>
        <span style="font-size:.75rem;color:var(--muted2)">— drill down to the state level</span>
      </div>`;
    qs("#stateSelect", dd).addEventListener("change", (e) => { state.stateName = e.target.value; renderResults(); });
  }

  function renderResults() {
    const items = D.itemsOf({ region: state.region, cat: state.cat, state: state.stateName });
    const grid = qs("#itemGrid");
    const meta = qs("#resultsMeta");
    const parts = [];
    if (state.region) parts.push(D.regions[state.region].name);
    if (state.cat) parts.push(D.catOf(state.cat).name);
    if (state.stateName) parts.push(state.stateName);
    const label = parts.length ? parts.join(" · ") : "All of India";
    meta.innerHTML = `<h3>${esc(label)}</h3><span class="results-count"><b>${items.length}</b> heritage ${items.length === 1 ? "story" : "stories"}</span>`;
    if (!items.length) {
      grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><div class="e-icon">🪷</div>
        <h3>No curated stories here yet</h3>
        <p>Try a different combination — or pick any other state from the dropdown above.</p></div>`;
      return;
    }
    grid.innerHTML = items.map(D.itemCardHTML).join("");
    // re-run reveal for new cards
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } }), { threshold: 0.08 });
    D.qsa("#itemGrid .reveal").forEach((el) => io.observe(el));
  }
})();
