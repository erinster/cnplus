// Daftar produk dengan ID unik
export const products = [
    {
      id: 1,
      name: "ERP (Enterprise Resource Planning)",
      image: "./product/erp.webp",
      icon: "bi bi-building-fill"
    //   icon: "ph-fill ph-building"
    },
    {
      id: 2,
      name: "Human Resource Management System",
      // image: "./product/eshrm.webp",
      image: "./product/best-product/1.webp",
      icon: "bi bi-person-badge-fill"
    },
    {
      id: 3,
      name: "Point of Sale",
      image: "./product/pos.webp",
    //   icon: "cart-check-fill"
      icon: "ph-fill ph-cash-register"
    },
    {
      id: 4,
      name: "Accounting",
      image: "./product/tj-finance.webp",
      icon: "ph-fill ph-calculator"
    },
    {
      id: 5,
      name: "Website",
      image: "./product/website.webp",
      icon: "bi bi-bi bi-globe2"
    },
    {
      id: 6,
      name: "Academic Portal",
      image: "./product/digital-academic.webp",
      icon: "bi bi-mortarboard-fill"
    },
    {
      id: 7,
      name: "Learning Management System",
      image: "./product/best-product/4.webp",
      icon: "ph-fill ph-book-open"

    },
    {
      id: 8,
      name: "E-Commerce",
      image: "./product/e-commerce.webp",
      icon: "bi bi-cart-check-fill"
    //   icon: "ph-fill ph-shopping-cart"
    },
    {
      id: 9,
      name: "E-Merchant",
      image: "./product/e-merchant.webp",
      icon: "ph-fill ph-storefront"
    },
    {
      id: 10,
      name: "Micro Banking System",
      image: "./product/default-image.webp",
    //   icon: "bi bi-bank2"
      icon: "ph-fill ph-bank"
    },
    {
      id: 11,
      name: "E-Wallet",
      image: "./product/e-wallet.webp",
      icon: "ph-fill ph-wallet"
    },
    {
      id: 12,
      name: "Payment Gateway Integration",
      image: "./product/pgi.webp",
      icon: "bi bi-credit-card-2-front-fill"
    //   icon: "bi bi-credit-card-fill"
    //   icon: "ph-fill ph-credit-card"
    },
    {
      id: 13,
      name: "E-Hospital (Medical Record & HIS)",
      image: "./product/e-hospital.webp",
      icon: "bi bi-hospital-fill"
    },
    {
      id: 14,
      name: "IT Service Management (ITop)",
      image: "./product/best-product/5.webp",
    //   icon: "bi bi-laptop-fill"
      icon: "ph-fill ph-laptop"
    //   icon: "ph-fill ph-desktop"
    },
    {
      id: 15,
      name: "PDAM Management System",
      image: "./product/epis.webp",
      icon: "bi bi-droplet-fill"
    //   icon: "ph-fill ph-drop"
    },
    {
      id: 16,
      name: "Project Management System",
      image: "./product/project.webp",
      icon: "ph-fill ph-list-checks"
    },
    {
      id: 17,
      name: "Workshop Management System",
      image: "./product/wms.webp",
      icon: "ph-fill ph-projector-screen-chart"
    },
    {
      id: 18,
      name: "Fleet Management System",
      image: "./product/easy-fleet.webp",
    //   icon: "bi bi-truck"
      icon: "ph-fill ph-truck"
    },
    {
      id: 19,
      name: "Online Travel Agent",
      image: "./product/travel-io.webp",
      icon: "ph-fill ph-airplane-tilt"
    },
    {
      id: 20,
      name: "Helpdesk",
      image: "./product/helpdesk.webp",
    //   icon: "bi bi-headset"
      icon: "ph-fill ph-headset"
    },
    {
      id: 21,
      name: "E-Hibah Bansos",
      image: "./product/hibah-bansos.webp",
      icon: "ph-fill ph-hand-heart"
    },
    {
      id: 22,
      name: "E-Catalog",
      image: "./product/e-catalog.webp",
      icon: "bi bi-postcard-fill"
    },
    {
      id: 23,
      name: "Custom Product",
      image: "./product/cp.webp",
    //   icon: "bi bi-pencil-square"
    //   icon: "bi bi-tools"
    //   icon: "ph-fill ph-pencil-line"
    //   icon: "ph-fill ph-pencil-ruler"
      icon: "ph-fill ph-puzzle-piece"
    },
  ];

  // Pemetaan kategori ke ID produk
  export const productCategories = {
    all: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    enterprise: [1, 2, 3, 4, 5, 8, 9, 14, 16, 17, 18, 19, 20],
    "banking-finance": [10, 4, 9, 11, 12],
    academic: [6, 7],
    healthcare: [13],
    governance: [21, 5, 1, 4, 15, 2]
  };