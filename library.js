(() => {
  "use strict";

  // Full exercise catalogue, mirrored from the app's quests pool. Each entry:
  // { n: name, cat: "home"|"gym", grp: group, sys: "reps"|"timer", goal, km, desc }
  const DATA = [
    // ── Home / Push ──────────────────────────────────────────────────────────
    { n: "Push-ups", cat: "home", grp: "Push", sys: "reps", goal: 20, desc: "Hands slightly wider than shoulders, body in a straight line. Lower until your chest nearly touches the floor, then press back up. Keep your core tight and elbows around 45°." },
    { n: "Diamond Push-ups", cat: "home", grp: "Push", sys: "reps", goal: 15, desc: "Form a diamond with your thumbs and index fingers under your chest. Lower with elbows tucked to target the triceps, then press up. Keep hips level." },
    { n: "Wide Push-ups", cat: "home", grp: "Push", sys: "reps", goal: 15, desc: "Place hands wider than shoulder-width to emphasise the chest. Lower under control and press back up without flaring the lower back." },
    { n: "Pike Push-ups", cat: "home", grp: "Push", sys: "reps", goal: 10, desc: "Hips high in an inverted-V. Lower the crown of your head toward the floor and press up. Great shoulder builder and handstand prep." },
    { n: "Archer Push-ups", cat: "home", grp: "Push", sys: "reps", goal: 8, desc: "Wide hand stance, shift toward one arm as you lower while the other stays straight. Alternate sides. A strong step toward one-arm push-ups." },
    { n: "Bodyweight Dips", cat: "home", grp: "Push", sys: "reps", goal: 12, desc: "Support yourself on parallel bars or two sturdy surfaces. Lower until your elbows reach ~90°, then press back up. Lean forward for chest, stay upright for triceps." },

    // ── Home / Pull ──────────────────────────────────────────────────────────
    { n: "Pull-ups", cat: "home", grp: "Pull", sys: "reps", goal: 8, desc: "Dead hang from a bar with an overhand grip. Pull your chin over the bar by driving your elbows down, then lower under control. The king of upper-body pulling." },
    { n: "Chin-ups", cat: "home", grp: "Pull", sys: "reps", goal: 8, desc: "Hang from a bar with an underhand, shoulder-width grip. Pull up until your chin clears the bar, squeezing the biceps and lats, then lower slowly." },

    // ── Home / Core ──────────────────────────────────────────────────────────
    { n: "Sit-ups", cat: "home", grp: "Core", sys: "reps", goal: 25, desc: "Knees bent, feet grounded. Curl your torso all the way up, then lower with control. Avoid yanking your neck — lead with the chest." },
    { n: "Crunches", cat: "home", grp: "Core", sys: "reps", goal: 30, desc: "Lift only your shoulder blades off the floor, squeezing the abs. Short range, slow tempo, no neck pulling." },
    { n: "Bicycle Crunches", cat: "home", grp: "Core", sys: "reps", goal: 40, desc: "Lie back, hands by your ears. Bring one elbow toward the opposite knee while extending the other leg, then alternate in a smooth pedalling rhythm." },
    { n: "Leg Raises", cat: "home", grp: "Core", sys: "reps", goal: 15, desc: "Lie flat, legs straight. Raise them to vertical, then lower slowly without letting your heels touch the floor. Press your low back down." },
    { n: "Flutter Kicks", cat: "home", grp: "Core", sys: "timer", goal: 45, desc: "Lie flat with your low back pressed down and legs straight. Make small, rapid up-and-down kicks without touching the floor. Targets the lower abs." },
    { n: "Russian Twists", cat: "home", grp: "Core", sys: "reps", goal: 40, desc: "Sit leaning back with feet up, rotate your torso side to side, tapping the floor each side. Move from the waist, not just the arms." },
    { n: "Plank", cat: "home", grp: "Core", sys: "timer", goal: 60, desc: "Forearms under shoulders, body in a straight line. Brace your abs and glutes — no sagging hips or raised butt. Breathe steadily." },
    { n: "Side Plank", cat: "home", grp: "Core", sys: "timer", goal: 45, desc: "Forearm down, stack your feet, and lift your hips into a straight line. Hold tall through the obliques without rolling forward. Switch sides halfway." },
    { n: "Hollow Hold", cat: "home", grp: "Core", sys: "timer", goal: 45, desc: "Lie on your back, press your low back into the floor, and lift your arms and legs into a shallow banana shape. Hold tight and breathe. Elite core tension." },
    { n: "Superman", cat: "home", grp: "Core", sys: "reps", goal: 15, desc: "Lie face down, arms extended. Simultaneously lift your arms, chest and legs off the floor, squeezing your glutes and lower back. Pause, then lower." },

    // ── Home / Legs & glutes ─────────────────────────────────────────────────
    { n: "Squats", cat: "home", grp: "Legs & glutes", sys: "reps", goal: 30, desc: "Feet shoulder-width, toes slightly out. Sit hips back and down to at least parallel, knees tracking over toes, chest up. Drive through your heels." },
    { n: "Jump Squats", cat: "home", grp: "Legs & glutes", sys: "reps", goal: 20, desc: "Squat down, then explode up into a jump. Land softly with bent knees and immediately flow into the next rep. Explosive power builder." },
    { n: "Lunges", cat: "home", grp: "Legs & glutes", sys: "reps", goal: 20, desc: "Step forward and lower until both knees are ~90°. Keep the front knee over the ankle, push back to standing, alternate legs." },
    { n: "Bulgarian Split Squats", cat: "home", grp: "Legs & glutes", sys: "reps", goal: 12, desc: "Rear foot elevated on a bench. Lower straight down on the front leg until the thigh is parallel, then drive up. Brutal single-leg builder." },
    { n: "Step-ups", cat: "home", grp: "Legs & glutes", sys: "reps", goal: 20, desc: "Step onto a sturdy bench or box with one foot, drive through the heel to stand tall, then step down under control. Alternate legs each rep." },
    { n: "Glute Bridge", cat: "home", grp: "Legs & glutes", sys: "reps", goal: 20, desc: "Lie on your back, knees bent, feet flat. Drive your hips up until your body forms a straight line, squeezing your glutes hard, then lower slowly." },
    { n: "Wall Sit", cat: "home", grp: "Legs & glutes", sys: "timer", goal: 60, desc: "Back flat on a wall, slide down until thighs are parallel to the floor (90° knees). Hold the position and breathe. Burns the quads." },
    { n: "Calf Raises", cat: "home", grp: "Legs & glutes", sys: "reps", goal: 25, desc: "Stand tall, rise up onto the balls of your feet as high as possible, squeeze the calves, then lower slowly for a deep stretch. Use a step for more range." },

    // ── Home / Cardio & conditioning ─────────────────────────────────────────
    { n: "Burpees", cat: "home", grp: "Cardio & conditioning", sys: "reps", goal: 12, desc: "Squat, kick back to a plank, do a push-up, jump the feet in, then jump up. A full-body conditioning move — pace your breathing." },
    { n: "Mountain Climbers", cat: "home", grp: "Cardio & conditioning", sys: "timer", goal: 45, desc: "From a plank, drive knees toward your chest one at a time, quick and rhythmic. Keep hips low and core tight for a cardio-ab combo." },
    { n: "Jumping Jacks", cat: "home", grp: "Cardio & conditioning", sys: "timer", goal: 60, desc: "Jump feet out while raising arms overhead, then back in. Light, springy landings. A classic warm-up and cardio finisher." },
    { n: "High Knees", cat: "home", grp: "Cardio & conditioning", sys: "timer", goal: 45, desc: "Run in place driving your knees up to hip height. Stay on the balls of your feet and pump your arms. Great cardio and hip flexor work." },
    { n: "Jump Rope", cat: "home", grp: "Cardio & conditioning", sys: "timer", goal: 120, desc: "Turn the rope from the wrists and hop just high enough to clear it, landing softly on the balls of your feet. A superb cardio and coordination builder." },
    { n: "Box Jumps", cat: "home", grp: "Cardio & conditioning", sys: "reps", goal: 15, desc: "From a quarter-squat, swing your arms and explode onto a sturdy box. Land softly with bent knees, stand tall, then step down and reset. Explosive power." },
    { n: "Shadow Boxing", cat: "home", grp: "Cardio & conditioning", sys: "timer", goal: 120, desc: "Throw controlled jabs, crosses, hooks and slips on your toes. Keep your guard up and move — conditioning plus combat technique." },
    { n: "Running", cat: "home", grp: "Cardio & conditioning", sys: "timer", goal: 300, km: true, desc: "Steady-paced run. Relax your shoulders, land midfoot under your body, and breathe rhythmically. Build aerobic base and endurance." },
    { n: "Sprints", cat: "home", grp: "Cardio & conditioning", sys: "timer", goal: 30, km: true, desc: "All-out short bursts with full recovery between. Drive the arms and knees. Builds explosive speed and conditioning." },

    // ── Gym / Chest ──────────────────────────────────────────────────────────
    { n: "Bench Press", cat: "gym", grp: "Chest", sys: "reps", goal: 12, desc: "Lie back, grip just wider than shoulders. Lower the bar to mid-chest with elbows ~45°, then press up. Keep feet planted and shoulder blades retracted." },
    { n: "Incline Press", cat: "gym", grp: "Chest", sys: "reps", goal: 12, desc: "Bench set to 30–45°. Press the bar or dumbbells from upper chest to lockout. Targets the upper chest and front delts." },
    { n: "Dumbbell Fly", cat: "gym", grp: "Chest", sys: "reps", goal: 15, desc: "Lie back holding dumbbells above your chest with a slight elbow bend. Open your arms in a wide arc until you feel a chest stretch, then hug them back together." },
    { n: "Chest Press Machine", cat: "gym", grp: "Chest", sys: "reps", goal: 15, desc: "Adjust the seat so handles are at chest height. Press forward until arms are nearly straight, then return slowly. Beginner-friendly chest work." },
    { n: "Pec Deck Fly", cat: "gym", grp: "Chest", sys: "reps", goal: 15, desc: "Forearms on the pads, squeeze them together in a hugging arc. Pause at peak contraction, return with control. Isolates the chest." },
    { n: "Cable Crossover", cat: "gym", grp: "Chest", sys: "reps", goal: 15, desc: "Set pulleys high, sweep the handles down and together in front of you with a slight elbow bend. Squeeze the chest, return slowly." },
    { n: "Chest Dips", cat: "gym", grp: "Chest", sys: "reps", goal: 12, desc: "On parallel bars, lean your torso forward and lower until you feel a deep chest stretch, then press back up. Add weight with a belt as you progress." },

    // ── Gym / Back ───────────────────────────────────────────────────────────
    { n: "Deadlift", cat: "gym", grp: "Back", sys: "reps", goal: 8, desc: "Bar over mid-foot, flat back, brace hard. Drive the floor away and stand tall, hips and shoulders rising together. Reset each rep." },
    { n: "Barbell Row", cat: "gym", grp: "Back", sys: "reps", goal: 10, desc: "Hinge forward with a flat back, bar hanging at arm’s length. Row it to your lower ribs by driving the elbows back, squeeze, then lower under control." },
    { n: "Lat Pulldown", cat: "gym", grp: "Back", sys: "reps", goal: 12, desc: "Wide grip, pull the bar to your upper chest by driving elbows down. Lead with the lats, avoid swinging, control the way up." },
    { n: "Seated Row", cat: "gym", grp: "Back", sys: "reps", goal: 12, desc: "Chest tall, pull the handle to your stomach, squeezing your shoulder blades together. Keep your torso still — no rocking." },
    { n: "T-Bar Row", cat: "gym", grp: "Back", sys: "reps", goal: 10, desc: "Hinge at the hips with a flat back, row the weight to your torso, driving the elbows back. Great for mid-back thickness." },
    { n: "Shrugs", cat: "gym", grp: "Back", sys: "reps", goal: 15, desc: "Hold dumbbells or a bar at your sides. Shrug your shoulders straight up toward your ears, pause at the top, then lower slowly. Builds the traps." },
    { n: "Hyperextension", cat: "gym", grp: "Back", sys: "reps", goal: 15, desc: "Hips on the pad, lower your torso then raise to a straight line by squeezing the glutes and lower back. Don’t over-arch." },

    // ── Gym / Shoulders ──────────────────────────────────────────────────────
    { n: "Overhead Press", cat: "gym", grp: "Shoulders", sys: "reps", goal: 10, desc: "Stand tall, bar at shoulder height. Brace your core and press overhead to lockout without leaning back, then lower to your collarbone. Full-body pressing power." },
    { n: "Dumbbell Shoulder Press", cat: "gym", grp: "Shoulders", sys: "reps", goal: 12, desc: "Seated or standing, press dumbbells from shoulder height to overhead until your arms are nearly straight, then lower with control. Builds the delts." },
    { n: "Shoulder Press Machine", cat: "gym", grp: "Shoulders", sys: "reps", goal: 12, desc: "Seat set so handles start at shoulder height. Press overhead to near lockout, lower with control. Builds the deltoids safely." },
    { n: "Lateral Raise Machine", cat: "gym", grp: "Shoulders", sys: "reps", goal: 15, desc: "Raise the pads out to shoulder height leading with the elbows. Pause, then lower slowly. Isolates the side delts for width." },
    { n: "Face Pulls", cat: "gym", grp: "Shoulders", sys: "reps", goal: 15, desc: "Rope at face height, pull toward your forehead while externally rotating. Great for rear delts and shoulder health." },

    // ── Gym / Legs ───────────────────────────────────────────────────────────
    { n: "Barbell Back Squat", cat: "gym", grp: "Legs", sys: "reps", goal: 10, desc: "Bar on your upper traps, brace hard. Sit hips back and down to at least parallel with knees tracking your toes, then drive up through mid-foot." },
    { n: "Front Squat", cat: "gym", grp: "Legs", sys: "reps", goal: 10, desc: "Bar racked across the front delts, elbows high. Squat down keeping your torso upright, then stand tall. Quad-focused and core-intensive." },
    { n: "Goblet Squat", cat: "gym", grp: "Legs", sys: "reps", goal: 15, desc: "Hold a dumbbell or kettlebell at your chest. Squat down between your knees keeping your chest tall, then drive up. A great squat pattern builder." },
    { n: "Romanian Deadlift", cat: "gym", grp: "Legs", sys: "reps", goal: 12, desc: "Soft knees, push your hips back lowering the bar along your legs until you feel a hamstring stretch, then drive hips forward." },
    { n: "Leg Press", cat: "gym", grp: "Legs", sys: "reps", goal: 15, desc: "Feet shoulder-width on the platform. Lower until knees reach ~90°, then press through your heels. Don’t lock out hard or lift your hips." },
    { n: "Hack Squat", cat: "gym", grp: "Legs", sys: "reps", goal: 10, desc: "Shoulders under the pads, lower until thighs are parallel with knees tracking toes, then drive up. Quad-focused and back-supported." },
    { n: "Smith Machine Squat", cat: "gym", grp: "Legs", sys: "reps", goal: 12, desc: "Bar on your upper traps, squat to parallel on the guided track. Keep your chest up and drive through mid-foot." },
    { n: "Leg Extension", cat: "gym", grp: "Legs", sys: "reps", goal: 15, desc: "Extend your knees to straighten the legs, squeezing the quads at the top. Lower slowly. Isolates the quadriceps." },
    { n: "Leg Curl", cat: "gym", grp: "Legs", sys: "reps", goal: 15, desc: "Curl the pad toward your glutes by contracting the hamstrings. Pause, then lower under control. Keep hips down on the pad." },
    { n: "Calf Press", cat: "gym", grp: "Legs", sys: "reps", goal: 20, desc: "Push through the balls of your feet to full plantarflexion, then lower for a deep stretch. Slow tempo builds the calves." },

    // ── Gym / Arms ───────────────────────────────────────────────────────────
    { n: "Bicep Curl Machine", cat: "gym", grp: "Arms", sys: "reps", goal: 12, desc: "Arms on the pad, curl the handles up squeezing the biceps, then lower slowly. Keeps constant tension without swinging." },
    { n: "Dumbbell Curl", cat: "gym", grp: "Arms", sys: "reps", goal: 12, desc: "Arms at your sides, curl the dumbbells up by contracting the biceps without swinging, squeeze at the top, then lower slowly." },
    { n: "Hammer Curl", cat: "gym", grp: "Arms", sys: "reps", goal: 12, desc: "Curl dumbbells with a neutral (palms-facing) grip, keeping your elbows pinned. Targets the brachialis and forearms for thicker arms." },
    { n: "Preacher Curl", cat: "gym", grp: "Arms", sys: "reps", goal: 12, desc: "Upper arms flat on the pad, curl the bar up and lower under control to a near-straight arm. Strict biceps isolation." },
    { n: "Tricep Pushdown", cat: "gym", grp: "Arms", sys: "reps", goal: 15, desc: "Elbows pinned to your sides, extend the rope/bar down to full lockout, squeeze, then return. Isolates the triceps." },
    { n: "Skull Crushers", cat: "gym", grp: "Arms", sys: "reps", goal: 12, desc: "Lie back, bar or dumbbells above your forehead. Bend only at the elbows to lower toward your head, then extend back up. Strict triceps isolation." },
    { n: "Dips Machine", cat: "gym", grp: "Arms", sys: "reps", goal: 12, desc: "Press down until your arms are straight, keeping a slight forward lean for chest or upright for triceps. Control the return." },

    // ── Gym / Core ───────────────────────────────────────────────────────────
    { n: "Hanging Leg Raise", cat: "gym", grp: "Core", sys: "reps", goal: 12, desc: "Hang from a bar, brace your core, and raise your legs to hip height or higher without swinging. Lower slowly. Powerful lower-ab builder." },
    { n: "Cable Crunch", cat: "gym", grp: "Core", sys: "reps", goal: 15, desc: "Kneel below a rope pulldown, rope by your head. Crunch down by rounding your spine and contracting the abs, then return under control. Keep hips still." },

    // ── Gym / Cardio ─────────────────────────────────────────────────────────
    { n: "Treadmill", cat: "gym", grp: "Cardio", sys: "timer", goal: 600, km: true, desc: "Set a steady pace or incline walk/run. Keep an upright posture and relaxed stride. Reliable steady-state cardio." },
    { n: "Elliptical", cat: "gym", grp: "Cardio", sys: "timer", goal: 600, km: true, desc: "Smooth, low-impact stride pushing and pulling the handles. Maintain an even cadence for joint-friendly conditioning." },
    { n: "Rowing Machine", cat: "gym", grp: "Cardio", sys: "timer", goal: 300, km: true, desc: "Drive with the legs, then lean back and pull the handle to your ribs. Reverse the order on the return. Full-body cardio." },
    { n: "Stationary Bike", cat: "gym", grp: "Cardio", sys: "timer", goal: 600, km: true, desc: "Set a comfortable resistance and keep a steady cadence of 70–90 rpm. Adjust the seat so your knee stays slightly bent at the bottom." },
    { n: "Stair Climber", cat: "gym", grp: "Cardio", sys: "timer", goal: 300, desc: "Stand tall, avoid leaning on the rails, and step with a full, controlled range. Great low-impact leg and cardio burner." },
  ];

  const GROUP_ORDER = [
    "home::Push",
    "home::Pull",
    "home::Core",
    "home::Legs & glutes",
    "home::Cardio & conditioning",
    "gym::Chest",
    "gym::Back",
    "gym::Shoulders",
    "gym::Legs",
    "gym::Arms",
    "gym::Core",
    "gym::Cardio",
  ];

  const fmtGoal = (e) => {
    if (e.sys === "reps") return `${e.goal} reps`;
    if (e.goal >= 120 && e.goal % 60 === 0) return `${e.goal / 60} min`;
    return `${e.goal}s`;
  };

  const esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
    );

  const badgesHTML = (e) =>
    [
      `<span class="lib-badge lib-badge--${e.cat}">${e.cat === "home" ? "Home" : "Gym"}</span>`,
      `<span class="lib-badge">${fmtGoal(e)}</span>`,
      e.km ? `<span class="lib-badge lib-badge--km">or km</span>` : "",
    ].join("");

  const ytSearch = (name) =>
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      `how to do ${name} proper form tutorial`
    )}`;

  const cardHTML = (e) => {
    return `<article class="lib-card" data-name="${esc(e.n)}" role="button" tabindex="0" aria-label="${esc(e.n)} — view form and video">
        <div class="lib-card__head">
          <h3>${esc(e.n)}</h3>
          <div class="lib-card__badges">${badgesHTML(e)}</div>
        </div>
        <p>${esc(e.desc)}</p>
        <span class="lib-card__more">View form &amp; video →</span>
      </article>`;
  };

  // 🥷 Secret quest — search "chun li" to reveal it.
  const CHUN_LI = {
    n: "Chun-Li",
    cat: "home",
    grp: "Legs & glutes",
    sys: "reps",
    goal: 100,
    chunli: true,
    desc:
      "Secret quest unlocked! Meet Chun-Li — the First Lady of Fighting Games and the strongest woman in the world. " +
      "Take in her iconic character model preview, then train like her: the Hyakuretsukyaku (Hundred Lightning Kicks) " +
      "is pure leg-day power — brace your core, stay light on the balls of your feet, and fire off rapid, controlled " +
      "kicks. Legendary legs, built on relentless training. 春麗 — 百裂脚!",
  };

  // Fast lookup by (unique) name for the detail popup.
  const byName = new Map(DATA.map((e) => [e.n, e]));
  byName.set(CHUN_LI.n, CHUN_LI);

  const results = document.getElementById("libResults");
  const empty = document.getElementById("libEmpty");
  const searchInput = document.getElementById("libSearch");
  const countEl = document.getElementById("libCount");
  const shownEl = document.getElementById("libShown");
  const tabs = document.getElementById("libTabs");

  if (countEl) countEl.textContent = String(DATA.length);

  // Body-map muscle groups → the exercise group keys (`cat::grp`) they include.
  const MUSCLE_GROUPS = {
    chest: ["gym::Chest", "home::Push"],
    back: ["gym::Back", "home::Pull"],
    shoulders: ["gym::Shoulders", "home::Push"],
    arms: ["gym::Arms", "home::Push", "home::Pull"],
    core: ["gym::Core", "home::Core"],
    legs: ["gym::Legs", "home::Legs & glutes"],
    glutes: ["home::Legs & glutes", "gym::Legs"],
    cardio: ["home::Cardio & conditioning", "gym::Cardio"],
  };
  const MUSCLE_LABELS = {
    chest: "Chest",
    back: "Back",
    shoulders: "Shoulders",
    arms: "Arms",
    core: "Core / Abs",
    legs: "Legs",
    glutes: "Glutes",
    cardio: "Cardio",
  };

  let filter = "all";
  let query = "";
  let muscle = null;

  const renderChunLi = () => {
    if (shownEl) shownEl.textContent = "1";
    if (empty) empty.hidden = true;
    results.innerHTML =
      `<section class="lib-group lib-group--chunli">
        <div class="lib-group__head">
          <span class="lib-group__tag lib-group__tag--chunli">Secret</span>
          <h2>Hidden Quest</h2>
          <span class="lib-group__count">1</span>
        </div>
        <div class="lib-grid">
          <article class="lib-card lib-card--chunli" data-name="Chun-Li" role="button" tabindex="0" aria-label="Chun-Li secret quest — view video">
            <div class="lib-card__head">
              <h3>Chun-Li ★</h3>
              <div class="lib-card__badges">
                <span class="lib-badge lib-badge--chunli">Easter Egg</span>
                <span class="lib-badge">100 kicks</span>
              </div>
            </div>
            <p>The strongest woman in the world. Legendary legs, Hundred Lightning Kicks, endless leg day. Tap to watch. 春麗</p>
            <span class="lib-card__more">Play video →</span>
          </article>
        </div>
      </section>`;
  };

  const render = () => {
    const q = query.trim().toLowerCase();
    if (q.replace(/[^a-z]/g, "") === "chunli") {
      renderChunLi();
      return;
    }
    const muscleKeys = muscle ? MUSCLE_GROUPS[muscle] : null;
    const matches = DATA.filter((e) => {
      if (filter !== "all" && e.cat !== filter) return false;
      if (muscleKeys && !muscleKeys.includes(`${e.cat}::${e.grp}`)) return false;
      if (!q) return true;
      return (
        e.n.toLowerCase().includes(q) ||
        e.grp.toLowerCase().includes(q) ||
        e.desc.toLowerCase().includes(q)
      );
    });

    if (shownEl) shownEl.textContent = String(matches.length);

    if (!matches.length) {
      results.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;

    const byGroup = new Map();
    matches.forEach((e) => {
      const key = `${e.cat}::${e.grp}`;
      if (!byGroup.has(key)) byGroup.set(key, []);
      byGroup.get(key).push(e);
    });

    const html = GROUP_ORDER.filter((k) => byGroup.has(k))
      .map((k) => {
        const [cat, grp] = k.split("::");
        const items = byGroup.get(k).map(cardHTML).join("");
        const tag = cat === "home" ? "Home" : "Gym";
        return `<section class="lib-group">
            <div class="lib-group__head">
              <span class="lib-group__tag lib-group__tag--${cat}">${tag}</span>
              <h2>${esc(grp)}</h2>
              <span class="lib-group__count">${byGroup.get(k).length}</span>
            </div>
            <div class="lib-grid">${items}</div>
          </section>`;
      })
      .join("");
    results.innerHTML = html;
  };

  if (tabs) {
    tabs.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      filter = btn.dataset.filter;
      [...tabs.querySelectorAll("button")].forEach((b) =>
        b.classList.toggle("is-on", b === btn)
      );
      render();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      query = searchInput.value;
      render();
    });
  }

  // ── Interactive body map ────────────────────────────────────────────────────
  const bodyMap = document.getElementById("bodyMap");
  const bmCaption = document.getElementById("bmCaption");
  const bmClear = document.getElementById("bmClear");
  const bmActiveLabel = document.getElementById("bmActiveLabel");
  const resultsAnchor = document.querySelector(".lib-showing");

  const paintActive = () => {
    if (!bodyMap) return;
    bodyMap.querySelectorAll("[data-muscle]").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.muscle === muscle);
    });
    if (bmActiveLabel)
      bmActiveLabel.textContent = muscle ? MUSCLE_LABELS[muscle] : "";
    if (bmClear) bmClear.hidden = !muscle;
    if (bmCaption)
      bmCaption.textContent = muscle
        ? `Showing ${MUSCLE_LABELS[muscle]} exercises`
        : "Tap a muscle to see its exercises";
  };

  const setMuscle = (m, doScroll) => {
    muscle = muscle === m ? null : m;
    paintActive();
    render();
    if (doScroll && muscle && resultsAnchor) {
      resultsAnchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (bodyMap) {
    bodyMap.addEventListener("click", (ev) => {
      const region = ev.target.closest("[data-muscle]");
      if (region) {
        setMuscle(region.dataset.muscle, true);
        return;
      }
      const viewBtn = ev.target.closest("[data-view]");
      if (viewBtn) {
        const view = viewBtn.dataset.view;
        bodyMap
          .querySelectorAll("[data-view]")
          .forEach((b) => b.classList.toggle("is-on", b === viewBtn));
        bodyMap.querySelectorAll(".bm-svg").forEach((svg) => {
          svg.hidden = svg.dataset.face !== view;
        });
      }
    });

    bodyMap.addEventListener("keydown", (ev) => {
      if (ev.key !== "Enter" && ev.key !== " ") return;
      const region = ev.target.closest("[data-muscle]");
      if (!region) return;
      ev.preventDefault();
      setMuscle(region.dataset.muscle, true);
    });

    // Hover preview on the SVG figure.
    bodyMap.addEventListener("mouseover", (ev) => {
      const region = ev.target.closest(".bm-region[data-muscle]");
      if (region && bmCaption)
        bmCaption.textContent = MUSCLE_LABELS[region.dataset.muscle];
    });
    bodyMap.addEventListener("mouseout", (ev) => {
      const region = ev.target.closest(".bm-region[data-muscle]");
      if (region) paintActive();
    });
  }

  if (bmClear) {
    bmClear.addEventListener("click", () => setMuscle(muscle, false));
  }

  // YouTube tutorial video IDs, keyed by exercise name. Played inline in the popup.
  const VIDEOS = {
    "Push-ups": "lsRAK6cr5kY",
    "Diamond Push-ups": "J0DnG1_S92I",
    "Wide Push-ups": "m3FTgWtJsFE",
    "Pike Push-ups": "fXgou2W10ok",
    "Archer Push-ups": "MxVbNel13Ek",
    "Bodyweight Dips": "yN6Q1UI_xkE",
    "Pull-ups": "bb8_5vZV5dU",
    "Chin-ups": "pspXcUhoygA",
    "Sit-ups": "pCX65Mtc_Kk",
    "Crunches": "O0pIQ2UqeCY",
    "Bicycle Crunches": "VaL7XWK3MVE",
    "Leg Raises": "U4L_6JEv9Jg",
    "Flutter Kicks": "ANVdMDaYRts",
    "Russian Twists": "LlccOWys8IU",
    "Plank": "pvIjsG5Svck",
    "Side Plank": "N_s9em1xTqU",
    "Hollow Hold": "hf00_b2sRdc",
    "Superman": "J9zXkxUAfUA",
    "Squats": "xuf1czJv-XI",
    "Jump Squats": "5xv0DKqe5XQ",
    "Lunges": "ASdqJoDPMHA",
    "Bulgarian Split Squats": "vgn7bSXkgkA",
    "Step-ups": "wfhXnLILqdk",
    "Glute Bridge": "Q_Bpj91Yiis",
    "Wall Sit": "cWTZ8Am1Ee0",
    "Calf Raises": "eMTy3qylqnE",
    "Burpees": "NCqbpkoiyXE",
    "Mountain Climbers": "ixxk9Qfn61o",
    "Jumping Jacks": "XR0xeuK5zBU",
    "High Knees": "ZNDHivUg7vA",
    "Jump Rope": "MQNKBBUvkrk",
    "Box Jumps": "DhTd3Gb4gNU",
    "Shadow Boxing": "J4j3AOVWuHE",
    "Running": "vDc-bBO2DKo",
    "Sprints": "2YogM9wXAJg",
    "Bench Press": "4Y2ZdHCOXok",
    "Incline Press": "VesHgJR14E8",
    "Dumbbell Fly": "QENKPHhQVi4",
    "Chest Press Machine": "n8TOta_pfr4",
    "Pec Deck Fly": "3jYo5cMU3d4",
    "Cable Crossover": "aoP0s_MjN-g",
    "Chest Dips": "yN6Q1UI_xkE",
    "Deadlift": "XxWcirHIwVo",
    "Barbell Row": "7B5Exks1KJE",
    "Lat Pulldown": "SALxEARiMkw",
    "Seated Row": "xQNrFHEMhI4",
    "T-Bar Row": "TyLoy3n_a10",
    "Shrugs": "M_MjF5Nm_h4",
    "Hyperextension": "k6LyPhGRV-o",
    "Overhead Press": "KP1sYz2VICk",
    "Dumbbell Shoulder Press": "B-aVuyhvLHU",
    "Shoulder Press Machine": "3R14MnZbcpw",
    "Lateral Raise Machine": "N7iyBxXATpo",
    "Face Pulls": "0Po47vvj9g4",
    "Barbell Back Squat": "ultWZbUMPL8",
    "Front Squat": "nmUof3vszxM",
    "Goblet Squat": "Mu7aVOjEBdA",
    "Romanian Deadlift": "3VXmecChYYM",
    "Leg Press": "2sRzh9loTbM",
    "Hack Squat": "0tn5K9NlCfo",
    "Smith Machine Squat": "XQ1KPrxmy0M",
    "Leg Extension": "TeWSOxCRU1c",
    "Leg Curl": "jxctD6fL_FQ",
    "Calf Press": "dhRz1Ns60Zg",
    "Bicep Curl Machine": "QElooWsIgSs",
    "Dumbbell Curl": "cBSD6mQIPQk",
    "Hammer Curl": "BRVDS6HVR9Q",
    "Preacher Curl": "DoCWeUBA0Gs",
    "Tricep Pushdown": "-zLyUAo1gMw",
    "Skull Crushers": "I0oFdApWtKw",
    "Dips Machine": "Zg0tT27iYuY",
    "Hanging Leg Raise": "Pr1ieGZ5atk",
    "Cable Crunch": "ToJeyhydUxU",
    "Treadmill": "gQMfOUhTXj4",
    "Elliptical": "EesEvYohy5o",
    "Rowing Machine": "6_eLpWiNijE",
    "Stationary Bike": "fQqndzvURAU",
    "Stair Climber": "Zn1O9LcKW9E",
    "Chun-Li": "EqNu3Kxdwgg",
  };

  // ── Exercise detail popup ──────────────────────────────────────────────────
  const modal = document.getElementById("libModal");
  const mTitle = document.getElementById("libModalTitle");
  const mGroup = document.getElementById("libModalGroup");
  const mBadges = document.getElementById("libModalBadges");
  const mDesc = document.getElementById("libModalDesc");
  const mYT = document.getElementById("libModalYT");
  const mVideo = document.getElementById("libModalVideo");
  let lastFocus = null;

  const embedIframe = (id, title) =>
    `<iframe src="https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&autoplay=1" ` +
    `title="${esc(title)} tutorial" loading="lazy" allowfullscreen ` +
    `referrerpolicy="strict-origin-when-cross-origin" ` +
    `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>`;

  // Fallback facade (used only if a local video file is missing): thumbnail + play
  // button that loads the YouTube player on click.
  const ytFacade = (id, name) =>
    `<button class="lib-video-play" type="button" data-vid="${id}" data-title="${esc(name)}" ` +
    `aria-label="Play ${esc(name)} video tutorial" ` +
    `style="background-image:url('https://i.ytimg.com/vi/${id}/hqdefault.jpg')">` +
    `<span class="lib-video-play__btn" aria-hidden="true">` +
    `<svg viewBox="0 0 68 48"><path class="lib-video-play__bg" d="M66.5 7.7a8 8 0 0 0-5.6-5.7C56 .7 34 .7 34 .7s-22 0-26.9 1.3A8 8 0 0 0 1.5 7.7 83 83 0 0 0 .2 24a83 83 0 0 0 1.3 16.3 8 8 0 0 0 5.6 5.7C12 47.3 34 47.3 34 47.3s22 0 26.9-1.3a8 8 0 0 0 5.6-5.7A83 83 0 0 0 67.8 24a83 83 0 0 0-1.3-16.3z"/><path d="M45 24 27 14v20z" fill="#fff"/></svg>` +
    `</span></button>`;

  const buildVideo = (e) => {
    if (!mVideo) return;
    const id = VIDEOS[e.n];
    if (!id) {
      mVideo.innerHTML =
        `<a class="lib-modal__video-fallback" href="${ytSearch(e.n)}" target="_blank" rel="noopener noreferrer">` +
        `Find a video tutorial for ${esc(e.n)} on YouTube ↗</a>`;
      mVideo.classList.add("is-empty");
      return;
    }

    mVideo.classList.remove("is-empty");
    // YouTube facade: light for GitHub Pages (no 600MB+ of local MP4s).
    // Click-to-load keeps the page fast until the hunter wants a tutorial.
    mVideo.innerHTML = ytFacade(id, e.n);
  };

  const modalCard = modal ? modal.querySelector(".lib-modal__card") : null;

  const openModal = (e) => {
    if (!modal) return;
    lastFocus = document.activeElement;
    if (modalCard) modalCard.classList.toggle("lib-modal--chunli", !!e.chunli);
    if (mTitle) mTitle.textContent = e.n;
    if (mGroup)
      mGroup.textContent = `${e.cat === "home" ? "Home / Bodyweight" : "Gym"} · ${e.grp}`;
    if (mBadges) mBadges.innerHTML = badgesHTML(e);
    if (mDesc) mDesc.textContent = e.desc;
    buildVideo(e);
    if (mYT) mYT.href = VIDEOS[e.n] ? `https://www.youtube.com/watch?v=${VIDEOS[e.n]}` : ytSearch(e.n);
    modal.hidden = false;
    modal.scrollTop = 0;
    document.body.classList.add("lib-modal-open");
    const card = modal.querySelector(".lib-modal__card");
    if (card) card.scrollTop = 0;
    const closeBtn = modal.querySelector(".lib-modal__close");
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = () => {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    if (mVideo) mVideo.innerHTML = ""; // stop playback
    document.body.classList.remove("lib-modal-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };

  if (results) {
    results.addEventListener("click", (ev) => {
      const card = ev.target.closest(".lib-card");
      if (!card) return;
      const e = byName.get(card.dataset.name);
      if (e) openModal(e);
    });
    results.addEventListener("keydown", (ev) => {
      if (ev.key !== "Enter" && ev.key !== " ") return;
      const card = ev.target.closest(".lib-card");
      if (!card) return;
      ev.preventDefault();
      const e = byName.get(card.dataset.name);
      if (e) openModal(e);
    });
  }

  if (mVideo) {
    mVideo.addEventListener("click", (ev) => {
      const play = ev.target.closest(".lib-video-play");
      if (!play) return;
      mVideo.innerHTML = embedIframe(play.dataset.vid, play.dataset.title || "");
    });
  }

  if (modal) {
    modal.addEventListener("click", (ev) => {
      if (ev.target.closest("[data-close]")) closeModal();
    });
  }
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") closeModal();
  });

  render();
})();
