/**
 * Solo Gainz — sologainz.github.io
 *
 * The site is four panels: title, trailer, FAQ, footer. Desktop reads them as
 * a horizontal filmstrip driven by the wheel; touch devices read them as an
 * ordinary vertical page, because hijacking scroll on a phone is how you make
 * a page feel broken.
 *
 * This file used to carry an auto-battle arena, a rank-shield shatter, a chest
 * gacha, a live-stats panel, a download modal and an exercise library. Every
 * one of those sections was removed from the markup in the redesign, so the
 * code sat behind `if (!el) return;` guards, downloading nothing and doing
 * nothing - but still parsing, and still pulling a sprite table for animations
 * no page could play. It is gone; what is left is what the four panels use.
 */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * The travelling figure beside each panel.
   *
   * Only `idle` is on the journey; the two shock poses exist so the figure
   * flinches when the pointer touches him in the last panel. Nothing else in
   * media/player/ is referenced any more, and the unreferenced folders have
   * been deleted rather than left to ship.
   */
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
    shockLight: {
      fps: 10,
      frames: [
        "media/player/shocklight/ShockLight01.png",
        "media/player/shocklight/ShockLight02.png",
        "media/player/shocklight/ShockLight03.png",
        "media/player/shocklight/ShockLight04.png",
      ],
    },
    shockHeavy: {
      fps: 10,
      frames: [
        "media/player/shockheavy/ShockHeavy01.png",
        "media/player/shockheavy/ShockHeavy02.png",
        "media/player/shockheavy/ShockHeavy03.png",
        "media/player/shockheavy/ShockHeavy04.png",
      ],
    },
  };

  /** One entry per panel, in document order. */
  const JOURNEY = [
    { scale: 2.2 },
    { scale: 2.2 },
    { scale: 2.2 },
    { scale: 2.2, final: true },
  ];

  // ── Sprites ───────────────────────────────────────────────────────────────

  const cache = new Map();

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
        /* a missing frame drops out of the loop rather than killing it */
      }
    }
    if (!images.length) throw new Error(`empty:${key}`);
    return { fps: def.fps, images };
  }

  class SpritePlayer {
    constructor(canvas, { scale = 3.5 } = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.scale = scale;
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
      // A still frame is already painted, so a reduced-motion visitor loses
      // the loop and nothing else.
      if (this.running || reduceMotion) return;
      this.running = true;
      this._last = performance.now();
      const tick = (now) => {
        if (!this.running) return;
        const dt = (now - this._last) / 1000;
        this._last = now;
        this.step(dt);
        this._raf = requestAnimationFrame(tick);
      };
      this._raf = requestAnimationFrame(tick);
    }

    stop() {
      this.running = false;
      if (this._raf) cancelAnimationFrame(this._raf);
      this._raf = 0;
    }

    step(dt) {
      if (!this.anim) return;
      this.acc += dt;
      const spf = 1 / this.anim.fps;
      while (this.acc >= spf) {
        this.acc -= spf;
        this.frame += 1;
        if (this.frame >= this.anim.images.length) {
          this.frame = this.loop ? 0 : this.anim.images.length - 1;
          if (!this.loop) this.stop();
        }
      }
      this.draw();
    }

    draw() {
      const { ctx, canvas } = this;
      if (!ctx || !this.anim) return;
      const img = this.anim.images[this.frame];
      if (!img) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      const w = img.width * this.scale;
      const h = img.height * this.scale;
      ctx.drawImage(img, (canvas.width - w) / 2, canvas.height - h, w, h);
    }
  }

  // ── Desktop: the horizontal filmstrip ─────────────────────────────────────

  class HorizontalHunt {
    constructor(track) {
      this.track = track;
      this.panels = [...track.querySelectorAll(".panel")];
      this.fill = document.getElementById("scrollFill");
      this.dots = document.getElementById("dots");
      this.index = 0;
      this._prevIndex = 0;
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
      // Instant jump (bypassing CSS smooth scroll) so a refresh lands you back
      // on the panel you were reading rather than sliding there.
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

      // Wheel and trackpad map to sideways travel, one panel per gesture.
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
          this.go(this.index + (delta > 0 ? 1 : -1));
          setTimeout(() => {
            wheelLock = false;
          }, 620);
        },
        { passive: false }
      );

      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "PageDown") {
          e.preventDefault();
          this.go(this.index + 1);
        } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
          e.preventDefault();
          this.go(this.index - 1);
        } else if (e.key === "Home") {
          e.preventDefault();
          this.go(0);
        } else if (e.key === "End") {
          e.preventDefault();
          this.go(this.panels.length - 1);
        }
      });
    }

    go(i) {
      const next = Math.max(0, Math.min(this.panels.length - 1, i));
      if (next === this.index) return;
      this.track.scrollTo({
        left: next * this.track.clientWidth,
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }

    _onScroll() {
      const t = this.track;
      const max = t.scrollWidth - t.clientWidth;
      const p = max > 0 ? t.scrollLeft / max : 0;
      if (this.fill) this.fill.style.width = `${Math.min(100, p * 100)}%`;

      const idx = Math.round(t.scrollLeft / t.clientWidth);
      this.index = Math.max(0, Math.min(this.panels.length - 1, idx));
      this._prevIndex = this.index;

      try {
        sessionStorage.setItem(this._storeKey, String(this.index));
      } catch (_) {}

      if (this.dots) {
        [...this.dots.children].forEach((d, i) =>
          d.classList.toggle("is-active", i === this.index)
        );
      }
      // Drives the staggered content reveal for the panel in view.
      this.panels.forEach((p, i) => p.classList.toggle("is-active", i === this.index));
    }
  }

  // ── Touch: an ordinary vertical page ──────────────────────────────────────

  function setupVerticalMode(heroes) {
    Object.values(heroes).forEach((hero) => {
      hero.el.style.left = "50%";
      hero.sprite.play("idle", { loop: true }).catch(() => {});
    });

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const hero = heroes[e.target.dataset.journey];
            if (!hero) return;
            if (e.isIntersecting) {
              if (!hero.sprite.running) {
                hero.sprite.play("idle", { loop: true }).catch(() => {});
              }
            } else {
              // Off screen animates nothing: on a phone this is the difference
              // between four looping canvases and none.
              hero.sprite.stop();
            }
          });
        },
        { threshold: 0, rootMargin: "300px 0px 300px 0px" }
      );
      Object.values(heroes).forEach((hero) => io.observe(hero.el));
    }

    const fill = document.getElementById("scrollFill");
    if (fill) {
      let queued = false;
      const upd = () => {
        queued = false;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p = max > 0 ? (window.scrollY || doc.scrollTop) / max : 0;
        fill.style.width = `${Math.min(100, Math.max(0, p * 100))}%`;
      };
      // Coalesced into a frame: a raw scroll handler writing a style on every
      // event is the classic way to make a phone drop frames while scrolling.
      const onScroll = () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(upd);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      upd();
    }
  }

  /**
   * Reveals content as it scrolls in.
   *
   * The filmstrip gets this for free - it marks the panel in view `.is-active`
   * and the CSS takes it from there. The vertical page has no active panel, so
   * without this every `[data-reveal]` element would sit at `opacity: 0`
   * forever and the phone layout would render as a blank page with a footer.
   *
   * Three ways in, because "the content is visible at all" is not something to
   * stake on one browser API firing. IntersectionObserver is the cheap path;
   * a frame-coalesced scroll handler covers the cases where it stays silent
   * (a backgrounded tab restored from bfcache, some embedded webviews, a page
   * that is never composited); and a timer reveals whatever is left after a
   * few seconds no matter what. A missed animation is a blemish - a page that
   * never paints its text is a broken site.
   */
  function setupReveal() {
    const pending = new Set(document.querySelectorAll("[data-reveal]"));
    if (!pending.size) return;

    const show = (el) => {
      el.classList.add("is-in");
      pending.delete(el);
      if (io) io.unobserve(el);
    };

    const sweep = () => {
      if (!pending.size) return;
      const limit = window.innerHeight * 0.92;
      [...pending].forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < limit && r.bottom > 0) show(el);
      });
      if (!pending.size) teardown();
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        sweep();
      });
    };

    const teardown = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    let io = null;
    if ("IntersectionObserver" in window && !reduceMotion) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && show(e.target)),
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
      );
      pending.forEach((el) => io.observe(el));
    }

    if (reduceMotion) {
      [...pending].forEach(show);
      return;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    sweep();
    // Last resort: whatever is still hidden after this simply appears.
    setTimeout(() => {
      [...pending].forEach(show);
      teardown();
    }, 2500);
  }

  /** The figure flinches when you touch him in the last panel. */
  function setupFinalShockReaction(heroes) {
    const hero = heroes[JOURNEY.length - 1];
    if (!hero) return;
    const canvas = hero.el.querySelector("canvas");
    if (!canvas) return;

    hero.el.style.pointerEvents = "auto";
    canvas.style.pointerEvents = "auto";
    canvas.style.cursor = "pointer";

    let activeShock = "";
    let settleTimer = 0;
    let cooldownUntil = 0;

    const isOnModel = (event) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return false;
      const x = Math.floor(((event.clientX - rect.left) * canvas.width) / rect.width);
      const y = Math.floor(((event.clientY - rect.top) * canvas.height) / rect.height);
      if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return false;
      // A 3x3 neighbourhood, so thin pixel-art limbs still register a hit.
      const left = Math.max(0, x - 1);
      const top = Math.max(0, y - 1);
      const w = Math.min(canvas.width - left, 3);
      const h = Math.min(canvas.height - top, 3);
      const pixels = canvas.getContext("2d").getImageData(left, top, w, h).data;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] > 24) return true;
      }
      return false;
    };

    const trigger = (key) => {
      const now = performance.now();
      if (now < cooldownUntil) return;
      cooldownUntil = now + 900;
      clearTimeout(settleTimer);
      if (activeShock !== key) {
        activeShock = key;
        hero.sprite.play(key, { loop: true }).catch(() => {});
      }
      settleTimer = setTimeout(() => {
        activeShock = "";
        hero.sprite.play("idle", { loop: true }).catch(() => {});
      }, 700);
    };

    canvas.addEventListener(
      "pointermove",
      (event) => {
        if (isOnModel(event)) trigger("shockLight");
      },
      { passive: true }
    );
    canvas.addEventListener("pointerdown", (event) => {
      if (event.button !== 2 || !isOnModel(event)) return;
      event.preventDefault();
      trigger("shockHeavy");
    });
    canvas.addEventListener("contextmenu", (event) => event.preventDefault());
  }

  // ── Language ──────────────────────────────────────────────────────────────

  /**
   * Arabic needs Cairo; English does not.
   *
   * All the pages used to request Cairo alongside everything else, so every
   * English visitor - the default, and the overwhelming majority - downloaded
   * font files that were never painted. It is fetched the first time Arabic is
   * actually selected, and cached from then on.
   */
  function ensureArabicFont() {
    if (document.getElementById("cairoFont")) return;
    const link = document.createElement("link");
    link.id = "cairoFont";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }

  function setupLanguage() {
    const btn = document.getElementById("langBtn");
    if (!btn) return;
    const els = [...document.querySelectorAll("[data-ar]")];
    // Capture the original English markup once, so it can be restored.
    els.forEach((el) => {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
    });

    const apply = (lang) => {
      const ar = lang === "ar";
      if (ar) ensureArabicFont();
      const root = document.documentElement;
      root.classList.toggle("lang-ar", ar);
      root.lang = ar ? "ar" : "en";
      // The layout stays LTR — only the text swaps.
      els.forEach((el) => {
        el.innerHTML = ar ? el.dataset.ar : el.dataset.en;
      });
      // The button invites the OTHER language.
      btn.textContent = ar ? "English" : "العربية";
      btn.setAttribute("aria-label", ar ? "Switch to English" : "التبديل إلى العربية");
      try {
        localStorage.setItem("sg-lang", lang);
      } catch (_) {}
    };

    btn.addEventListener("click", () => {
      const cur = document.documentElement.classList.contains("lang-ar") ? "ar" : "en";
      apply(cur === "ar" ? "en" : "ar");
    });

    let saved = "en";
    try {
      saved = localStorage.getItem("sg-lang") || "en";
    } catch (_) {}
    apply(saved);
  }

  // ── FAQ ───────────────────────────────────────────────────────────────────

  function setupFaq() {
    document.querySelectorAll(".faq-q").forEach((q) => {
      q.addEventListener("click", () => {
        const list = q.closest(".faq-list");
        const item = q.closest(".faq-item");
        const wasOpen = q.getAttribute("aria-expanded") === "true";
        if (list) {
          list.querySelectorAll(".faq-q").forEach((o) => {
            o.setAttribute("aria-expanded", "false");
            const other = o.closest(".faq-item");
            if (other) other.classList.remove("is-open");
          });
        }
        if (!wasOpen && item) {
          q.setAttribute("aria-expanded", "true");
          item.classList.add("is-open");
        }
      });
    });
  }

  // ── Boot ──────────────────────────────────────────────────────────────────

  function boot() {
    setupLanguage();
    setupFaq();
    setupReveal();

    const track = document.getElementById("track");
    if (!track) return;

    const modeQuery = window.matchMedia("(max-width: 900px), (pointer: coarse)");
    const mobile = modeQuery.matches;

    // If the layout mode flips (a desktop window dragged past the breakpoint)
    // re-initialise cleanly, so neither rig is ever left half-wired.
    const onModeFlip = () => location.reload();
    if (modeQuery.addEventListener) {
      modeQuery.addEventListener("change", onModeFlip);
    } else if (modeQuery.addListener) {
      modeQuery.addListener(onModeFlip);
    }

    // Keeping your place on refresh only applies to the horizontal rig; on a
    // phone the browser's own restore is the expected behaviour.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = mobile ? "auto" : "manual";
    }

    // The runner is hidden below 600px (see site.css), so on a small phone
    // there is nothing to animate — and building the players anyway would
    // fetch seven sprite frames to draw them into a display:none canvas.
    const runnerVisible = !window.matchMedia("(max-width: 600px)").matches;
    const heroes = {};
    if (runnerVisible) {
      document.querySelectorAll(".road-runner[data-journey]").forEach((el) => {
        const idx = parseInt(el.dataset.journey, 10);
        const canvas = el.querySelector("canvas");
        if (Number.isNaN(idx) || !canvas) return;
        const cfg = JOURNEY[idx];
        heroes[idx] = {
          el,
          sprite: new SpritePlayer(canvas, { scale: cfg ? cfg.scale : 2.2 }),
        };
      });
    }

    if (mobile) {
      setupVerticalMode(heroes);
    } else {
      new HorizontalHunt(track);
      Object.values(heroes).forEach((hero) => {
        hero.el.style.left = "50%";
        hero.sprite.play("idle", { loop: true }).catch(() => {});
      });
    }

    setupFinalShockReaction(heroes);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
