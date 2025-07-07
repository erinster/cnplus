import '../css/reset.css';
import '../css/style.css';
import '../css/utils.css';
import './dashboard.css';

import { toggleButton } from '../src/utils';
document.addEventListener('DOMContentLoaded', () => {
  toggleButton(); // Aktifkan semua toggle button di halaman
});

document.addEventListener('DOMContentLoaded', async () => {
  const tableBody = document.querySelector('#data-table tbody');
  const loadingRow = tableBody.querySelector('#loading');

  try {
    const res = await fetch('../api/get-data.php');
    
    if (res.status === 401) {
      window.location.href = '../admin/';
      return;
    }
    
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    tableBody.innerHTML = ''; // Kosongkan loading row

    data.forEach((row, index) => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${row.fullname}</td>
        <td>${row.email}</td>
        <td>${row.company}</td>
        <td>${row.industry}</td>
        <td>${row.phone}</td>
        <td>${row.product}</td>
        <td>${row.description}</td>
        <td>${new Date(row.created_at).toLocaleString()}</td>
      `;

      tableBody.appendChild(tr);
    });

  } catch (err) {
    console.error(err);
    tableBody.innerHTML = `<tr><td colspan="9">Gagal memuat data</td></tr>`;
  }
});