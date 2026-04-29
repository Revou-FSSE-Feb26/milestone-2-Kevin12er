(function () {
    const tampilkanNyawa = document.getElementById("display-nyawa");
    const tombolTebak = document.getElementById("btn-tebak");
    const ruangTebak = document.getElementById("inputTebakan");
    const messageStart = document.getElementById("pesan-game");
    const clue = document.getElementById("clueNumber");
    const btnReset = document.getElementById("reset-button");
 
    let nyawa = 5; /*variabel penampung nyawa*/
    let angkaRahasia = 17; /*angka rahasia yang harus ditebak*/
    let gameSelesai = false; /*Saklar game*/
 
    messageStart.textContent = "Saya sudah memikirkan angka 1-20. Silahkan tebak!"; /*default display UI di html*/
    tampilkanNyawa.textContent = `Sisa nyawamu: ${nyawa}`; /*display nyawa di html*/
 
    tombolTebak.addEventListener("click", function () {
        if (gameSelesai) return;
 
        let tebakan = parseInt(ruangTebak.value); /*megkonversi string menjadi integer (bilangan bulat)*/
 
        if (isNaN(tebakan)) { /*is nan disini adalah ketika user tidak menginput sebuah nilai tapi menekan tombol tebak*/
            clue.textContent = "Masukkan angka yang valid!"; /*display jika tidak menginput data yang valid di UI*/
            return;
        }
 
        if (tebakan === angkaRahasia) { /*jika kondisi game sudah ditebak dan benar maka game selesai*/
            clue.textContent = "CONGRATS! Tebakanmu tepat.";
            gameSelesai = true;
        } else {
            nyawa -= 1; /*jika jawaban masih salah maka kurangi nyawa*/
            if (tebakan > 20) {
                clue.textContent = "Kejauhan Pak mainnya, baca clue dong sayang"; /*clue untuk angka yang lebih dari jangkauan*/
            } else if (tebakan > 17) {
                clue.textContent = "Sudah mendekati, semangat"; /*clue jika sudah mendekati*/
            } else {
                clue.textContent = "Terlalu rendah! Coba lagi."; /*clue jika tebakan terlalu rendah*/
            }
        }
 
        if (nyawa > 0 && !gameSelesai) { /*jika game masih berjalan dan belum selesai tetap tampilkan nyawa*/
            tampilkanNyawa.textContent = `Sisa nyawamu adalah ${nyawa}`;
        } else if (nyawa <= 0 && !gameSelesai) { /*jika nyawa habis tampilkan angka rahasia */
            tampilkanNyawa.textContent = `GAME OVER! Angka rahasianya adalah ${angkaRahasia}`;
            gameSelesai = true; /*game berhenti*/
        }
 
        ruangTebak.value = ""; /*lalu kosongkan input display*/
        ruangTebak.focus(); 
    });


    /*dibawah ini hanya untuk mengembalikan nilai keawal seperti nyawa, cluenya dikosongkan kembali, value inputnya juga kosong kembali*/
    btnReset.addEventListener("click", function () {
        nyawa = 5;
        gameSelesai = false;
        messageStart.textContent = "Ayo mulai lagi, saya sudah mikir lagi nih coba tebak hehe"; /*hanya ini yang saya ganti tidak ke tampilan awal*/
        tampilkanNyawa.textContent = `sisa nyawamu ${nyawa}`;
        clue.textContent = "";
 
        ruangTebak.value = "";
        ruangTebak.focus();
    });
 
    ruangTebak.addEventListener("keypress", function (event) { /*pengaktifan keyboard "Enter" untuk tombol tebak*/
        if (event.key === "Enter") {
            tombolTebak.click();
        }
    });
})();