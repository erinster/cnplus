// =====Solution Section===== 
export function initProductFilter(products, productCategories, debounce) {
  const productList = document.querySelector(".scrollable-list");
  const productImage = document.querySelector(".product__image");
  const categoryButtons = document.querySelectorAll(".category-btn");
  const productDropdown = document.querySelector(".product__dropdown");

  if (!productList || !productImage || !productDropdown || !categoryButtons.length) {
    console.warn("Elemen Product Filter tidak lengkap atau tidak ditemukan.");
    return;
  }

  // Preload semua gambar
  const imageCache = {};
  products.forEach(product => {
    if (product.image) {
      const img = new Image();
      img.src = product.image;
      imageCache[product.id] = img;
    }
  });

  let selectedProductId = null;        // Produk saat ini
  let hasUserInteracted = false;
  let lastDefaultProductId = null; // Menyimpan firstProduct tiap kategori

  // Update dropdown sesuai kategori
  function updateDropdown(category) {
    const productIdsInCategory = productCategories[category] || [];
    productDropdown.innerHTML = "";

    productIdsInCategory.forEach(productId => {
      const product = products.find(p => p.id === productId);
      if (!product) return;

      const option = document.createElement("option");
      option.value = product.id;
      option.textContent = product.name;
      if (selectedProductId === product.id) option.selected = true;
      productDropdown.appendChild(option);
    });

    if (!selectedProductId && productIdsInCategory.length > 0) {
      const firstProduct = products.find(p => p.id === productIdsInCategory[0]);
      showProductDetails(firstProduct); // false → default, bukan dari user
      selectedProductId = firstProduct.id;
      highlightListItem(firstProduct.id);
    }
  }

  function filterProducts(category) {
    const productIdsInCategory = productCategories[category] || [];

    // Selalu asumsikan selectedProductId mungkin tidak valid untuk kategori baru
    const isSelectedStillValid = selectedProductId && productIdsInCategory.includes(selectedProductId);

    // Reset selectedProductId hanya jika:
    // - User pernah interaksi tapi produk tidak ada di kategori baru
    // - Atau belum pernah interaksi (tidak punya pilihan)
    if (!isSelectedStillValid) {
      selectedProductId = null;
    }

    // Tetap pertahankan status hasUserInteracted
    const wasUserInteracting = hasUserInteracted;

    // Force reset jika produk tidak ditemukan di kategori baru
    if (!wasUserInteracting || !isSelectedStillValid) {
      hasUserInteracted = false;
    }

    // Hapus class active untuk animasi fade-out
    productList.classList.remove("active");

    const shouldSkipImageAnimation = isSelectedStillValid && wasUserInteracting;
    if (!shouldSkipImageAnimation) {
      productImage.classList.remove("active");
    }

    setTimeout(() => {
      productList.innerHTML = "";
      // Ambil firstProduct dari kategori saat ini
      let firstProduct = null;
      for (const productId of productIdsInCategory) {
        const product = products.find(p => p.id === productId);
        if (product) {
          firstProduct = product;
          break;
        }
      }

      // Simpan sebagai default untuk debugging atau tracking
      lastDefaultProductId = firstProduct?.id ?? null;

      // Tentukan selectedProductId sesuai aturan
      if (isSelectedStillValid && wasUserInteracting) {
        // Tetap gunakan pilihan user
        const selectedProduct = products.find(p => p.id === selectedProductId);
        if (selectedProduct) {
          highlightListItem(selectedProductId);
          showProductDetails(selectedProduct, true); // skip animation
        }
      } else if (firstProduct) {
        // Reset ke firstProduct dari kategori saat ini
        selectedProductId = firstProduct.id;
        showProductDetails(firstProduct); // pakai animasi
        highlightListItem(firstProduct.id);
      }

      const fragment = document.createDocumentFragment();

      productIdsInCategory.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        if (!firstProduct) firstProduct = product;

        const listItem = document.createElement("li");
        listItem.innerHTML = `<i class="${product.icon} product__icon"></i><span>${product.name}</span>`;
        listItem.dataset.productId = product.id;

        listItem.addEventListener("click", () => {
          document.querySelectorAll(".scrollable-list li").forEach(item => item.classList.remove("selected"));
          listItem.classList.add("selected");
          showProductDetails(product); // true → user yang pilih
          selectedProductId = product.id;
          hasUserInteracted = true;
          updateDropdownSelection(product.id);
        });

        if ((hasUserInteracted && productId === selectedProductId) ||
            (!hasUserInteracted && productId === firstProduct.id)) {
          listItem.classList.add("selected");
        }

        fragment.appendChild(listItem);
      });

      productList.appendChild(fragment);

      // Simpan firstProduct dari kategori ini sebagai default
      lastDefaultProductId = firstProduct?.id ?? null;

      // Atur selectedProductId sesuai kondisi
      if (isSelectedStillValid && hasUserInteracted) {
        const selectedProduct = products.find(p => p.id === selectedProductId);
        if (selectedProduct) {
          highlightListItem(selectedProductId);
          showProductDetails(selectedProduct, true); // skip animation
        }
      } else if (firstProduct) {
        selectedProductId = firstProduct.id;
        showProductDetails(firstProduct); // pakai animasi
        highlightListItem(firstProduct.id);
      }

      // Aktifkan animasi list
      productList.classList.add("active");

      // Restart animasi gambar hanya jika perlu
      if (!shouldSkipImageAnimation && firstProduct) {
        void productImage.offsetWidth;
        setTimeout(() => {
          productImage.classList.add("active");
        }, 380);
      }

      updateDropdown(category);

      if (productIdsInCategory.length <= 1) {
        productDropdown.disabled = true;
        productDropdown.style.pointerEvents = "none";
        productDropdown.style.backgroundImage = "none";
      } else {
        productDropdown.disabled = false;
        productDropdown.style.pointerEvents = "auto";
        productDropdown.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0iIzAwODA0MCIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0yMTMuNjYsMTAxLjY2bC04MCw4MGE4LDgsMCwwLDEtMTEuMzIsMGwtODAtODBBOCw4LDAsMCwxLDQ4LDg4SDIwOGE4LDgsMCwwLDEsNS42NiwxMy42NloiPjwvcGF0aD48L3N2Zz4=')";
      }
    }, 400);
  }

  function updateDropdownSelection(productId) {
    const options = productDropdown.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === productId.toString()) {
        options[i].selected = true;
        break;
      }
    }
  }

  function showProductDetails(product, skipAnimation = false) {
    if (!productImage) {
      console.error("productImage tidak ditemukan!");
      return;
    }

    const nextSrc = product.image;

    if (skipAnimation || productImage.src === nextSrc) {
      productImage.src = nextSrc;
      return;
    }

    productImage.classList.remove("active");
    void productImage.offsetWidth;

    setTimeout(() => {
      productImage.src = nextSrc;
      productImage.classList.add("active");
    }, 380);
  }

  function highlightListItem(productId) {
    document.querySelectorAll(".scrollable-list li").forEach(item => {
      item.classList.remove("selected");
      const itemName = item.querySelector("span")?.textContent;
      const targetName = products.find(p => p.id === productId)?.name;
      if (itemName === targetName) {
        item.classList.add("selected");
      }
    });
  }

  // Event handler untuk dropdown
  productDropdown.addEventListener("change", debounce(() => {
    const selectedId = parseInt(productDropdown.value);
    const product = products.find(p => p.id === selectedId);
    if (product) {
      showProductDetails(product);
      selectedProductId = product.id;
      hasUserInteracted = true;
      highlightListItem(selectedId);
    } else {
      console.warn("Produk dengan ID", selectedId, "tidak ditemukan!");
    }
  }, 100));

  // Event handler untuk tombol kategori
  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      filterProducts(button.getAttribute("data-category"));
    });
  });

  // Inisialisasi awal
  filterProducts("all");
}