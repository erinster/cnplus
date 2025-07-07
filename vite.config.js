// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // <- supaya path asset bener saat dihosting
  build: {
    outDir: 'dist-v3', // biar jelas kalau ini untuk /v3
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about-us.html',
        login: './admin/index.html',
        register: './admin/register.html',
        forgot: './admin/forgot-password.html',
        reset: './admin/reset-password.html',
        dashboard: './admin/dashboard.html'
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost', // ganti dengan URL backend yang sesuai
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
