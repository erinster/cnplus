// =====Best Solution Section=====
export function initBestSolutionSwitcher(debounce) {
  const buttons = document.querySelectorAll('.best__btn');
  const highlight = document.querySelector('.best__btn-selected');
  const productImage = document.getElementById('best__img');

  if (!buttons.length || !highlight || !productImage) {
    console.warn("Elemen Best Solution tidak ditemukan di DOM.");
    return;
  }

  const images = [
    './product/best-product/1.webp',
    './product/best-product/2.webp',
    './product/best-product/3.webp',
    './product/best-product/4.webp',
    './product/best-product/5.webp'
  ];

  // Preload semua gambar
  const imageCache = {};
  images.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    imageCache[index] = img;
  });

  function updateHighlight(index) {
    // Hapus class active dari tombol
    buttons.forEach(btn => btn.classList.remove('active'));

    // Dapatkan tombol aktif
    const selectedBtn = buttons[index];
    const rect = selectedBtn.getBoundingClientRect();
    const switchRect = selectedBtn.parentElement.getBoundingClientRect();

    // Update posisi highlight
    highlight.style.left = `${rect.left - switchRect.left}px`;
    highlight.style.width = `${rect.width}px`;

    // Ganti gambar dengan transisi
    if (productImage.src !== imageCache[index].src) {
      productImage.classList.remove('active');
      void productImage.offsetWidth; // Force reflow agar animasi bisa restart

      setTimeout(() => {
        productImage.src = imageCache[index].src;
        productImage.classList.add('active');
      }, 400); // Sesuaikan dengan durasi transisi CSS
    }

    // Tambahkan class active ke tombol
    selectedBtn.classList.add('active');

    // Amati perubahan ukuran tombol aktif
    observeActiveButton();
  }

  // Event listener untuk tombol
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => updateHighlight(index));
  });

  // Inisialisasi saat halaman dimuat
  window.addEventListener('load', () => {
    if (buttons.length > 0) updateHighlight(0);
  });

  // Observasi perubahan ukuran tombol aktif
  function observeActiveButton() {
    const activeBtn = document.querySelector('.best__btn.active');
    if (!activeBtn) return;

    if (window.highlightObserver) {
      window.highlightObserver.disconnect();
    }

    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const rect = entry.target.getBoundingClientRect();
        const switchRect = entry.target.parentElement.getBoundingClientRect();

        highlight.style.left = `${rect.left - switchRect.left}px`;
        highlight.style.width = `${rect.width}px`;
      }
    });

    observer.observe(activeBtn);
    window.highlightObserver = observer;
  }

  // Perbarui posisi highlight saat resize
  window.addEventListener('resize', debounce(() => {
    const activeBtn = document.querySelector('.best__btn.active');
    if (activeBtn) {
      const rect = activeBtn.getBoundingClientRect();
      const switchRect = activeBtn.parentElement.getBoundingClientRect();

      highlight.style.left = `${rect.left - switchRect.left}px`;
      highlight.style.width = `${rect.width}px`;
    }
  }, 200));
}