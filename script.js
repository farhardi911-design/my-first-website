let keranjang = [];


function openCart() {
    const panel = document.getElementById("cart-panel");
    const overlay = document.getElementById("cart-overlay");
    if (panel) panel.classList.add("active");
    if (overlay) overlay.classList.add("active");
}

function closeCart() {
    const panel = document.getElementById("cart-panel");
    const overlay = document.getElementById("cart-overlay");
    if (panel) panel.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
}

function toggleCart() {
    const panel = document.getElementById("cart-panel");
    if (!panel) return;
    if (panel.classList.contains("active")) {
        closeCart();
    } else {
        openCart();
    }
}



function tambahKeranjang(nama, harga) {

    keranjang.push({
        nama: nama,
        harga: harga
    });

    updateCart();

    openCart();
}


function updateCart() {

    const items =
        document.getElementById("cart-items");

    const totalElement =
        document.getElementById("cart-total");

    const countElement =
        document.getElementById("cart-count");


    countElement.textContent =
        keranjang.length;


    if (keranjang.length === 0) {

        items.innerHTML = `
            <div class="empty-cart">
                <div class="empty-icon">🛒</div>
                <p>Keranjang masih kosong.</p>
            </div>
        `;

        totalElement.textContent = "0";

        return;
    }


    let total = 0;

    items.innerHTML = "";


    keranjang.forEach((item, index) => {

        total += item.harga;

        items.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <h4>${item.nama}</h4>

                    <p>
                        Rp${item.harga.toLocaleString("id-ID")}
                    </p>

                </div>

                <button
                    class="remove-btn"
                    onclick="hapusKeranjang(${index})">
                    ✕
                </button>

            </div>

        `;
    });


    totalElement.textContent =
        total.toLocaleString("id-ID");
}


function hapusKeranjang(index) {

    keranjang.splice(index, 1);

    updateCart();
}


function goProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}

// Checkout melalui WhatsApp
function checkoutWhatsApp() {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong. Silakan pilih produk terlebih dahulu.");
        return;
    }

    const nomorWhatsApp = "6285136498679"; // 085136498679
    let total = 0;

    const daftarProduk = keranjang.map((item, index) => {
        total += item.harga;
        return `${index + 1}. ${item.nama} - Rp${item.harga.toLocaleString("id-ID")}`;
    }).join("%0A");

    const pesan =
        `Halo JENOVA, saya ingin melakukan pemesanan.%0A%0A` +
        `*Daftar Pesanan:*%0A${daftarProduk}%0A%0A` +
        `*Total: Rp${total.toLocaleString("id-ID")}*%0A%0A` +
        `Mohon konfirmasi pesanan saya. Terima kasih.`;

    const url = `https://wa.me/${nomorWhatsApp}?text=${pesan}`;
    window.open(url, "_blank", "noopener,noreferrer");
}
