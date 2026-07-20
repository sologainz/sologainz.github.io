(() => {
  "use strict";

  const SPRITES = {
    idle: {
      fps: 8,
      frames: [
        "media/player/idle/Idle01.png",
        "media/player/idle/Idle02.png",
        "media/player/idle/Idle03.png",
        "media/player/idle/Idle04.png",
        "media/player/idle/Idle05.png",
        "media/player/idle/Idle06.png",
        "media/player/idle/Idle07.png",
      ],
    },
    walk: {
      fps: 10,
      frames: [
        "media/player/walk/Walk01.png",
        "media/player/walk/Walk02.png",
        "media/player/walk/Walk03.png",
        "media/player/walk/Walk04.png",
        "media/player/walk/Walk05.png",
        "media/player/walk/Walk06.png",
        "media/player/walk/Walk07.png",
        "media/player/walk/Walk08.png",
      ],
    },
    run: {
      fps: 12,
      frames: [
        "media/player/run/Run01.png",
        "media/player/run/Run02.png",
        "media/player/run/Run03.png",
        "media/player/run/Run04.png",
        "media/player/run/Run05.png",
        "media/player/run/Run06.png",
        "media/player/run/Run07.png",
        "media/player/run/Run08.png",
      ],
    },
    punch: {
      fps: 12,
      frames: [
        "media/player/punch/Punch0101.png",
        "media/player/punch/Punch0102.png",
        "media/player/punch/Punch0103.png",
        "media/player/punch/Punch0104.png",
        "media/player/punch/Punch0105.png",
        "media/player/punch/Punch0106.png",
      ],
    },
    kick: {
      fps: 12,
      frames: [
        "media/player/kick/Kick0101.png",
        "media/player/kick/Kick0102.png",
        "media/player/kick/Kick0103.png",
        "media/player/kick/Kick0104.png",
        "media/player/kick/Kick0105.png",
        "media/player/kick/Kick0106.png",
        "media/player/kick/Kick0107.png",
        "media/player/kick/Kick0108.png",
        "media/player/kick/Kick0109.png",
      ],
    },
    kick2: {
      fps: 12,
      frames: [
        "media/player/kick2/Kick0201.png",
        "media/player/kick2/Kick0202.png",
        "media/player/kick2/Kick0203.png",
        "media/player/kick2/Kick0204.png",
        "media/player/kick2/Kick0205.png",
        "media/player/kick2/Kick0206.png",
        "media/player/kick2/Kick0207.png",
        "media/player/kick2/Kick0208.png",
      ],
    },
    kick3: {
      fps: 12,
      frames: [
        "media/player/kick3/Kick0301.png",
        "media/player/kick3/Kick0302.png",
        "media/player/kick3/Kick0303.png",
        "media/player/kick3/Kick0304.png",
        "media/player/kick3/Kick0305.png",
        "media/player/kick3/Kick0306.png",
        "media/player/kick3/Kick0307.png",
        "media/player/kick3/Kick0308.png",
        "media/player/kick3/Kick0309.png",
      ],
    },
    punch3: {
      fps: 12,
      frames: [
        "media/player/punch3/Punch0301.png",
        "media/player/punch3/Punch0302.png",
        "media/player/punch3/Punch0303.png",
        "media/player/punch3/Punch0304.png",
        "media/player/punch3/Punch0305.png",
        "media/player/punch3/Punch0306.png",
        "media/player/punch3/Punch0307.png",
      ],
    },
    stunned: {
      fps: 6,
      frames: [
        "media/player/stunned/Stunned01.png",
        "media/player/stunned/Stunned02.png",
        "media/player/stunned/Stunned03.png",
        "media/player/stunned/Stunned04.png",
        "media/player/stunned/Stunned05.png",
        "media/player/stunned/Stunned06.png",
        "media/player/stunned/Stunned07.png",
      ],
    },
    hit: {
      fps: 10,
      frames: [
        "media/player/hit/Hit01.png",
        "media/player/hit/Hit02.png",
        "media/player/hit/Hit03.png",
      ],
    },
    jump: {
      fps: 8,
      frames: [
        "media/player/jump/Jump01.png",
        "media/player/jump/Jump02.png",
        "media/player/jump/Jump03.png",
      ],
    },
    slide: {
      fps: 12,
      frames: [
        "media/player/slide/Slide01.png",
        "media/player/slide/Slide02.png",
        "media/player/slide/Slide03.png",
        "media/player/slide/Slide04.png",
      ],
    },
    sprint: {
      fps: 14,
      frames: [
        "media/player/sprint/Sprint01.png",
        "media/player/sprint/Sprint02.png",
        "media/player/sprint/Sprint03.png",
        "media/player/sprint/Sprint04.png",
        "media/player/sprint/Sprint05.png",
        "media/player/sprint/Sprint06.png",
      ],
    },
    throw: {
      fps: 12,
      frames: [
        "media/player/throw/ThrowOverarm01.png",
        "media/player/throw/ThrowOverarm02.png",
        "media/player/throw/ThrowOverarm03.png",
        "media/player/throw/ThrowOverarm04.png",
        "media/player/throw/ThrowOverarm05.png",
      ],
    },
    knockback: {
      fps: 12,
      frames: [
        "media/player/knockback/Knockback01.png",
        "media/player/knockback/Knockback02.png",
        "media/player/knockback/Knockback03.png",
        "media/player/knockback/Knockback04.png",
        "media/player/knockback/Knockback05.png",
        "media/player/knockback/Knockback06.png",
      ],
    },
    die: {
      fps: 12,
      frames: [
        "media/player/die/Die01.png",
        "media/player/die/Die02.png",
        "media/player/die/Die03.png",
        "media/player/die/Die04.png",
        "media/player/die/Die05.png",
        "media/player/die/Die06.png",
        "media/player/die/Die07.png",
        "media/player/die/Die08.png",
        "media/player/die/Die09.png",
      ],
    },
    getup: {
      fps: 10,
      frames: [
        "media/player/getup/GetUp01.png",
        "media/player/getup/GetUp02.png",
        "media/player/getup/GetUp03.png",
      ],
    },
    roll: {
      fps: 12,
      frames: [
        "media/player/roll/Roll01.png",
        "media/player/roll/Roll02.png",
        "media/player/roll/Roll03.png",
        "media/player/roll/Roll04.png",
        "media/player/roll/Roll05.png",
        "media/player/roll/Roll06.png",
        "media/player/roll/Roll07.png",
        "media/player/roll/Roll08.png",
        "media/player/roll/Roll09.png",
        "media/player/roll/Roll10.png",
      ],
    },
  };

  // Loot chest sprites (idle loop + one-shot open) per tier. Frame folders live
  // under media/chest/<dir>/1..5.png — wooden uses the unprefixed idle/open.
  const CHEST_DIRS = {
    wood: { idle: "idle", open: "open" },
    iron: { idle: "iron-idle", open: "iron-open" },
    gold: { idle: "gold-idle", open: "gold-open" },
    diamond: { idle: "diamond-idle", open: "diamond-open" },
  };
  const chestFrames = (dir) =>
    [1, 2, 3, 4, 5].map((n) => `media/chest/${dir}/${n}.png`);
  Object.entries(CHEST_DIRS).forEach(([tier, dirs]) => {
    SPRITES[`chest-${tier}-idle`] = { fps: 6, frames: chestFrames(dirs.idle) };
    SPRITES[`chest-${tier}-open`] = { fps: 12, frames: chestFrames(dirs.open) };
  });

  const cache = new Map();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Per-section hunter journey. Each stage is one forward scroll step
  // ({ x: road position, anim }). Sections 0–4 take four steps and then a
  // sprint-off to the next section; the final section walks to the centre of
  // the road and falls asleep with a "Zzz".
  // Each section is a single "run across" leg: the hunter enters at the left
  // running, and one forward scroll runs him off to the right while the camera
  // advances to the next section — a continuous sprint toward the final panel.
  const RUN_LEG = { scale: 4.4, stages: [{ x: "18%", anim: "run" }] };
  const JOURNEY = {
    0: RUN_LEG,
    1: RUN_LEG,
    2: RUN_LEG,
    3: RUN_LEG,
    4: RUN_LEG,
    5: {
      scale: 4.4,
      final: true,
      stages: [{ x: "50%", anim: "stunned", sleep: true }],
    },
  };

  function loadImage(src) {
    if (cache.has(src)) return cache.get(src);
    const p = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(src));
      img.src = src;
    });
    cache.set(src, p);
    return p;
  }

  async function loadAnim(key) {
    const def = SPRITES[key];
    if (!def) throw new Error(key);
    const images = [];
    for (const src of def.frames) {
      try {
        images.push(await loadImage(src));
      } catch (_) {
        /* skip missing frame */
      }
    }
    if (!images.length) throw new Error(`empty:${key}`);
    return { fps: def.fps, images };
  }

  class SpritePlayer {
    constructor(canvas, { scale = 3.5, flip = false } = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.scale = scale;
      this.flip = flip;
      this.anim = null;
      this.frame = 0;
      this.acc = 0;
      this.loop = true;
      this.running = false;
      this._raf = 0;
      this._last = 0;
    }

    async play(key, { loop = true } = {}) {
      this.anim = await loadAnim(key);
      this.loop = loop;
      this.frame = 0;
      this.acc = 0;
      this.draw();
      if (!this.running) this.start();
    }

    start() {
      if (this.running || reduceMotion) {
        this.draw();
        return;
      }
      this.running = true;
      this._last = performance.now();
      const tick = (now) => {
        if (!this.running) return;
        const dt = now - this._last;
        this._last = now;
        this.update(dt);
        this.draw();
        this._raf = requestAnimationFrame(tick);
      };
      this._raf = requestAnimationFrame(tick);
    }

    stop() {
      this.running = false;
      if (this._raf) cancelAnimationFrame(this._raf);
      this._raf = 0;
    }

    update(dt) {
      if (!this.anim) return;
      const ms = 1000 / this.anim.fps;
      const n = this.anim.images.length;
      this.acc += dt;
      while (this.acc >= ms) {
        this.acc -= ms;
        if (this.loop) {
          this.frame = (this.frame + 1) % n;
        } else if (this.frame < n - 1) {
          this.frame += 1;
        }
      }
    }

    draw() {
      if (!this.anim) return;
      const img = this.anim.images[this.frame];
      const w = Math.round(img.naturalWidth * this.scale);
      const h = Math.round(img.naturalHeight * this.scale);
      if (this.canvas.width !== w || this.canvas.height !== h) {
        this.canvas.width = w;
        this.canvas.height = h;
      }
      const ctx = this.ctx;
      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = false;
      ctx.save();
      if (this.flip) {
        ctx.translate(w, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(img, 0, 0, w, h);
      ctx.restore();
    }
  }

  // ── Horizontal scroller ──────────────────────────────────────────────────
  class HorizontalHunt {
    constructor(track) {
      this.track = track;
      this.panels = [...track.querySelectorAll(".panel")];
      this.fill = document.getElementById("scrollFill");
      this.hint = document.getElementById("scrollHint");
      this.dots = document.getElementById("dots");
      this.index = 0;
      this._prevIndex = 0;
      this._busy = false;
      // The hunter walks a multi-step journey inside each section. `stage` is
      // the current step within the active section; each forward scroll bumps
      // it, and only once the last stage is passed does the camera advance.
      this.stage = 0;
      this._journey = {};
      this._onStage = null;
      this._onExit = null;
      this._hintHidden = false;
      this._storeKey = "sg-panel";
      this._buildDots();
      this._restore();
      this._bind();
      this._onScroll();
    }

    _restore() {
      let i = 0;
      try {
        i = parseInt(sessionStorage.getItem(this._storeKey) || "0", 10) || 0;
      } catch (_) {}
      if (i <= 0 || i >= this.panels.length) return;
      // Instant jump (bypass CSS smooth scroll) so refresh keeps your section.
      const prev = this.track.style.scrollBehavior;
      this.track.style.scrollBehavior = "auto";
      this.track.scrollLeft = i * this.track.clientWidth;
      this.index = i;
      requestAnimationFrame(() => {
        this.track.style.scrollBehavior = prev;
      });
    }

    _buildDots() {
      if (!this.dots) return;
      this.dots.innerHTML = "";
      this.panels.forEach((_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", `Section ${i + 1}`);
        b.addEventListener("click", () => this.go(i));
        this.dots.appendChild(b);
      });
    }

    _bind() {
      const t = this.track;

      t.addEventListener("scroll", () => this._onScroll(), { passive: true });

      // Map mouse / trackpad wheel → sideways navigation (one panel per gesture)
      let wheelLock = false;
      t.addEventListener(
        "wheel",
        (e) => {
          const delta =
            Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
          if (Math.abs(delta) < 4) return;
          e.preventDefault();
          if (wheelLock) return;
          wheelLock = true;
          this.step(delta > 0 ? 1 : -1);
          setTimeout(() => {
            wheelLock = false;
          }, 620);
        },
        { passive: false }
      );

      // Keyboard
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "PageDown") {
          e.preventDefault();
          this.step(1);
        } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
          e.preventDefault();
          this.step(-1);
        } else if (e.key === "Home") {
          e.preventDefault();
          this.go(0);
        } else if (e.key === "End") {
          e.preventDefault();
          this.go(this.panels.length - 1);
        }
      });

      // Touch drag assist (native scroll works; boost snap feel)
      let startX = 0;
      let startLeft = 0;
      t.addEventListener(
        "touchstart",
        (e) => {
          startX = e.touches[0].clientX;
          startLeft = t.scrollLeft;
        },
        { passive: true }
      );
      t.addEventListener(
        "touchmove",
        (e) => {
          const dx = startX - e.touches[0].clientX;
          t.scrollLeft = startLeft + dx;
        },
        { passive: true }
      );
    }

    // One scroll/arrow step: walk the hunter to the next waypoint inside the
    // section, or — once the section's journey is done — dash off and pan over.
    step(dir) {
      if (this._busy) return;
      const cfg = this._journey[this.index];
      const lastStage = cfg ? cfg.stages.length - 1 : 0;

      if (dir > 0) {
        if (cfg && this.stage < lastStage) {
          this.stage += 1;
          this._applyStage();
          return;
        }
        // Journey done. Final section just rests; others sprint off & advance.
        if (cfg && cfg.final) return;
        if (this.index >= this.panels.length - 1) return;
        this._exitAndAdvance();
        return;
      }

      // Backward: step the hunter back, or retreat to the previous section.
      if (cfg && this.stage > 0) {
        this.stage -= 1;
        this._applyStage();
        return;
      }
      if (this.index > 0) this._scrollTo(this.index - 1);
    }

    _applyStage(instant = false) {
      if (this._onStage) this._onStage(this.index, this.stage, instant);
    }

    _exitAndAdvance() {
      const from = this.index;
      this._busy = true;
      const done = () => {
        this._scrollTo(from + 1);
        setTimeout(() => {
          this._busy = false;
        }, 800);
      };
      if (this._onExit && !reduceMotion) {
        Promise.resolve(this._onExit(from)).then(done);
      } else {
        done();
      }
    }

    go(i) {
      if (this._busy) return;
      const next = Math.max(0, Math.min(this.panels.length - 1, i));
      if (next !== this.index) this._scrollTo(next);
    }

    _scrollTo(next) {
      this.panels[next].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", inline: "start", block: "nearest" });
    }

    _onScroll() {
      const t = this.track;
      const max = t.scrollWidth - t.clientWidth;
      const p = max > 0 ? t.scrollLeft / max : 0;
      if (this.fill) this.fill.style.width = `${Math.min(100, p * 100)}%`;

      const idx = Math.round(t.scrollLeft / t.clientWidth);
      this.index = Math.max(0, Math.min(this.panels.length - 1, idx));

      // Entering a new section: snap the hunter to its first mark instantly.
      if (this.index !== this._prevIndex) {
        this.stage = 0;
        this._applyStage(true);
      }
      this._prevIndex = this.index;

      try {
        sessionStorage.setItem(this._storeKey, String(this.index));
      } catch (_) {}

      if (this.dots) {
        [...this.dots.children].forEach((d, i) => d.classList.toggle("is-active", i === this.index));
      }

      if (!this._hintHidden && t.scrollLeft > 24 && this.hint) {
        this._hintHidden = true;
        this.hint.classList.add("is-gone");
      }
    }
  }

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // ── Solo training arena (single hunter drilling strikes, no opponent) ─────
  class Arena {
    constructor(root) {
      this.root = root;
      // Solo hunter drilling strikes in place, centered (camera stays fixed).
      this.a = this._make(
        root.querySelector('[data-fighter="a"]'),
        root.querySelector('[data-shadow="a"]'),
        50,
        1
      );
      this._boot();
    }

    _make(canvas, shadow, home, dir) {
      const f = {
        canvas,
        shadow,
        home,
        dir,
        x: home,
        hp: 3,
        sp: new SpritePlayer(canvas, { scale: 3, flip: dir < 0 }),
      };
      this._place(f, home);
      return f;
    }

    _place(f, x) {
      f.x = x;
      f.canvas.style.left = `${x}%`;
      if (f.shadow) f.shadow.style.left = `${x}%`;
    }

    _face(f, dir) {
      f.sp.flip = dir < 0;
    }

    _anim(f, key, opts) {
      f.sp.play(key, opts).catch(() => {});
    }

    async _boot() {
      const f = this.a;
      this._face(f, 1);
      await f.sp.play("idle").catch(() => {});
      if (reduceMotion) return;

      // Solo training loop — the hunter drills strikes in place, no opponent.
      const combo = ["punch", "kick", "punch3", "kick2", "kick3", "throw"];
      let i = 0;
      for (;;) {
        this._anim(f, "idle");
        await wait(700);
        this._anim(f, combo[i % combo.length]);
        i += 1;
        await wait(560);
      }
    }
  }

  // Vertical (mobile / touch) mode: no scroll hijacking. Each section's hunter
  // simply loops its opening animation, centered on the ground line, and only
  // animates while its section is on screen (battery-friendly).
  function setupVerticalMode(heroes) {
    const list = Object.entries(heroes);
    list.forEach(([idx, hero]) => {
      const cfg = JOURNEY[idx];
      const st = cfg && cfg.stages ? cfg.stages[0] : null;
      hero.el.style.transition = "none";
      hero.el.style.left = "50%";
      hero.el.classList.remove("is-sprintoff");
      hero.el.classList.toggle("is-sleeping", !!(st && st.sleep));
      hero._anim = st ? st.anim : "idle";
      // Kick off every hunter immediately so a frame is always painted — even
      // for sections whose ground line sits far down a tall panel. Without this
      // the middle sections could stay blank until (if ever) fully scrolled to.
      hero.sprite.play(hero._anim, { loop: true }).catch(() => {});
    });

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (obs) => {
          obs.forEach((e) => {
            const hero = heroes[e.target.dataset.journey];
            if (!hero) return;
            if (e.isIntersecting) {
              if (!hero.sprite.running) {
                hero.sprite.play(hero._anim, { loop: true }).catch(() => {});
              }
            } else {
              hero.sprite.stop();
            }
          });
        },
        // Generous margin so a hunter is running well before its ground line
        // scrolls into view (and keeps running just after it leaves).
        { threshold: 0, rootMargin: "300px 0px 300px 0px" }
      );
      list.forEach(([, hero]) => io.observe(hero.el));
    }

    // Reflect page scroll in the header progress rail.
    const fill = document.getElementById("scrollFill");
    if (fill) {
      const upd = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p = max > 0 ? (window.scrollY || doc.scrollTop) / max : 0;
        fill.style.width = `${Math.min(100, Math.max(0, p * 100))}%`;
      };
      window.addEventListener("scroll", upd, { passive: true });
      window.addEventListener("resize", upd, { passive: true });
      upd();
    }
  }

  function setupLanguage() {
    const btn = document.getElementById("langBtn");
    if (!btn) return;
    const els = [...document.querySelectorAll("[data-ar]")];
    // Capture the original (English) markup once so we can restore it.
    els.forEach((el) => {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
    });

    const apply = (lang) => {
      const ar = lang === "ar";
      const root = document.documentElement;
      root.classList.toggle("lang-ar", ar);
      root.lang = ar ? "ar" : "en";
      // Keep the layout exactly the same (LTR) — only swap the text.
      els.forEach((el) => {
        el.innerHTML = ar ? el.dataset.ar : el.dataset.en;
      });
      // Button invites the OTHER language.
      btn.textContent = ar ? "English" : "العربية";
      btn.setAttribute(
        "aria-label",
        ar ? "Switch to English" : "التبديل إلى العربية"
      );
      try {
        localStorage.setItem("sg-lang", lang);
      } catch (_) {}
    };

    btn.addEventListener("click", () => {
      const cur = document.documentElement.classList.contains("lang-ar")
        ? "ar"
        : "en";
      apply(cur === "ar" ? "en" : "ar");
    });

    let saved = "en";
    try {
      saved = localStorage.getItem("sg-lang") || "en";
    } catch (_) {}
    apply(saved);
  }

  function setupDownloadModal() {
    const btn = document.getElementById("downloadBtn");
    const modal = document.getElementById("downloadModal");
    if (!btn || !modal) return;

    let lastFocus = null;

    const open = () => {
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      const first = modal.querySelector(".dl-option:not([disabled]), .dl-modal__close");
      if (first) first.focus();
    };

    const close = () => {
      modal.hidden = true;
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    btn.addEventListener("click", open);

    modal.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", close);
    });

    modal.querySelectorAll(".dl-option:not(.dl-option--soon)").forEach((el) => {
      el.addEventListener("click", () => setTimeout(close, 150));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) close();
    });
  }

  async function boot() {
    setupLanguage();
    setupDownloadModal();

    const modeQuery = window.matchMedia("(max-width: 900px), (pointer: coarse)");
    const mobile = modeQuery.matches;

    // If the layout mode flips (e.g. a desktop window resized past the
    // breakpoint), re-initialise cleanly so neither rig is ever half-wired.
    const onModeFlip = () => location.reload();
    if (modeQuery.addEventListener) {
      modeQuery.addEventListener("change", onModeFlip);
    } else if (modeQuery.addListener) {
      modeQuery.addListener(onModeFlip);
    }

    // Keep-your-section-on-refresh only applies to the desktop horizontal rig;
    // let the browser restore normal vertical position on touch devices.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = mobile ? "auto" : "manual";
    }

    const track = document.getElementById("track");

    // Build the traveling hunter sprite for every section up front.
    const heroes = {};
    if (track) {
      document.querySelectorAll(".road-runner[data-journey]").forEach((el) => {
        const idx = parseInt(el.dataset.journey, 10);
        const canvas = el.querySelector("canvas");
        if (Number.isNaN(idx) || !canvas) return;
        const cfg = JOURNEY[idx];
        heroes[idx] = {
          el,
          sprite: new SpritePlayer(canvas, { scale: cfg ? cfg.scale : 3.4 }),
        };
      });
    }

    if (track && mobile) {
      // Native vertical scroll — do NOT construct HorizontalHunt (no wheel/touch
      // hijacking, no snap fighting). Just animate each hunter in place.
      setupVerticalMode(heroes);
    } else if (track) {
      // Desktop: cinematic horizontal scroll with the multi-stage hero journey.
      const hunt = new HorizontalHunt(track);
      hunt._journey = JOURNEY;

      // Where the hunter starts each run: just off the left edge, so he keeps
      // running in from the previous section instead of teleporting into place.
      const ENTER_X = "-10%";

      hunt._onStage = (index, stage, instant) => {
        const cfg = JOURNEY[index];
        const hero = heroes[index];
        if (!cfg || !hero) return;
        const i = Math.max(0, Math.min(cfg.stages.length - 1, stage));
        const st = cfg.stages[i];
        hero.el.classList.remove("is-sprintoff");
        clearTimeout(hero._settleT);

        if (instant) {
          // A fresh section: drop the hunter just off the left edge (no slide),
          // then let him RUN IN to his mark — a seamless hand-off from the
          // section he just sprinted out of. Nothing ever teleports mid-screen.
          hero.el.classList.remove("is-sleeping");
          hero.sprite.play("run", { loop: true }).catch(() => {});
          hero.el.style.transition = "none";
          hero.el.style.left = ENTER_X;
          void hero.el.offsetWidth;
          hero.el.style.transition = "";
          requestAnimationFrame(() => {
            hero.el.style.left = st.x;
          });
          // Once he has arrived, settle into the section's real pose (e.g. the
          // final section stops to sleep). Timed to the `left` transition.
          hero._settleT = setTimeout(() => {
            hero.el.classList.toggle("is-sleeping", !!st.sleep);
            hero.sprite.play(st.anim, { loop: st.loop !== false }).catch(() => {});
          }, 820);
        } else {
          hero.el.classList.toggle("is-sleeping", !!st.sleep);
          hero.el.style.left = st.x;
          hero.sprite.play(st.anim, { loop: st.loop !== false }).catch(() => {});
        }
      };

      hunt._onExit = (index) =>
        new Promise((resolve) => {
          const hero = heroes[index];
          if (!hero) {
            resolve();
            return;
          }
          // Run flat-out across and off the right edge; only once he clears the
          // screen does the camera advance to the next section.
          clearTimeout(hero._settleT);
          hero.sprite.play("run").catch(() => {});
          hero.el.classList.add("is-sprintoff");
          setTimeout(resolve, 720);
        });

      // Render the current section's opening stage (snapped into place).
      hunt._applyStage(true);
    }

    // Auto‑battle arena (section 4)
    const arenaEl = document.getElementById("arena");
    if (arenaEl) new Arena(arenaEl);

    // Rank shields (section 2) — big shield shatters, revealing the next behind
    const shieldMain = document.getElementById("shieldMain");
    const shieldBack = document.getElementById("shieldBack");
    const shieldShards = document.getElementById("shieldShards");
    if (shieldMain && shieldBack && shieldShards) {
      const ranks = ["E", "D", "C", "BB", "A", "S", "SG"];
      const shields = ranks.map((r) => `media/ui/${r}%20Rank.png`);
      let si = 0;
      shieldMain.src = shields[0];
      shieldBack.src = shields[1 % shields.length];

      const buildShards = (src, n) => {
        shieldShards.innerHTML = "";
        for (let i = 0; i < n; i++) {
          const a1 = (i / n) * Math.PI * 2 - Math.PI / 2;
          const a2 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2;
          const R = 82;
          const p1x = 50 + R * Math.cos(a1);
          const p1y = 50 + R * Math.sin(a1);
          const p2x = 50 + R * Math.cos(a2);
          const p2y = 50 + R * Math.sin(a2);
          const mid = (a1 + a2) / 2;
          const d = document.createElement("div");
          d.className = "shield-piece";
          d.style.backgroundImage = `url("${src}")`;
          d.style.clipPath = `polygon(50% 50%, ${p1x}% ${p1y}%, ${p2x}% ${p2y}%)`;
          d.style.setProperty("--tx", `${Math.cos(mid) * 64}px`);
          d.style.setProperty("--ty", `${Math.sin(mid) * 64}px`);
          d.style.setProperty("--rot", `${(Math.random() * 90 - 45).toFixed(1)}deg`);
          shieldShards.appendChild(d);
        }
      };

      if (!reduceMotion) {
        (async () => {
          for (;;) {
            await wait(1700);
            // Shatter the front shield — the next rank is already sitting behind.
            buildShards(shields[si], 7);
            shieldMain.classList.add("is-gone");
            shieldShards.classList.add("is-breaking");
            await wait(600);
            shieldShards.classList.remove("is-breaking");
            shieldShards.innerHTML = "";
            // Promote the revealed shield to the front, stage the following one behind.
            si = (si + 1) % shields.length;
            shieldMain.src = shields[si];
            shieldMain.classList.remove("is-gone");
            shieldBack.src = shields[(si + 1) % shields.length];
            await wait(60);
          }
        })();
      }
    }

    // Training interactive
    const trainCanvas = document.getElementById("trainSprite");
    let trainPlayer = null;
    if (trainCanvas) {
      trainPlayer = new SpritePlayer(trainCanvas, { scale: 4 });
      await trainPlayer.play("punch").catch(() => {});
      document.querySelectorAll(".move-strip button").forEach((btn) => {
        btn.addEventListener("click", async () => {
          document.querySelectorAll(".move-strip button").forEach((b) => b.classList.remove("is-on"));
          btn.classList.add("is-on");
          await trainPlayer.play(btn.dataset.move).catch(() => {});
        });
      });
    }

    // Loot chests (section 5) — idle loop; tap to pop open (no reward popup).
    document.querySelectorAll(".chest").forEach((btn) => {
      const canvas = btn.querySelector(".chest__sprite");
      const tier = btn.dataset.tier;
      if (!canvas || !tier) return;
      const sp = new SpritePlayer(canvas, { scale: 3 });
      const idle = () =>
        sp.play(`chest-${tier}-idle`, { loop: true }).catch(() => {});
      idle();
      let isOpen = false;
      let resetTimer = 0;
      btn.addEventListener("click", async () => {
        if (isOpen) return;
        isOpen = true;
        btn.classList.add("is-open");
        await sp.play(`chest-${tier}-open`, { loop: false }).catch(() => {});
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          btn.classList.remove("is-open");
          isOpen = false;
          idle();
        }, 2600);
      });
    });

    // Stats (section 6) — count up when the grid scrolls into view.
    const statGrid = document.getElementById("statGrid");
    if (statGrid) {
      const nums = [...statGrid.querySelectorAll(".stat__num")];
      const runCount = () => {
        nums.forEach((el) => {
          if (el.dataset.done) return;
          el.dataset.done = "1";
          const target = parseInt(el.dataset.count, 10) || 0;
          const suffix = el.dataset.suffix || "";
          if (reduceMotion) {
            el.textContent = `${target}${suffix}`;
            return;
          }
          const dur = 1100;
          const t0 = performance.now();
          const step = (now) => {
            const p = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = `${Math.round(target * eased)}${suffix}`;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      };
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (entries) => entries.forEach((e) => e.isIntersecting && runCount()),
          { threshold: 0.4 }
        );
        io.observe(statGrid);
      } else {
        runCount();
      }
    }

    // FAQ (section 7) — single-open accordion.
    document.querySelectorAll(".faq-q").forEach((q) => {
      q.addEventListener("click", () => {
        const list = q.closest(".faq-list");
        const item = q.closest(".faq-item");
        const wasOpen = q.getAttribute("aria-expanded") === "true";
        if (list) {
          list.querySelectorAll(".faq-q").forEach((o) => {
            o.setAttribute("aria-expanded", "false");
            o.closest(".faq-item").classList.remove("is-open");
          });
        }
        if (!wasOpen) {
          q.setAttribute("aria-expanded", "true");
          item.classList.add("is-open");
        }
      });
    });

    // Generic canvases with data-anim
    document.querySelectorAll("canvas[data-anim]").forEach(async (canvas) => {
      if (canvas.id === "trainSprite" || canvas.id === "heroSprite") return;
      const key = canvas.dataset.anim;
      const flip = canvas.dataset.flip === "1";
      const scale = canvas.closest(".get") ? 2.8 : 3;
      const player = new SpritePlayer(canvas, { scale, flip });
      try {
        await player.play(key);
      } catch (_) {}
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
