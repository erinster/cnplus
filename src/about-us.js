import '../css/reset.css';
import '../css/style.css';
import '../css/utils.css';
import '../css/header.css';
import '../css/footer.css';
import '../css/form.css';
import '../css/about-us/hero.css';
import '../css/about-us/statement.css';
import '../css/about-us/vision.css';
import '../css/about-us/mission.css';
import '../css/about-us/value.css';
import '../css/about-us/cta.css';


// ======================================
// ------     Halaman About Us     ------
// ======================================

import { products } from './data/product.js';
import { initCTAForm } from './index/cta.js';

import { toggleButton, fadeInOnScroll, initSmoothScrolls, removeHashOnLoad } from './utils.js';
document.addEventListener('DOMContentLoaded', () => {
  toggleButton();
  fadeInOnScroll('.fade-section');
  fadeInOnScroll('#mission', '.mission-item');
  initSmoothScrolls();
  removeHashOnLoad();
  initCTAForm(products);
});