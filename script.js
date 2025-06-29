// ========== TYPEWRITER ==========
const texts = [
  "Rafif Mehri",
  "3éme Math Student √𝞹",
  "Computer Science Student"
];

let index = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100;
const delay = 1500;
const element = document.getElementById("typewriter");

function type() {
  const current = texts[index];
  if (isDeleting) {
    charIndex--;
    element.textContent = current.substring(0, charIndex);
  } else {
    charIndex++;
    element.textContent = current.substring(0, charIndex);
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(type, delay);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % texts.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? speed / 2 : speed);
  }
}
type();

// ========== CANVAS: Soft Floating 🎀 ==========
const canvas = document.getElementById("code-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "-1";
  canvas.style.pointerEvents = "none"; // fully passive
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const EMOJI = "🎀";
const particles = [];

for (let i = 0; i < 25; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 16 + 12,
    speedY: Math.random() * 0.3 + 0.2,
    opacity: Math.random() * 0.6 + 0.2
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";

  particles.forEach(p => {
    ctx.globalAlpha = p.opacity;
    ctx.font = `${p.size}px serif`;
    ctx.fillText(EMOJI, p.x, p.y);

    p.y += p.speedY;
    if (p.y > canvas.height) {
      p.y = -50;
      p.x = Math.random() * canvas.width;
    }
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}

drawParticles();
