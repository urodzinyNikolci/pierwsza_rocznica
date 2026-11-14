const welcome = document.getElementById("welcome");
const letterSection = document.getElementById("letterSection");
const openButton = document.getElementById("openLetter");
const openHint = document.getElementById("openHint");
const progressBar = document.getElementById("progressBar");
const backToTop = document.getElementById("backToTop");

let isOpening = false;

// Licznik czasu od rozpoczęcia związku: 15 listopada 2025.
const relationshipStart = new Date(2025, 10, 15);
const counterYears = document.getElementById("counterYears");
const counterMonths = document.getElementById("counterMonths");
const counterDays = document.getElementById("counterDays");

function polishUnit(value, forms) {
  if (value === 1) return forms[0];
  if (value % 10 >= 2 && value % 10 <= 4 && !(value % 100 >= 12 && value % 100 <= 14)) return forms[1];
  return forms[2];
}

function updateRelationshipCounter() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (today < relationshipStart) return;

  let years = today.getFullYear() - relationshipStart.getFullYear();
  let months = today.getMonth() - relationshipStart.getMonth();
  let days = today.getDate() - relationshipStart.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += daysInPreviousMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  counterYears.textContent = years;
  counterYears.nextElementSibling.textContent = polishUnit(years, ["rok", "lata", "lat"]);
  counterMonths.textContent = months;
  counterMonths.nextElementSibling.textContent = polishUnit(months, ["miesiąc", "miesiące", "miesięcy"]);
  counterDays.textContent = days;
  counterDays.nextElementSibling.textContent = polishUnit(days, ["dzień", "dni", "dni"]);
}

updateRelationshipCounter();
window.setInterval(updateRelationshipCounter, 60 * 1000);


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
