// ══════ TIMER ══════
function tick() {
  const now = new Date();
  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
  );
  const diff = Math.max(0, end - now);
  const hh = Math.floor(diff / 3600000);
  const mm = Math.floor((diff % 3600000) / 60000);
  const ss = Math.floor((diff % 60000) / 1000);
  const f = (n) => String(n).padStart(2, "0");
  ["h", "m", "s"].forEach(
    (id, i) => (document.getElementById(id).textContent = f([hh, mm, ss][i])),
  );
  document.getElementById("bar-timer").textContent =
    `${f(hh)}:${f(mm)}:${f(ss)}`;
}
tick();
setInterval(tick, 1000);

// ══════ SCROLL REVEAL ══════
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.07 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ══════ FAQ ══════
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const open = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("open"));
    if (!open) item.classList.add("open");
  });
});

// ══════ CONFETTI ══════
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
const COLORS = [
  "#FF5C00",
  "#FF7A2E",
  "#FFB347",
  "#FF9B5C",
  "#FFF3EC",
  "#fff",
  "#FFDA79",
];
let pieces = [],
  running = false;
function Conf(x, y) {
  this.x = x;
  this.y = y;
  this.color = COLORS[(Math.random() * COLORS.length) | 0];
  this.w = Math.random() * 10 + 5;
  this.h = Math.random() * 5 + 3;
  this.vx = (Math.random() - 0.5) * 14;
  this.vy = (Math.random() - 2.8) * 10;
  this.gravity = 0.38;
  this.drag = 0.97;
  this.rot = Math.random() * Math.PI * 2;
  this.rs = (Math.random() - 0.5) * 0.2;
  this.alpha = 1;
  this.shape = Math.random() > 0.5 ? "rect" : "circle";
}
Conf.prototype.update = function () {
  this.vy += this.gravity;
  this.vx *= this.drag;
  this.vy *= this.drag;
  this.x += this.vx;
  this.y += this.vy;
  this.rot += this.rs;
  if (this.y > canvas.height * 0.65) this.alpha -= 0.02;
};
Conf.prototype.draw = function (c) {
  c.save();
  c.globalAlpha = Math.max(0, this.alpha);
  c.translate(this.x, this.y);
  c.rotate(this.rot);
  c.fillStyle = this.color;
  if (this.shape === "rect") {
    c.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
  } else {
    c.beginPath();
    c.arc(0, 0, this.w / 2, 0, Math.PI * 2);
    c.fill();
  }
  c.restore();
};
function launch(x, y, n = 80) {
  for (let i = 0; i < n; i++) pieces.push(new Conf(x, y));
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
window.addEventListener("load", () =>
  setTimeout(() => launch(canvas.width / 2, canvas.height * 0.2, 120), 700),
);
document.querySelectorAll(".btn-hero, .btn-big, .nav-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const r = btn.getBoundingClientRect();
    launch(r.left + r.width / 2, r.top + r.height / 2, 70);
  });
});

// ══════ 3D TILT on file cards ══════
document.querySelectorAll(".file-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    card.style.transform = `perspective(1000px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg) translateY(-5px)`;
    card.style.boxShadow = `${-dx * 10}px ${-dy * 10}px 40px rgba(255,92,0,.15)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.boxShadow = "";
  });
});

// ══════ MAGNETIC CTA ══════
document.querySelectorAll(".btn-hero, .btn-big").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${dx * 0.15}px,${dy * 0.15}px) translateY(-4px)`;
  });
  btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
});
