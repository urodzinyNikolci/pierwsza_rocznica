const welcome = document.getElementById("welcome");
const letterSection = document.getElementById("letterSection");
const openButton = document.getElementById("openLetter");
const openHint = document.getElementById("openHint");
const progressBar = document.getElementById("progressBar");
const backToTop = document.getElementById("backToTop");

let isOpening = false;

function openLetter() {
  if (isOpening) return;
  isOpening = true;
  openButton.classList.add("opened");

  window.setTimeout(() => {
    welcome.classList.add("is-opening");
    letterSection.style.display = "block";
    letterSection.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
      letterSection.classList.add("visible");
      requestAnimationFrame(() => letterSection.classList.add("revealed"));
    });

    window.setTimeout(() => {
      welcome.style.display = "none";
      letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
  }, 650);
}

openButton.addEventListener("click", openLetter);
openHint.addEventListener("click", openLetter);

function updateReadingProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  backToTop.classList.toggle("show", window.scrollY > 500);
}

window.addEventListener("scroll", updateReadingProgress, { passive: true });
window.addEventListener("resize", updateReadingProgress);
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
updateReadingProgress();
