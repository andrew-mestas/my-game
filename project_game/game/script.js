////////////////////////////////////////////////////////////////////////////////////
//
// 		POKEyMON CLONE - ANDREW MESTAS _ (c) 2015
// 
// 
// 
// 
////////////////////////////////////////////////////////////////////////////////////



// if put in certain names load different players

var player1 = "player1";
var player2 = "computer";
var currentPokeMon = 1;
//UNCOMMENTvar player1 = prompt("Player 1 Name", "Ash");
//UNCOMMENTvar player2 = prompt("Player 2 Name", "Gary (computer for computer)");

// set up player names 
// later index will be for other characters


////////////////////////////// GAME DATA ///////////////////////////////////////////

	var game = [
		{
		"name" :  "Pikachu",
		"ifHuman" : true,
		"hp" : 35,
		"hit"    : hit,
		1		 : "Tail Whip",
		2		 : "Thunder Shock",
		3		 : "heal",
		4		 : "block",
		"getHit" : getHit,
		"canBeHit": true,
		"attack"  : 55,
		"type" : ""
		}//,
		// {
		// "name" :  "computer",
		// "ifHuman" : true,
		// "hp" : 100,
		// "hit"    : hit,
		// 1		 : "attack",
		// 2		 : "heal",
		// 3		 : "block",
		// "getHit" : getHit,
		// "canBeHit": true,
		// "attack"  : 40,
		// "type" : ""
		// }
		// {
		// "name" :  "Bulbasaur",
		// "ifHuman" : false,
		// "hp" : 45,
		// "hit"    : hit,
		// 1		 : "attack",
		// 2		 : "heal",
		// 3		 : "block",
		// "getHit" : getHit,
		// "canBeHit": true,
		// "attack"  : 49,
		// "type" : ""
		// },
		// {
		// "name" :  "Charmander",
		// "ifHuman" : false,
		// "hp" : 39,
		// "hit"    : hit,
		// 1		 : "attack",
		// 2		 : "heal",
		// 3		 : "block",
		// "getHit" : getHit,
		// "canBeHit": true,
		// "attack"  : 52,
		// "type" : ""
		// },
		// {
		// "name" :  "Squirtle",
		// "ifHuman" : false,
		// "hp" : 44,
		// "hit"    : hit,
		// 1		 : "attack",
		// 2		 : "heal",
		// 3		 : "block",
		// "getHit" : getHit,
		// "canBeHit": true,
		// "attack"  : 48,
		// "type" : ""
		// }
	]

	// If strategy move then change multiplier of enemy need to adjust battle hit 
	// equation

function hit(choicePlayer){
		var choice = choicePlayer;

		if(choicePlayer == 0)
		 choice = Math.floor((Math.random()*3) +1);

		switch(choice)
		{
			case  1  :
			case "1" : 
					console.log(this["name"] + " used " + this[1]);
					var message = (this["name"].toString() + " used " + this[1].toString());
					battleMessage += message + "\n";
					return Math.floor(Math.random()*this["attack"]);
			break; 
			case  2  : 
			case "2" :
					var heal = Math.floor((Math.random()*(this["hp"]*0.25)));
					console.log(this["name"] + " healed " + heal);
					battleMessage += this["name"] + " healed " + heal  + "\n";
					if((this["hp"] + heal) < 100)
						this["hp"] += heal;
					else
						this["hp"] += 2;
					return 0;
			break;
			case  3  : 
			case "3" :
					console.log(this["name"] + " used " + this[3]);
					battleMessage += (this["name"] + " used " + this[3])  + "\n";
					this["canBeHit"] = !this["canBeHit"];
					// console.log(this["canBeHit"]);
					return 0;
			break;
		}

	}
function getHit(hitAmount){
	if(this["canBeHit"] == true){
	 console.log(this["name"] + " got hit with " + hitAmount + " damage");
	 battleMessage += this["name"] + " got hit with " + hitAmount + " damage"  + "\n";
	 this["hp"] -= hitAmount;
	}
	else if(hitAmount == 0){
		console.log("nothing");
	}
	else{
	 console.log("blocked");
	 battleMessage += this["name"] + "blocked!!"  + "\n";
	 this["canBeHit"] = !this["canBeHit"];
	
	}
}


var getMoveFromRadio = function(p){

	return $("input[name=choice]:checked").val();
};

var moveChoice = function(choice){
	var picked = null;
	switch(choice){
		case  "attack" :
				picked = 1;
		break;
		case "heal" :
		 		picked = 2;
		break;
		case  "block" :
				picked = 3;
		break;
		default:
				picked = 1;
		break; 
	};
	return picked;
}
//////////////////////////////////////////////////////////////////////////////////	

////////////////////////////// BATTLE FUNCTION////////////////////////////////////
//	- Takes in both player names
//	- Returns winner
//////////////////////////////////////////////////////////////////////////////////

	var player1Move = null;
	var player2Move = null;
	var gameOver = false;
	var gameStateIndex = 0;
	var battleMessage = "";

var battle = function(player1, player2, playerChoice){


	// Game Loop EDIT: Not a loop anymore just a check if battle state over
	battleMessage = "";
	// for(var i = 0; !gameOver; i++){

// 		if(gameStateIndex%2 ==0)
// 		{
// 			player1Move = prompt("Player1 Move", "Attack, Heal, Block");
// 			player1Move = moveChoice(player1Move);
// 	    }
// //prompt("Player1 Move", "1,2,3");
// 		else if(player2 != "computer")
// 		{
// 			player2Move = prompt("Player1 Move", "Attack, Heal, Block");
// 			player2Move = moveChoice(player1Move);
// 		}
//prompt("Player2 Move", "1,2,3");

		if(player2 == "computer")
		game[(gameStateIndex+1)%2]["getHit"](game[gameStateIndex%2]["hit"]((gameStateIndex%2 ==0)?playerChoice : 0));
		else
		game[(gameStateIndex+1)%2]["getHit"](game[gameStateIndex%2]["hit"]((gameStateIndex%2 ==0)?playerChoice : playerChoice));
		//message = game[i%2]["name"].toString() + " hit " + game[(i+1)%2]["name"].toString();

		// console.log(game[i%2]["name"] + " hit " + game[(i+1)%2]["name"]);
	 //    console.log("STATS: \n--------");	 
	 //    console.log(game[0]["name"] + " hp " + game[0]["hp"]);	 
	 //    console.log(game[1]["name"] + " hp " + game[1]["hp"]);	 
	 //    console.log("---------\n");
	 //    var message = "\nSTATS: \n--------\n" + 
		// game[0]["name"] + " hp " + game[0]["hp"] + "\n" + game[1]["name"] + " hp " + game[1]["hp"] + 
	 // 	"\n" + "---------\n";
	 	//swal({title: message, timer: 2000});
	 	battleMessage +=  "\n";
	 	swal(battleMessage);
		
	    if(game[0]["hp"] <= 0 || game[1]["hp"] <= 0)
	     gameOver = !gameOver
	 gameStateIndex++;
	// }
}



//////////////////////////////////////////////////////////////////////////////////
game[0]["name"] = player1;
// game[1]["name"] = player2;

// UNCOMMENTbattle(player1,player2);
	// setInterval(function(){
	// var location = ($(".player")[0]);
	
	// },60);
var toggle = true;
var p1Hp = null;
var p2HP = null;

$(document).ready(function(){

	$("p").hide();
	var pk = "pk";
	var num = 0;
	for(var i=0; i<$(".pkb").length;i++)
	{
		pk ="";
	    num = parseInt(i);
		pk = "#pk" + num.toString();
		// console.log(pk)
		$(pk)[0].setAttribute("src", "http://vignette3.wikia.nocookie.net/clubpenguin/images/4/4c/Pokeball.png/revision/latest/scale-to-width-down/240?cb=20130901024704");
		$(pk)[0].setAttribute("width","40px");
	}
	var addObj = null;
	for(var i = 0; i < localStorage.length;i++)
	{
		addObj = JSON.parse(localStorage[i]);
		addObj["hit"] = hit;
		addObj["getHit"] = getHit;
		addObj["img"] = "../sprites/" + (parseInt(i)+1).toString();
		game.push(addObj);
	}
	p1Hp = game[0]["hp"];
	p2Hp = game[1]["hp"];
	console.log("p1: " + p1Hp + " \n " + "p2: " + p2Hp);
// console.log(pokeData[0]);

// Apply a on hover to the entire pokeball bar then delegate to children
// on ("click" "img")
// get id then set img url from pokedata array in home html
// swal({   title: "Sweet!",   text: "Here's a custom image.",   imageUrl: "images/thumbs-up.jpg" });
//
// To - Do get game data from pokemon api to load game
// work in input for battle system - drop down etc
// animation
// players
// menus
// outer world to walk - sprite sheet
//


///////////////////////////////////////////////////////////////////////
// 						Load Game Data 
//
///////////////////////////////////////////////////////////////////////

// console.log(pokeData);


///////////////////////////////////////////////////////////////////////
//  Test Battle
//
///////////////////////////////////////////////////////////////////////

	$(".battle").click(function(){
	// $(".battleMode").toggleClass("on");
	// $(".choice").toggleClass("choiceOn");
	// if(toggle)
	// $("p").show();
	// else
	// $("p").hide();
	// toggle = !toggle;
	// battle(player1,player2);
	});

var checkGameOver = function(){
	console.log(gameOver);
	var winner ="";
	if(gameOver)
	 $("#enterChoice").hide();

}
	$("#enterChoice").click(function(e){
		e.preventDefault();
		var playerChoice = moveChoice(getMoveFromRadio());
		console.log(moveChoice(getMoveFromRadio()));
		
		battle(player1,player2,playerChoice);
		var percent = (game[1]["hp"]/p2Hp)*100;
		console.log(percent);
		$(".pb2")[0].style.width = (percent).toString() + "%";

		setTimeout(function(){
		if(gameStateIndex % 2 == 1 && player2 == "computer" && gameOver != true)
		{
		playerChoice = 0;
		battle(player1,player2,playerChoice);
		percent = (game[0]["hp"]/p1Hp) * 100;
		$(".pb1")[0].style.width = percent.toString() + "%";
		console.log("hp" + game[0]["hp"]);
		};

		},4000);

		checkGameOver();
		if(gameOver)
		{

		if(game[0]["hp"] < 0){
		 $(".pb1")[0].style.width = "0%";
		  winner = game[1]["name"].toString() + " wins!";

		}
		else if(game[1]["hp"] < 0){
		 $(".pb2")[0].style.width = "0%";
		  winner = "You Win!";
		}
	if(gameOver)
		swal(winner);
	}


	});
console.log(game);
	
	// if(toggle){
	// 	$(".choose").show();
	// 	}
	// else{
	// 	$(".choose").hide();
	// 	$(".btn").hide();		
	// }	
	// toggle = !toggle;

// swal({   title: "An input!",   text: "Attack, Heal, Block",   type: "input",   showCancelButton: false,   closeOnConfirm: false,   animation: "slide-from-top",   inputPlaceholder: "Write something" }, function(inputValue){   if (inputValue === false) return false;      if (inputValue === "") {     swal.showInputError("You need to write something!");     return false   }      swal("You used: " + inputValue, ""); });
// console.log(input);

});




///////////////////////// COMPUTER VS COMPUTER///////////////////////////////
// for(var i = 0; !gameOver; i++)								
// {
// 	game[(i+1)%2]["getHit"](game[i%2]["hit"]());
// 	// console.log(game[i%2]["name"] + " hit " + game[(i+1)%2]["name"]);
//     console.log("STATS: \n--------");
//     console.log(game[0]["name"] + " hp " + game[0]["hp"]);
//     console.log(game[1]["name"] + " hp " + game[1]["hp"]);
//     console.log("---------\n");
//     if(game[0]["hp"] <= 0 || game[1]["hp"] <= 0)
//      gameOver = !gameOver
// }
//
// 	console.log(game[0]["name"] + " hp" + game[0]["hp"]);
//     console.log(game[1]["name"] + " hp" + game[1]["hp"]);
//
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////  MISC NOTES ///////////////////////////////////
// use playerCLickCount % 2 for each player
// var game = [p1,p2];
// game[1]["getHit"](game[0]["hit"]());
// console.log(game[1]["hp"]);
// var p1 = player("Andrew",true,100);
// p2["getHit"](p1["hit"]());
// console.log(p2["hp"]);
// class player{
// 	constructor(name, ifHuman = false, hp = 100){
// 		this.name = name;
// 		this.ifHuman = ifHuman;
// 		this.hp = 100;
// 	}
// 	hit(){
// 		return 4;
// 	}
// 	getHit(hitAmount){
// 		this.hp -= hitAmount;
// 	}
// 	whoAmI(){
// 		return this.name;
// 	}
// }
//
///////////////////////////////////////////////////////////////////////////////