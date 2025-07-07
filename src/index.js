import '../css/reset.css';
import '../css/style.css';
import '../css/utils.css';
import '../css/header.css';
import '../css/footer.css';
import '../css/index/hero.css';
import '../css/index/usp.css';
import '../css/index/best-solution.css';
import '../css/index/service.css';
import '../css/index/product.css';
import '../css/index/client.css';
import '../css/index/testimonial.css';
import '../css/form.css';


// Import utils
import { toggleButton, debounce, fadeInOnScroll, initSmoothScrolls, removeHashOnLoad } from './utils.js';

// Import data
import { usp } from './data/usp.js';
import { products, productCategories } from './data/product.js';
import { row1Partners, row2Partners, row3Partners } from './data/partner.js';

// Import index functions
import { initHeader } from './index/header.js';
import { initUSPSection } from './index/usp.js';
import { initBestSolutionSwitcher } from './index/best.js';
import { initProductFilter } from './index/product.js';
import { initPartnerSection } from './index/partner.js';
import { initCTAForm } from './index/cta.js';

document.addEventListener('DOMContentLoaded', () => {
  // ===== Utils Functions =====
  toggleButton();
  fadeInOnScroll('.fade-section');
  initSmoothScrolls();
  removeHashOnLoad();

  // ===== Index Functions =====
  initHeader(debounce);
  initUSPSection(usp, debounce);
  initBestSolutionSwitcher(debounce);
  initProductFilter(products, productCategories, debounce);
  initPartnerSection(row1Partners, 'row1', 'left');
  initPartnerSection(row2Partners, 'row2', 'right');
  initPartnerSection(row3Partners, 'row3', 'left', 20);
  initCTAForm(products);
});