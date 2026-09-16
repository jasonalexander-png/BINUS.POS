const assert = require('assert');
const { hitungModalAkhir, hitungUntung, hitungSelisihBayar } = require('./calc.js');

let totalTest = 0, totalGagal = 0;

function test(nama, fn) {
    totalTest++;
    try {
        fn();
        console.log('  \x1b[32m✓\x1b[0m', nama);
    } catch (e) {
        totalGagal++;
        console.log('  \x1b[31m✗\x1b[0m', nama, '\n    ->', e.message);
    }
}

console.log('\n--- Test: hitungModalAkhir (diskon bertingkat) ---');

test('tanpa diskon sama sekali, modal = harga supplier', () => {
    assert.strictEqual(hitungModalAkhir(100000, 0, 0, 0), 100000);
});

test('diskon 1 tingkat 10%', () => {
    assert.strictEqual(hitungModalAkhir(100000, 10, 0, 0), 90000);
});

test('diskon 3 tingkat: 20% + 5% + 2% (dihitung berantai, bukan dijumlah)', () => {
    const hasil = hitungModalAkhir(100000, 20, 5, 2);
    assert.ok(Math.abs(hasil - 74480) < 0.01, `harusnya 74480, dapat ${hasil}`);
});

test('diskon 100% membuat modal jadi 0', () => {
    assert.strictEqual(hitungModalAkhir(100000, 100, 0, 0), 0);
});

test('diskon kosong/undefined dianggap 0%', () => {
    assert.strictEqual(hitungModalAkhir(50000, undefined, undefined, undefined), 50000);
});

test('harga supplier 0 selalu menghasilkan modal 0', () => {
    assert.strictEqual(hitungModalAkhir(0, 50, 10, 5), 0);
});

console.log('\n--- Test: hitungUntung ---');

test('untung = harga jual - modal akhir', () => {
    assert.strictEqual(hitungUntung(150000, 100000), 50000);
});

test('untung bisa negatif kalau harga jual di bawah modal (rugi)', () => {
    assert.strictEqual(hitungUntung(80000, 100000), -20000);
});

console.log('\n--- Test: hitungSelisihBayar (kembalian / sisa hutang) ---');

test('status LUNAS, bayar pas -> kembalian 0', () => {
    const r = hitungSelisihBayar(100000, 100000, 'LUNAS');
    assert.strictEqual(r.label, 'kembalian');
    assert.strictEqual(r.nilai, 0);
});

test('status LUNAS, bayar lebih -> ada kembalian', () => {
    const r = hitungSelisihBayar(100000, 150000, 'LUNAS');
    assert.strictEqual(r.nilai, 50000);
});

test('status HUTANG, bayar kurang -> ada sisa hutang', () => {
    const r = hitungSelisihBayar(100000, 40000, 'HUTANG');
    assert.strictEqual(r.label, 'sisaHutang');
    assert.strictEqual(r.nilai, 60000);
});

test('status HUTANG, bayar penuh -> sisa hutang 0', () => {
    const r = hitungSelisihBayar(100000, 100000, 'HUTANG');
    assert.strictEqual(r.nilai, 0);
});

console.log(`\n=== ${totalTest - totalGagal}/${totalTest} test berhasil ===\n`);
if (totalGagal > 0) process.exitCode = 1;
