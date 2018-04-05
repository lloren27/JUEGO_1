function Cards(game) {
    this.game = game;
    this.data = game.data;
    this.card1;
    this.card2;
}

Cards.prototype.comparateCards = function () {


    if (this.game.shiftClick == 1) {
         this.card1 = this.game.player1.cards[this.game.indexCard]
    } else if (this.game.shiftClick == 2) {
        this.card2 = this.game.player2.cards[this.game.indexCard]
        this.game.shiftClick=0;
        //console.log (this.game.shiftClick)
        if (this.card1[this.game.randomPropierty] > this.card2[this.game.randomPropierty]) {
            this.game.player1.points++;
            $(".partialResult").html("El punto es para el Player 1")
        } else if (this.card2[this.game.randomPropierty] > this.card1[this.game.randomPropierty]) {
            this.game.player2.points++;
           $(".partialResult").html("El punto es para el Player 2")
        }
        this.game.totalPoints++;
        console.log (this.game.totalPoints);
    }
};

Cards.prototype.drawCards = function () {
    /////////////////////////////////////personaje 1////////////////////////////////////////////////////

    var html = " "
    this.game.player1.cards.forEach(function (e) {

        html += '<div class = "card col-sm-4"><img data-player="' + e.name + '" src="' + e.img + '" /></div>'
    });

    $("#cards1-container").html(html)

    $("#name1-container").html(this.game.player1.name)
    ////////////////////////////////////personaje 2////////////////////////////////////////////////////

    var html = " "
    this.game.player2.cards.forEach(function (e) {

        html += '<div class = "card col-sm-4"><img data-player="' + e.name + '" src="' + e.img + '" /></div>'
    });

    $("#cards2-container").html(html)

    $("#name2-container").html(this.game.player2.name)

    $(".selected").css("display","none")
}

