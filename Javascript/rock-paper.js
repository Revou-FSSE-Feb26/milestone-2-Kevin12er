(function () { /*aku pakai IIFE untuk gabungin semua kodingan*/
    const skorSuit = document.getElementById("skor-suit");
    const pilihanUser = document.getElementById("pilihan-user");
    const pilihanKomputer = document.getElementById("pilihan-komputer");
    const btnResetSuit = document.getElementById("reset-suit");
    const daftarTombol = document.querySelectorAll(".btn-suit");
    const angkaSkor = document.getElementById("angka-skor");
    const seriSkor = document.getElementById("seri-skor");
    const angkaKomputer = document.getElementById("angka-komputer");
    const displayPemenang = document.getElementById("display-pemenang");
    const nyawaUser = document.getElementById("nyawa-user");
    const opsiKomputer = ["batu", "gunting", "kertas"];
 
    let skorKomputer = 0; /*variabel penampung skor komputer*/
    let skorTerbaru = 0; /*variabel penampung skor User*/
    let seriTerbaru = 0; /*variabel penampung skor seri*/
    let nyawamu = 7; /*variabel penampung untuk nyawa*/
 
    daftarTombol.forEach((tombol) => {
        tombol.addEventListener("click", function () {
            if (nyawamu === 0) return; /*jika nyawa 0 maka return hasilnya siapa yang menang*/
 
            const userChoice = this.dataset.pilihan;
            console.log(`kamu memilih: ${userChoice}`);
 
            const opsiAcak = Math.floor(Math.random() * opsiKomputer.length); /*supaya komputer memilihnya acak cuma gatau kenapa komputernya menang terus bjir*/
            const compChoice = opsiKomputer[opsiAcak];
 
            pilihanUser.textContent = userChoice; /*nilai yang diambil oleh user maka tampilkan di display*/
            pilihanKomputer.textContent = compChoice; /*nilai yang diambil oleh komputer maka tampilkan didisplay*/
 
            setTimeout(function () {
                if (userChoice === compChoice) { /*ini logic untuk hasil seri*/
                    seriTerbaru++;  /*tambahkan nilai ke variabel seri*/
                    seriSkor.textContent = seriTerbaru; /*lalu update skornya ke UI*/
                } else if ( /*logic untuk kemenangan user*/
                    (userChoice === "batu" && compChoice === "gunting") ||
                    (userChoice === "gunting" && compChoice === "kertas") ||
                    (userChoice === "kertas" && compChoice === "batu")
                ) {
                    skorTerbaru++; /*update skor dulu*/
                    angkaSkor.textContent = skorTerbaru; /*baru tampilkan di display*/
                } else {
                    skorKomputer++; /*pengecualian dari kedua kemungkinan diatas adalah komputer menang maka tambahkan skornya*/
                    angkaKomputer.textContent = skorKomputer; /*baru update skornya ke display*/
                }
 
                nyawamu--; /*Pengurangan nyawa dengan "--" kalau "++" malah nambah pak dia nyawanya */
                nyawaUser.textContent = nyawamu; /*update nyawa terbaru karena sequencenya nilai diatas (nyawamu--) baru tampilkan*/
 
                if (nyawamu <= 0) {
                    if (skorTerbaru > skorKomputer) {
                        displayPemenang.textContent = `Selamat, kamu memenangkan game`; /*display UI ketika user memenangkan game*/
                        displayPemenang.style.color = "green"; /*warnya hijau kalau menang*/
                    } else if (skorTerbaru < skorKomputer) {
                        displayPemenang.textContent = `kamu kalah, computer menang`; /*display UI ketika computer memenangkan game*/
                        displayPemenang.style.color = "red"; /*warna merah karena user kalah*/
                    } else {
                        displayPemenang.textContent = `Hasil Seri`; /*display UI kalau hasilnya seri*/
                        displayPemenang.style.color = ""; /*default dispaly UI*/
                    }
                }
            }, 100); /*ini adalah set time out yang saya setting hanya 100ms setelah game selesai untuk melihat display diatas*/
        });
    });
 



    // dibawah ini adalah bagaiman saya mereset semua kembali ke titik awal permainan... mengembalikan semua nilai seperti semula 
    btnResetSuit.addEventListener("click", function () {
        nyawamu = 7;    /*nyawa kembali menjadi 7 / awalnya 7 memang bang*/
        nyawaUser.textContent = nyawamu; /*menampilkan display nyawa: 7 di ui (frontend)*/
        skorKomputer = 0; /*skor komputer balik 0 lagi bang*/
        angkaKomputer.textContent = "0"; /*tampilan display ui skor komputer jadi 0 lagi*/
        skorTerbaru = 0; /*reset skor*/
        angkaSkor.textContent = "0"; /*tampilkan reset skor di ui*/
        seriTerbaru = 0; /*skor seri jadi 0*/
        seriSkor.textContent = "0"; /*tampilkan skor seri di UI*/
        displayPemenang.textContent = "Batu Gunting Kertas"; /*nilai awal array*/
        displayPemenang.style.color = "orange"; /* warna default styling*/
        pilihanUser.textContent = "?"; /*simbol default ketika game tidak dimulai di UI*/
        pilihanKomputer.textContent = "?"; /*simbol default ketika game tidak dimulai di UI*/
    });
})();