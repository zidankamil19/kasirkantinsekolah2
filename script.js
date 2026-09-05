// DATA MENU
const daftarMenu = [
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


// FORMAT RUPIAH
function rupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}


// HITUNG TOTAL
function hitungTotal() {

    let total = 0;

    daftarMenu.forEach(function(item) {

        let input = document.getElementById(item.id);

        let jumlah = Number(input.value);

        if (jumlah < 0 || isNaN(jumlah)) {
            jumlah = 0;
            input.value = 0;
        }

        total = total + (jumlah * item.harga);

    });

    document.getElementById("total").textContent = rupiah(total);

    return total;
}


// TOTAL OTOMATIS SAAT INPUT BERUBAH
daftarMenu.forEach(function(item) {

    document
        .getElementById(item.id)
        .addEventListener("input", function() {

            hitungTotal();

        });

});


// HITUNG PEMBAYARAN
function hitungPembayaran() {

    let total = hitungTotal();

    let uangBayar = Number(
        document.getElementById("uangBayar").value
    );

    let pesan = document.getElementById("pesan");

    let kembalian = document.getElementById("kembalian");


    // BELUM MEMILIH MENU
    if (total === 0) {

        pesan.style.color = "#ff4444";
        pesan.textContent = "⚠ Pilih menu terlebih dahulu!";

        return;
    }


    // UANG KOSONG
    if (!uangBayar || uangBayar <= 0) {

        pesan.style.color = "#ff4444";
        pesan.textContent = "⚠ Masukkan uang pembayaran!";

        return;
    }


    // UANG KURANG
    if (uangBayar < total) {

        let kurang = total - uangBayar;

        pesan.style.color = "#ff4444";

        pesan.textContent =
            "⚠ Uang kurang " + rupiah(kurang);

        kembalian.textContent = "Rp 0";

        return;
    }


    // KEMBALIAN
    let hasilKembalian = uangBayar - total;

    kembalian.textContent =
        rupiah(hasilKembalian);


    pesan.style.color = "#00cc66";

    pesan.textContent =
        "✓ Pembayaran berhasil!";


    // BUAT STRUK
    buatStruk(
        total,
        uangBayar,
        hasilKembalian
    );

}


// BUAT STRUK
function buatStruk(total, bayar, kembali) {

    let hasil = "";

    daftarMenu.forEach(function(item) {

        let jumlah = Number(
            document.getElementById(item.id).value
        );

        if (jumlah > 0) {

            let harga = jumlah * item.harga;

            hasil += `
                <div class="item-struk">
                    <span>${item.nama} x${jumlah}</span>
                    <span>${rupiah(harga)}</span>
                </div>
            `;
        }

    });


    hasil += `
        <hr>

        <div class="item-struk">
            <strong>Total</strong>
            <strong>${rupiah(total)}</strong>
        </div>

        <div class="item-struk">
            <span>Bayar</span>
            <span>${rupiah(bayar)}</span>
        </div>

        <div class="item-struk">
            <strong>Kembalian</strong>
            <strong>${rupiah(kembali)}</strong>
        </div>
    `;


    document.getElementById("isiStruk").innerHTML = hasil;

}


// CETAK STRUK
function cetakStruk() {

    let isi = document.getElementById("isiStruk").innerText;

    if (isi.includes("Belum ada transaksi")) {

        alert("Belum ada transaksi yang bisa dicetak!");

        return;
    }

    window.print();
}


// RESET TRANSAKSI
function resetTransaksi() {

    daftarMenu.forEach(function(item) {

        document.getElementById(item.id).value = 0;

    });

    document.getElementById("uangBayar").value = "";

    document.getElementById("total").textContent = "Rp 0";

    document.getElementById("kembalian").textContent = "Rp 0";

    document.getElementById("pesan").textContent = "";

    document.getElementById("isiStruk").innerHTML =
        "Belum ada transaksi";

}
