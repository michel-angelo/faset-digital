// CONFETTI on load
const canvas = document.getElementById("cc");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
const COLS = [
  "#00C07A",
  "#4ADE80",
  "#7B2FFF",
  "#FF5C00",
  "#FFB347",
  "#C084FC",
  "#fff",
  "#E8C96B",
];
let pieces = [],
  running = false;
function Conf(x, y) {
  this.x = x || Math.random() * canvas.width;
  this.y = y || -10;
  this.color = COLS[(Math.random() * COLS.length) | 0];
  this.w = Math.random() * 11 + 4;
  this.h = Math.random() * 5 + 3;
  this.vx = (Math.random() - 0.5) * 12;
  this.vy = Math.random() * 6 + 3;
  this.gravity = 0.28;
  this.drag = 0.98;
  this.rot = Math.random() * Math.PI * 2;
  this.rs = (Math.random() - 0.5) * 0.18;
  this.alpha = 1;
  this.shape = ["rect", "circle", "star"][Math.floor(Math.random() * 3)];
}
Conf.prototype.update = function () {
  this.vy += this.gravity;
  this.vx *= this.drag;
  this.x += this.vx;
  this.y += this.vy;
  this.rot += this.rs;
  if (this.y > canvas.height * 0.8) this.alpha -= 0.025;
};
Conf.prototype.draw = function (c) {
  c.save();
  c.globalAlpha = Math.max(0, this.alpha);
  c.translate(this.x, this.y);
  c.rotate(this.rot);
  c.fillStyle = this.color;
  if (this.shape === "circle") {
    c.beginPath();
    c.arc(0, 0, this.w / 2, 0, Math.PI * 2);
    c.fill();
  } else if (this.shape === "star") {
    const r1 = this.w / 2,
      r2 = r1 / 2.5;
    c.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? r1 : r2;
      const a = (i / 5) * Math.PI - Math.PI / 2;
      c.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    c.closePath();
    c.fill();
  } else {
    c.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
  }
  c.restore();
};
function launch(n = 120) {
  // cascade from top
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      pieces.push(new Conf(Math.random() * canvas.width, -10));
    }, Math.random() * 1500);
  }
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
  if (pieces.length > 0 || running) requestAnimationFrame(run);
  else {
    running = false;
  }
}
window.addEventListener("load", () => setTimeout(() => launch(150), 400));

// Also burst on success ring click
document.querySelector(".success-ring").addEventListener("click", () => {
  for (let i = 0; i < 60; i++)
    pieces.push(new Conf(innerWidth / 2, innerHeight / 3));
  if (!running) run();
});
