(function () {
    // Tangkap semua id dari html dengan get element
    const textDisplay = document.getElementById("text-display");
    const papanKetik = document.getElementById("papan-ketik");
    const skorKetik = document.getElementById("skor-ketik");
    const secondCount = document.getElementById("second-count");
    const btnResetWord = document.getElementById("resetWord-btn");
 
    let skor = 0; /*ini skor penampung untuk supaya nanti menampung skor dalam game*/
    let kata = ["kamu", "lagi", "apa", "sekarang", "bagaimana", "sepertinya saya", "jangan", "marah", "sayang", "mau", "kejar",
        "siapa", "mimpi", "jatuh", "dari", "langit", "tujuh", "hore", "memang", "menang", "jarak", "lupa", "belok", "kiri", "kanan", "atas", "bawah",
        "iduz", "bangjek", "mas thoriq", "seoul", "revou", "fun"]; /*array yang berisi string untuk game ketik*/
    let nilaiTimer = 120; /*waktu permainan tapi masih dalam bentuk bilangan bulat, 120 sama dengan 02:00 (2 menit)*/
    let intervalTime; /*variabel interval time disini berfungsi */
 
    function tampilKata(max) {
        const acakKata = Math.floor(Math.random() * max.length); /*ini untuk pembulatan angka kebawah dan memilih kata di array secara acak*/
        if (max[acakKata] === textDisplay.textContent.toLowerCase()) { /*kenapa to lower case supaya pembandingnnya semua dikonversi menjadi huruf kecil walaupun user ngetik pakai huruf besar*/
            tampilKata(max); /*fungsi yang memanggil dirinya sendiri*/
        } else {
            textDisplay.textContent = max[acakKata];
        }
    }
 
    papanKetik.addEventListener("keypress", function (e) {
        if (e.key === "Enter") { /*supaya si user bisa tekan enter aja sih ini, keypress kan */
            if (papanKetik.value.toLowerCase() === textDisplay.textContent.toLowerCase()) { /*supaya pembandingnya di konversi menajdi huruf kecil semua*/
                textDisplay.style.color = "limegreen"; /*jika si user berhasil mengetik kata tersebut dan enter ? maka warnya hijau*/
                papanKetik.value = ""; /*display langsung diskosongkan*/
                skor++; /*dan updatee lah skornya*/
                setTimeout(function () {
                    textDisplay.style.color = "";
                    tampilKata(kata);
                }, 1000); /*set time out diatas ini fungsinya untuk beri jeda selama 1 detik sebelum kata di update lagi*/
            } else {
                textDisplay.style.color = "red"; /*warna merah jika gagal*/
                papanKetik.value = ""; /*kosongkan display tepat setelah enter*/
                setTimeout(function () { 
                    textDisplay.style.color = ""; 
                    tampilKata(kata);
                }, 1000); /*hal yang saya saya terapkan ulang jadi mau benar atau salah, kasih waktu jeda selama 1 detik*/
            }
 
            skorKetik.textContent = `skor: ${skor}`; /*Update skor di UI ada berapa kata yang berhasil diketik beliau selama di game*/
        }
    });
 
    function mulaiTimer() {
        clearInterval(intervalTime); /*mencegah penumpukan interval*/
        intervalTime = setInterval(() => { /*di line ini game mulai dijalankan*/
            nilaiTimer--; /*nilai timer akan dikurangi 1 detik setelah game dijalankan*/
            const menit = Math.floor(nilaiTimer / 60); /*karena divariabel global saya set 120, saya harus bagi 60 untuk nanti mau saya ubah model timernya jad 02:00*/
            const detik = nilaiTimer % 60;
 
            secondCount.textContent =
                String(menit).padStart(2, "0") + ":" + String(detik).padStart(2, "0"); /*disini pengkonversiannya*/
 
            if (nilaiTimer === 0) { /*titik dimana nilai timer habis*/
                clearInterval(intervalTime); /*disini harus clear interval karena kalau tidak dia akan terus berjalan jadi minus*/
                btnResetWord.textContent = "Start"; /*ketika game berjalan kan tulisan tombolnya jadi reset tuh, nah kalau waktu habis tombolnya balik tulisan star*/
                nilaiTimer = 120; /*waktu balik menjadi 2 menit */
                textDisplay.textContent = `Game Selesai skor kamu: ${skor}`; /*update skor di UI*/
                setTimeout(function () { /*ini adalh waktu berapa lama text game selesai di display tampil di UI dan diganti sama text display dibawah*/
                    if (skor >= 45) {
                        textDisplay.textContent = `leh uga nih cepet banget`;
                    } else if (skor >= 30) {
                        textDisplay.textContent = `ya lumayan daripada lumanyun`;
                    } else if (skor >= 20) {
                        textDisplay.textContent = "hmmm gimana yee ? kurang gan, lebih cepet dong";
                    } else {
                        textDisplay.textContent = "niat maen ga sih";
                    }
                }, 2000);
            }
        }, 1000);
    }
 


    /*dibawah ini kita mengembalikan semua nilai kedefault(awal)*/
    btnResetWord.addEventListener("click", function () {
        if (btnResetWord.textContent === "Start") {
            mulaiTimer();
            tampilKata(kata);
            btnResetWord.textContent = `Reset`;
        } else {
            clearInterval(intervalTime); /*ini adalah logic ketika tombol reset ditekan maka clear interval atau stop waktunya*/
            textDisplay.textContent = ""; /*kosongkan displaynya*/
            nilaiTimer = 120; /*balikin waktunya keawal*/
            skor = 0; /*reset skornya jadi 0*/
            skorKetik.textContent = `skor: ${skor}`; /*update skornya di ui jadi 0 lagi*/
            secondCount.textContent = `02:00`; /*balikin waktunya ke 2 menit */
            btnResetWord.textContent = `Start`; /*ganti tulisan buttonnya jadi start*/
        }
    });
})();
 