////////////////////////////////////////////////////////////////////////////////////
//
// 		POKEyMON CLONE - ANDREW MESTAS _ (c) 2015
// 
// 
////////////////////////////////////////////////////////////////////////////////////


var player1       = "player1";
var player2       = "computer";
var currentPokeMon= 1;
var times         = 0;
var randomFighter = null;

//UNCOMMENTvar player1 = prompt("Player 1 Name", "Ash");
//UNCOMMENTvar player2 = prompt("Player 2 Name", "Gary (computer for computer)");

////////////////////////////// GAME DATA ///////////////////////////////////////////

var game = [
	{
	"name"    :  "Pikachu",
	"ifHuman" : true,
	"hp"      : 35,
	"hit"     : hit,
	1         : "Tail Whip",
	2         : "Thunder Shock",
	3         : "heal",
	4         : "block",
	"getHit"  : getHit,
	"canBeHit": true,
	"attack"  : 55,
	"defense" : 40,
	"type"    : ""
	}
]

function hit(choicePlayer, playerId) {
    var choice = choicePlayer;

    if (choicePlayer == 0)
        choice = Math.floor((Math.random() * 4) + 1);

    switch (choice) {

        case 1:
        case "1":
            //console.log(this["name"] + " used " + this[choice]); UNCOMMENT
            var message = (this["name"].toString() + " used " + this[choice].toString());
            var defenseLow = ("Enemy defense has been lowered by 8");
            var affect = null;
            battleMessage += message + "\n" + defenseLow + "\n";
            playerId == "p" ? affect = randomFighter : affect = 0;
            game[affect]["defense"] < 8 ? game[affect]["defense"] = 2 : game[affect]["defense"] -= 8;
            return 0;
            break;
        case 2:
        case "2":
            //console.log(this["name"] + " used " + this[choice]); UNCOMMENT
            var message = (this["name"].toString() + " used " + this[choice].toString());
            battleMessage += message + "\n";
            var affect = null;
            var def = null;
            playerId == "p" ? affect = randomFighter : affect = 0;
            playerId == "p" ? def = 0 : def = randomFighter;
            var hitPoint = Math.floor(Math.random() * game[def]["attack"] + 1);
            var percentage = game[affect]["defense"] / 100;
            return Math.floor(hitPoint * percentage);
            break;
        case 3:
        case "3":
            var heal = Math.floor((Math.random() * (this["hp"] * 0.50)) + 1);
            //console.log(this["name"] + " healed " + heal); UNCOMMENT
            battleMessage += this["name"] + " healed " + heal + "\n";
            //console.log(this["name"] + " will heal" + heal); UNCOMMENT
            if ((parseInt(this["hp"]) + heal) < p2Hp)
                this["hp"] = parseInt(this["hp"]) + heal;
            else
                this["hp"] = parseInt(this["hp"]) + 0;

            //console.log(this["name"] + "  hp: " + this["hp"]); UNCOMMENT
            return 0;
            break;
        case 4:
        case "4":
            //console.log(this["name"] + " used " + this[4]); UNCOMMENT
            battleMessage += (this["name"] + " used " + this[4]) + "\n";
            this["canBeHit"] = !this["canBeHit"];
            return 0;
            break;
        default:
            return 0;
    }

}


function getHit(hitAmount) {

    if (this["canBeHit"] == true && hitAmount != 0) {
        //console.log(this["name"] + " got hit with " + hitAmount + " damage"); UNCOMMENT
        battleMessage += this["name"] + " got hit with " + hitAmount + " damage" + "\n";
        this["hp"] -= hitAmount;
    } else if (hitAmount == 0) {
        //console.log("nothing"); UNCOMMENT
    } else {
        //console.log("blocked"); UNCOMMENT
        battleMessage += this["name"] + " blocked!!" + "\n";
        this["canBeHit"] = !this["canBeHit"];

    }
}

function checkGameOver() {

    if (game[0]["hp"] <= 0 || game[randomFighter]["hp"] <= 0 && times < 1) {
        gameOver = !gameOver;
        times++;
    }
    //console.log(gameOver); UNCOMMENT

    if (gameOver)
        $("#enterChoice").hide();

}

var getMoveFromRadio = function() {
	return $("input[name=choice]:checked").val();
};


////////////////////////////// BATTLE FUNCTION////////////////////////////////////
//	
//	
//////////////////////////////////////////////////////////////////////////////////

var player1Move   = null;
var player2Move   = null;
var gameOver      = false;
var gameStateIndex= 0;
var battleMessage = "";
var toggle        = true;
var p1Hp          = null;
var p2HP          = null;
var winner        = "";

var battle = function(player1, player2, playerChoice) {

    battleMessage = "";

    if (player2 == "computer")
        (gameStateIndex % 2 == 0) ? game[randomFighter]["getHit"](game[0]["hit"](playerChoice, "p")) : game[0]["getHit"](game[randomFighter]["hit"](0, "c"));
    else
        (gameStateIndex % 2 == 0) ? game[randomFighter]["getHit"](game[0]["hit"](playerChoice), "p") : game[0]["getHit"](game[randomFighter]["hit"](0, "c"));

    battleMessage += "\n";
    swal(battleMessage);
    gameStateIndex++;

}

///////////////////////////////////////////////////////////////////////
// 						Load Game Data 
//
///////////////////////////////////////////////////////////////////////


$(document).ready(function() {


    $("p").hide();
    var pk = "pk";
    var num = 0;
    for (var i = 0; i < $(".pkb").length; i++) {
        pk = "";
        num = parseInt(i);
        pk = "#pk" + num.toString();
        // //console.log(pk) UNCOMMENT
        $(pk)[0].setAttribute("src", "http://vignette3.wikia.nocookie.net/clubpenguin/images/4/4c/Pokeball.png/revision/latest/scale-to-width-down/240?cb=20130901024704");
        $(pk)[0].setAttribute("width", "40px");
    }
    var addObj = null;
    for (var i = 0; i < localStorage.length; i++) {
        addObj = JSON.parse(localStorage[i]);
        addObj["hit"] = hit;
        addObj["getHit"] = getHit;
        addObj["img"] = "/sprites/" + (parseInt(i) + 1).toString() + ".png"; //CHANGED
        game.push(addObj);
    }
    randomFighter = Math.floor((Math.random()) * game.length);
    randomFighter == 0 ? randomFighter += 1 : randomFighter = randomFighter;
    p1Hp = game[0]["hp"];
    p2Hp = game[randomFighter]["hp"];
    //console.log("p1: " + p1Hp + " \n " + "p2: " + p2Hp); UNCOMMENT

    $("#enemy").attr("src", game[randomFighter]["img"]);
    //console.log(game[randomFighter]); UNCOMMENT

    for (var i = 1; i <= $("input[type=radio]").length; i++)
        $("label[for=" + i.toString() + "r]").html(game[0][i]);


	$("#enterChoice").click(function(e) {
	    e.preventDefault();

	    //console.log("\n\nDATA\n\n----\n" + game[0]["name"] + " hp: " + game[0]["hp"] + UNCOMMENT
	    //    "\n" + game[0]["name"] + " df: " + game[0]["defense"] +
	    //    "\n" + game[randomFighter]["name"] + " hp: " + game[randomFighter]["hp"] +
	      //  "\n" + game[randomFighter]["name"] + " df: " + game[randomFighter]["defense"]);

	    var playerChoice = (getMoveFromRadio());
	    //console.log(getMoveFromRadio()); UNCOMMENT

	    battle(player1, player2, playerChoice);
	    var percent = (game[randomFighter]["hp"] / p2Hp) * 100;
	    //console.log(percent); UNCOMMENT
	    $(".pb2")[0].style.width = (percent).toString() + "%";

	    setTimeout(function() {
	        if (gameStateIndex % 2 == 1 && player2 == "computer" && gameOver != true) {
	            playerChoice = 0;
	            battle(player1, player2, playerChoice);
	            percent = (game[0]["hp"] / p1Hp) * 100;
	            $(".pb1")[0].style.width = percent.toString() + "%";
	            //console.log("hp" + game[0]["hp"]); UNCOMMENT
	        };

	    }, 4000);

	    checkGameOver();
	    if (gameOver) {

	        if (game[0]["hp"] < 0) {
	            $(".pb1")[0].style.width = "0%";
	            winner = game[randomFighter]["name"].toString() + " wins!";

	        } else if (game[randomFighter]["hp"] < 0) {
	            $(".pb2")[0].style.width = "0%";
	            winner = "You Win!";
	        }
	        if (gameOver)
	            swal(winner);
	        setTimeout(function(){window.open("index_outside.html", "_parent");},4000); //CHANGED
	    }
	});

});
