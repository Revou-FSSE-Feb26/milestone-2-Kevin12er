(function () {
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
 
    let skorKomputer = 0;
    let skorTerbaru = 0;
    let seriTerbaru = 0;
    let nyawamu = 7;
 
    daftarTombol.forEach((tombol) => {
        tombol.addEventListener("click", function () {
            if (nyawamu === 0) return;
 
            const userChoice = this.dataset.pilihan;
            console.log(`kamu memilih: ${userChoice}`);
 
            const opsiAcak = Math.floor(Math.random() * opsiKomputer.length);
            const compChoice = opsiKomputer[opsiAcak];
 
            pilihanUser.textContent = userChoice;
            pilihanKomputer.textContent = compChoice;
 
            setTimeout(function () {
                if (userChoice === compChoice) {
                    seriTerbaru++;
                    seriSkor.textContent = seriTerbaru;
                } else if (
                    (userChoice === "batu" && compChoice === "gunting") ||
                    (userChoice === "gunting" && compChoice === "kertas") ||
                    (userChoice === "kertas" && compChoice === "batu")
                ) {
                    skorTerbaru++;
                    angkaSkor.textContent = skorTerbaru;
                } else {
                    skorKomputer++;
                    angkaKomputer.textContent = skorKomputer;
                }
 
                nyawamu--;
                nyawaUser.textContent = nyawamu;
 
                if (nyawamu <= 0) {
                    if (skorTerbaru > skorKomputer) {
                        displayPemenang.textContent = `Selamat, kamu memenangkan game`;
                        displayPemenang.style.color = "green";
                    } else if (skorTerbaru < skorKomputer) {
                        displayPemenang.textContent = `kamu kalah, computer menang`;
                        displayPemenang.style.color = "red";
                    } else {
                        displayPemenang.textContent = `Hasil Seri`;
                        displayPemenang.style.color = "";
                    }
                }
            }, 100);
        });
    });
 
    btnResetSuit.addEventListener("click", function () {
        nyawamu = 7;
        nyawaUser.textContent = nyawamu;
        skorKomputer = 0;
        angkaKomputer.textContent = "0";
        skorTerbaru = 0;
        angkaSkor.textContent = "0";
        seriTerbaru = 0;
        seriSkor.textContent = "0";
        displayPemenang.textContent = "Batu Gunting Kertas";
        displayPemenang.style.color = "orange";
        pilihanUser.textContent = "?";
        pilihanKomputer.textContent = "?";
    });
})();