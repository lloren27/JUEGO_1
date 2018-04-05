function Game(data) {

	this.data = data;
	this.cards = new Cards(this)
	this.indexCard;
	this.randomPropierty;
	this.shiftClick = 0;
	this.totalPoints = 0;

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
		game.draw();
		game.turnOfSkills();

		game.nextRound();

	})
	$(".brandom").click(function () {
		$(".random").css("display", "none")
		$(".luck").css("display", "block");
	})

	$(".bsorteo").click(function () {
		var numal = Math.floor(Math.random() * (3 - 1)) + 1;
		if (numal == 1) {
			$(".resultChance").val("CARA");
		} else {
			$(".resultChance").val("CRUZ");
		}
	})

	$(".bsiguiente2").click(function () {
		$(".luck").css("display", "none");
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
Game.prototype.drawRandom = function () {

	this.randomPropierty = this.getRandomSkill();
	$("#skill-container").html(this.randomPropierty)
}
Game.prototype.selectCards = function () {
	var game = this;
	$(".card").click(function () {
		game.shiftClick++;

		$(".card1").css("display", "none")
		$(".name1").css("display", "none")
		if (game.shiftClick == 1) {
			$(".transicion").css("display", "block")
		}


		game.indexCard = $(this).index();
		$(this).addClass("selected");

		game.cards.comparateCards();
	})
	$(".bsiguiente").click(function () {
		$(".transicion").css("display", "none")
		$(".card2").css("display", "block")
		$(".name2").css("display", "block")
		$(".bRonda2").css("display", "block")

	})
	$(".card2").click(function () {
		$(".card2").css("display", "none")
		$(".name2").css("display", "none")
		$(".partialResult").css("display", "block")
	})
}
Game.prototype.draw = function () {

	this.drawRandom();
	this.cards.drawCards();

}

Game.prototype.nextRound = function () {
	var game = this

	$(".bRonda2").click(function () {
		$(".card2").css("display", "none")
		$(".name2").css("display", "none")
		$(".bRonda2").css("display", "none")
		$(".partialResult").css("display", "none")
		$(".random").css("display", "block");

		game.getRandomSkill();
		game.drawRandom();


		$(".brandom").click(function () {
			$(".luck").css("display", "none");
			$(".name1").css("display", "block")
			$(".card1").css("display", "block")

		})
		$(".card").click(function () {

			if (game.shiftClick == 1) {
				$(".card1").css("display", "none")
				$(".name1").css("display", "none")
				$(".transicion").css("display", "block")
			}
		});
		$(".bsiguiente").click(function () {
			$(".transicion").css("display", "none")
			$(".card2").css("display", "block")
			$(".name2").css("display", "block")
			$(".bRonda2").css("display", "block")
		})
		$(".card").click(function () {
			$(".card2").css("display", "none")
			$(".name2").css("display", "none")
		})


		if (game.totalPoints >= 3) {
			game.finishGame();
			$(".card2").css("display", "none")
			$(".name2").css("display", "none")
			$(".bRonda2").css("display", "none")
			$(".transicion").css("display", "none")
			$(".random").css("display", "none");
			$(".final").css("display", "block")
			$(".video").get(0).play()

		}
	});
}
Game.prototype.finishGame = function () {

	if (this.player1.points > this.player2.points) {
		$(".finalScore").html("EL GANADOR ES EL PLAYER 1");
	} else if (this.player2.points > this.player1.points) {
		$(".finalScore").html("EL GANADOR ES EL PLAYER 2");
	}

}
