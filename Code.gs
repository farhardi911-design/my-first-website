/**
 * JENOVA STORE - Backend Spreadsheet Otomatis
 * -------------------------------------------
 * Script ini menerima data checkout dari website (script.js)
 * dan otomatis mencatatnya sebagai baris baru di Google Sheet ini.
 *
 * CARA PAKAI: lihat file CARA-SETUP-SPREADSHEET.md
 */

const SHEET_NAME = "Pesanan";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet_();

    const daftarProduk = (data.items || [])
      .map(item => `${item.nama} (Rp${Number(item.harga).toLocaleString("id-ID")})`)
      .join(", ");

    sheet.appendRow([
      new Date(),              // Tanggal & jam masuk otomatis
      data.nama || "",         // Nama pembeli
      data.notelp || "",       // Nomor WhatsApp pembeli
      daftarProduk,            // Daftar produk yang dibeli
      Number(data.total) || 0, // Total harga
      "Checkout via WhatsApp"  // Status
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Supaya bisa dites langsung lewat browser (buka URL Web App-nya).
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "JENOVA order backend aktif." }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Membuat sheet "Pesanan" beserta headernya kalau belum ada — tidak perlu setup manual.
function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Tanggal", "Nama", "No. WhatsApp", "Produk", "Total", "Status"]);
    sheet.getRange("A1:F1").setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, 6);
  }

  return sheet;
}
