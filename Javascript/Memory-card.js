(function () {

	const cards = ["brook1.jpeg", "choper.jpeg", "franky.jpeg", "jinbe.jpeg", "luffy1.jpg", "nami.jpeg", "robin.jpeg", "usop1.jpeg", "zorro3.jpeg", "vinsmoke.jpeg"];
	const btnStart = document.getElementById("btn-start");
	const btnReset = document.getElementById("btn-reset");
	const countDown = document.getElementById("countdown");
	const displayGame = document.getElementById("display-game");
	const gameBoard = document.getElementById("game-board");


	// let countdownFlip = setTimeout(function() { 
	// 	console.log("Countdown is running");
	// }, 1000);


	let timeOut = 300
	// let timer = setInterval(function() {
	// 	console.log("Timer waktu berjalan");
	// 	timeOut--

	// 	if (timeOut <= 0) {
	// 		clearInterval(timer)
	// 		console.log("waktu habis")
	// 	}
	// }, 1000)

	function copyCards(cards) {
		let copyCards = []; /*saya menyediakan sebuah variabel penampung yang nantinya akan direturn oleh function copyCards ini*/


		// hasil dari code challenge yang saya pakai untuk chaining array yang sama dibarisan belakang (duplikat) menggunakan concatenation of array 
		for (let i = 0; i < cards.length; i++) {	/*perulangan loop biasa*/
			const n = cards.length					/*saya masukan kedalam sebuah variabel baru biar tinggal panggil pakai n nggak cards.length, capek kalo panjang*/
			copyCards[i] = cards[i]					/*disini artinya nilainya sama, disinilah sebuah variabel baru itu mendapatkan hasil copian dari cards (array) karena "="*/
			copyCards[n + i] = cards[i]
		}
		return copyCards; /*inilah hasil atau nilai dari sebuah function yang saya buat muehehee*/
	}

	
	function shuffleCards(shuffle) {
		return shuffle.sort(() => Math.random() - 0.5)
	}



	function render() {
		gameBoard.innerHTML = cards.map(gambar, i) => ``
	}
















































})();