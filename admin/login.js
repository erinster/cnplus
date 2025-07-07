import '../css/reset.css';
import '../css/style.css';
import '../css/utils.css';
import '../css/form.css';
import './login.css';

import { fadeInOnScroll } from '../src/utils.js';
import { handleFormSubmit } from '../src/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  fadeInOnScroll(); // Aktifkan semua toggle button di halaman
  handleFormSubmit(
        'login-form',
        '../api/login.php',
        'error-message',
        (result) => {
            window.location.href = result.redirect;
        }
    );
});