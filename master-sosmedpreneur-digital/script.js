// ══ CURSOR ══
const dot = document.querySelector(".cursor-dot"),
  ring = document.querySelector(".cursor-ring");
document.addEventListener("mousemove", (e) => {
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
  setTimeout(() => {
    ring.style.left = e.clientX + "px";
    ring.style.top = e.clientY + "px";
  }, 80);
});
document
  .querySelectorAll("a,button,.hp-card,.ai-card,.testi-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.transform = "translate(-50%,-50%) scale(2)";
      ring.style.borderColor = "rgba(255,92,0,.6)";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.borderColor = "rgba(255,179,71,.6)";
    });
  });

// ══ TIMER ══
function tick() {
  const now = new Date(),
    end = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
    );
  const diff = Math.max(0, end - now);
  const f = (n) => String(n).padStart(2, "0");
  const hh = Math.floor(diff / 3600000),
    mm = Math.floor((diff % 3600000) / 60000),
    ss = Math.floor((diff % 60000) / 1000);
  document.getElementById("h").textContent = f(hh);
  document.getElementById("m").textContent = f(mm);
  document.getElementById("s").textContent = f(ss);
  document.getElementById("bar-timer").textContent =
    `${f(hh)}:${f(mm)}:${f(ss)}`;
}
tick();
setInterval(tick, 1000);

// ══ REVEAL ══
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.06 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ══ FAQ ══
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item"),
      open = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("open"));
    if (!open) item.classList.add("open");
  });
});

// ══ CONFETTI ══
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
const COLORS = [
  "#7B2FFF",
  "#C084FC",
  "#FF5C00",
  "#FFB347",
  "#fff",
  "#E879F9",
  "#A78BFA",
  "#FF7A2E",
  "#4ADE80",
];
let pieces = [],
  running = false;
function Conf(x, y) {
  this.x = x;
  this.y = y;
  this.color = COLORS[(Math.random() * COLORS.length) | 0];
  this.w = Math.random() * 12 + 4;
  this.h = Math.random() * 6 + 3;
  this.vx = (Math.random() - 0.5) * 16;
  this.vy = (Math.random() - 3) * 11;
  this.gravity = 0.36;
  this.drag = 0.97;
  this.rot = Math.random() * Math.PI * 2;
  this.rs = (Math.random() - 0.5) * 0.22;
  this.alpha = 1;
  this.shape = ["rect", "circle", "triangle"][Math.floor(Math.random() * 3)];
}
Conf.prototype.update = function () {
  this.vy += this.gravity;
  this.vx *= this.drag;
  this.vy *= this.drag;
  this.x += this.vx;
  this.y += this.vy;
  this.rot += this.rs;
  if (this.y > canvas.height * 0.6) this.alpha -= 0.018;
};
Conf.prototype.draw = function (c) {
  c.save();
  c.globalAlpha = Math.max(0, this.alpha);
  c.translate(this.x, this.y);
  c.rotate(this.rot);
  c.fillStyle = this.color;
  if (this.shape === "rect") {
    c.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
  } else if (this.shape === "circle") {
    c.beginPath();
    c.arc(0, 0, this.w / 2, 0, Math.PI * 2);
    c.fill();
  } else {
    c.beginPath();
    c.moveTo(0, -this.w / 2);
    c.lineTo(this.w / 2, this.w / 2);
    c.lineTo(-this.w / 2, this.w / 2);
    c.closePath();
    c.fill();
  }
  c.restore();
};
function launch(x, y, n = 100) {
  for (let i = 0; i < n; i++)
    pieces.push(new Conf(x || canvas.width / 2, y || canvas.height * 0.2));
  if (!running) run();
}
function run() {
  running = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces = pieces.filter((p) => p.alpha > 0);
  pieces.forEach((p) => {
    p.update();
    p.draw(ctx);
  });
  if (pieces.length > 0) requestAnimationFrame(run);
  else {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// burst on load — multipoint
window.addEventListener("load", () => {
  setTimeout(() => {
    launch(canvas.width * 0.3, canvas.height * 0.2, 80);
    setTimeout(() => launch(canvas.width * 0.7, canvas.height * 0.2, 80), 300);
    setTimeout(() => launch(canvas.width * 0.5, canvas.height * 0.15, 60), 600);
  }, 700);
});
document.querySelectorAll(".btn-hero,.btn-final,.nav-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const r = btn.getBoundingClientRect();
    launch(r.left + r.width / 2, r.top + r.height / 2, 80);
  });
});

// ══ 3D TILT ══
document
  .querySelectorAll(".bundle-half,.ai-card,.testi-card,.bonus-card,.hp-card")
  .forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      const intensity = card.classList.contains("bundle-half") ? 5 : 7;
      card.style.transform = `perspective(900px) rotateX(${-dy * intensity}deg) rotateY(${dx * intensity}deg) translateY(-6px)`;
      card.style.boxShadow = `${-dx * 12}px ${-dy * 12}px 40px rgba(123,47,255,.2)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.boxShadow = "";
    });
  });

// ══ MAGNETIC ══
document.querySelectorAll(".btn-hero,.btn-final").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${dx * 0.18}px,${dy * 0.18}px) translateY(-5px)`;
  });
  btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
});

// ══ COUNTER ANIMATION (stats strip) ══
const counters = [
  { id: "cnt1", to: 5200, suffix: "+", dec: false },
  { id: "cnt2", to: 6, suffix: " File", dec: false },
  { id: "cnt3", to: 4.9, suffix: "★", dec: true },
  { id: "cnt4", to: 300, suffix: "rb", prefix: "Rp ", dec: false },
];
function animCount(el, to, suffix, prefix, dec, dur = 1400) {
  const start = performance.now();
  (function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    const v = to * e;
    el.textContent =
      (prefix || "") +
      (dec ? v.toFixed(1) : Math.floor(v).toLocaleString("id-ID")) +
      (suffix || "");
    if (p < 1) requestAnimationFrame(step);
  })(start);
}
const stripObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        stripObs.unobserve(e.target);
        counters.forEach((c) => {
          const el = document.getElementById(c.id);
          if (el) animCount(el, c.to, c.suffix, c.prefix, c.dec);
        });
      }
    });
  },
  { threshold: 0.3 },
);
const strip = document.querySelector(".stats-strip");
if (strip) stripObs.observe(strip);

// ══ TYPEWRITER on hero h1 accent ══
(function () {
  const phrases = [
    "Bisnis Digital",
    "Passive Income",
    "Kebebasan Finansial",
    "Bisnis Digital",
  ];
  const container = document.querySelector("h1 .line-grad");
  if (!container) return;
  const original = container.textContent;
  let wi = 0,
    ci = 0,
    del = false;
  function type() {
    const w = phrases[wi % phrases.length];
    if (!del) {
      ci++;
      container.textContent = w.slice(0, ci);
      if (ci === w.length) {
        del = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 75);
    } else {
      ci--;
      container.textContent = w.slice(0, ci);
      if (ci === 0) {
        del = false;
        wi++;
        setTimeout(type, 350);
        return;
      }
      setTimeout(type, 40);
    }
  }
  setTimeout(type, 1200);
})();
