// =====Partner Section===== 
function preloadImage(src) {
  const img = new Image();
  img.src = src;
}

export function initPartnerSection(partnersDataArray, rowId, direction = 'left') {
  const container = document.getElementById(rowId);

  if (!container || !partnersDataArray || partnersDataArray.length === 0) {
    console.warn(`Container "${rowId}" tidak ditemukan atau data kosong.`);
    return;
  }

  // Tentukan gap berdasarkan lebar layar
  let gap = 20; // default
  if (window.innerWidth < 600) {
    gap = 5;
  } else if (window.innerWidth < 768) {
    gap = 10; 
  } else if (window.innerWidth < 1024) {
    gap = 15; // tablet
  }

  // Preload semua gambar
  partnersDataArray.forEach(partner => {
    preloadImage(`./partner/${partner.src}`);
  });

  const itemWidth = 250;
  const total = partnersDataArray.length;
  const duration = 50;
  const totalWidth = (itemWidth + gap) * total;

  // Set lebar kontainer sekali saja
  container.style.width = `${totalWidth}px`;

  // Gunakan fragment untuk menghindari reflow berlebihan
  const fragment = document.createDocumentFragment();

  partnersDataArray.forEach((partner, index) => {
    const item = document.createElement('div');
    item.className = `logo-item scroll-${direction}`;

    // Hindari calc() CSS kompleks → gunakan delay sederhana
    // item.style.animationDelay = `calc(${duration}s / ${total} * ${index} * -1)`;

    item.innerHTML = `
      <img src="./partner/${partner.src}" alt="${partner.name}">
      <p>${partner.name}</p>
    `;

    fragment.appendChild(item);
  });

  // Tambahkan semua item sekaligus
  container.appendChild(fragment);
}

window.addEventListener('resize', () => {
  // Reset konten dan panggil ulang initPartnerSection
  container.innerHTML = '';
  initPartnerSection(partnersDataArray, rowId, direction);
});