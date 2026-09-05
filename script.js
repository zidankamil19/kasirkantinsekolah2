// ===============================
// DATA MENU
// ===============================

const menu = [
    {
        id: "nasiGoreng",
        nama: "Nasi Goreng",
        harga: 12000
    },
    {
        id: "mieGoreng",
        nama: "Mie Goreng",
        harga: 10000
    },
    {
        id: "ayamGeprek",
        nama: "Ayam Geprek",
        harga: 15000
    },
    {
        id: "esTeh",
        nama: "Es Teh",
        harga: 4000
    },
    {
        id: "esJeruk",
        nama: "Es Jeruk",
        harga: 5000
    },
    {
        id: "airMineral",
        nama: "Air Mineral",
        harga: 3000
    }
];


// ===============================
// FORMAT RUPIAH
// ===============================

function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}


// ===============================
// TAMPILKAN TANGGAL
// ===============================

function tampilkanTanggal() {

    const sekarang = new Date();

    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    };

    document.getElementById("tanggal").textContent =
        sekarang.toLocaleDateString("id-ID", options);
}

tampilkanTanggal();


// ===============================
// HITUNG SUBTOTAL OTOMATIS
// ===============================

function hitungSubtotal() {

    let subtotal = 0;

    menu.forEach(item => {

        let input = document.getElementById(item.id);

        let jumlah = parseInt(input.value) || 0;

        // Mencegah angka negatif
        if (jumlah < 0) {
            jumlah = 0;
            input.value = 0;
        }

        subtotal += jumlah * item.harga;
    });

    document.getElementById("subtotal").textContent =
        formatRupiah(subtotal);

    document.getElementById("total").textContent =
        formatRupiah(subtotal);

    return subtotal;
}


// ===============================
// EVENT INPUT JUMLAH MENU
// ===============================

menu.forEach(item => {

    document
        .getElementById(item.id)
        .addEventListener("input", function () {

            hitungSubtotal();

        });

});


// ===============================
// HITUNG TRANSAKSI
// ===============================

function hitungTransaksi() {

    let total = hitungSubtotal();

    let inputBayar =
        document.getElementById("uangBayar");

    let uangBayar =
        parseInt(inputBayar.value) || 0;

    let pesan =
        document.getElementById("pesan");

    let kembalian =
        document.getElementById("kembalian");


    // Validasi belum memilih menu
    if (total === 0) {

        pesan.style.color = "#ff3333";

        pesan.textContent =
            "⚠ Silakan pilih menu terlebih dahulu!";

        kembalian.textContent = "Rp 0";

        return;
    }


    // Validasi uang pembayaran kosong
    if (uangBayar <= 0) {

        pesan.style.color = "#ff3333";

        pesan.textContent =
            "⚠ Masukkan uang pembayaran!";

        kembalian.textContent = "Rp 0";

        return;
    }


    // Validasi uang kurang
    if (uangBayar < total) {

        let kekurangan =
            total - uangBayar;

        pesan.style.color = "#ff3333";

        pesan.textContent =
            "⚠ Uang kurang " +
            formatRupiah(kekurangan);

        kembalian.textContent = "Rp 0";

        return;
    }


    // Hitung kembalian
    let hasilKembalian =
        uangBayar - total;


    // Tampilkan kembalian
    kembalian.textContent =
        formatRupiah(hasilKembalian);


    // Pesan berhasil
    pesan.style.color = "#00cc66";

    pesan.textContent =
        "✓ Pembayaran berhasil!";


    // Update tanggal
    tampilkanTanggal();


    // Tampilkan struk
    tampilkanStruk(
        total,
        uangBayar,
        hasilKembalian
    );

}


// ===============================
// TAMPILKAN STRUK
// ===============================

function tampilkanStruk(
    total,
    bayar,
    kembali
) {

    let isiStruk = "";

    let adaPesanan = false;


    menu.forEach(item => {

        let jumlah =
            parseInt(
                document
                    .getElementById(item.id)
                    .value
            ) || 0;


        if (jumlah > 0) {

            let hargaTotal =
                jumlah * item.harga;


            isiStruk += `

                <div class="item-struk">

                    <span>
                        ${item.nama} x${jumlah}
                    </span>

                    <span>
                        ${formatRupiah(hargaTotal)}
                    </span>

                </div>

            `;

            adaPesanan = true;
        }

    });


    if (adaPesanan) {

        isiStruk += `

            <hr>

            <div class="item-struk">
                <strong>Total</strong>
                <strong>${formatRupiah(total)}</strong>
            </div>

            <div class="item-struk">
                <span>Bayar</span>
                <span>${formatRupiah(bayar)}</span>
            </div>

            <div class="item-struk">
                <strong>Kembalian</strong>
                <strong>${formatRupiah(kembali)}</strong>
            </div>

        `;
    }


    document
        .getElementById("isiStruk")
        .innerHTML = isiStruk;

}


// ===============================
// CETAK STRUK
// ===============================

function cetakStruk() {

    let isiStruk =
        document
            .getElementById("isiStruk")
            .innerText;


    // Validasi transaksi
    if (
        isiStruk.includes(
            "Belum ada transaksi"
        )
    ) {

        alert(
            "⚠️ Belum ada transaksi yang dapat dicetak!"
        );

        return;
    }


    // Cetak
    window.print();

}


// ===============================
// RESET TRANSAKSI
// ===============================

function resetTransaksi() {

    // Reset semua jumlah menu
    menu.forEach(item => {

        document
            .getElementById(item.id)
            .value = 0;

    });


    // Reset pembayaran
    document
        .getElementById("uangBayar")
        .value = "";


    // Reset tampilan harga
    document
        .getElementById("subtotal")
        .textContent = "Rp 0";


    document
        .getElementById("total")
        .textContent = "Rp 0";


    document
        .getElementById("kembalian")
        .textContent = "Rp 0";


    // Reset pesan
    document
        .getElementById("pesan")
        .textContent = "";


    // Reset struk
    document
        .getElementById("isiStruk")
        .innerHTML =
        '<p class="center">Belum ada transaksi.</p>';


    // Update tanggal
    tampilkanTanggal();

}
