const revealBtn = document.getElementById("reveal-btn");
const revealFrame = document.getElementById("reveal-frame");
const celebrationLayer = document.querySelector(".celebration");
const memoryText = document.getElementById("memory-text");
const memoryCount = document.getElementById("memory-count");
const memoryDisplay = document.getElementById("memory-display");
const saveMemory = document.getElementById("save-memory");

const memoryKey = "humayra_memory_note";

function updateCount() {
  if (!memoryText || !memoryCount) {
    return;
  }
  const max = Number(memoryText.getAttribute("maxlength")) || 0;
  memoryCount.textContent = `${memoryText.value.length} / ${max}`;
}

function showMemory(text) {
  if (!memoryDisplay) {
    return;
  }
  memoryDisplay.textContent = text;
  memoryDisplay.classList.remove("pop");
  void memoryDisplay.offsetWidth;
  memoryDisplay.classList.add("pop");
}

if (saveMemory && memoryText) {
  saveMemory.addEventListener("click", () => {
    const value = memoryText.value.trim();
    if (!value) {
      showMemory("Write a memory first.");
      return;
    }
    localStorage.setItem(memoryKey, value);
    showMemory(value);
    memoryText.value = "";
    updateCount();
  });
}

if (memoryText) {
  memoryText.addEventListener("input", updateCount);
}

const storedMemory = localStorage.getItem(memoryKey);
if (storedMemory) {
  showMemory(storedMemory);
}

if (revealBtn && revealFrame) {
  revealBtn.addEventListener("click", () => {
    if (revealFrame.classList.contains("show")) {
      return;
    }
    revealFrame.classList.add("show");
    revealBtn.setAttribute("aria-expanded", "true");
    revealBtn.classList.add("revealed");
    revealBtn.textContent = "There she is";
    triggerCelebration();
  });
}

const scrollSections = document.querySelectorAll(".scroll-section");
const observer = new IntersectionObserver(
  (entries, entryObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        entryObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

scrollSections.forEach((section) => observer.observe(section));
updateCount();

function triggerCelebration() {
  if (!celebrationLayer) {
    return;
  }
  celebrationLayer.innerHTML = "";
  const colors = ["#f5c076", "#c7a56b", "#f2d6e8", "#b7c4e0", "#ffffff"];
  const pieces = 100;
  for (let i = 0; i < pieces; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = `${2 + Math.random() * 1.6}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    celebrationLayer.append(piece);
  }

  for (let i = 0; i < 12; i += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.left = `${10 + Math.random() * 80}%`;
    sparkle.style.top = `${10 + Math.random() * 60}%`;
    celebrationLayer.append(sparkle);
  }

  setTimeout(() => {
    celebrationLayer.innerHTML = "";
  }, 3200);
}
