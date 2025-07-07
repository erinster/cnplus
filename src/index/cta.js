// =====Form Section===== 
export function initCTAForm(products) {
  const form = document.getElementById('demo-form');
  const productSelect = document.getElementById('product');

  if (!form || !productSelect) {
    console.warn("⚠️ Form atau elemen produk tidak ditemukan di DOM.");
    return;
  }

  // Isi dropdown produk
  function populateProductDropdown() {
    if (productSelect.dataset.loaded === 'true') return;

    if (!Array.isArray(products)) return;

    products.forEach(product => {
      if (!product || !product.name) return;

      const option = document.createElement('option');
      option.value = product.name;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });

    const otherOption = document.createElement('option');
    otherOption.value = 'other';
    otherOption.textContent = 'Lainnya';
    productSelect.appendChild(otherOption);

    productSelect.dataset.loaded = 'true';
  }

  // Validasi input
  function validateForm(data) {
    return Object.values(data).every(value => value !== '');
  }

  // Kirim data via fetch
  async function submitFormData(formData) {
    try {
      const response = await fetch('https://cnplus.co.id/v3/api/save-and-send.php ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Server error');

      const result = await response.json();

      if (result.status === 'success') {
        alert('Demo berhasil diajukan! Silakan cek email Anda.');
        form.reset();
      } else if (result.status === 'warning') {
        alert('Data berhasil disimpan, tetapi gagal mengirim email. Tim kami akan menghubungi Anda.');
        form.reset();
      } else {
        alert(`Gagal menyimpan data: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengirim data. Silakan coba lagi nanti.');
    }
  }

  // Event handler submit
  function handleFormSubmit(event) {
    event.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const company = document.getElementById('company').value.trim();
    const industry = document.getElementById('industry').value;
    const phone = document.getElementById('phone').value.trim();
    const product = document.getElementById('product').value;
    const description = document.getElementById('description').value.trim();

    const formData = {
      fullname,
      email,
      company,
      industry,
      phone,
      product,
      description
    };

    if (!validateForm(formData)) {
      alert('Mohon lengkapi semua field!');
      return;
    }

    submitFormData(formData);
  }

  // Inisialisasi
  function init() {
    const ready = () =>
      populateProductDropdown() || form.addEventListener("submit", handleFormSubmit);

    if (document.readyState !== "loading") {
      ready();
    } else {
      document.addEventListener("DOMContentLoaded", ready);
    }
  }

  init();
}