let keranjang = [];


function toggleCart() {

    const panel =
        document.getElementById("cart-panel");

    const overlay =
        document.getElementById("cart-overlay");

    panel.classList.toggle("active");

    overlay.classList.toggle("active");
}


function tambahKeranjang(nama, harga) {

    keranjang.push({
        nama: nama,
        harga: harga
    });

    updateCart();

    document
        .getElementById("cart-panel")
        .classList.add("active");

    document
        .getElementById("cart-overlay")
        .classList.add("active");
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