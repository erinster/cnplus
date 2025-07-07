// src/js/utils.js

/*
 * Toggle Button Set Active
 */
export function toggleButton() {
  document.querySelectorAll('[data-toggle]').forEach(element => {
    element.addEventListener('click', () => {
      const targetSelector = element.dataset.toggle;

      if (targetSelector === 'self') {
        // Toggle class 'active' pada elemen itu sendiri
        element.classList.toggle('active');
      } else if (targetSelector === 'siblings') {
        // Hapus 'active' dari semua saudara
        const parent = element.parentElement;
        const siblings = Array.from(parent.children).filter(child => child !== element);

        // Hapus active dari saudara
        siblings.forEach(sibling => {
            sibling.classList.remove('active');
        });

        // Tambahkan active pada elemen ini
        element.classList.add('active');
      } else {
        // Toggle class 'active' pada elemen target
        const target = document.querySelector(targetSelector);
        if (target) {
          target.classList.toggle('active');
        }
      }

      // Optional: Log untuk debugging
      // console.log(`Toggled: ${targetSelector === 'self' ? 'self' : targetSelector}`);
    });
  });
}

// utils.js
export function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Animasi fade-in untuk section atau child elemen
 * @param {string} sectionSelector - Selector untuk section
 * @param {string|null} childSelector - Selector untuk item anak (opsional)
 * @param {number} thresholdSection - Threshold untuk section
 * @param {number} thresholdChild - Threshold untuk child item
 */


/*
 * Fade In Section Animation
 */
export function fadeInOnScroll(
  sectionSelector = '.fade-section',
  childSelector = null,
  thresholdSection = 0.1,
  thresholdChild = 0.3
) {
  // Observer untuk section biasa
  const observerSection = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;

        if (childSelector) {
          // Jika ada childSelector, gunakan observer khusus untuk item
          animateChildItems(section, childSelector, thresholdChild);
        } else {
          section.classList.add('active');
        }

        observerSection.unobserve(section);
      }
    });
  }, { threshold: thresholdSection });

  // Jalankan observer untuk semua section
  document.querySelectorAll(sectionSelector).forEach(section => {
    observerSection.observe(section);
  });
}

/*
 * Fade In Child Animation
 */
// Fungsi khusus animasi child item dengan observer
function animateChildItems(parent, childSelector, threshold) {
  const children = parent.querySelectorAll(childSelector);

  const observerItem = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observerItem.unobserve(entry.target); // Hanya sekali animasi
      }
    });
  }, { threshold });

  children.forEach(child => {
    observerItem.observe(child);
  });
}


/*
 * Smooth Scroll
 */
export function smoothScroll(element) {
  const href = element.getAttribute('href');

  // Jika bukan tautan internal, biarkan default (pindah halaman)
  if (!href || !href.startsWith('#')) return;

  element.addEventListener('click', function (e) {
    e.preventDefault();

    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offsetY = 80;
      const position = targetElement.getBoundingClientRect().top + window.scrollY - offsetY;

      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
    }
  });
}

export function initSmoothScrolls() {
  document.querySelectorAll('a[href^="#"]').forEach(smoothScroll);
}


/**
 * Hilangkan hash (#) dari URL tanpa reload
 */
export function removeHashOnLoad() {
  if (window.location.hash) {
    // Scroll sedikit agar tetap ke section yang benar
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        history.replaceState(null, '', window.location.pathname);
      }, 50); // Delay agar scroll selesai dulu
    }
  }
}


/*
 * Form Confirmation and Error Message
 */
// utils.js

/**
 * Fungsi untuk menangani submit form secara umum
 * @param {string} formId - ID dari form
 * @param {string} endpoint - URL tujuan POST request
 * @param {string} errorMessageId - ID elemen untuk menampilkan error
 * @param {function} onSuccess - Callback saat berhasil
 */
export function handleFormSubmit(formId, endpoint, errorMessageId, onSuccess) {
    const form = document.getElementById(formId);
    const errorMsg = document.getElementById(errorMessageId);

    if (!form) {
        console.error(`Form dengan id "${formId}" tidak ditemukan.`);
        return;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Sembunyikan error sebelumnya
        errorMsg.style.display = 'none';
        errorMsg.textContent = '';

        const formData = new FormData(this);

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                body: formData
            });

            const result = await res.json();

            if (result.status === 'success') {
                if (onSuccess && typeof onSuccess === 'function') {
                    onSuccess(result);
                }
            } else {
                errorMsg.style.display = 'block';
                errorMsg.textContent = result.message || 'Terjadi kesalahan.';
            }
        } catch (err) {
            console.error(err);
            errorMsg.style.display = 'block';
            errorMsg.textContent = 'Terjadi kesalahan saat memproses permintaan.';
        }
    });
}