function hitungModalAkhir(hargaSupplier, diskon1, diskon2, diskon3) {
    const hrg = Number(hargaSupplier) || 0;
    const d1 = Number(diskon1) || 0;
    const d2 = Number(diskon2) || 0;
    const d3 = Number(diskon3) || 0;

    let modal = hrg - (hrg * d1 / 100);
    modal = modal - (modal * d2 / 100);
    modal = modal - (modal * d3 / 100);
    return modal;
}

function hitungUntung(hargaJual, modalAkhir) {
    return (Number(hargaJual) || 0) - (Number(modalAkhir) || 0);
}

function hitungSelisihBayar(total, dibayar, status) {
    const t = Number(total) || 0;
    const b = Number(dibayar) || 0;
    if (status === 'HUTANG') {
        return { label: 'sisaHutang', nilai: b < t ? (t - b) : 0 };
    }
    return { label: 'kembalian', nilai: b >= t ? (b - t) : 0 };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { hitungModalAkhir, hitungUntung, hitungSelisihBayar };
}
