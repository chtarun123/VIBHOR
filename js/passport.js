/* ============================================================
   VIBHOR — Virtual Heritage Passport
   profile · stamps · map tracker · badges · timeline ·
   recommendations · celebrations · localStorage
   ============================================================ */
(function () {
  "use strict";
  const P = window.HERITAGE_PASSPORT;
  const GEO = window.INDIA_GEO;
  const LS = "vh_passport_v1";
  const QUZZ_PLAYS = "vh_quiz_plays";
  const QUZZ_BEST = "vh_quiz_best";
  const TOTAL = P.states.length; // 28

  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const byName = {};
  P.states.forEach((s) => (byName[s.name] = s));

  let S = null; // persisted state

  /* ---------------- persistence ---------------- */
  function load() {
    try {
      const raw = localStorage.getItem(LS);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && d.explored) return d;
      }
    } catch (e) {}
    // first visit → seed with the 5 sample states
    const now = new Date();
    const explored = {};
    const order = [];
    P.seed.forEach((s) => {
      const d = new Date(now);
      d.setDate(d.getDate() - s.daysAgo);
      const iso = d.toISOString().slice(0, 10);
      explored[s.state] = iso;
      order.push(s.state);
    });
    const d = {
      name: "Explorer",
      avatar: P.avatars[0],
      explored,
      order,
      created: now.toISOString().slice(0, 10)
    };
    save(d);
    return d;
  }
  function save(d) {
    try { localStorage.setItem(LS, JSON.stringify(d || S)); } catch (e) {}
  }

  /* ---------------- derived ---------------- */
  function levelOf(count) {
    return P.levels.find((l) => count >= l.min) || P.levels[P.levels.length - 1];
  }
  function badgesEarned(count) {
    return P.badges.filter((b) => count >= b.need);
  }
  function pointsOf(count) {
    return count * 100 + badgesEarned(count).reduce((a, b) => a + b.bonus, 0);
  }
  function quizzesPlayed() {
    let n = 0;
    try { n = parseInt(localStorage.getItem(QUZZ_PLAYS) || "0", 10) || 0; } catch (e) {}
    if (!n) { try { if (localStorage.getItem(QUZZ_BEST)) n = 1; } catch (e) {} }
    return n;
  }
  const count = () => Object.keys(S.explored).length;
  const unexplored = () => P.states.filter((s) => !S.explored[s.name]);

  function fmtDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }
  function ppNumber() {
    let h = 0;
    const str = S.name + S.created;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 100000;
    return "IN-2026-" + String(1000 + (h % 9000));
  }

  /* ---------------- sound: soft stamp thud ---------------- */
  function thud() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const actx = new AC();
      const t = actx.currentTime;
      const o = actx.createOscillator();
      const g = actx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(140, t);
      o.frequency.exponentialRampToValueAtTime(55, t + 0.16);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.3, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      o.connect(g).connect(actx.destination);
      o.start(t);
      o.stop(t + 0.25);
    } catch (e) {}
  }

  /* ---------------- confetti (tricolor + gold) ---------------- */
  function confetti() {
    const cv = qs("#pp-confetti");
    if (!cv) return;
    const ctx = cv.getContext ? cv.getContext("2d") : null;
    if (!ctx) return;
    cv.width = innerWidth; cv.height = innerHeight;
    const colors = ["#FF9933", "#138808", "#0A2A6B", "#D4AF37", "#FFFDF6"];
    const parts = [];
    for (let i = 0; i < 160; i++) {
      parts.push({
        x: Math.random() * cv.width,
        y: -20 - Math.random() * cv.height * 0.4,
        w: 5 + Math.random() * 7,
        h: 8 + Math.random() * 9,
        c: colors[Math.floor(Math.random() * colors.length)],
        vy: 2.2 + Math.random() * 3.4,
        vx: -1.6 + Math.random() * 3.2,
        rot: Math.random() * Math.PI,
        vr: -0.12 + Math.random() * 0.24
      });
    }
    const t0 = performance.now();
    (function frame(t) {
      const el = t - t0;
      ctx.clearRect(0, 0, cv.width, cv.height);
      let alive = false;
      for (const p of parts) {
        p.y += p.vy; p.x += p.vx + Math.sin(p.y / 38) * 0.7; p.rot += p.vr;
        if (p.y < cv.height + 30) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - el / 4200);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (alive && el < 4500) requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, cv.width, cv.height);
    })(t0);
  }

  /* ================= RENDER ================= */
  function renderAll() {
    renderProfile();
    renderStamps();
    renderStats();
    renderBadges();
    renderTimeline();
    renderNext();
  }

  function renderProfile() {
    const c = count();
    const lv = levelOf(c);
    qs("#ppAvatar").textContent = S.avatar;
    qs("#ppName").textContent = S.name;
    qs("#ppLevel").innerHTML = `${lv.e} ${esc(lv.name)}`;
    qs("#ppLevelLine").textContent = lv.line;
    qs("#ppPassNo").textContent = ppNumber();
    qs("#ppIssue").textContent = fmtDate(S.created);
    const pct = Math.round((c / TOTAL) * 100);
    qs("#ppBarFill").style.width = pct + "%";
    qs("#ppBarText").innerHTML = `<b>${c}</b> / ${TOTAL} States Visited · ${pct}%`;
  }

  function renderStamps() {
    const grid = qs("#ppStampGrid");
    grid.innerHTML = P.states.map((st) => {
      const date = S.explored[st.name];
      if (date) {
        const rot = (hash(st.name) % 9) - 4; // deterministic tilt
        return `
          <div class="pp-stamp is-stamped" style="--ink:${st.color};--rot:${rot}deg" title="${esc(st.name)} · ${fmtDate(date)}">
            <div class="pp-stamp-in">
              <span class="pp-stamp-e">${st.emoji}</span>
              <span class="pp-stamp-name">${esc(st.name)}</span>
              <span class="pp-stamp-date">${fmtDate(date)}</span>
              <span class="pp-stamp-place">${esc(st.landmark)}</span>
            </div>
          </div>`;
      }
      return `
        <button class="pp-stamp is-empty" data-state="${esc(st.name)}" title="Stamp ${esc(st.name)}">
          <span class="pp-stamp-plus">＋</span>
          <span class="pp-stamp-name">${esc(st.name)}</span>
        </button>`;
    }).join("");
    qsa(".pp-stamp.is-empty", grid).forEach((el) =>
      el.addEventListener("click", () => stampState(el.dataset.state))
    );
  }
  function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) % 997; return h; }

  function renderStats() {
    const c = count();
    qs("#ppStatStates").textContent = c + " / " + TOTAL;
    qs("#ppStatQuiz").textContent = quizzesPlayed();
    const pts = pointsOf(c);
    const el = qs("#ppStatPoints");
    el.textContent = pts;
    el.classList.remove("pp-bump");
    void el.offsetWidth;
    el.classList.add("pp-bump");
    qs("#ppStatBadges").textContent = badgesEarned(c).length + " / " + P.badges.length;
  }

  function renderBadges() {
    const c = count();
    qs("#ppBadges").innerHTML = P.badges.map((b) => {
      const got = c >= b.need;
      return `
        <div class="pp-badge ${got ? "is-earned" : "is-locked"}">
          <div class="pp-badge-e">${got ? b.e : "🔒"}</div>
          <div class="pp-badge-n">${esc(b.name)}</div>
          <div class="pp-badge-line">${got ? `Earned · +${b.bonus} pts` : b.line}</div>
          ${got ? "" : `<div class="pp-badge-track"><div style="width:${Math.min(100, Math.round((c / b.need) * 100))}%"></div></div>
          <div class="pp-badge-prog">${c}/${b.need} states</div>`}
        </div>`;
    }).join("");
  }

  function renderTimeline() {
    const c = count();
    const box = qs("#ppTimeline");
    if (!c) {
      box.innerHTML = `<p class="pp-empty">Your journey starts with the first stamp — tap any state on the map!</p>`;
      return;
    }
    const last5 = S.order.slice(-5).reverse();
    box.innerHTML = `<ol class="pp-tl">` + last5.map((name, i) => {
      const st = byName[name];
      const date = S.explored[name];
      return `
        <li class="pp-tl-item" style="animation-delay:${i * 0.08}s">
          <span class="pp-tl-dot" style="background:${st.color}"></span>
          <div class="pp-tl-body">
            <div class="pp-tl-head"><b>${esc(name)}</b><span>${fmtDate(date)}</span></div>
            <div class="pp-tl-sub">${st.emoji} ${esc(st.landmark)} · ${esc(st.famous)}</div>
          </div>
        </li>`;
    }).join("") + `</ol>`;
  }

  function renderNext() {
    const box = qs("#ppNext");
    const rest = unexplored();
    if (!rest.length) {
      box.innerHTML = `<div class="pp-perfect">🏆 All 28 states stamped — India Expert achieved! Your passport is complete.</div>`;
      return;
    }
    // recommend from the least-covered regions first (diverse trip planning)
    const regionCount = { north: 0, south: 0, east: 0, west: 0 };
    P.states.forEach((s) => { if (S.explored[s.name]) regionCount[s.region]++; });
    const sorted = rest.slice().sort((a, b) => regionCount[a.region] - regionCount[b.region]);
    const picks = sorted.slice(0, 3);
    box.innerHTML = picks.map((st) => `
      <div class="pp-next-card" style="--ink:${st.color}">
        <div class="pp-next-e">${st.emoji}</div>
        <div class="pp-next-n">${esc(st.name)}</div>
        <div class="pp-next-landmark">${esc(st.landmark)}</div>
        <div class="pp-next-famous">${esc(st.famous)}</div>
        <button class="btn pp-stamp-btn" data-state="${esc(st.name)}">Stamp it ✦</button>
      </div>`).join("");
    qsa(".pp-stamp-btn", box).forEach((b) =>
      b.addEventListener("click", () => stampState(b.dataset.state))
    );
  }

  /* ================= MAP (progress tracker) ================= */
  const W = 1000, H = 1150, PAD = 30;
  let minLon = 60, maxLon = 100, minLat = 6, maxLat = 38;
  const scale = Math.min((W - 2 * PAD) / (maxLon - minLon), (H - 2 * PAD) / (maxLat - minLat));
  const ox = (W - scale * (maxLon - minLon)) / 2;
  const oy = (H - scale * (maxLat - minLat)) / 2;
  const px = (lon) => ox + (lon - minLon) * scale;
  const py = (lat) => oy + (maxLat - lat) * scale;
  function ringPath(ring) {
    return ring.map((p, i) => (i ? "L" : "M") + px(p[0]).toFixed(1) + " " + py(p[1]).toFixed(1)).join("") + "Z";
  }
  function geomPath(g) {
    const polys = g.type === "MultiPolygon" ? g.coordinates : [g.coordinates];
    let d = "";
    for (const poly of polys) for (const ring of poly) d += ringPath(ring);
    return d;
  }

  function renderMap() {
    const svg = qs("#ppMapSvg");
    if (!svg) return;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    let paths = "";
    for (const f of GEO.features) {
      const name = f.properties.name;
      const st = byName[name];
      const isState = !!st;
      const stamped = isState && S.explored[name];
      const cls = "pp-state " + (stamped ? "is-stamped" : isState ? "is-open" : "is-ut");
      paths += `<path class="${cls}" data-state="${esc(name)}" d="${geomPath(f.geometry)}"></path>`;
    }
    svg.innerHTML = paths;
    const tip = qs("#ppMapTip");
    const wrap = qs("#ppMapWrap");
    qsa(".pp-state", svg).forEach((p) => {
      const name = p.dataset.state;
      p.addEventListener("mouseenter", () => {
        const st = byName[name];
        const date = st && S.explored[name];
        tip.innerHTML = `<b>${esc(name)}</b>${date ? " · " + fmtDate(date) : st ? " · tap to stamp" : ""}`;
        tip.style.opacity = 1;
      });
      p.addEventListener("mousemove", (e) => {
        const r = wrap.getBoundingClientRect();
        tip.style.left = Math.min(e.clientX - r.left + 14, r.width - 150) + "px";
        tip.style.top = (e.clientY - r.top + 10) + "px";
      });
      p.addEventListener("mouseleave", () => { tip.style.opacity = 0; });
      p.addEventListener("click", () => {
        if (byName[name] && !S.explored[name]) stampState(name);
      });
    });
  }

  /* ================= STAMP ACTION + CELEBRATION ================= */
  function stampState(name) {
    if (!byName[name] || S.explored[name]) return;
    const st = byName[name];
    const iso = new Date().toISOString().slice(0, 10);
    S.explored[name] = iso;
    S.order.push(name);
    save();
    thud();
    renderAll();
    renderMap();
    celebrate(st, iso);
  }

  function celebrate(st, iso) {
    const ov = qs("#ppCelebrate");
    qs("#ppCelName").textContent = st.name;
    qs("#ppCelDate").textContent = "Stamped · " + fmtDate(iso);
    qs("#ppCelLand").textContent = st.emoji + " " + st.landmark + " · " + st.famous;
    const c = count();
    const newBadge = P.badges.find((b) => b.need === c) || null;
    qs("#ppCelBadge").innerHTML = newBadge
      ? `<div class="pp-cel-badge">️ New badge unlocked: <b>${esc(newBadge.name)} ${newBadge.e}</b> (+${newBadge.bonus} pts)</div>`
      : "";
    ov.classList.remove("hide");
    ov.querySelector(".pp-cel-stamp").style.setProperty("--ink", st.color);
    confetti();
    setTimeout(() => ov.classList.add("hide"), 6000);
  }

  /* ================= PROFILE EDITING ================= */
  function initProfileEdit() {
    // avatar cycles on click
    qs("#ppAvatarBtn").addEventListener("click", () => {
      const i = P.avatars.indexOf(S.avatar);
      S.avatar = P.avatars[(i + 1) % P.avatars.length];
      save();
      renderProfile();
    });
    // name: click → inline input
    const nameEl = qs("#ppName");
    nameEl.addEventListener("click", () => {
      if (nameEl.querySelector("input")) return;
      const cur = nameEl.textContent;
      nameEl.innerHTML = `<input class="pp-name-input" maxlength="24" value="${esc(cur)}" aria-label="Your explorer name">`;
      const inp = nameEl.querySelector("input");
      inp.focus();
      inp.select();
      const commit = () => {
        const v = inp.value.trim() || "Explorer";
        S.name = v;
        save();
        renderProfile();
      };
      inp.addEventListener("blur", commit);
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") inp.blur();
        if (e.key === "Escape") { inp.value = cur; inp.blur(); }
      });
    });
    // reset journey (demo helper)
    const rb = qs("#ppReset");
    if (rb) rb.addEventListener("click", () => {
      if (confirm("Reset your passport? All stamps will be removed.")) {
        try { localStorage.removeItem(LS); } catch (e) {}
        S = load();
        renderAll();
        renderMap();
      }
    });
  }

  /* ================= CHAKRA (24-spoke wheel) ================= */
  function drawChakra() {
    const svg = qs("#ppChakra");
    if (!svg) return;
    const c = 50, r1 = 44, r2 = 12;
    let spokes = "";
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      spokes += `<line x1="${(c + Math.cos(a) * r2).toFixed(1)}" y1="${(c + Math.sin(a) * r2).toFixed(1)}" x2="${(c + Math.cos(a) * r1).toFixed(1)}" y2="${(c + Math.sin(a) * r1).toFixed(1)}"/>`;
    }
    svg.innerHTML = `
      <circle cx="${c}" cy="${c}" r="${r1}" class="ch-outer"/>
      <circle cx="${c}" cy="${c}" r="${r2}" class="ch-inner"/>
      <g class="ch-spokes">${spokes}</g>`;
  }

  /* ================= BOOT ================= */
  document.addEventListener("DOMContentLoaded", () => {
    S = load();
    drawChakra();
    renderAll();
    renderMap();
    initProfileEdit();
    qs("#ppCelebrate").addEventListener("click", (e) => {
      if (e.target === qs("#ppCelebrate") || e.target.closest(".pp-cel-close")) {
        qs("#ppCelebrate").classList.add("hide");
      }
    });
    // close celebration with Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") qs("#ppCelebrate").classList.add("hide");
    });
  });
})();
