const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");
const particles = [];
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

class Heart {
  constructor(x, y, size, speed, drift) {
    this.x = x ?? Math.random() * w;
    this.y = y ?? h + 20;
    this.size = size ?? 8 + Math.random() * 14;
    this.speed = speed ?? 0.4 + Math.random() * 0.8;
    this.drift = drift ?? (Math.random() - 0.5) * 0.6;
    this.opacity = 0.15 + Math.random() * 0.35;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.02;
  }

  update() {
    this.y -= this.speed;
    this.x += this.drift;
    this.rotation += this.rotSpeed;
    if (this.y < -30) {
      this.y = h + 20;
      this.x = Math.random() * w;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = "#e8a4b8";
    ctx.beginPath();
    const s = this.size;
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(0, 0, -s, 0, -s, s * 0.35);
    ctx.bezierCurveTo(-s, s * 0.7, 0, s, 0, s * 1.2);
    ctx.bezierCurveTo(0, s, s, s * 0.7, s, s * 0.35);
    ctx.bezierCurveTo(s, 0, 0, 0, 0, s * 0.3);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 28; i++) {
  particles.push(
    new Heart(
      Math.random() * w,
      Math.random() * h,
      undefined,
      0.2 + Math.random() * 0.5
    )
  );
}

function burst(cx, cy) {
  for (let i = 0; i < 18; i++) {
    const angle = (Math.PI * 2 * i) / 18;
    const heart = new Heart(cx, cy, 6 + Math.random() * 10, 2 + Math.random() * 3);
    heart.drift = Math.cos(angle) * 1.2;
    heart.speed = 1.5 + Math.random() * 2;
    heart.opacity = 0.5 + Math.random() * 0.4;
    particles.push(heart);
  }
}

function loop() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  if (particles.length > 80) particles.splice(0, particles.length - 80);
  requestAnimationFrame(loop);
}

loop();

document.getElementById("burst").addEventListener("click", (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  burst(rect.left + rect.width / 2, rect.top + rect.height / 2);
});
