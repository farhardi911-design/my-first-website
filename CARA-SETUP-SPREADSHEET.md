# Cara Menghubungkan Website ke Google Spreadsheet Otomatis

Setiap kali pembeli klik **"Checkout via WhatsApp"**, data pesanan (nama produk,
harga, total, nama pembeli, nomor WA) otomatis masuk ke Google Sheet, baru
setelah itu terbuka chat WhatsApp.

> ⚠️ **PALING PENTING** — sumber masalah paling umum ada di Langkah 3.
> Di bagian **"Yang memiliki akses" / "Who has access"**, harus dipilih
> **"Siapa saja" / "Anyone"**.
> BUKAN "Hanya saya sendiri" (Only myself), BUKAN "Siapa saja dengan akun Google"
> (Anyone with Google account). Kalau salah pilih, website tidak akan pernah
> bisa mengirim data ke sheet — walau kodenya 100% benar.

## Langkah 1 — Buat Google Sheet baru
1. Buka [sheets.google.com](https://sheets.google.com) → buat spreadsheet baru.
2. Beri nama misalnya **"Pesanan JENOVA"**.

## Langkah 2 — Pasang script
1. Di spreadsheet tadi, klik **Extensions/Ekstensi → Apps Script**.
2. Hapus semua kode default, lalu copy-paste seluruh isi file **Code.gs** (yang saya buatkan) ke sana.
3. Klik ikon **Save** (disket).

## Langkah 3 — Deploy sebagai Web App
1. Klik tombol **Deploy → New deployment**.
2. Klik ikon gear ⚙️ di sebelah "Select type" → pilih **Web app**.
3. Isi:
   - **Execute as / Jalankan sebagai**: **Me / Saya** (akun kamu)
   - **Who has access / Yang memiliki akses**: **Anyone / Siapa saja** ⚠️ (WAJIB persis ini, lihat peringatan di atas)
4. Klik **Deploy**.
5. Google akan minta izin akses (Authorize) — klik akun kamu → **Advanced/Lanjutan** → **Go to (nama project) (unsafe)** → **Allow**. (Ini normal karena script buatan sendiri, bukan berbahaya.)
6. Setelah itu akan muncul **Web app URL**, bentuknya seperti:
   `https://script.google.com/macros/s/AKfycbx.../exec`
   → **Copy URL ini.**

## Langkah 4 — Tempel URL ke website
1. Buka file **script.js**.
2. Cari baris ini di paling atas:
   ```js
   const SPREADSHEET_URL = "https://script.google.com/macros/s/PASTE_DEPLOYMENT_ID_KAMU_DISINI/exec";
   ```
3. Ganti bagian URL-nya dengan URL Web App dari Langkah 3.
4. Simpan, lalu upload ulang website kamu (atau replace file di hosting).

## Selesai — Cara Tes (lakukan urutan ini persis)
1. **Sebelum** buka website: copy URL Web App dari Langkah 3, buka di jendela **Incognito/Private** (Ctrl+Shift+N), pastikan TIDAK login akun Google apapun di jendela itu.
   - Kalau muncul tulisan `{"status":"ok","message":"JENOVA order backend aktif."}` → deployment sudah benar, lanjut ke langkah 2.
   - Kalau malah diminta login Google atau muncul halaman error → berarti "Yang memiliki akses" masih salah, balik ke Langkah 3.
2. Buka website, tambahkan produk ke keranjang, isi **Nama** dan **Nomor WhatsApp**, klik **Checkout via WhatsApp**.
3. Cek spreadsheet — sheet baru bernama **"Pesanan"** otomatis muncul, berisi tanggal, nama pembeli, nomor WA, daftar produk, dan total.
4. Chat WhatsApp tetap terbuka seperti biasa untuk konfirmasi ke pembeli.

## Catatan
- Sheet "Pesanan" dan headernya (Tanggal, Nama, No. WhatsApp, Produk, Total, Status) dibuat **otomatis** oleh script — kamu tidak perlu bikin kolom manual.
- Sebelum checkout, pembeli sekarang wajib mengisi **Nama** dan **Nomor WhatsApp** di keranjang — datanya otomatis masuk ke spreadsheet dan juga ikut ditulis di pesan WhatsApp yang terkirim.
- Kalau tombol WhatsApp tetap jalan meskipun spreadsheet gagal terkirim (misalnya salah paste URL), itu wajar — dibuat begitu supaya pembeli tidak terganggu jika ada masalah teknis di background.
