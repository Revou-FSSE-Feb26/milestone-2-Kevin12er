(function () {

	const cards = ["brook1.jpeg", "choper.jpeg", "franky.jpeg", "jinbe.jpeg", "luffy1.jpg", "nami.jpeg", "robin.jpeg", "usop1.jpeg", "zorro3.jpeg", "vinsmoke.jpeg"];
	const btnStart = document.getElementById("btn-start");
	const btnReset = document.getElementById("btn-reset");
	const countDown = document.getElementById("countdown");
	const displayGame = document.getElementById("display-game");
	const gameBoard = document.getElementById("game-board");


	// btnStart.addEventListener(function() {

	// })


	// concatenation of Array/ sambungkan 10 array kebelekang
	let chainCards = function(card) {
		let c = card.length
		let newChain = [];

		for (let i = 0; i < c; i++) {
			newChain[i] = card[i];
			newChain[i + c] = card[i];
		}
		return newChain
	}

	// Function shuflle cards
	function shuffleCards(item) {
		item.sort(() => Math.random() - 0.5)
		return item;
	}

	btnStart.addEventListener("click", function() {
		let cardIsReady = chainCards(cards);
		let randomCard = shuffleCards(cardIsReady);
		gameBoard.innerHTML = "";

		randomCard.forEach(function(item) {
			const cardBox = document.createElement("div");
			cardBox.className = "border border-slate-700 bg-slate-500 rounded-2xl cursor-pointer aspect-square h-70 w-full";
			

			
			gameBoard.appendChild(cardBox)
		})

	})


































})();