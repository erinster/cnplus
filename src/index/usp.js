// =====USP Section=====
export function initUSPSection(usp, debounce) {
  const container = document.querySelector(".usp__card-container");
  if (!container) {
    console.error("Element .usp__card-container tidak ditemukan di DOM.");
    return;
  }

  // Render card
  const htmlCards = usp.map(createCard).join('');
  container.innerHTML = htmlCards;

  let observerInstance = null;

  // Fungsi untuk membuat card
  function createCard(card) {
    return `
      <div class="usp__card">
        <h3 class="usp__title">${card.title}</h3>
        <p class="usp__description">${card.description}</p>
        <div class="usp__highlight-container">
          ${card.highlights.map(highlight => `
            <div class="usp__highlight">
              <i class="bi bi-check"></i>
              <p>${highlight}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Setup Intersection Observer untuk animasi
  function setupAnimationObserver() {
    const cards = container.querySelectorAll(".usp__card");

    observerInstance = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(cards).indexOf(entry.target);
          const currentUsp = usp[index];

          if (currentUsp?.animationSrc) {
            const aniContainer = document.querySelector(".usp__ani");
            if (!aniContainer) {
              console.warn("Animasi tidak dimuat karena .usp__ani tidak ditemukan (layar kecil).");
              return;
            }

            updateAnimation(currentUsp.animationSrc, currentUsp.speed || "0.5");
          }
        }
      });
    }, { threshold: 0.6 });

    cards.forEach(card => observerInstance.observe(card));
  }

  // Inisialisasi animasi berdasarkan ukuran layar
  function maybeInitializeAnimation() {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      if (observerInstance) observerInstance.disconnect();
      setupAnimationObserver();
    } else {
      if (observerInstance) observerInstance.disconnect();
    }
  }

  // Jalankan sekali saat load
  maybeInitializeAnimation();

  // Update saat resize (dengan debounce)
  window.addEventListener('resize', debounce(() => {
    maybeInitializeAnimation();
  }, 200));
}

// Fungsi update animasi Lottie Player
function updateAnimation(animationSrc, speed) {
  const ani = document.querySelector(".usp__ani");
  if (!ani) return;

  const oldPlayer = ani.querySelector("dotlottie-player");

  if (oldPlayer) {
    oldPlayer.classList.remove("visible");

    setTimeout(() => {
      ani.removeChild(oldPlayer);

      const newPlayer = document.createElement("dotlottie-player");
      newPlayer.setAttribute("src", animationSrc);
      newPlayer.setAttribute("background", "transparent");
      newPlayer.setAttribute("speed", speed);
      newPlayer.setAttribute("style", "width: auto; height: 100%");
      newPlayer.setAttribute("loop", "");
      newPlayer.setAttribute("autoplay", "");

      ani.appendChild(newPlayer);

      setTimeout(() => {
        newPlayer.classList.add("visible");
      }, 50);
    }, 500);
  } else {
    const newPlayer = document.createElement("dotlottie-player");
    newPlayer.setAttribute("src", animationSrc);
    newPlayer.setAttribute("background", "transparent");
    newPlayer.setAttribute("speed", speed);
    newPlayer.setAttribute("style", "width: auto; height: 100%");
    newPlayer.setAttribute("loop", "");
    newPlayer.setAttribute("autoplay", "");

    ani.appendChild(newPlayer);

    setTimeout(() => {
      newPlayer.classList.add("visible");
    }, 50);
  }
}