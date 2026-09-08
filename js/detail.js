/* VIBHOR — Detail page */
(function () {
  "use strict";
  const D = window.HERITAGE;
  const qs = D.qs;
  const id = D.param("id");
  const item = D.itemById(id);

  if (!item) {
    qs("#detailRoot").innerHTML = `<div class="section"><div class="container">
      <div class="empty"><div class="e-icon">🧭</div><h3>Treasure not found</h3>
      <p>The story you're looking for doesn't exist. Pick one from the explorer.</p>
      <a class="btn btn-gold" style="margin-top:1rem" href="region.html">Open the Explorer</a></div></div></div>`;
    return;
  }

  const region = D.regions[item.region];
  const cat = D.catOf(item.cat);
  const gallery = D.buildGallery(item);

  document.addEventListener("DOMContentLoaded", () => {
    /* header */
    qs("#detailHero").innerHTML = `
      <img class="dh-bg" src="${item.img}" alt="${esc(item.name)}">
      <div class="dh-inner">
        <nav class="breadcrumb">
          <a href="index.html">Home</a><span class="sep">/</span>
          <a href="region.html?r=${region.key}">${esc(region.name)}</a><span class="sep">/</span>
          <a href="region.html?r=${region.key}&c=${cat.id}">${esc(cat.name)}</a><span class="sep">/</span>
          <span class="current">${esc(item.name)}</span>
        </nav>
        <h1>${esc(item.name)}</h1>
        <div class="dh-meta">
          <span class="ph-chip">📍 ${esc(item.city)}, ${esc(item.state)}</span>
          <span class="ph-chip">${cat.icon} ${esc(cat.name)}</span>
          <span class="ph-chip">✦ ${esc(region.name)}</span>
        </div>
        <p class="ph-sub" style="margin-top:1rem;max-width:70ch">${esc(item.desc)}</p>
      </div>`;

    /* info boxes */
    qs("#infoGrid").innerHTML = `
      <div class="info-box">
        <div class="ib-icon">📍</div>
        <h3>Location</h3>
        <p><b style="color:var(--cream)">${esc(item.city)}</b>, ${esc(item.state)} — ${esc(region.name)}.
        Reachable by road and rail, with heritage trails and local guides around the site.</p>
        <a class="btn btn-ghost btn-sm" style="margin-top:1rem" target="_blank" rel="noopener"
           href="https://www.google.com/maps/search/${encodeURIComponent(item.name + " " + item.city + " " + item.state)}">
           Open in Maps ↗</a>
      </div>
      <div class="info-box">
        <div class="ib-icon">🏛️</div>
        <h3>History</h3>
        <p>${esc(item.hist)}</p>
      </div>
      <div class="info-box">
        <div class="ib-icon">📐</div>
        <h3>Key Features</h3>
        <ul>${item.feat.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      </div>
      <div class="info-box">
        <div class="ib-icon">🌟</div>
        <h3>Cultural Importance</h3>
        <p>${esc(item.imp)}</p>
        <p style="margin-top:.8rem">Category: <a href="region.html?r=${region.key}&c=${cat.id}">${esc(cat.name)} in ${esc(region.name)}</a></p>
      </div>`;

    /* wiki card */
    qs("#wikiCard").innerHTML = `
      <div class="wc-left">
        <span class="wc-icon">W</span>
        <div><b>Read the full reference on Wikipedia</b>
        <span>${esc(item.wiki)}</span></div>
      </div>
      <a class="btn btn-gold btn-sm" target="_blank" rel="noopener" href="${esc(item.wiki)}">Open Article ↗</a>`;

    /* gallery — 5 distinct images & captions */
    const g = qs("#galleryGrid");
    g.innerHTML = gallery.map((x) => `
      <figure data-src="${x.src}" data-cap="${esc(x.caption)}">
        <img src="${x.src}" alt="${esc(x.caption)}" loading="lazy">
        <figcaption>${esc(x.caption)}</figcaption>
      </figure>`).join("");
    D.qsa("figure", g).forEach((f) => f.addEventListener("click", () => D.openLightbox(f.dataset.src, f.dataset.cap)));

    /* related stories (same region, different item) */
    const rel = D.items.filter((i) => i.region === item.region && i.id !== item.id).slice(0, 4);
    qs("#relatedGrid").innerHTML = rel.map(D.itemCardHTML).join("");

    /* YouTube section — dynamic query = item name */
    qs("#ytTitle").textContent = "Watch “" + item.name + "” on YouTube";
    D.loadVideos(item.name, qs("#videoGrid"), null);
  });

  function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
})();
