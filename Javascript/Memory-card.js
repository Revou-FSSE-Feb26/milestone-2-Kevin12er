(function () {
    // 1. DATA & VARIABLE
    const cards = ["brook1.jpeg", "choper.jpeg", "franky.jpeg", "jinbe.jpeg", "luffy1.jpg", "nami.jpeg", "robin.jpeg", "usop1.jpeg", "zorro3.jpeg", "vinsmoke.jpeg"];
    const btnStart = document.getElementById("btn-start");
    const btnReset = document.getElementById("btn-reset"); 
    const gameBoard = document.getElementById("game-board");
    const countdown = document.getElementById("countdown");

    let firstCard = null, secondCard = null, timeInterval = null, lockBoard = false;
    let countTimer = 0;
    let matchedPairs = 0; //Untuk cek kapan game selesai

    // 2. FUNGSI STATIS 
    const chainCards = (cardArray) => [...cardArray, ...cardArray];
    const shuffleCards = (array) => array.sort(() => Math.random() - 0.5);
    const formatTime = (secs) => {
        const menit = Math.floor(secs / 60);
        const detik = secs % 60;
        return String(menit).padStart(2, "0") + ":" + String(detik).padStart(2, "0");
    };

    const resetBoard = () => {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    };

    const stopTimer = () => {
        clearInterval(timeInterval);
    };

    const startTimer = () => {
        stopTimer();
        countTimer = 0;
        countdown.textContent = "00:00";
        timeInterval = setInterval(() => {
            countTimer++;
            countdown.textContent = formatTime(countTimer);
        }, 1000);
    };

    // 3. FUNGSI LOGIKA 
    function cekMatch() {
        let isMatch = firstCard.dataset.karakter === secondCard.dataset.karakter;

        if (isMatch) {
            matchedPairs++; 
            resetBoard();

            // CEK APAKAH GAME SELESAI
            if (matchedPairs === cards.length) {
                stopTimer();
                alert(`Selamat! Kamu menang dalam waktu ${formatTime(countTimer)}`);
            }
        } else {
            setTimeout(() => {
                firstCard.innerHTML = "";
                secondCard.innerHTML = "";
                resetBoard();
            }, 1000);
        }
    }

    // 4. PERAKITAN TOMBOL START
    btnStart.addEventListener("click", function() {
        matchedPairs = 0; // Reset poin
        let cardIsReady = chainCards(cards);
        let randomCard = shuffleCards(cardIsReady);
        
        gameBoard.innerHTML = ""; 
        startTimer(); 

        randomCard.forEach(function(item) {
            const cardBox = document.createElement("div");
            cardBox.className = "border border-slate-700 bg-slate-500 rounded-2xl cursor-pointer drop-shadow-glow-green active:scale-95 aspect-square overflow-hidden h-70 w-full flex items-center justify-center ";
            cardBox.dataset.karakter = item;

            cardBox.addEventListener("click", function() {
                if (lockBoard || this === firstCard) return;

                const image = document.createElement("img");
                image.src = `../Images/${this.dataset.karakter}`;
                image.className = "w-full h-full object-cover";
                this.appendChild(image);

                if (!firstCard) {
                    firstCard = this;
                } else {
                    secondCard = this;
                    lockBoard = true;
                    cekMatch();
                }
            });
            gameBoard.appendChild(cardBox);
        });
    });

    // 5. PERAKITAN TOMBOL RESET (LOGIKA BARU)
    btnReset.addEventListener("click", function() {
        stopTimer(); // Berhentikan waktu
        countdown.textContent = "00:00"; // Balikin tampilan ke nol
        gameBoard.innerHTML = ""; // Kosongkan papan
        resetBoard(); // Reset variabel first/second card
        matchedPairs = 0; // Reset hitungan menang
    });

})();