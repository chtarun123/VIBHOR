# VIBHOR — Indian Heritage Portal

**One India. Four Regions. Endless Heritage.**

A complete, multi-page, dependency-free (vanilla HTML/CSS/JS) immersive heritage portal
with a premium dark-maroon & gold theme (`#2B0000` / `#D4AF37`), Playfair Display + Inter
typography, and full mobile responsiveness.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Hero with tagline & collage, 4 region cards, 12 category cards, featured treasures, About Us, FAQ, newsletter, footer |
| `region.html` | Drill-down explorer: **Region → Category → State** (URL params `?r=`, `?c=`, `?state=`) with a live-filtering grid of 120 stories |
| `detail.html` | `?id=` — hero image, info boxes (Location / History / Features / Cultural Importance / Wikipedia), 5-image distinct gallery with lightbox, **live YouTube section**, related stories |
| `map.html` | Interactive SVG map of all 34 states/UTs (embedded simplified GeoJSON), coloured by cultural region — click a state to filter its region and list its items |
| `quiz.html` | Interactive Heritage Quiz — 75 questions in 6 topics, 10-question rounds with timer, streaks, speed bonuses, fun ranks, confetti, sound & keyboard play; best score saved in localStorage |
| `passport.html` | **Virtual Heritage Passport** — passport-book UI (profile page + stamp book), 28 state stamps, India progress map, achievement badges, stats, recently-visited timeline, next-state recommendations, tricolor celebrations; all progress saved in localStorage |

## Architecture

```
css/style.css          Design system (maroon/gold theme, grid layouts, hover animations, responsive)
js/data-core.js        Regions, categories, image pools, gallery captions, state→region map
js/data-items-1.js     69 curated items — North & South India
js/data-items-2.js     51 curated items — East & West India
js/india-map.js        Simplified GeoJSON of Indian states (Douglas-Peucker, ~75 KB)
js/script.js           Shared engine: nav/footer/FAQ/newsletter, gallery builder,
                       YouTube API fetch+parse, video modal, lightbox, reveal-on-scroll
js/home.js / region.js / detail.js / map.js   Per-page renderers
```

## YouTube integration

`detail.js` calls the provided search API with the exact item name:

```
https://ytapis.djalokyt27.workers.dev/?q=Brihadeeswarar+Temple
```

The JSON response is parsed defensively (array / `videos` / `results` / `items` shapes),
video IDs + thumbnails are extracted, and each card plays in a modal via the standard
embed: `https://www.youtube.com/embed/{video_id}?autoplay=1`. If the service is
unreachable, a graceful fallback offers a direct YouTube search link.

## Data model

Every item: `id, name, category, region, state, city, image, description, history,
features[3], cultural importance, wikipedia url`. Galleries are built deterministically
from per-category image pools + cross-pool + region images, so every item gets 5
**distinct** images with 5 **distinct** captions.

## Run

Any static server works:

```bash
cd india-heritage
python3 -m http.server 8000
# open http://localhost:8000
```

## Open in VS Code

Unzip, then `File → Open Folder` and select `india-heritage`. The included
`.vscode/` folder provides:

- **settings.json** — 2-space tabs, EOL/trim rules, Live Server pinned to port 8000
- **extensions.json** — recommended extensions (Live Server, Prettier) — VS Code
  offers to install them on first open
- **tasks.json** — press `Ctrl+Shift+B` (or Terminal → Run Task) to run
  "Run VIBHOR portal (http.server :8000)" or "Syntax-check all JS"

Alternatively, use the Live Server extension: right-click `index.html` →
*Open with Live Server*.

Images are illustrative stock placeholders; content is an educational fan curation —
follow the Wikipedia links on each page for references.
