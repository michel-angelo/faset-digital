// ══════════════════════════════════════════
// 1. COUNTDOWN TIMER
// ══════════════════════════════════════════
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
  document.getElementById("h").textContent = f(hh);
  document.getElementById("m").textContent = f(mm);
  document.getElementById("s").textContent = f(ss);
  document.getElementById("bar-timer").textContent =
    `${f(hh)}:${f(mm)}:${f(ss)}`;
}
tick();
setInterval(tick, 1000);

// ══════════════════════════════════════════
// 2. SCROLL REVEAL
// ══════════════════════════════════════════
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ══════════════════════════════════════════
// 3. FAQ ACCORDION
// ══════════════════════════════════════════
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const wasOpen = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  });
});

// ══════════════════════════════════════════
// 4. FLOATING PARTICLES (hero bg)
// ══════════════════════════════════════════
(function createParticles() {
  const colors = [
    "#FF5C00",
    "#FF7A2E",
    "#FFB347",
    "#FF9B5C",
    "rgba(255,92,0,.3)",
  ];
  const hero = document.querySelector(".hero");
  for (let i = 0; i < 12; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 12 + 4;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;background:${colors[Math.floor(Math.random() * colors.length)]};animation-duration:${Math.random() * 15 + 10}s;animation-delay:${Math.random() * 10}s;opacity:.4;`;
    hero.appendChild(p);
  }
})();

// ══════════════════════════════════════════
// 5. TYPEWRITER EFFECT
// ══════════════════════════════════════════
(function typewriter() {
  const words = ["Penghasilan", "Passive Income", "Kebebasan", "Penghasilan"];
  const el = document.getElementById("typewriter");
  if (!el) return;
  let wi = 0,
    ci = 0,
    deleting = false;
  function type() {
    const word = words[wi % words.length];
    if (!deleting) {
      ci++;
      el.textContent = word.slice(0, ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 80);
    } else {
      ci--;
      el.textContent = word.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        wi++;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 45);
    }
  }
  setTimeout(type, 800);
})();

// ══════════════════════════════════════════
// 6. CONFETTI BURST
// ══════════════════════════════════════════
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
let confettiPieces = [];
let confettiRunning = false;
let confettiFrame;

function Confetto(x, y) {
  this.x = x || canvas.width / 2;
  this.y = y || canvas.height * 0.3;
  this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  this.w = Math.random() * 10 + 5;
  this.h = Math.random() * 5 + 3;
  this.vx = (Math.random() - 0.5) * 14;
  this.vy = (Math.random() - 2.5) * 10;
  this.gravity = 0.4;
  this.drag = 0.97;
  this.rotation = Math.random() * Math.PI * 2;
  this.rotSpeed = (Math.random() - 0.5) * 0.2;
  this.alpha = 1;
  this.shape = Math.random() > 0.5 ? "rect" : "circle";
}
Confetto.prototype.update = function () {
  this.vy += this.gravity;
  this.vx *= this.drag;
  this.vy *= this.drag;
  this.x += this.vx;
  this.y += this.vy;
  this.rotation += this.rotSpeed;
  if (this.y > canvas.height * 0.7) this.alpha -= 0.025;
};
Confetto.prototype.draw = function (c) {
  c.save();
  c.globalAlpha = Math.max(0, this.alpha);
  c.translate(this.x, this.y);
  c.rotate(this.rotation);
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

function launchConfetti(x, y, count = 80) {
  for (let i = 0; i < count; i++) confettiPieces.push(new Confetto(x, y));
  if (!confettiRunning) runConfetti();
}

function runConfetti() {
  confettiRunning = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces = confettiPieces.filter((p) => p.alpha > 0);
  confettiPieces.forEach((p) => {
    p.update();
    p.draw(ctx);
  });
  if (confettiPieces.length > 0) {
    confettiFrame = requestAnimationFrame(runConfetti);
  } else {
    confettiRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Launch on page load
window.addEventListener("load", () => {
  setTimeout(
    () => launchConfetti(canvas.width / 2, canvas.height * 0.25, 100),
    600,
  );
});

// Launch on CTA click
document
  .querySelectorAll(".btn-primary, .btn-white, .card-cta, .nav-btn")
  .forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const r = btn.getBoundingClientRect();
      launchConfetti(r.left + r.width / 2, r.top + r.height / 2, 60);
    });
  });

// ══════════════════════════════════════════
// 7. COUNTER ANIMATION (stats strip)
// ══════════════════════════════════════════
const statsData = [
  {
    selector: ".stat-item:nth-child(1) .stat-num",
    from: 0,
    to: 4800,
    suffix: "+",
    decimal: false,
  },
  {
    selector: ".stat-item:nth-child(2) .stat-num",
    from: 0,
    to: 4.9,
    suffix: "★",
    decimal: true,
  },
  {
    selector: ".stat-item:nth-child(3) .stat-num",
    from: 0,
    to: 3,
    suffix: " Ebook",
    decimal: false,
  },
  {
    selector: ".stat-item:nth-child(4) .stat-num",
    from: 0,
    to: 149,
    suffix: "rb",
    prefix: "Rp ",
    decimal: false,
  },
];

function animateCount(el, from, to, suffix, prefix, decimal, duration = 1400) {
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = from + (to - from) * ease;
    const formatted = decimal
      ? val.toFixed(1)
      : Math.floor(val).toLocaleString("id-ID");
    el.textContent = (prefix || "") + formatted + (suffix || "");
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const stripObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        stripObs.unobserve(e.target);
        statsData.forEach((d) => {
          const el = document.querySelector(d.selector);
          if (el) animateCount(el, d.from, d.to, d.suffix, d.prefix, d.decimal);
        });
      }
    });
  },
  { threshold: 0.3 },
);
const strip = document.querySelector(".stats-strip");
if (strip) stripObs.observe(strip);

// ══════════════════════════════════════════
// 8. 3D TILT + PARTICLE BURST on product cards
// ══════════════════════════════════════════
document.querySelectorAll(".product-card").forEach((card) => {
  const shine = card.querySelector(".tilt-shine");

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotX = -dy * 8;
    const rotY = dx * 8;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    card.style.boxShadow = `${-rotY * 2}px ${rotX * 2}px 40px rgba(255,92,0,.2)`;
    if (shine) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,.22) 0%, transparent 55%)`;
      shine.style.opacity = "1";
    }
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.boxShadow = "";
    if (shine) shine.style.opacity = "0";
  });

  // particle burst on hover enter
  card.addEventListener("mouseenter", (e) => {
    const rect = card.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
      const p = document.createElement("div");
      p.className = "burst-particle";
      const size = Math.random() * 8 + 4;
      const angle = ((Math.PI * 2) / 8) * i + Math.random() * 0.5;
      const dist = Math.random() * 60 + 30;
      p.style.cssText = `
        width:${size}px;height:${size}px;
        left:${rect.left + rect.width / 2 - size / 2}px;
        top:${rect.top + rect.height / 2 - size / 2}px;
        background:${COLORS[Math.floor(Math.random() * 3)]};
        --tx:${Math.cos(angle) * dist}px;
        --ty:${Math.sin(angle) * dist}px;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 800);
    }
  });
});

// ══════════════════════════════════════════
// 9. MAGNETIC BUTTON EFFECT
// ══════════════════════════════════════════
document.querySelectorAll(".btn-primary, .btn-white").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px) translateY(-3px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});
