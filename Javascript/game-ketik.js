(function () {
    const textDisplay = document.getElementById("text-display");
    const papanKetik = document.getElementById("papan-ketik");
    const skorKetik = document.getElementById("skor-ketik");
    const secondCount = document.getElementById("second-count");
    const btnResetWord = document.getElementById("resetWord-btn");
 
    let skor = 0;
    let kata = ["kamu", "lagi", "apa", "sekarang"];
    let nilaiTimer = 120;
    let intervalTime;
 
    function tampilKata(max) {
        const acakKata = Math.floor(Math.random() * max.length);
        if (max[acakKata] === textDisplay.textContent.toLowerCase()) {
            tampilKata(max);
        } else {
            textDisplay.textContent = max[acakKata];
        }
    }
 
    papanKetik.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            if (papanKetik.value.toLowerCase() === textDisplay.textContent.toLowerCase()) {
                textDisplay.style.color = "limegreen";
                papanKetik.value = "";
                skor++;
                setTimeout(function () {
                    textDisplay.style.color = "";
                    tampilKata(kata);
                }, 1000);
            } else {
                textDisplay.style.color = "red";
                papanKetik.value = "";
                setTimeout(function () {
                    textDisplay.style.color = "";
                    tampilKata(kata);
                }, 1000);
            }
 
            skorKetik.textContent = `skor: ${skor}`;
        }
    });
 
    function mulaiTimer() {
        clearInterval(intervalTime);
        intervalTime = setInterval(() => {
            nilaiTimer--;
            const menit = Math.floor(nilaiTimer / 60);
            const detik = nilaiTimer % 60;
 
            secondCount.textContent =
                String(menit).padStart(2, "0") + ":" + String(detik).padStart(2, "0");
 
            if (nilaiTimer === 0) {
                clearInterval(intervalTime);
                btnResetWord.textContent = "Start";
                nilaiTimer = 120;
                textDisplay.textContent = `Game Selesai skor kamu: ${skor}`;
                setTimeout(function () {
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
 
    btnResetWord.addEventListener("click", function () {
        if (btnResetWord.textContent === "Start") {
            mulaiTimer();
            tampilKata(kata);
            btnResetWord.textContent = `Reset`;
        } else {
            clearInterval(intervalTime);
            textDisplay.textContent = "";
            nilaiTimer = 120;
            skor = 0;
            skorKetik.textContent = `skor: ${skor}`;
            secondCount.textContent = `02:00`;
            btnResetWord.textContent = `Start`;
        }
    });
})();
 