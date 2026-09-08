/* ============================================================
   VIBHOR — Heritage Data Core
   Regions · Categories · Image pools · State mappings
   ============================================================ */
window.HERITAGE = {
  brand: "VIBHOR",
  tagline: "One India. Four Regions. Endless Heritage.",

  regions: {
    north: {
      key: "north", name: "North India",
      tagline: "Snow-crowned peaks, golden plains & Mughal grandeur",
      image: "images/regions/north.jpg",
      blurb: "Home of the Himalayas, the sacred Ganga, the Mughal capitals and the world's most beloved monument.",
      states: ["Uttar Pradesh", "Rajasthan", "Punjab", "Himachal Pradesh", "Uttarakhand", "Delhi", "Madhya Pradesh", "Jammu & Kashmir"]
    },
    south: {
      key: "south", name: "South India",
      tagline: "Temple cities, backwaters & the birthplace of Carnatic",
      image: "images/regions/south.jpg",
      blurb: "A land of gopurams, classical dance, royal palaces and coconut groves — the cradle of unbroken temple traditions.",
      states: ["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh", "Telangana"]
    },
    east: {
      key: "east", name: "East India",
      tagline: "The Ganga delta, terracotta temples & tribal heartland",
      image: "images/regions/east.jpg",
      blurb: "From the banks of the Hooghly to the Sal forests of the East — a region of great rivers, ancient universities and folk art.",
      states: ["West Bengal", "Odisha", "Bihar", "Jharkhand", "Assam", "Chhattisgarh"]
    },
    west: {
      key: "west", name: "West India",
      tagline: "Arabian coasts, desert crafts & palaces of the Deccan",
      image: "images/regions/west.jpg",
      blurb: "Goan beaches, Kutchi embroidery, Maratha forts and the colonial arches of Bombay — a coastline of contrasts.",
      states: ["Maharashtra", "Gujarat", "Goa"]
    }
  },

  categories: [
    { id: "dances", name: "Dances", icon: "💃", image: "images/categories/dances.jpg",
      blurb: "From Bharatanatyam's sculptural grace to Bhangra's explosive harvest energy." },
    { id: "music", name: "Music", icon: "🎵", image: "images/categories/music.jpg",
      blurb: "Carnatic and Hindustani classical traditions, plus the folk songs of every valley." },
    { id: "foods", name: "Foods", icon: "🍛", image: "images/categories/foods.jpg",
      blurb: "Royal thalis, coastal curries, mountain stews and legendary street snacks." },
    { id: "festivals", name: "Festivals", icon: "🪔", image: "images/categories/festivals.jpg",
      blurb: "A year-round calendar of colour, faith, harvest and celebration." },
    { id: "temples", name: "Temples", icon: "🛕", image: "images/categories/temples.jpg",
      blurb: "Gopurams, shikharas and cave shrines carved in living stone." },
    { id: "historical", name: "Historical Places", icon: "🏛️", image: "images/categories/historical.jpg",
      blurb: "Ancient cities, sacred rivers and the ruins of forgotten empires." },
    { id: "architecture", name: "Architecture", icon: "📐", image: "images/categories/architecture.jpg",
      blurb: "Havelis, stepwells, forts and palaces of astonishing detail." },
    { id: "forts", name: "Forts & Palaces", icon: "🏯", image: "images/categories/forts.jpg",
      blurb: "Hilltop ramparts, royal courts and the thrones of kings." },
    { id: "crafts", name: "Arts & Crafts", icon: "🎨", image: "images/categories/crafts.jpg",
      blurb: "Madhubani, Pattachitra, Warli and a thousand other living traditions." },
    { id: "textiles", name: "Textiles", icon: "🧵", image: "images/categories/textiles.jpg",
      blurb: "Kanjivaram silks, Kutch embroidery and the looms of India." },
    { id: "monuments", name: "Monuments", icon: "🗿", image: "images/categories/monuments.jpg",
      blurb: "Memorials, gateways and architectural icons of a nation." },
    { id: "gardens", name: "Gardens & Parks", icon: "🌿", image: "images/categories/gardens.jpg",
      blurb: "Mughal charbaghs, tea estates, backwaters and wild reserves." }
  ],

  /* Image pools per category — used for main images & auto-built galleries */
  pools: {
    dances: ["images/pool/dances-1.jpg","images/pool/dances-2.jpg","images/pool/dances-3.jpg","images/pool/dances-4.jpg","images/pool/dances-5.jpg","images/pool/kathakali.jpg","images/pool/garba.jpg","images/pool/dandiya.jpg","images/pool/lavani.jpg","images/pool/chhau.png"],
    music: ["images/pool/music-1.jpg","images/pool/music-2.jpg","images/pool/music-3.jpg","images/pool/music-4.jpg","images/pool/music-5.jpg","images/pool/sitar.jpg","images/pool/veena.jpg"],
    foods: ["images/pool/foods-1.jpg","images/pool/foods-2.jpg","images/pool/foods-3.jpg","images/pool/foods-4.jpg","images/pool/foods-5.jpg","images/pool/biryani.jpg","images/pool/sadya.jpg","images/pool/vada-pav.jpg","images/pool/rasgulla.jpg","images/pool/masala-dosa.jpg","images/pool/machh-bhaat.jpg","images/pool/goan-curry.jpg","images/pool/kutchi.jpg","images/pool/chole-kulcha.jpg"],
    festivals: ["images/pool/festivals-1.jpg","images/pool/festivals-2.jpg","images/pool/festivals-3.jpg","images/pool/festivals-4.jpg","images/pool/festivals-5.jpg","images/pool/festivals-6.jpg","images/pool/lohri.jpg","images/pool/teej.jpg","images/pool/kullu-fair.jpg","images/pool/magh-mela.jpg","images/pool/pongal.jpg","images/pool/bathukamma.jpg","images/pool/car-festival.jpg","images/pool/rath-yatra.jpg","images/pool/chhath.jpg","images/pool/bihu.jpg","images/pool/ganesh-chaturthi.jpg"],
    temples: ["images/pool/temples-1.jpg","images/pool/golden-temple.jpg","images/pool/temples-3.jpg","images/pool/temples-4.jpg","images/pool/temples-5.jpg","images/pool/temples-6.jpg","images/pool/temples-7.jpg","images/pool/brihadeeswarar.jpg","images/pool/kedarnath.jpg","images/pool/jagannath.jpg","images/pool/somnath.jpg","images/pool/bom-jesus.jpg"],
    historical: ["images/pool/historical-1.jpg","images/pool/historical-2.jpg","images/pool/historical-3.jpg","images/pool/historical-4.jpg","images/pool/taj.jpg","images/pool/nalanda.jpg"],
    architecture: ["images/pool/architecture-1.jpg","images/pool/architecture-2.jpg","images/pool/architecture-3.jpg","images/pool/architecture-4.png","images/pool/chand-baori.jpg"],
    forts: ["images/pool/forts-1.jpg","images/pool/forts-2.jpg","images/pool/forts-3.jpg","images/pool/forts-4.jpg","images/pool/ranthambore.jpg","images/pool/mysore.jpg"],
    crafts: ["images/pool/miniatures.jpg","images/pool/phulkari.jpg","images/pool/agra-pottery.jpg","images/pool/gond.jpg","images/pool/nataraja.jpg","images/pool/tanjore-painting.jpg","images/pool/channapatna.jpg","images/pool/kalamkari.jpg","images/pool/madhubani.jpg","images/pool/pattachitra.jpg","images/pool/kantha.jpg","images/pool/kutch-embroidery.jpg","images/pool/bhuj-pottery.png","images/pool/warli.png"],
    textiles: ["images/pool/bandhani.jpg","images/pool/chikankari.jpg","images/pool/pashmina.jpg","images/pool/maheshwari.jpg","images/pool/kanjivaram.jpg","images/pool/kasavu.jpg","images/pool/ilkal.jpg","images/pool/pochampally.jpg","images/pool/sambalpuri.jpg","images/pool/baluchari.jpg","images/pool/tussar.jpg","images/pool/muga.jpg","images/pool/patola.jpg","images/pool/paithani.jpg","images/pool/ajrakh.jpg"],
    monuments: ["images/pool/monuments-1.jpg","images/pool/monuments-2.jpg","images/pool/qutub.jpg","images/pool/charminar.jpg","images/pool/statue-unity.jpg","images/pool/gol-gumbaz.jpg","images/pool/gateway.jpg","images/pool/india-gate-real.jpg","images/pool/taj.jpg"],
    gardens: ["images/pool/gardens-1.jpg","images/pool/gardens-2.jpg","images/pool/gardens-3.jpg","images/pool/dal-lake.jpg","images/pool/darjeeling.jpg","images/pool/munnar.jpg","images/pool/alleppey.jpg","images/pool/kaziranga.jpg","images/pool/lonar.jpg"]
  },

  /* Gallery: related categories for cross-pool variety */
  relatedPools: {
    dances: "festivals", music: "festivals", foods: "festivals", festivals: "music",
    temples: "historical", historical: "temples", architecture: "historical",
    forts: "architecture", crafts: "textiles", textiles: "crafts",
    monuments: "historical", gardens: "historical"
  },

  /* Gallery captions per category (6 each — rotated per item so captions never repeat) */
  captions: {
    dances: ["Grace in motion","Costume & ornament","The performance hall","Rhythmic footwork","Festival celebrations","Stage tradition"],
    music: ["Instruments of the tradition","The live performance","Melodic forms","Cycles of rhythm","Ensemble playing","The concert hall"],
    foods: ["Aromatic spices","The royal presentation","Street-side charm","Festive sweets","The cooking heritage","Flavours of the region"],
    festivals: ["Lamps of celebration","Community ritual","Colour & craft","Grand processions","Music of the season","The festive spirit"],
    temples: ["The sanctum","Stone carvings","Gateway towers","Inner courtyards","Divine iconography","Pilgrims at dawn"],
    historical: ["Ancient lanes","Ruins of the empire","Sacred waters","Living heritage","Archaeological treasure","Echoes of the past"],
    architecture: ["Facade detail","Carved lattices","Courtyard life","Structural marvels","Royal interiors","Master craftsmanship"],
    forts: ["Ramparts & gates","Hilltop views","Palace courtyards","Defensive design","Royal chambers","Sunset over the walls"],
    crafts: ["The artist's hands","Natural pigments","Finishing details","Work in progress","Traditional motifs","A gallery of craft"],
    textiles: ["Woven patterns","At the loom","Zari borders","Dye & thread","Wedding finery","The weaver's heritage"],
    monuments: ["The monument","Memorial inscriptions","Ceremonial grounds","Evening glow","Visitors' view","A national memory"],
    gardens: ["Terraced walks","Fountains & waters","Chinar shade","Lake views","Flowering paths","Morning mist"]
  },

  /* Every state/UT on the map → one of the four cultural regions */
  stateRegion: {
    "Uttar Pradesh": "north", "Rajasthan": "north", "Punjab": "north", "Himachal Pradesh": "north",
    "Uttarakhand": "north", "Delhi": "north", "Haryana": "north", "Jammu & Kashmir": "north",
    "Madhya Pradesh": "north",
    "Tamil Nadu": "south", "Kerala": "south", "Karnataka": "south", "Andhra Pradesh": "south",
    "Telangana": "south", "Puducherry": "south", "Lakshadweep": "south",
    "West Bengal": "east", "Odisha": "east", "Bihar": "east", "Jharkhand": "east",
    "Chhattisgarh": "east", "Assam": "east", "Meghalaya": "east", "Tripura": "east",
    "Mizoram": "east", "Manipur": "east", "Arunachal Pradesh": "east", "Nagaland": "east",
    "Sikkim": "east", "Andaman and Nicobar": "east",
    "Maharashtra": "west", "Gujarat": "west", "Goa": "west",
    "Daman & Diu": "west", "Dadra & Nagar Haveli": "west"
  }
};

/* ---------- Item builders (shared by data-items-*.js) ---------- */
window.H = function (id, name, cat, region, state, city, img, desc, hist, feat, imp, wiki) {
  return { id, name, cat, region, state, city, img, desc, hist, feat, imp, wiki };
};

window.HERITAGE.items = [];
