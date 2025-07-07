import '../css/reset.css';
import '../css/style.css';
import '../css/utils.css';
import '../css/form.css';
import './login.css';

import { fadeInOnScroll } from '../src/utils.js';
import { handleFormSubmit } from '../src/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    fadeInOnScroll();
    handleFormSubmit(
        'forgot-form',
        '../api/forgot-password.php',
        'error-message',
    (result) => {
      // Arahkan ke halaman reset password dengan token atau username
      window.location.href = `reset-password.html?user=${encodeURIComponent(result.username)}`;
    }
  );
});