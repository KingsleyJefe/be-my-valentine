const flower = document.getElementById("flower");
const layers = document.querySelectorAll(".petal-layer");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const spotify = document.getElementById("spotify");

/* Scroll-based bloom */
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = Math.min(scrollTop / docHeight, 1);

  flower.style.opacity = progress;
  flower.style.transform = `scale(${0.4 + progress * 0.6})`;

  layers.forEach((layer, index) => {
    const start = index * 0.2;
    const layerProgress = Math.max(0, (progress - start) / 0.6);
    layer.querySelectorAll("ellipse").forEach(petal => {
      petal.style.transform = `scale(${Math.min(layerProgress, 1)})`;
    });
  });
});

/* Fade-in text */
const messageLines = document.querySelectorAll(".message p");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.3 }
);
messageLines.forEach(line => observer.observe(line));

/* Confetti */
function launchConfetti() {
  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
    confetti.style.setProperty("--hue", Math.random());
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

/* Yes click */
yesBtn.addEventListener("click", () => {
  result.classList.remove("hidden");
  result.scrollIntoView({ behavior: "smooth" });
  launchConfetti();
  spotify.classList.add("highlight");
});

/* No dodge */
noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});
