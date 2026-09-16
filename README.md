# BINUS POS — Sistem Kasir & Manajemen Toko

Aplikasi Point of Sale (POS) berbasis web untuk toko retail skala kecil-menengah, dibangun sebagai proyek mandiri untuk mempelajari pengembangan aplikasi bisnis full-featured menggunakan JavaScript murni (vanilla JS) tanpa framework maupun backend server.

Aplikasi ini menangani alur kerja toko dari ujung ke ujung: manajemen stok & merek, transaksi kasir, piutang/kas bon pelanggan, retur barang, pencatatan pengeluaran operasional, hingga laporan laba-rugi — semuanya berjalan sepenuhnya di sisi klien (client-side).

---

## ✨ Fitur Utama

### 📦 Manajemen Stok & Merek
- CRUD barang lengkap dengan filter merek (chip/tombol) dan pencarian nama barang secara real-time
- **Skema diskon bertingkat (3 level)** dari harga supplier — mendukung struktur diskon dagang yang umum di dunia distribusi (misal: 20% + 5% + 2%)
- Kalkulasi otomatis "Modal Akhir" dan estimasi "Untung per Pcs" secara langsung saat input harga/diskon
- Peringatan visual untuk stok yang mulai menipis

### 🛒 Kasir Penjualan
- Pemilihan barang lewat daftar yang bisa difilter per merek & dicari, langsung ditambahkan ke keranjang lewat tombol (menghindari salah ketik nama barang)
- Kontrol kuantitas langsung di keranjang (tambah/kurang/hapus)
- Dua metode pembayaran: **Lunas (tunai)** dengan kalkulasi kembalian otomatis, atau **Bon/Kas Bon** dengan validasi wajib nama pelanggan
- Auto-deteksi: jika uang muka bon ≥ total tagihan, status otomatis dialihkan menjadi Lunas

### 🧾 Cetak Struk Thermal
- Layout struk khusus printer thermal 80mm (`@media print`)
- Cetak rangkap otomatis dengan watermark **"COPY"** — 2 lembar untuk transaksi lunas, 3 lembar untuk transaksi bon (2 copy + 1 asli)
- Semua salinan dicetak dalam **satu dialog print** (page-break antar halaman), jadi tidak perlu membuka banyak jendela popup yang rawan diblokir browser

### 📒 Buku Kas Bon (Piutang)
- Daftar seluruh transaksi belum lunas beserta sisa hutang per pelanggan
- Pencatatan cicilan/pembayaran parsial dengan validasi (tidak bisa melebihi sisa hutang)

### 🔄 Retur Barang
- Pencarian transaksi berdasarkan ID nota
- Retur per item dengan validasi kuantitas, otomatis mengembalikan stok dan menyesuaikan total pendapatan & sisa hutang (jika transaksi tersebut berstatus bon)

### 💸 Pengeluaran Operasional
- Pencatatan pengeluaran harian (gaji, belanja kebutuhan toko, dsb.) dengan filter rentang tanggal

### 📊 Laporan Keuangan
- Ringkasan mutasi per periode: total penjualan, piutang, pengeluaran, dan **laba bersih** (memperhitungkan HPP/modal barang terjual)
- Filter berdasarkan rentang tanggal bebas

### 💾 Backup & Restore
- Export seluruh data toko ke file `.json` sekali klik
- Import kembali data dari file backup — penting karena semua data tersimpan lokal di browser

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Struktur | HTML5 |
| Gaya | CSS3 (custom, tanpa framework CSS) |
| Logika | JavaScript (Vanilla, ES6+) |
| Penyimpanan | `localStorage` (Web Storage API) |
| Cetak | CSS `@media print` untuk layout thermal 80mm |

**Tidak ada dependensi eksternal, tidak ada build step, tidak ada server** — cukup buka file `.html` di browser modern (Chrome/Edge/Firefox) dan aplikasi langsung berjalan.

---

## 🚀 Cara Menjalankan (Preview)

1. Unduh file `binus_pos.html`
2. Buka file tersebut langsung di browser (double click, atau `File → Open`)
3. Aplikasi siap digunakan — semua data akan otomatis tersimpan di `localStorage` browser tersebut

> ⚠️ Karena data tersimpan di `localStorage`, data akan hilang jika cache/riwayat browser dibersihkan. **Gunakan fitur Backup secara rutin** untuk menyimpan data ke file eksternal.

---

## 📁 Struktur Data (localStorage)

Aplikasi menyimpan 4 kategori data sebagai array JSON:

- `binus_pos_inventory` — daftar barang & stok
- `binus_pos_sales` — riwayat transaksi penjualan
- `binus_pos_expenses` — pengeluaran operasional
- `binus_pos_returns` — riwayat retur barang

---

## 💡 Konsep Teknis yang Dipelajari

- Manipulasi DOM murni tanpa framework (rendering tabel, modal, dan form secara dinamis)
- Desain skema data relasional sederhana (barang ↔ transaksi ↔ retur) yang disimpan sebagai JSON ternormalisasi minimal, dengan perhitungan turunan (modal akhir, sisa hutang, laba) dilakukan saat render, bukan disimpan redundan
- State management sederhana menggunakan variabel global & fungsi render terpisah per komponen
- CSS `@media print` untuk kebutuhan cetak struk thermal, termasuk teknik watermark dan multi-halaman (`page-break-after`)
- Format angka & tanggal lokal Indonesia (`Intl.NumberFormat('id-ID')`, `toLocaleDateString('id-ID')`)
- Import/export data sebagai mekanisme backup tanpa backend

---

## 🔭 Kemungkinan Pengembangan Lanjutan

- Migrasi penyimpanan dari `localStorage` ke **IndexedDB** untuk kapasitas data yang lebih besar dan query yang lebih terstruktur
- Autentikasi multi-user/multi-kasir dengan role (kasir vs admin)
- Sinkronisasi data ke backend/cloud agar bisa diakses multi-perangkat
- Dashboard ringkasan harian & notifikasi stok menipis
- Grafik tren penjualan (chart) di halaman laporan

---

*Dibuat sebagai proyek portofolio pribadi untuk mempelajari pengembangan aplikasi bisnis (business application development) menggunakan web technology dasar.*
