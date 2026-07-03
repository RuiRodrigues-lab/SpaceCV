/* ============================================================
   Rui Rodrigues — 3D CV · three.js space timeline
   Runs standalone (file://), no build step, no network.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- language ---------------- */
  let lang = "pt";
  try { lang = localStorage.getItem("rr-cv-lang") || "pt"; } catch (e) {}
  if (!["pt", "en", "es"].includes(lang)) lang = "pt";

  const L = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] : v);
  const ui = () => CV.ui[lang];
  let sceneReady = false;

  /* ---------------- DOM ---------------- */
  const $ = (id) => document.getElementById(id);
  const canvas = $("scene");
  const intro = $("intro");
  const hudName = $("hudName");
  const card = $("card");
  const progressFill = $("progressFill");
  const progressDots = $("progressDots");
  const fallbackEl = $("fallback");

  /* ---------------- WebGL guard ---------------- */
  function webglOK() {
    if (typeof THREE === "undefined") return false;
    try {
      const c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext &&
        (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch (e) { return false; }
  }

  /* ---------------- static fallback ---------------- */
  function renderFallback() {
    const c = CV.contact;
    let html = '<div class="fb-inner">';
    html += "<h1>" + c.name + "</h1>";
    html += '<p class="fb-sub">' + ui().subtitle + "</p>";
    html += '<p class="fb-note">' + ui().webglError + "</p>";
    html += "<section><ul>" +
      '<li><a style="color:var(--cyan)" href="' + c.emailHref + '">' + c.email + "</a></li>" +
      '<li><a style="color:var(--cyan)" href="' + c.linkedin + '">' + c.linkedin + "</a></li>" +
      "<li>" + c.phone + "</li></ul></section>";
    for (const stop of CV.stops) {
      if (stop.isContact) continue;
      html += "<section><h2>" + L(stop.title) + "</h2>";
      const meta = [stop.company, L(stop.period)].filter(Boolean).join(" · ");
      if (meta) html += '<p class="fb-meta">' + meta + "</p>";
      if (stop.bullets) html += "<ul>" + L(stop.bullets).map((b) => "<li>" + b + "</li>").join("") + "</ul>";
      if (stop.groups) {
        for (const g of stop.groups) {
          html += '<p class="fb-meta" style="margin-top:10px">' + L(g.h) + "</p>";
          html += "<ul>" + L(g.items).map((b) => "<li>" + b + "</li>").join("") + "</ul>";
        }
      }
      if (stop.tech) html += '<p class="fb-meta" style="margin-top:10px">' + ui().technologies + ": " + stop.tech.join(", ") + "</p>";
      html += "</section>";
    }
    html += "</div>";
    fallbackEl.innerHTML = html;
  }

  function showFallback() {
    renderFallback();
    fallbackEl.classList.remove("hidden");
    canvas.classList.add("hidden");
    intro.classList.add("hidden");
    $("progress").classList.add("hidden");
    hudName.classList.add("hidden");
  }

  /* ================================================================
     UI text & language
     ================================================================ */
  const langButtons = { pt: $("langPt"), en: $("langEn"), es: $("langEs") };

  function applyLang() {
    document.documentElement.lang = lang;
    langButtons.pt.classList.toggle("active", lang === "pt");
    langButtons.en.classList.toggle("active", lang === "en");
    langButtons.es.classList.toggle("active", lang === "es");
    $("introSubtitle").textContent = ui().subtitle;
    $("introAbout").textContent = ui().about;
    $("scrollHint").textContent = ui().scrollHint;
    $("keysHint").textContent = ui().keysHint;
    $("introEmail").href = CV.contact.emailHref;
    $("introLinkedin").href = CV.contact.linkedin;
    buildDots();
    if (activeIndex >= 0) renderCard(activeIndex);
    if (!fallbackEl.classList.contains("hidden")) renderFallback();
    if (sceneReady) refreshLabels();
  }

  langButtons.pt.addEventListener("click", () => setLang("pt"));
  langButtons.en.addEventListener("click", () => setLang("en"));
  langButtons.es.addEventListener("click", () => setLang("es"));
  function setLang(l) {
    if (l === lang) return;
    lang = l;
    try { localStorage.setItem("rr-cv-lang", l); } catch (e) {}
    applyLang();
  }

  /* ================================================================
     Milestone card
     ================================================================ */
  let activeIndex = -1;

  function renderCard(i) {
    const stop = CV.stops[i];
    $("cardYear").textContent = stop.year;

    const badge = $("cardBadge");
    badge.classList.toggle("hidden", !stop.badge);
    if (stop.badge) badge.textContent = L(stop.badge);

    const cur = $("cardCurrent");
    cur.classList.toggle("hidden", !stop.current);
    if (stop.current) cur.textContent = ui().current;

    $("cardTitle").textContent = L(stop.title);
    const meta = [stop.company, L(stop.period)].filter(Boolean).join(" · ");
    $("cardMeta").textContent = meta;
    $("cardMeta").style.display = meta ? "" : "none";

    const bullets = $("cardBullets");
    bullets.innerHTML = "";
    if (stop.bullets) {
      for (const b of L(stop.bullets)) {
        const li = document.createElement("li");
        li.textContent = b;
        bullets.appendChild(li);
      }
    }

    const groups = $("cardGroups");
    groups.innerHTML = "";
    if (stop.groups) {
      for (const g of stop.groups) {
        const h = document.createElement("h4");
        h.textContent = L(g.h);
        groups.appendChild(h);
        const wrap = document.createElement("div");
        wrap.className = "chips";
        for (const item of L(g.items)) {
          const s = document.createElement("span");
          s.textContent = item;
          wrap.appendChild(s);
        }
        groups.appendChild(wrap);
      }
    }

    const techWrap = $("cardTech");
    techWrap.classList.toggle("hidden", !stop.tech);
    if (stop.tech) {
      $("cardTechLabel").textContent = ui().technologies;
      const chips = $("cardTechChips");
      chips.innerHTML = "";
      for (const t of stop.tech) {
        const s = document.createElement("span");
        s.textContent = t;
        chips.appendChild(s);
      }
    }

    const contact = $("cardContact");
    contact.classList.toggle("hidden", !stop.isContact);
    if (stop.isContact) {
      $("contactText").textContent = ui().contactText;
      $("btnEmail").href = CV.contact.emailHref;
      $("btnEmail").querySelector("span").textContent = CV.contact.email;
      $("btnPhone").href = CV.contact.phoneHref;
      $("btnPhone").querySelector("span").textContent = CV.contact.phone;
      $("btnLinkedin").href = CV.contact.linkedin;
      $("btnLinkedin").querySelector("span").textContent = ui().linkedin;
      $("btnRestart").querySelector("span").textContent = ui().restart;
    }

    card.querySelector(".card-scroll").scrollTop = 0;
    card.classList.remove("hidden");
  }

  function hideCard() { card.classList.add("hidden"); }

  $("btnRestart").addEventListener("click", () => { targetT = 0; });
  /* keep card scrolling from steering the camera */
  card.addEventListener("wheel", (e) => e.stopPropagation());
  card.addEventListener("pointermove", (e) => e.stopPropagation());

  /* ================================================================
     Progress dots
     ================================================================ */
  const ERA_CSS = { pre: "#ffb54d", switch: "#c77dff", dev: "#4dd2ff", knowledge: "#8effc1", contact: "#ff7ab8" };
  let dotEls = [];

  function stopLabel(stop) {
    if (lang === "en" && stop.labelEn) return stop.labelEn;
    if (lang === "es" && stop.labelEs) return stop.labelEs;
    return stop.label;
  }

  function buildDots() {
    progressDots.innerHTML = "";
    dotEls = [];
    const n = CV.stops.length;
    CV.stops.forEach((stop, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.style.left = (n === 1 ? 50 : (i / (n - 1)) * 100) + "%";
      b.style.setProperty("--dot", ERA_CSS[stop.era]);
      b.setAttribute("aria-label", stop.year + " " + stopLabel(stop));
      const tip = document.createElement("span");
      tip.className = "tip";
      tip.textContent = stop.year + " · " + stopLabel(stop);
      b.appendChild(tip);
      b.addEventListener("click", () => { targetT = clampT(stopT(i) - 0.026); });
      progressDots.appendChild(b);
      dotEls.push(b);
    });
  }

  /* ================================================================
     THREE scene
     ================================================================ */
  if (!webglOK()) { showFallback(); applyLangBasics(); return; }

  function applyLangBasics() {
    /* minimal lang wiring for fallback mode */
    langButtons.pt.classList.toggle("active", lang === "pt");
    langButtons.en.classList.toggle("active", lang === "en");
    langButtons.es.classList.toggle("active", lang === "es");
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  } catch (e) { showFallback(); return; }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x04060f);
  scene.fog = new THREE.Fog(0x04060f, 40, 210);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 600);

  /* ---------------- the journey path ---------------- */
  const ctrl = [];
  const SEGS = 18;
  for (let i = 0; i <= SEGS; i++) {
    ctrl.push(new THREE.Vector3(
      Math.sin(i * 0.62) * 9,
      Math.cos(i * 0.45) * 3.2,
      -i * 13
    ));
  }
  const curve = new THREE.CatmullRomCurve3(ctrl, false, "catmullrom", 0.5);

  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 400, 0.055, 8, false),
    new THREE.MeshBasicMaterial({
      color: 0x3f8fe0, transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
  );
  scene.add(tube);

  /* faint wide halo around the path */
  const tubeHalo = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 200, 0.28, 8, false),
    new THREE.MeshBasicMaterial({
      color: 0x1d4fa0, transparent: true, opacity: 0.09,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
  );
  scene.add(tubeHalo);

  /* ---------------- starfield ---------------- */
  let starTex = null;
  const starMats = []; /* for twinkling */
  function makeStars(count, size, spread) {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const tints = [
      [0.75, 0.85, 1.0], [1.0, 1.0, 1.0], [1.0, 0.88, 0.7], [0.7, 1.0, 0.9],
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      pos[i * 3 + 2] = 60 - Math.random() * 420;
      const t = tints[(Math.random() * tints.length) | 0];
      const v = 0.55 + Math.random() * 0.45;
      col[i * 3] = t[0] * v; col[i * 3 + 1] = t[1] * v; col[i * 3 + 2] = t[2] * v;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size, vertexColors: true, transparent: true, opacity: 0.9,
      sizeAttenuation: true, depthWrite: false, fog: false,
      map: starTex, blending: THREE.AdditiveBlending,
    });
    starMats.push({ mat, phase: Math.random() * Math.PI * 2 });
    return new THREE.Points(geo, mat);
  }

  /* ---------------- glow texture helper ---------------- */
  function glowTexture(inner, outer) {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, inner);
    grad.addColorStop(1, outer);
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }

  starTex = glowTexture("rgba(255,255,255,1)", "rgba(255,255,255,0)");
  scene.add(makeStars(1400, 0.7, 420));
  scene.add(makeStars(1200, 0.7, 420));
  scene.add(makeStars(400, 1.3, 480));
  scene.add(makeStars(300, 1.3, 480));

  /* procedural banded planet texture (equirectangular) */
  function planetTexture(hex) {
    const c = document.createElement("canvas");
    c.width = 256; c.height = 128;
    const g = c.getContext("2d");
    g.fillStyle = "#" + ("000000" + hex.toString(16)).slice(-6);
    g.fillRect(0, 0, 256, 128);
    for (let y = 0; y < 128;) {
      const h = 5 + Math.random() * 16;
      const a = Math.random() * 0.22;
      g.fillStyle = Math.random() < 0.5
        ? "rgba(255,255,255," + (a * 0.45).toFixed(3) + ")"
        : "rgba(0,0,25," + a.toFixed(3) + ")";
      g.fillRect(0, y, 256, h);
      y += h;
    }
    for (let i = 0; i < 260; i++) {
      g.fillStyle = "rgba(255,255,255," + (Math.random() * 0.09).toFixed(3) + ")";
      g.beginPath();
      g.arc(Math.random() * 256, Math.random() * 128, 0.3 + Math.random() * 1.8, 0, Math.PI * 2);
      g.fill();
    }
    const shade = g.createLinearGradient(0, 0, 0, 128);
    shade.addColorStop(0, "rgba(255,255,255,0.18)");
    shade.addColorStop(0.55, "rgba(255,255,255,0)");
    shade.addColorStop(1, "rgba(0,0,18,0.4)");
    g.fillStyle = shade;
    g.fillRect(0, 0, 256, 128);
    return new THREE.CanvasTexture(c);
  }

  /* nebulas — big soft colour clouds for depth */
  const NEBULAS = [
    { color: "rgba(64,110,255,0.55)", pos: [-70, 30, -60], scale: 150 },
    { color: "rgba(160,70,255,0.45)", pos: [80, -25, -130], scale: 170 },
    { color: "rgba(0,200,255,0.4)", pos: [-60, -35, -210], scale: 150 },
    { color: "rgba(255,140,80,0.35)", pos: [70, 40, -20], scale: 130 },
    { color: "rgba(255,80,170,0.4)", pos: [30, 25, -260], scale: 170 },
  ];
  const nebulaMats = [];
  for (const n of NEBULAS) {
    const mat = new THREE.SpriteMaterial({
      map: glowTexture(n.color, "rgba(0,0,0,0)"),
      blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.16,
      fog: false,
    });
    const s = new THREE.Sprite(mat);
    s.position.set(n.pos[0], n.pos[1], n.pos[2]);
    s.scale.setScalar(n.scale);
    scene.add(s);
    nebulaMats.push({ mat, base: 0.16, ph: Math.random() * Math.PI * 2 });
  }

  /* ---------------- deep-space sky (follows the camera) ---------------- */
  const skyGroup = new THREE.Group();

  function skyTexture() {
    const c = document.createElement("canvas");
    c.width = 32; c.height = 512;
    const g = c.getContext("2d");
    const gr = g.createLinearGradient(0, 0, 0, 512);
    gr.addColorStop(0, "#0b1233");
    gr.addColorStop(0.35, "#060a1c");
    gr.addColorStop(0.65, "#04060f");
    gr.addColorStop(1, "#030309");
    g.fillStyle = gr;
    g.fillRect(0, 0, 32, 512);
    return new THREE.CanvasTexture(c);
  }
  skyGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(480, 24, 16),
    new THREE.MeshBasicMaterial({
      map: skyTexture(), side: THREE.BackSide, fog: false, depthWrite: false,
    })
  ));

  /* Milky Way — a tilted band of dense faint stars plus a soft haze */
  (function makeGalaxy() {
    const count = 2400;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const v = new THREE.Vector3();
    const tilt = new THREE.Euler(0.45, 0, 0.5);
    for (let i = 0; i < count; i++) {
      const u = Math.random() * Math.PI * 2;
      const spread = (Math.random() + Math.random() + Math.random() - 1.5) * 36;
      v.set(Math.cos(u) * 430, spread, Math.sin(u) * 430).applyEuler(tilt);
      pos[i * 3] = v.x; pos[i * 3 + 1] = v.y; pos[i * 3 + 2] = v.z;
      const w = 0.35 + Math.random() * 0.5;
      col[i * 3] = w * (0.75 + Math.random() * 0.25);
      col[i * 3 + 1] = w * (0.75 + Math.random() * 0.2);
      col[i * 3 + 2] = w;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    skyGroup.add(new THREE.Points(geo, new THREE.PointsMaterial({
      size: 1.6, vertexColors: true, transparent: true, opacity: 0.55,
      map: starTex, blending: THREE.AdditiveBlending, depthWrite: false,
      sizeAttenuation: true, fog: false,
    })));
    for (let i = 0; i < 7; i++) {
      const u = (i / 7) * Math.PI * 2;
      const s = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTexture("rgba(150,170,255,0.4)", "rgba(0,0,0,0)"),
        blending: THREE.AdditiveBlending, depthWrite: false, transparent: true,
        opacity: 0.1, fog: false,
      }));
      v.set(Math.cos(u) * 430, 0, Math.sin(u) * 430).applyEuler(tilt);
      s.position.copy(v);
      s.scale.setScalar(240);
      skyGroup.add(s);
    }
  })();
  scene.add(skyGroup);

  /* fine dust hugging the flight corridor — sells the sense of speed */
  (function makeDust() {
    const count = 600;
    const pos = new Float32Array(count * 3);
    const p = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      curve.getPointAt(Math.random(), p);
      pos[i * 3] = p.x + (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = p.y + (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = p.z + (Math.random() - 0.5) * 22;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(geo, new THREE.PointsMaterial({
      size: 0.16, color: 0x91a8cc, transparent: true, opacity: 0.55,
      map: starTex, blending: THREE.AdditiveBlending, depthWrite: false,
      sizeAttenuation: true,
    })));
  })();

  /* ---------------- milestones ---------------- */
  const N = CV.stops.length;
  const T0 = 0.1, T1 = 0.96;
  const stopT = (i) => T0 + (i * (T1 - T0)) / (N - 1);

  const UP = new THREE.Vector3(0, 1, 0);
  const nodes = []; /* { group, sphere, ring, glow, labelSprite, pos, t, era } */
  /* moons per stop (deterministic variety) */
  const MOON_PLAN = [0, 1, 2, 0, 1, 0, 1, 2, 1, 0, 1, 0, 2, 1];

  function labelTexture(stop) {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 160;
    const g = c.getContext("2d");
    g.clearRect(0, 0, 512, 160);
    g.textAlign = "center";
    g.shadowColor = "rgba(0,0,0,0.85)";
    g.shadowBlur = 10;
    g.fillStyle = "#f2f7ff";
    g.font = "700 44px 'Segoe UI', Arial, sans-serif";
    g.fillText(stopLabel(stop), 256, 72, 490);
    g.fillStyle = "#" + ("000000" + CV.eras[stop.era].toString(16)).slice(-6);
    g.font = "600 30px 'Segoe UI', Arial, sans-serif";
    g.fillText(stop.year, 256, 120, 490);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    return tex;
  }

  CV.stops.forEach((stop, i) => {
    const t = stopT(i);
    const p = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);
    const side = new THREE.Vector3().crossVectors(tangent, UP).normalize();
    const dir = i % 2 === 0 ? 1 : -1;
    const pos = p.clone().addScaledVector(side, 2.7 * dir).addScaledVector(UP, 0.5);

    const group = new THREE.Group();
    group.position.copy(pos);

    const color = CV.eras[stop.era];

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshBasicMaterial({ map: planetTexture(color) })
    );
    sphere.rotation.z = (Math.random() - 0.5) * 0.5;
    sphere.userData.stopIndex = i;
    group.add(sphere);

    /* soft atmosphere rim */
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(0.62, 32, 32),
      new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.22, side: THREE.BackSide,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
    );
    group.add(atmo);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.95, 0.03, 8, 48),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.75 })
    );
    ring.rotation.x = Math.PI / 2.4;
    ring.rotation.y = Math.random() * Math.PI;
    group.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.28, 0.015, 8, 56),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.28 })
    );
    ring2.rotation.x = Math.PI / 2.1;
    ring2.rotation.y = Math.random() * Math.PI;
    group.add(ring2);

    const moons = [];
    for (let m = 0; m < MOON_PLAN[i % MOON_PLAN.length]; m++) {
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(0.09 + Math.random() * 0.05, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xd9e3f2 })
      );
      group.add(moon);
      moons.push({
        m: moon,
        r: 1.45 + m * 0.45 + Math.random() * 0.2,
        sp: 0.5 + Math.random() * 0.7,
        ph: Math.random() * Math.PI * 2,
      });
    }

    const glowMat = new THREE.SpriteMaterial({
      map: glowTexture("rgba(255,255,255,0.85)", "rgba(0,0,0,0)"),
      color, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.55,
    });
    const glow = new THREE.Sprite(glowMat);
    glow.scale.setScalar(4.2);
    group.add(glow);

    const labelMat = new THREE.SpriteMaterial({
      map: labelTexture(stop), transparent: true, depthWrite: false,
    });
    const labelSprite = new THREE.Sprite(labelMat);
    labelSprite.position.y = 1.7;
    group.add(labelSprite);

    /* connector from path to node */
    const connGeo = new THREE.BufferGeometry().setFromPoints([
      p, pos.clone().addScaledVector(UP, -0.35),
    ]);
    const conn = new THREE.Line(connGeo, new THREE.LineBasicMaterial({
      color, transparent: true, opacity: 0.35,
    }));
    scene.add(conn);

    scene.add(group);
    nodes.push({ group, sphere, atmo, ring, ring2, moons, glow, labelSprite, pos, t, era: stop.era });
  });
  sceneReady = true;

  function updateLabelScales() {
    const w = window.innerWidth < 761 ? 3.1 : 4.6;
    for (const n of nodes) n.labelSprite.scale.set(w, w * 0.3125, 1);
  }
  updateLabelScales();

  /* energy particles flowing along the path */
  const FLOW_N = 80;
  const flowGeo = new THREE.BufferGeometry();
  flowGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(FLOW_N * 3), 3));
  const flowOff = [];
  for (let i = 0; i < FLOW_N; i++) flowOff.push(Math.random());
  scene.add(new THREE.Points(flowGeo, new THREE.PointsMaterial({
    size: 0.34, map: starTex, color: 0x9fd8ff, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
  })));
  const flowV = new THREE.Vector3();

  /* warm destination star beyond the last stop */
  const sun = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture("rgba(255,236,200,0.95)", "rgba(0,0,0,0)"),
    blending: THREE.AdditiveBlending, depthWrite: false, transparent: true,
    opacity: 0.4, fog: false,
  }));
  sun.position.copy(curve.getPointAt(1)).addScaledVector(curve.getTangentAt(1), 60);
  sun.scale.setScalar(120);
  scene.add(sun);

  /* occasional shooting stars */
  const shooters = [];
  for (let i = 0; i < 3; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({
      map: starTex, color: 0xd8ecff, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
    }));
    s.scale.set(5.5, 0.1, 1);
    scene.add(s);
    shooters.push({ s, life: -1, vel: new THREE.Vector3() });
  }
  let nextShooter = 4;
  const fwdV = new THREE.Vector3();

  function refreshLabels() {
    nodes.forEach((n, i) => {
      const old = n.labelSprite.material.map;
      n.labelSprite.material.map = labelTexture(CV.stops[i]);
      n.labelSprite.material.needsUpdate = true;
      if (old) old.dispose();
    });
  }

  /* ================================================================
     Navigation state
     ================================================================ */
  let targetT = 0;
  let currentT = 0;
  let snapTimer = null;

  /* park the camera a little behind a stop so its node stays in frame */
  const BACK = 0.031;
  /* the journey ends at the final planet — never travel past its viewpoint */
  const MAX_T = Math.max(0, nodes[N - 1].t - BACK);
  function clampT(v) { return Math.max(0, Math.min(MAX_T, v)); }
  const stopView = (i) => clampT(nodes[i].t - BACK);

  function scheduleSnap() {
    if (snapTimer) clearTimeout(snapTimer);
    snapTimer = setTimeout(() => {
      let best = -1, bestD = 0.03;
      nodes.forEach((n, i) => {
        const d = Math.abs(targetT - stopView(i));
        if (d < bestD) { bestD = d; best = i; }
      });
      if (best >= 0) targetT = stopView(best);
    }, 850);
  }

  window.addEventListener("wheel", (e) => {
    const dy = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
    targetT = clampT(targetT + dy * 0.00013);
    scheduleSnap();
  }, { passive: true });

  /* drag (mouse + touch via pointer events) */
  let dragging = false, dragMoved = 0, lastY = 0, downX = 0;
  canvas.addEventListener("pointerdown", (e) => {
    dragging = true; dragMoved = 0;
    lastY = e.clientY; downX = e.clientX;
    try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!dragging) { hoverCheck(e); return; }
    const dy = lastY - e.clientY;
    lastY = e.clientY;
    dragMoved += Math.abs(dy) + Math.abs(e.clientX - downX) * 0.05;
    targetT = clampT(targetT + dy * 0.00042);
    scheduleSnap();
  });
  canvas.addEventListener("pointerup", (e) => {
    dragging = false;
    if (dragMoved < 6) clickCheck(e);
  });
  canvas.addEventListener("pointercancel", () => { dragging = false; });

  /* keyboard */
  function nearestIndex(t) {
    let best = 0, bestD = Infinity;
    nodes.forEach((n, i) => {
      const d = Math.abs(t - n.t);
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  }
  window.addEventListener("keydown", (e) => {
    const k = e.key;
    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(k)) {
      e.preventDefault();
      const i = nearestIndex(targetT + 0.0001);
      targetT = stopView(Math.min(N - 1, targetT >= stopView(i) - 0.005 ? i + 1 : i));
    } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(k)) {
      e.preventDefault();
      const i = nearestIndex(targetT - 0.0001);
      targetT = stopView(Math.max(0, targetT <= stopView(i) + 0.005 ? i - 1 : i));
    } else if (k === "Home") { targetT = 0; }
    else if (k === "End") { targetT = MAX_T; }
  });

  /* raycasting for node clicks / hover */
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const sphereList = nodes.map((n) => n.sphere);

  function setPointer(e) {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }
  function hoverCheck(e) {
    setPointer(e);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(sphereList, false);
    canvas.style.cursor = hit.length ? "pointer" : "grab";
  }
  function clickCheck(e) {
    setPointer(e);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(sphereList, false);
    if (hit.length) targetT = stopView(hit[0].object.userData.stopIndex);
  }

  /* ================================================================
     Frame loop
     ================================================================ */
  const lookAhead = new THREE.Vector3();
  const camPos = new THREE.Vector3();
  const lookTarget = new THREE.Vector3();
  const tmpRight = new THREE.Vector3();
  const bankA = new THREE.Vector3();
  const bankB = new THREE.Vector3();
  const bankR = new THREE.Vector3();
  let roll = 0;
  const clock = new THREE.Clock();

  function setActive(i) {
    if (i === activeIndex) return;
    activeIndex = i;
    if (i >= 0) renderCard(i); else hideCard();
    dotEls.forEach((d, j) => d.classList.toggle("active", j === i));
  }

  let introHidden = false;
  let introDim = 0.3; /* planets stay soft while the intro is up */

  function frame() {
    requestAnimationFrame(frame);
    if (vpW !== window.innerWidth || vpH !== window.innerHeight) syncViewport();
    const dt = Math.min(clock.getDelta(), 0.05);
    const time = clock.elapsedTime;

    /* ease camera towards target */
    currentT += (targetT - currentT) * Math.min(1, dt * 3.2);
    if (Math.abs(targetT - currentT) < 0.00004) currentT = targetT;

    const ct = clampT(currentT);
    curve.getPointAt(ct, camPos);
    camPos.y += 0.55;
    curve.getPointAt(Math.min(1, ct + 0.035), lookAhead);

    /* find nearest stop for card + look bias
       (window sits mostly behind the node: camera parks at t - BACK) */
    let near = -1, nearD = 0.026;
    for (let i = 0; i < N; i++) {
      const d = Math.abs(ct - (nodes[i].t - 0.024));
      if (d < nearD) { nearD = d; near = i; }
    }

    lookTarget.copy(lookAhead);
    if (near >= 0) {
      const prox = 1 - nearD / 0.026; /* 0..1 */
      lookTarget.lerp(nodes[near].pos, prox * 0.72);
      const isMobile = window.innerWidth < 761;
      if (isMobile) {
        /* centre the node horizontally and keep it above the bottom sheet */
        lookTarget.lerp(nodes[near].pos, prox * 0.75);
        lookTarget.y -= prox * 1.4;
      } else {
        /* shift scene left so the card on the right doesn't cover the node */
        tmpRight.subVectors(lookTarget, camPos).cross(UP).normalize();
        lookTarget.addScaledVector(tmpRight, prox * 1.2);
      }
    }

    /* subtle idle sway */
    camPos.x += Math.sin(time * 0.4) * 0.12;
    camPos.y += Math.cos(time * 0.55) * 0.08;

    camera.position.copy(camPos);
    camera.lookAt(lookTarget);
    skyGroup.position.copy(camPos);

    /* bank gently into the curves */
    curve.getTangentAt(ct, bankA);
    curve.getTangentAt(Math.min(1, ct + 0.02), bankB);
    bankR.crossVectors(bankA, UP).normalize();
    const turn = THREE.MathUtils.clamp(bankB.sub(bankA).dot(bankR) * 4, -0.18, 0.18);
    roll += (-turn - roll) * Math.min(1, dt * 2);
    camera.rotateZ(roll);

    /* node animation (planets soften while the intro overlay is showing) */
    introDim += ((introHidden ? 1 : 0.3) - introDim) * Math.min(1, dt * 3);
    for (let i = 0; i < N; i++) {
      const n = nodes[i];
      n.sphere.rotation.y += dt * 0.25;
      n.ring.rotation.z += dt * 0.5;
      n.ring.rotation.x = Math.PI / 2.4 + Math.sin(time * 0.7 + i) * 0.15;
      n.ring2.rotation.z -= dt * 0.3;
      for (const mo of n.moons) {
        const a = time * mo.sp + mo.ph;
        mo.m.position.set(Math.cos(a) * mo.r, Math.sin(a) * mo.r * 0.28, Math.sin(a) * mo.r);
      }
      const active = i === near;
      const pulse = active ? 1 + Math.sin(time * 3.2) * 0.09 : 1;
      const s = pulse * (active ? 1.25 : 1);
      n.sphere.scale.setScalar(s);
      n.atmo.scale.setScalar(s);
      n.glow.material.opacity = (active ? 0.85 : 0.5) * introDim;
      n.glow.scale.setScalar(active ? 5.4 + Math.sin(time * 3.2) * 0.4 : 4.2);
      n.labelSprite.material.opacity = introDim;
      n.group.position.y = n.pos.y + Math.sin(time * 0.8 + i * 1.7) * 0.1;
    }

    /* twinkling stars */
    for (const sm of starMats) {
      sm.mat.opacity = 0.72 + Math.sin(time * 1.7 + sm.phase) * 0.24;
    }

    /* breathing nebulas */
    for (const nb of nebulaMats) {
      nb.mat.opacity = nb.base * (0.8 + Math.sin(time * 0.25 + nb.ph) * 0.2);
    }

    /* energy particles along the path */
    const fArr = flowGeo.attributes.position.array;
    for (let i = 0; i < FLOW_N; i++) {
      const ft = (flowOff[i] + time * 0.011) % 1;
      curve.getPointAt(ft, flowV);
      fArr[i * 3] = flowV.x; fArr[i * 3 + 1] = flowV.y; fArr[i * 3 + 2] = flowV.z;
    }
    flowGeo.attributes.position.needsUpdate = true;

    /* shooting stars */
    nextShooter -= dt;
    if (nextShooter <= 0) {
      const sh = shooters.find((x) => x.life < 0);
      if (sh) {
        camera.getWorldDirection(fwdV);
        sh.s.position.copy(camera.position).addScaledVector(fwdV, 60)
          .add(new THREE.Vector3(
            (Math.random() - 0.5) * 70,
            10 + Math.random() * 24,
            (Math.random() - 0.5) * 30
          ));
        sh.vel.set(-(14 + Math.random() * 14), -(4 + Math.random() * 6), 0);
        sh.s.material.rotation = Math.atan2(sh.vel.y, sh.vel.x);
        sh.life = 0;
      }
      nextShooter = 4 + Math.random() * 6;
    }
    for (const sh of shooters) {
      if (sh.life < 0) continue;
      sh.life += dt;
      sh.s.position.addScaledVector(sh.vel, dt);
      sh.s.material.opacity = Math.sin(Math.PI * Math.min(1, sh.life / 1.1)) * 0.9;
      if (sh.life >= 1.1) { sh.life = -1; sh.s.material.opacity = 0; }
    }

    /* UI sync */
    setActive(near);
    progressFill.style.width = ((ct / MAX_T) * 100).toFixed(2) + "%";

    const shouldHideIntro = targetT > 0.018 || ct > 0.018;
    if (shouldHideIntro !== introHidden) {
      introHidden = shouldHideIntro;
      intro.classList.toggle("hidden-soft", introHidden);
      hudName.classList.toggle("hidden-soft", !introHidden);
    }

    renderer.render(scene, camera);
  }

  /* viewport sync — driven by both the resize event and a per-frame guard,
     so a missed event (backgrounded tab, in-app browser) can never leave
     the canvas at a stale or 0x0 size */
  let vpW = 0, vpH = 0;
  function syncViewport() {
    vpW = window.innerWidth; vpH = window.innerHeight;
    camera.aspect = vpW / vpH;
    camera.updateProjectionMatrix();
    renderer.setSize(vpW, vpH);
    updateLabelScales();
  }
  window.addEventListener("resize", syncViewport);

  /* ---------------- boot ---------------- */
  applyLang();
  hudName.classList.add("hidden-soft");
  frame();
})();
