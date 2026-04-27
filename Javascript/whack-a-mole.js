(function () {
    const skorWhackMole = document.getElementById("skor-whack-mole");
    const startWhackBtn = document.getElementById("start-whack-btn");
    const whackCount = document.getElementById("whack-count");
    const moleHoles = document.querySelectorAll("figure");
    const displayWhack = document.getElementById("display-whack");
 
    let countdownMole = 120;
    let waktuInterval;
    let score = 0;
    let isGameActive = false;
 
    function updateTimer() {
        const menit = Math.floor(countdownMole / 60);
        const detik = countdownMole % 60;
        whackCount.textContent =
            String(menit).padStart(2, "0") + ":" + String(detik).padStart(2, "0");
    }
 
    function whackTimer() {
        clearInterval(waktuInterval);
        if (isGameActive) {
            isGameActive = false;
            startWhackBtn.textContent = "Start";
 
            moleHoles.forEach((hole) => {
                const img = hole.querySelector(".mole");
                img.classList.remove("translate-y-0");
                img.classList.add("translate-y-full");
            });
            return;
        }
 
        startWhackBtn.textContent = "Stop";
        displayWhack.textContent = "";
        score = 0;
        countdownMole = 120;
        isGameActive = true;
        skorWhackMole.textContent = score;
        updateTimer();
 
        waktuInterval = setInterval(() => {
            munculkanTikus();
            countdownMole--;
            updateTimer();
 
            if (countdownMole <= 0) {
                clearInterval(waktuInterval);
 
                moleHoles.forEach((hole) => {
                    const img = hole.querySelector(".mole");
                    img.classList.remove("translate-y-0");
                    img.classList.add("translate-y-full");
                });
 
                isGameActive = false;
                countdownMole = 120;
                updateTimer();
                startWhackBtn.textContent = "Start";
                displayWhack.textContent = `Waktu habis! Skor kamu: ${score}`;
            }
        }, 1000);
    }
 
    startWhackBtn.addEventListener("click", whackTimer);
 
    function pilihLubangAcak() {
        const acakKolom = Math.floor(Math.random() * moleHoles.length);
        return moleHoles[acakKolom];
    }
 
    function munculkanTikus() {
        const acakLubang = pilihLubangAcak();
        const img = acakLubang.querySelector(".mole");
 
        img.classList.remove("translate-y-full");
        img.classList.add("translate-y-0");
 
        setTimeout(function () {
            if (img.classList.contains("translate-y-0")) {
                img.classList.remove("translate-y-0");
                img.classList.add("translate-y-full");
            }
        }, 1000);
    }
 
    moleHoles.forEach((hole) => {
        hole.addEventListener("click", function () {
            if (!isGameActive) return;
 
            const img = hole.querySelector(".mole");
 
            if (img.classList.contains("translate-y-0")) {
                img.classList.remove("translate-y-0");
                img.classList.add("translate-y-full");
                score++;
                skorWhackMole.textContent = score;
                console.log("Skor harusnya nambah!");
            }
        });
    });
})();
 