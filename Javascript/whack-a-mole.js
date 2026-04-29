(function () {
    const skorWhackMole = document.getElementById("skor-whack-mole");
    const startWhackBtn = document.getElementById("start-whack-btn");
    const whackCount = document.getElementById("whack-count");
    const moleHoles = document.querySelectorAll("figure"); /*saya pakai queryselector disini untuk nangkep banyak di dengan nama class yang sama */
    const displayWhack = document.getElementById("display-whack");
 
    let countdownMole = 120; /*variabel timer untuk game*/
    let waktuInterval; /*waktu interval aku simpan di variabel*/
    let score = 0; /*skor awal game*/
    let isGameActive = false; /*game default*/
 
    function updateTimer() { /*pengkonversian waktu dari 120 menjadi 02:00 style menit dan detik*/
        const menit = Math.floor(countdownMole / 60);
        const detik = countdownMole % 60;
        whackCount.textContent =
            String(menit).padStart(2, "0") + ":" + String(detik).padStart(2, "0");
    }
 
    function whackTimer() {
        clearInterval(waktuInterval); /*ini supaya tidak terjadi penumpukan interval*/
        if (isGameActive) {
            isGameActive = false; /*kondisi game saat ini false*/
            startWhackBtn.textContent = "Start"; /*maka tulisan buttonnya menjadi "start"*/
 
            moleHoles.forEach((hole) => {
                const img = hole.querySelector(".mole");
                img.classList.remove("translate-y-0"); /*translate dibagian ini fungsinya untuk si gambar muncul/ada di figure yang saya sediakan*/
                img.classList.add("translate-y-full"); /*ini lah translate yang bakal buat dia sembunyi*/
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
            countdownMole--; /*waktu terus dikurangi 1 detik */
            updateTimer();
 
            if (countdownMole <= 0) {
                clearInterval(waktuInterval); /*waktu habis bersihkan interval*/
 
                moleHoles.forEach((hole) => {
                    const img = hole.querySelector(".mole");
                    img.classList.remove("translate-y-0"); /*hilangkan semua tikus yang muncul*/
                    img.classList.add("translate-y-full"); /*sembunyikan semua tikus kedalam selama game belum dimulai*/
                });
 
                isGameActive = false;
                countdownMole = 120; /*waktu dikembalikan*/
                updateTimer(); 
                startWhackBtn.textContent = "Start"; /*tulisan button ke awal menjadi "start*/
                displayWhack.textContent = `Waktu habis! Skor kamu: ${score}`; /*update Ui skor di html*/
            }
        }, 1000);
    }
 

    // Pemanggilan fungsi whacktimer
    startWhackBtn.addEventListener("click", whackTimer);
 
    function pilihLubangAcak() { /*dipoint ini tikusnya sudah dipanggil secara acak oleh fungsi ini*/
        const acakKolom = Math.floor(Math.random() * moleHoles.length);
        return moleHoles[acakKolom];
    }
 
    function munculkanTikus() { /*tampilan di Ui yang buat tikusnya keluar masuk*/
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
            }
        });
    });
})();
 