/* ============================================================
   VIBHOR — Shared engine
   Nav · Footer · FAQ · Newsletter · Gallery · YouTube API · Modals
   ============================================================ */
(function () {
  "use strict";

  const D = window.HERITAGE;
  const YT_API = "https://ytapis.djalokyt27.workers.dev/?q=";

  /* ---------- tiny helpers ---------- */
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  D.param = (k) => new URLSearchParams(location.search).get(k);
  D.qs = qs;
  D.qsa = qsa;

  D.regionName = (key) => (D.regions[key] ? D.regions[key].name : "India");
  D.catOf = (id) => D.categories.find((c) => c.id === id) || {};
  D.itemById = (id) => D.items.find((i) => i.id === id);
  D.itemsOf = (filter = {}) =>
    D.items.filter((i) =>
      (!filter.region || i.region === filter.region) &&
      (!filter.cat || i.cat === filter.cat) &&
      (!filter.state || i.state === filter.state)
    );

  /* ---------- shared chrome: navbar ---------- */
  function renderNav() {
    const el = qs("#nav-root");
    if (!el) return;
    const page = el.dataset.page || "";
    const link = (href, label, key) =>
      `<li><a href="${href}" class="${key === page ? "active" : ""}">${label}</a></li>`;
    el.innerHTML = `
      <nav class="navbar">
        <div class="container nav-inner">
          <a class="brand" href="index.html" aria-label="VIBHOR home">
            <span class="brand-mark">V</span>
            <span class="brand-text"><b>VIBHOR</b><span>Indian Heritage</span></span>
          </a>
          <button class="nav-toggle" id="navToggle" aria-label="Menu"><span></span><span></span><span></span></button>
          <ul class="nav-links" id="navLinks">
            ${link("index.html", "Home", "home")}
            ${link("region.html", "Explore Regions", "region")}
            ${link("map.html", "Heritage Map", "map")}
            ${link("index.html#about", "About Us", "about")}
            <li class="nav-cta"><a class="btn btn-gold btn-sm" href="index.html#regions">Start Journey</a></li>
          </ul>
        </div>
      </nav>`;
    const tog = qs("#navToggle"), links = qs("#navLinks");
    tog.addEventListener("click", () => {
      tog.classList.toggle("open");
      links.classList.toggle("open");
    });
    qsa("a", links).forEach((a) => a.addEventListener("click", () => {
      tog.classList.remove("open"); links.classList.remove("open");
    }));
  }

  /* ---------- shared chrome: footer ---------- */
  function renderFooter() {
    const el = qs("#footer-root");
    if (!el) return;
    el.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a class="brand" href="index.html">
                <span class="brand-mark">V</span>
                <span class="brand-text"><b>VIBHOR</b><span>Indian Heritage</span></span>
              </a>
              <p style="margin-top:1rem">${D.tagline} A curated journey through the living culture of India — its temples, dances, foods, crafts and festivals — told region by region.</p>
              <div class="socials">
                <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0 3.7a6.1 6.1 0 100 12.2 6.1 6.1 0 000-12.2zm0 10a4 4 0 110-7.9 4 4 0 010 7.9zm6.3-10.2a1.4 1.4 0 11-2.9 0 1.4 1.4 0 012.9 0z"/></svg></a>
                <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 00-2.1-2.2C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3 3 0 002.1 2.2c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.2A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"/></svg></a>
                <a href="#" aria-label="X"><svg viewBox="0 0 24 24"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.6 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></svg></a>
                <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M24 12a12 12 0 10-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0024 12z"/></svg></a>
              </div>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                ${Object.values(D.regions).map((r) => `<li><a href="region.html?r=${r.key}">${r.name}</a></li>`).join("")}
                <li><a href="map.html">Interactive Map</a></li>
                <li><a href="index.html#about">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4>Categories</h4>
              <ul>
                ${D.categories.slice(0, 8).map((c) => `<li><a href="region.html?c=${c.id}">${c.name}</a></li>`).join("")}
              </ul>
            </div>
            <div>
              <h4>Newsletter</h4>
              <p>Monthly stories from the four regions — festivals to plan, crafts to meet, places to visit.</p>
              <form class="nl-form" data-newsletter style="margin-top:1rem">
                <input type="email" required placeholder="your@email.com" aria-label="Email">
                <button class="btn btn-gold btn-sm" type="submit">Join</button>
              </form>
              <div class="nl-msg"></div>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} VIBHOR — Indian Heritage Portal. An educational, fan-made curation.</span>
            <span class="tag">${D.tagline}</span>
          </div>
        </div>
      </footer>`;
    const form = qs("[data-newsletter]");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = qs(".nl-msg", form.parentElement);
      msg.textContent = "✦ Welcome aboard! Your first heritage dispatch is on its way.";
      form.reset();
    });
  }

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    const els = qsa(".reveal");
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- gallery builder (distinct images & captions per item) ---------- */
  D.buildGallery = function (item) {
    const idx = Math.max(0, D.items.findIndex((i) => i.id === item.id));
    const pool = D.pools[item.cat] || [];
    const rel = D.pools[D.relatedPools[item.cat]] || [];
    const regionImg = (D.regions[item.region] || {}).image || "";
    const picked = [item.img];
    let a = idx % Math.max(1, pool.length);
    for (let k = 0; k < 6 && picked.length < 5; k++) {
      const c = pool[(a + k) % pool.length];
      if (!picked.includes(c)) picked.push(c);
    }
    for (let k = 0; k < rel.length && picked.length < 5; k++) {
      const c = rel[(idx + k) % rel.length];
      if (!picked.includes(c)) picked.push(c);
    }
    if (regionImg && !picked.includes(regionImg) && picked.length < 5) picked.push(regionImg);
    const caps = D.captions[item.cat] || D.captions.monuments;
    const gallery = picked.slice(0, 5).map((src, i) => ({
      src: src.split("#")[0],
      caption: caps[(idx + i) % caps.length]
    }));
    // guarantee unique sources
    const seen = new Set(); const out = [];
    for (const g of gallery) if (!seen.has(g.src)) { seen.add(g.src); out.push(g); }
    return out;
  };

  /* ---------- item card renderer ---------- */
  D.itemCardHTML = function (item) {
    const cat = D.catOf(item.cat);
    return `
      <a class="item-card reveal" href="detail.html?id=${item.id}">
        <div class="ic-media">
          <img src="${item.img}" alt="${esc(item.name)}" loading="lazy">
          <span class="ic-tag">${esc(cat.name || item.cat)}</span>
          <span class="ic-state">${esc(item.state)}</span>
        </div>
        <div class="ic-body">
          <h3>${esc(item.name)}</h3>
          <p class="ic-desc">${esc(item.desc)}</p>
          <span class="ic-link">Explore</span>
        </div>
      </a>`;
  };

  /* ---------- video modal (shared) ---------- */
  D.openVideoModal = function (video, title) {
    let modal = qs("#videoModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "videoModal";
      modal.className = "modal";
      modal.innerHTML = `
        <div class="modal-box">
          <button class="modal-close" aria-label="Close">✕</button>
          <div class="video-frame"></div>
          <div class="modal-caption"></div>
        </div>`;
      document.body.appendChild(modal);
      modal.addEventListener("click", (e) => { if (e.target === modal) D.closeModals(); });
      qs(".modal-close", modal).addEventListener("click", D.closeModals);
    }
    qs(".video-frame", modal).innerHTML =
      `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(video.id)}?autoplay=1&rel=0"
        title="${esc(video.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
    qs(".modal-caption", modal).textContent = `${video.title} — ${video.author} · ${video.viewCount || ""}`;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  };

  D.openLightbox = function (src, caption) {
    let modal = qs("#lightbox");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "lightbox";
      modal.className = "modal";
      modal.innerHTML = `
        <div class="modal-box" style="max-width:860px">
          <button class="modal-close" aria-label="Close">✕</button>
          <img class="lightbox-img" alt="">
          <div class="lightbox-cap"></div>
        </div>`;
      document.body.appendChild(modal);
      modal.addEventListener("click", (e) => { if (e.target === modal) D.closeModals(); });
      qs(".modal-close", modal).addEventListener("click", D.closeModals);
    }
    qs(".lightbox-img", modal).src = src;
    qs(".lightbox-cap", modal).textContent = caption;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  };

  D.closeModals = function () {
    qsa(".modal").forEach((m) => m.classList.remove("show"));
    qsa(".video-frame iframe").forEach((f) => (f.src = "about:blank"));
    document.body.style.overflow = "";
  };

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") D.closeModals(); });

  /* ---------- YouTube search API (dynamic query per heritage item) ---------- */
  D.fetchVideos = async function (query) {
    const res = await fetch(YT_API + encodeURIComponent(query), { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    // normalise whatever shape the API returns
    let list = [];
    if (Array.isArray(data)) list = data;
    else if (Array.isArray(data.videos)) list = data.videos;
    else if (Array.isArray(data.results)) list = data.results;
    else if (Array.isArray(data.items)) list = data.items;
    else if (data.data && Array.isArray(data.data)) list = data.data;
    else if (data.data && Array.isArray(data.data.videos)) list = data.data.videos;
    let videos = list.map((v) => {
      const id = v.id || v.videoId || v.video_id || (v.id && v.id.videoId) || "";
      return {
        id,
        title: v.title || "YouTube video",
        author: v.author || v.channel || (v.ownerStatistics && v.ownerStatistics.channelTitle) || "YouTube",
        thumbnail: v.thumbnail ||
          (v.thumbnails && (v.thumbnails.find((t) => /maxres|hq|medium/.test(t.url || "")) || v.thumbnails[0]) && v.thumbnails.find((t) => /maxres|hq|medium/.test(t.url || "")).url) ||
          (id ? `https://i.ytimg.com/vi/${id}/hq720.jpg` : `https://i.ytimg.com/vi/${id || ""}/hqdefault.jpg`),
        viewCount: v.viewCount || (v.viewCountRaw != null ? v.viewCountRaw + " views" : ""),
        viewCountRaw: v.viewCountRaw != null ? v.viewCountRaw : (typeof v.view_count === "number" ? v.view_count : null),
        duration: v.duration || "",
        durationSeconds: v.durationSeconds != null ? v.durationSeconds : (v.duration_seconds != null ? v.duration_seconds : null),
        publishedTime: v.publishedTime || ""
      };
    }).filter((v) => v.id);
    // keep only substantial, watchable videos (skip < 90s clips when the API reports lengths)
    const substantial = videos.filter((v) => v.durationSeconds == null || v.durationSeconds >= 90);
    if (substantial.length) videos = substantial;
    // most-viewed first — the clearest, best-produced coverage ranks on top
    videos = videos.slice().sort((a, b) => (b.viewCountRaw || 0) - (a.viewCountRaw || 0));
    return videos.slice(0, 6);
  };

  /* ---------- generic video grid loader ---------- */
  D.loadVideos = async function (query, gridEl, headEl) {
    gridEl.innerHTML = `<div class="yt-state"><div class="spinner"></div><span>Searching YouTube for “${esc(query)}”…</span></div>`;
    try {
      const videos = await D.fetchVideos(query);
      if (!videos.length) {
        gridEl.innerHTML = `<div class="yt-state"><div class="e-icon" style="font-size:2rem">🎬</div><p>No videos found for “${esc(query)}”. Try again later.</p></div>`;
        return;
      }
      gridEl.innerHTML = `<div class="video-grid">` + videos.map((v, i) => `
        <div class="video-card reveal visible${i === 0 ? " vc-best-card" : ""}" data-vi="${i}">
          <div class="vc-media">
            <img src="${esc(v.thumbnail)}" alt="${esc(v.title)}" loading="lazy" onerror="this.style.display='none'">
            <div class="vc-play"><span><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></div>
            ${i === 0 ? `<span class="vc-best">★ Best match</span>` : ""}
            ${v.duration ? `<span class="vc-dur">${esc(v.duration)}</span>` : ""}
          </div>
          <div class="vc-body">
            <h4>${esc(v.title)}</h4>
            <div class="vc-meta"><span>${esc(v.author)}</span><span>${esc(v.viewCount || "")}</span></div>
          </div>
        </div>`).join("") + `</div>`;
      qsa(".video-card", gridEl).forEach((card) => {
        card.addEventListener("click", () => D.openVideoModal(videos[+card.dataset.vi], query));
      });
    } catch (err) {
      gridEl.innerHTML = `
        <div class="yt-state">
          <div class="e-icon" style="font-size:2rem">📡</div>
          <p>Couldn't reach the YouTube search service right now.<br>Check your connection, or watch “${esc(query)}” directly on YouTube.</p>
          <a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(query)}">Open on YouTube</a>
        </div>`;
    }
  };

  /* ---------- FAQ (shared accordion) ---------- */
  function initFAQ() {
    qsa(".faq-item").forEach((item) => {
      const q = qs(".faq-q", item), a = qs(".faq-a", item);
      q.addEventListener("click", () => {
        const open = item.classList.contains("open");
        qsa(".faq-item.open").forEach((o) => { o.classList.remove("open"); qs(".faq-a", o).style.maxHeight = null; });
        if (!open) { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
      });
    });
  }

  D.initReveal = initReveal;

  document.addEventListener("DOMContentLoaded", () => {
    renderNav();
    renderFooter();
    /* deferred: page scripts (home.js etc.) also render on DOMContentLoaded */
    setTimeout(initReveal, 0);
    initFAQ();
  });
})();
