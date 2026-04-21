
const tampilkanNyawa = document.getElementById("display-nyawa");
const tombolTebak = document.getElementById("btn-tebak");
const ruangTebak = document.getElementById("inputTebakan"); 
const messageStart = document.getElementById("pesan-game");
const clue = document.getElementById("clueNumber");
const btnReset = document.getElementById("reset-button")


let nyawa = 5;
let angkaRahasia = 17;
let gameSelesai = false;


messageStart.textContent = "Saya sudah memikirkan angka 1-20. Silahkan tebak!";
tampilkanNyawa.textContent = `Sisa nyawamu: ${nyawa}`;


tombolTebak.addEventListener("click", function() {
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
            clue.textContent = "Sudah mendekati, semangat"
        }
         else {
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

btnReset.addEventListener("click", function() {
    nyawa = 5;
    gameSelesai = false;
    messageStart.textContent = "Ayo mulai lagi, saya sudah mikir lagi nih coba tebak hehe"
    tampilkanNyawa.textContent = `sisa nyawamu ${nyawa}`
    clue.textContent = "";

    ruangTebak.value = "";
    ruangTebak.focus();
    console.log(`Game berhasil direset, nyawa kembali ${nyawa}`)
})

ruangTebak.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        tombolTebak.click();
    }
}) 

// ========================= Game Tebak Angka Selesai ========================================


// Game ketik dimulai dibawah ini

const textDisplay = document.getElementById("text-display");
const papanKetik = document.getElementById("papan-ketik");
const skorKetik = document.getElementById("skor-ketik");
const secondCount = document.getElementById("second-count");
const btnResetWord = document.getElementById("resetWord-btn")
let skor = 0;

let kata = ["kamu", "lagi", "apa", "sekarang"];

function tampilKata(max) {
    const acakKata = Math.floor(Math.random() * max.length)
    if (max[acakKata] === textDisplay.textContent.toLowerCase()) {
        tampilKata(max)
    } else {
        textDisplay.textContent = max[acakKata]
    }
}



papanKetik.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        if (papanKetik.value.toLowerCase() === textDisplay.textContent.toLowerCase()) {
            textDisplay.style.color = "limegreen";
            papanKetik.value = "";
            skor++
            setTimeout(function() {
                textDisplay.style.color = "";
                tampilKata(kata);
            }, 1000)
        } else {
            textDisplay.style.color = "red";
            papanKetik.value = "";
            setTimeout(function() {
                textDisplay.style.color = "";
                tampilKata(kata);
            }, 1000)
        }

        skorKetik.textContent = `skor: ${skor}`
    }
})


let nilaiTimer = 120
let intervalTime;

function mulaiTimer() {
    clearInterval(intervalTime)
    intervalTime = setInterval(() => {
    nilaiTimer--
    const menit = Math.floor(nilaiTimer / 60);
    const detik = nilaiTimer % 60;

    secondCount.textContent = 
        String(menit).padStart(2, '0') + ":" +
        String(detik).padStart(2, '0');
   


    if (nilaiTimer === 0) {
        clearInterval(intervalTime)
        btnResetWord.textContent = "Start"
        nilaiTimer = 120;
        textDisplay.textContent = `Game Selesai skor kamu: ${skor}`
        setTimeout(function() {
            if (skor >= 45) {
                textDisplay.textContent = `leh uga nih cepet banget`
            } else if (skor >= 30) {
                textDisplay.textContent = `ya lumayan daripada lumanyun`
            } else if (skor >= 20) {
                textDisplay.textContent = 'hmmm gimana yee ? kurang gan, lebih cepet dong'
            } else {
                textDisplay.textContent = 'niat maen ga sih'
            }
        }, 2000)
    }
    },  1000) 
}

 
 btnResetWord.addEventListener("click", function() {
        if (btnResetWord.textContent === "Start") {
            mulaiTimer();
            tampilKata(kata);
            btnResetWord.textContent = `Reset`;
            
        } else {
            clearInterval(intervalTime)
            textDisplay.textContent = "";
            nilaiTimer = 120;
            skor = 0;
            skorKetik.textContent = `skor: ${skor}`;
            secondCount.textContent = `02:00`
            btnResetWord.textContent = `Start`
        }


    });
// ================== Game Ketik Selesai ==================================//


// ================== Game Batu Gunting Kertas ===========================//


 const skorSuit = document.getElementById("skor-suit");
 const pilihanUser = document.getElementById("pilihan-user");
 const pilihanKomputer = document.getElementById("pilihan-komputer");
 const btnResetSuit = document.getElementById("reset-suit");
 const daftarTombol = document.querySelectorAll('.btn-suit');
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

 daftarTombol.forEach(tombol => {
    tombol.addEventListener("click", function() {
        if (nyawamu === 0) return;

        const userChoice = this.dataset.pilihan;
        console.log(`kamu memilih: ${userChoice}`)

       

        const opsiAcak = Math.floor(Math.random() * opsiKomputer.length)
        const compChoice = opsiKomputer[opsiAcak];

        pilihanUser.textContent = userChoice;
        pilihanKomputer.textContent = compChoice;

        setTimeout(function() {
            if (userChoice === compChoice) {
                seriTerbaru++
                seriSkor.textContent = seriTerbaru
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

            nyawamu--
            nyawaUser.textContent = nyawamu;


            if (nyawamu <= 0) {
                if(skorTerbaru > skorKomputer) {
                    displayPemenang.textContent = `Selamat, kamu memenangkan game`;
                    displayPemenang.style.color = "green";
                } else if(skorTerbaru < skorKomputer) {
                    displayPemenang.textContent = `kamu kalah, computer menang`;
                    displayPemenang.style.color = "red";
                } else {
                    displayPemenang.textContent = `Hasil Seri`;
                    displayPemenang.style.color = "";
                }
            }

            }, 100);
    })
 })



btnResetSuit.addEventListener("click", function() {
    nyawamu = 7;
    nyawaUser.textContent = nyawamu;
    skorKomputer = 0;
    angkaKomputer.textContent = "0";
    skorTerbaru = 0;
    angkaSkor.textContent = "0";
    seriTerbaru = 0;
    seriSkor.textContent = "0";
    displayPemenang.textContent = "Batu Gunting Kertas";
    displayPemenang.style.color = "orange"
    pilihanUser.textContent = "?";
    pilihanKomputer.textContent = "?";
})

// ==================== Game batu gunting kertas selesai =========================//


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
        String(menit).padStart(2, '0') + ":" +
        String(detik).padStart(2, '0');
    };


function whackTimer() {
        clearInterval(waktuInterval);
        if (isGameActive) {
            isGameActive = false;
            startWhackBtn.textContent = "Start";
           
            moleHoles.forEach(hole => {
                const img = hole.querySelector(".mole");
                img.classList.remove('translate-y-0');
                img.classList.add('translate-y-full');
            });
            return;
        };

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

                
                moleHoles.forEach(hole => {
                    const img = hole.querySelector(".mole");
                    img.classList.remove('translate-y-0');
                    img.classList.add('translate-y-full');
                });

                isGameActive = false;
                countdownMole = 120;
                updateTimer();
                startWhackBtn.textContent = "Start";
                displayWhack.textContent = `Waktu habis! Skor kamu: ${score}`;
            }
        }, 1000);
    }


    startWhackBtn.addEventListener("click", whackTimer)

function pilihLubangAcak() {
        const acakKolom = Math.floor(Math.random() * moleHoles.length);
        return moleHoles[acakKolom];
    }

function munculkanTikus() {
        const acakLubang = pilihLubangAcak();
        const img = acakLubang.querySelector(".mole");

        img.classList.remove('translate-y-full');
        img.classList.add('translate-y-0');

        setTimeout(function () {
            if (img.classList.contains('translate-y-0')) {
                img.classList.remove('translate-y-0');
                img.classList.add('translate-y-full');
            }
        }, 1000);
    }


moleHoles.forEach(hole => {
        hole.addEventListener("click", function () {
            if (!isGameActive) return;

            const img = hole.querySelector(".mole");

            if (img.classList.contains('translate-y-0')) {
                img.classList.remove('translate-y-0');
                img.classList.add('translate-y-full');
                score++;
                skorWhackMole.textContent = score;
                console.log("Skor harusnya nambah!")
            }
        });
    });

// ========================== Game whack a mole selesai ========================== //

























