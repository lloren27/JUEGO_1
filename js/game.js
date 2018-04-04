function Game(data) {

	this.indexCard;
	this.randomPropierty;
	this.shiftClick = 0;
	this.data = data;
	this.battlefield = [];

	this.start();

}

Game.prototype.start = function () {
var game = this;	
	$(".btn-start").click(function () {
		$(".start").css("display", "none")
		$(".random").css("display", "block")
		game.blend();
		game.generatePlayer();
		game.drawCards();
		game.turnOfSkills();
	})
	$(".btn-random").click(function(){
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
		let array = data.slice();
		while (array.length !== 0) {
			let rIndex = Math.floor(array.length * Math.random());
			randomizedDeck.push(array[rIndex]);
			array.splice(rIndex, 1)
		}
		return randomizedDeck;
	};
	return (shuffle(data));
}

Game.prototype.generatePlayer = function () {


	var cartasBarajadas = this.blend();
	var cartasBarajadasP1 = cartasBarajadas.slice(0, (cartasBarajadas.length) / 2);
	var cartasBarajadasP2 = cartasBarajadas.slice(3, (cartasBarajadas.length));

	this.player1 = new Player("Jose", cartasBarajadasP1);
	this.player2 = new Player("Pepe", cartasBarajadasP2);

}

Game.prototype.getRandomSkill = function () {

	return (Object.keys(this.data[0]))[Math.floor(Math.random() * (7 - 2)) + 2]
	
}
Game.prototype.selectCards = function () {
	var game = this;
	$(".card").click(function () {
		game.shiftClick++;
		console.log(game.shiftClick);
		$(".card1").css("display", "none")

		$(".name1").css("display", "none")
		$(".transicion").css("display", "block")

		game.indexCard = $(this).index();

		//console.log(game.indexCard)
		game.comparateCards();
	})
	$(".btn-siguiente").click(function () {
		$(".transicion").css("display", "none")
		$(".card2").css("display", "block")
		$(".name2").css("display", "block")

	})
}

Game.prototype.comparateCards = function () {

		if (this.shiftClick == 1) {
			this.battlefield.push(this.player1.cards[this.indexCard]);
			
			//this.indexCard = "";
			//console.log (battlefield)
		} else if (this.shiftClick == 2) {
			this.battlefield.push(this.player2.cards[this.indexCard]);
			//this.indexCard = "";
			this.shiftClick = 0;
			//	console.log (battlefield)
		
	}

	console.log(this.battlefield)
	/*	
		var winner1 = []
		var winner2 = []
		
		
	
		if (SelectCard1[this.randomPropierty] > SelectCard2[this.randomPropierty]){
			winner1.push(SelectCard1)
		}else if (SelectCard2[this.randomPropierty] > SelectCard1[this.randomPropierty]){
			winner2.push(SelectCard2)
		}
		*/
}

Game.prototype.drawCards = function () {
	/////////////////////////////////////personaje 1////////////////////////////////////////////////////

	var html = " "
	this.player1.cards.forEach(function (e) {

		html += '<div class = "card col-sm-4"><img data-player="' + e.name + '" src="' + e.img + '" /></div>'
	});

	$("#cards1-container").html(html)

	$("#name1-container").html(this.player1.name)
	////////////////////////////////////personaje 2////////////////////////////////////////////////////

	var html = " "
	this.player2.cards.forEach(function (e) {

		html += '<div class = "card col-sm-4"><img data-player="' + e.name + '" src="' + e.img + '" /></div>'
	});

	$("#cards2-container").html(html)

	$("#name2-container").html(this.player2.name)
	
	this.randomPropierty = this.getRandomSkill ();
	//$("#random-container").html(this.randomPropierty)
	console.log(this.randomPropierty)
}