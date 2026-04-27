(function () {
    const tampilkanNyawa = document.getElementById("display-nyawa");
    const tombolTebak = document.getElementById("btn-tebak");
    const ruangTebak = document.getElementById("inputTebakan");
    const messageStart = document.getElementById("pesan-game");
    const clue = document.getElementById("clueNumber");
    const btnReset = document.getElementById("reset-button");
 
    let nyawa = 5;
    let angkaRahasia = 17;
    let gameSelesai = false;
 
    messageStart.textContent = "Saya sudah memikirkan angka 1-20. Silahkan tebak!";
    tampilkanNyawa.textContent = `Sisa nyawamu: ${nyawa}`;
 
    tombolTebak.addEventListener("click", function () {
        if (gameSelesai) return;
 
        let tebakan = parseInt(ruangTebak.value);
 
        if (isNaN(tebakan)) {
            clue.textContent = "Masukkan angka yang valid!";
            return;
        }
 
        if (tebakan === angkaRahasia) {
            clue.textContent = "CONGRATS! Tebakanmu tepat.";
            gameSelesai = true;
        } else {
            nyawa -= 1;
            if (tebakan > 20) {
                clue.textContent = "Kejauhan Pak mainnya, baca clue dong sayang";
            } else if (tebakan > 17) {
                clue.textContent = "Sudah mendekati, semangat";
            } else {
                clue.textContent = "Terlalu rendah! Coba lagi.";
            }
        }
 
        if (nyawa > 0 && !gameSelesai) {
            tampilkanNyawa.textContent = `Sisa nyawamu adalah ${nyawa}`;
        } else if (nyawa <= 0 && !gameSelesai) {
            tampilkanNyawa.textContent = `GAME OVER! Angka rahasianya adalah ${angkaRahasia}`;
            gameSelesai = true;
        }
 
        ruangTebak.value = "";
        ruangTebak.focus();
    });
 
    btnReset.addEventListener("click", function () {
        nyawa = 5;
        gameSelesai = false;
        messageStart.textContent = "Ayo mulai lagi, saya sudah mikir lagi nih coba tebak hehe";
        tampilkanNyawa.textContent = `sisa nyawamu ${nyawa}`;
        clue.textContent = "";
 
        ruangTebak.value = "";
        ruangTebak.focus();
        console.log(`Game berhasil direset, nyawa kembali ${nyawa}`);
    });
 
    ruangTebak.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            tombolTebak.click();
        }
    });
})();