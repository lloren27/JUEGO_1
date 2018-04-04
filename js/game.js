function Game(data) {
	
	this.data = data;
	this.cards = new Cards(this)
	this.indexCard;
	this.randomPropierty;
	this.shiftClick = 0;
	
	this.battlefield = [];

	this.start();

}

Game.prototype.start = function () {
	var game = this;
	$(".bstart").click(function () {
		$(".start").css("display", "none")
		$(".random").css("display", "block")
		game.blend();
		game.generatePlayer();
		game.drawCards();
		game.turnOfSkills();
	})
	$(".brandom").click(function () {
		$(".random").css("display", "none")
		$(".name1").css("display", "block")
		$(".card1").css("display", "block")
	})
}

Game.prototype.turnOfSkills = function () {
	this.getRandomSkill();
	this.selectCards();
}

Game.prototype.blend = function () {

	const shuffle = (data) => { // algoritmo recogido de wikipedia sustituir los valores por el argumento que entra en la función.
		let randomizedDeck = [];
		let array = this.data.slice();
		while (array.length !== 0) {
			let rIndex = Math.floor(array.length * Math.random());
			randomizedDeck.push(array[rIndex]);
			array.splice(rIndex, 1)
		}
		return randomizedDeck;
	};
	return (shuffle(this.data));
}

Game.prototype.generatePlayer = function () {


	var cartasBarajadas = this.blend();
	var cartasBarajadasP1 = cartasBarajadas.slice(0, (cartasBarajadas.length) / 2);
	var cartasBarajadasP2 = cartasBarajadas.slice(3, (cartasBarajadas.length));

	this.player1 = new Player("Player 1", cartasBarajadasP1);
	this.player2 = new Player("Player 2", cartasBarajadasP2);

}

Game.prototype.getRandomSkill = function () {

	return (Object.keys(this.data[0]))[Math.floor(Math.random() * (7 - 2)) + 2]

}
Game.prototype.selectCards = function () {
	var game = this;
	$(".card").click(function () {
		game.shiftClick++;
		//console.log(game.shiftClick);
		$(".card1").css("display", "none")
		$(".name1").css("display", "none")
		if (game.shiftClick == 1) {
			$(".transicion").css("display", "block")
		}


		game.indexCard = $(this).index();

		
		game.cards.comparateCards();
	})
	$(".bsiguiente").click(function () {
		$(".transicion").css("display", "none")
		$(".card2").css("display", "block")
		$(".name2").css("display", "block")

	})
}

/*Game.prototype.comparateCards = function () {


	var selectCard1 = this.player1.cards[this.indexCard];
	var selectCard2 = this.player2.cards[this.indexCard];

	if (this.shiftClick == 1) {
		this.battlefield.push(selectCard1);
		this.indexCard = "";
		
	} else if (this.shiftClick == 2) {
		this.battlefield.push(selectCard2);
		this.indexCard = "";
		this.shiftClick = 0;
	}

	var winner1 = []
	var winner2 = []

	if (this.battlefield[0][this.randomPropierty] > this.battlefield[1][this.randomPropierty]){
		winner1.push(this.battlefield[0])
	}else if (this.battlefield[0][this.randomPropierty] > this.battlefield[1][this.randomPropierty]){
		winner2.push(this.battlefield[1])
	}
	
	if (winner1.length > winner2.length){
		console.log ("Un punto para el player 1")
	} else if (winner2.length > winner1.length){
		console.log ("Un punto para el player 2")
	}

	
}*/

Game.prototype.drawCards = function () {	
	this.cards.drawCards();
	this.randomPropierty = this.getRandomSkill();
	$("#skill-container").html(this.randomPropierty)
	console.log(this.randomPropierty)
}