function Game(data) {
	
	this.indexCard;
	this.randomPropierty;

	
  this.data = data;
  
	this.start();
		
}

Game.prototype.start = function() {
	
	this.blend();
  this.generatePlayer();
  this.drawCards();
  this.turnOfSkills();
}

Game.prototype.turnOfSkills = function(){
	this.getRandomSkill();
	this.selectCards();
	
	
}

Game.prototype.blend = function(){
	
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

Game.prototype.generatePlayer = function(){
	
	
	var cartasBarajadas = this.blend();
	var cartasBarajadasP1 = cartasBarajadas.slice(0,(cartasBarajadas.length)/2);
	var cartasBarajadasP2 = cartasBarajadas.slice(3,(cartasBarajadas.length));

	this.player1 = new Player("Jose",cartasBarajadasP1);
	this.player2 = new Player("Pepe",cartasBarajadasP2);
	
}

Game.prototype.getRandomSkill = function(){

	this.randomPropierty = (Object.keys(this.data[0]))[Math.floor(Math.random()* (7 - 2)) + 2]
	
}
Game.prototype.selectCards = function(){
var game = this;
	$(".card").click(function(){
		 

		 game.indexCard = $(this).index();
			 
			 console.log(game.indexCard)
		 game.comparateCards();
	})
}

Game.prototype.comparateCards = function (){
	
	var battlefield = []
	this.indexCard="";
	battlefield.push(this.player1.cards[this.indexCard]);
/*
	var carts2 = (this.player2.cards)
	var SelectCard2 =  (this.player2.cards[this.indexCard])
	battlefield.push(SelectCard2);
	
	var winner1 = []
	var winner2 = []
	
	

	if (SelectCard1[this.randomPropierty] > SelectCard2[this.randomPropierty]){
		winner1.push(SelectCard1)
	}else if (SelectCard2[this.randomPropierty] > SelectCard1[this.randomPropierty]){
		winner2.push(SelectCard2)
	}
	*/
}

Game.prototype.drawCards = function(){

	/////////////////////////////////////personaje 1////////////////////////////////////////////////////

	var html = " "
	this.player1.cards.forEach(function(e){
		
		html+='<div class = "card col-sm-4"><img data-player="'+e.name+'" src="'+e.img+'" /></div>'
	});
	
	$("#cards1-container").html(html)

	$("#name1-container").html(this.player1.name)
	////////////////////////////////////personaje 2////////////////////////////////////////////////////

	var html = " "
	this.player2.cards.forEach(function(e){
		
		html+='<div class = "card col-sm-4"><img data-player="'+e.name+'" src="'+e.img+'" /></div>'
	});
	
	$("#cards2-container").html(html)

	$("#name2-container").html(this.player2.name)
}