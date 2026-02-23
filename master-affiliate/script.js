// CURSOR
const dot = document.querySelector(".cur-dot"),
  ring = document.querySelector(".cur-ring");
document.addEventListener("mousemove", (e) => {
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
  setTimeout(() => {
    ring.style.left = e.clientX + "px";
    ring.style.top = e.clientY + "px";
  }, 80);
});
document
  .querySelectorAll("a,button,.acard,.tc,.bmcard,.pc,.mrow")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.transform = "translate(-50%,-50%) scale(2)";
      ring.style.borderColor = "rgba(201,168,76,.7)";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.borderColor = "rgba(201,168,76,.5)";
    });
  });

// TIMER
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
  const d = Math.max(0, end - now),
    f = (n) => String(n).padStart(2, "0");
  const H = Math.floor(d / 3600000),
    M = Math.floor((d % 3600000) / 60000),
    S = Math.floor((d % 60000) / 1000);
  document.getElementById("hh").textContent = f(H);
  document.getElementById("mm").textContent = f(M);
  document.getElementById("ss").textContent = f(S);
  document.getElementById("bt").textContent = `${f(H)}:${f(M)}:${f(S)}`;
}
tick();
setInterval(tick, 1000);

// REVEAL
const io = new IntersectionObserver(
  (en) => {
    en.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.06 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// FAQ
document.querySelectorAll(".fq").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".fi"),
      open = item.classList.contains("open");
    document.querySelectorAll(".fi").forEach((i) => i.classList.remove("open"));
    if (!open) item.classList.add("open");
  });
});

// CONFETTI — gold stars
const canvas = document.getElementById("cc");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
const COLS = [
  "#C9A84C",
  "#E8C96B",
  "#F5E6A3",
  "#8B6914",
  "#fff",
  "#FFD700",
  "#B8860B",
  "#DAA520",
];
let pieces = [],
  running = false;
function Conf(x, y) {
  this.x = x;
  this.y = y;
  this.color = COLS[(Math.random() * COLS.length) | 0];
  this.w = Math.random() * 10 + 4;
  this.h = Math.random() * 5 + 3;
  this.vx = (Math.random() - 0.5) * 14;
  this.vy = (Math.random() - 3) * 10;
  this.gravity = 0.36;
  this.drag = 0.97;
  this.rot = Math.random() * Math.PI * 2;
  this.rs = (Math.random() - 0.5) * 0.2;
  this.alpha = 1;
  this.shape = Math.random() > 0.4 ? "star" : "rect";
}
Conf.prototype.update = function () {
  this.vy += this.gravity;
  this.vx *= this.drag;
  this.vy *= this.drag;
  this.x += this.vx;
  this.y += this.vy;
  this.rot += this.rs;
  if (this.y > canvas.height * 0.65) this.alpha -= 0.018;
};
Conf.prototype.draw = function (c) {
  c.save();
  c.globalAlpha = Math.max(0, this.alpha);
  c.translate(this.x, this.y);
  c.rotate(this.rot);
  c.fillStyle = this.color;
  if (this.shape === "star") {
    const r1 = this.w / 2,
      r2 = r1 / 2.5,
      pts = 5;
    c.beginPath();
    for (let i = 0; i < pts * 2; i++) {
      const r = i % 2 === 0 ? r1 : r2;
      const a = (i / pts) * Math.PI - Math.PI / 2;
      c.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    c.closePath();
    c.fill();
  } else {
    c.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
  }
  c.restore();
};
function launch(x, y, n = 80) {
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
window.addEventListener("load", () => {
  setTimeout(() => {
    launch(canvas.width * 0.3, canvas.height * 0.2, 70);
    setTimeout(() => launch(canvas.width * 0.7, canvas.height * 0.2, 70), 350);
    setTimeout(() => launch(canvas.width * 0.5, canvas.height * 0.15, 50), 700);
  }, 800);
});
document.querySelectorAll(".btnH,.btnF,.nbtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const r = btn.getBoundingClientRect();
    launch(r.left + r.width / 2, r.top + r.height / 2, 70);
  });
});

// 3D TILT
document.querySelectorAll(".acard,.tc,.bmcard,.pc,.bhcard").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    card.style.transform = `perspective(900px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) translateY(-5px)`;
    card.style.boxShadow = `${-dx * 10}px ${-dy * 10}px 28px rgba(201,168,76,.15)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.boxShadow = "";
  });
});

// MAGNETIC
document.querySelectorAll(".btnH,.btnF").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${dx * 0.15}px,${dy * 0.15}px) translateY(-4px)`;
  });
  btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
});

// COUNTER
const ctrs = [
  { id: "c1", to: 2400, suf: "+", dec: false },
  { id: "c2", to: 30, suf: "×", dec: false },
  { id: "c3", to: 4.9, suf: "★", dec: true },
  { id: "c4", to: 7500, suf: "+", dec: false },
];
function animC(el, to, suf, dec, dur = 1600) {
  const s = performance.now();
  (function step(now) {
    const p = Math.min((now - s) / dur, 1),
      e = 1 - Math.pow(1 - p, 3),
      v = to * e;
    el.textContent =
      (dec ? v.toFixed(1) : Math.floor(v).toLocaleString("id-ID")) + suf;
    if (p < 1) requestAnimationFrame(step);
  })(s);
}
const obs = new IntersectionObserver(
  (en) => {
    en.forEach((e) => {
      if (e.isIntersecting) {
        obs.unobserve(e.target);
        ctrs.forEach((c) => {
          const el = document.getElementById(c.id);
          if (el) animC(el, c.to, c.suf, c.dec);
        });
      }
    });
  },
  { threshold: 0.3 },
);
const strip = document.querySelector(".sstrip");
if (strip) obs.observe(strip);

// MODULE ROW INDENT on hover
document.querySelectorAll(".mrow").forEach((r) => {
  r.addEventListener("mouseenter", () => {
    r.style.paddingLeft = "14px";
  });
  r.addEventListener("mouseleave", () => {
    r.style.paddingLeft = "0";
  });
});
