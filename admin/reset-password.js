import '../css/reset.css';
import '../css/style.css';
import '../css/utils.css';
import '../css/form.css';
import './login.css';

import { fadeInOnScroll } from '../src/utils.js';
import { handleFormSubmit } from '../src/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    fadeInOnScroll();
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('user');

  handleFormSubmit(
    'reset-form',
    `../api/reset-password.php?user=${encodeURIComponent(username)}`,
    'error-message',
    (result) => {
      window.location.href = result.redirect;
    }
  );
});