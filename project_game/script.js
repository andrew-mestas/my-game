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
var player2 = "Player2";
//UNCOMMENTvar player1 = prompt("Player 1 Name", "Ash");
//UNCOMMENTvar player2 = prompt("Player 2 Name", "Gary (computer for computer)");

// set up player names 
// later index will be for other characters


////////////////////////////// GAME DATA ///////////////////////////////////////////

	var game = [
		{
		"name" :  "",
		"ifHuman" : true,
		"hp" : 100,
		"hit"    : hit,
		1		 : "attack",
		2		 : "heal",
		3		 : "block",
		"getHit" : getHit,
		"canBeHit": true,
		"attack"  : 40,
		"type" : ""
		},
		{
		"name" :  "MCP",
		"ifHuman" : false,
		"hp" : 100,
		"hit"    : hit,
		1		 : "attack",
		2		 : "heal",
		3		 : "block",
		"getHit" : getHit,
		"canBeHit": true,
		"attack"  : 40,
		"type" : ""
		}
	]

function hit(choice){
		if(choice == 0)
		 var choice = Math.floor((Math.random()*3) +1);
		choice = choice;

		switch(choice)
		{
			case  1  :
			case "1" : 
					console.log(this["name"] + " used " + this[1]);
					return Math.floor(Math.random()*this["attack"]);
			break; 
			case  2  : 
			case "2" :
					var heal = Math.floor((Math.random()*(hp*0.25)));
					console.log(this["name"] + " healed " + heal);
					if((this["hp"] + heal) < 100)
						this["hp"] += heal;
					else
						this["hp"] += 2;
					return 0;
			break;
			case  3  : 
			case "3" :
					console.log(this["name"] + " used " + this[3]);
					this["canBeHit"] = !this["canBeHit"];
					// console.log(this["canBeHit"]);
					return 0;
			break;
		}

	}
function getHit(hitAmount){
	if(this["canBeHit"] == true){
	 console.log(this["name"] + " got hit with " + hitAmount + " damage");
	 this["hp"] -= hitAmount;
	}
	else{
	 console.log("blocked");
	 this["canBeHit"] = !this["canBeHit"];
	}
}

//////////////////////////////////////////////////////////////////////////////////	

////////////////////////////// BATTLE FUNCTION////////////////////////////////////
//	- Takes in both player names
//	- Returns winner
//////////////////////////////////////////////////////////////////////////////////


var battle = function(player1, player2){
	var gameOver = false;

	var player1Move = 1;
	var player2Move = 1;
	// Game Loop
	var message = "";

	for(var i = 0; !gameOver; i++){

		//UNCOMMENTif(i%2 ==0)
		//player1Move = prompt("Player1 Move", "1,2,3");
		//else
		//player2Move = prompt("Player2 Move", "1,2,3");
	

		if(player2 == "computer")
		game[(i+1)%2]["getHit"](game[i%2]["hit"]((i%2 ==0)?player1Move : 0));
		else
		game[(i+1)%2]["getHit"](game[i%2]["hit"]((i%2 ==0)?player1Move : player2Move));
		message = game[i%2]["name"].toString() + " hit " + game[(i+1)%2]["name"].toString();

		console.log(game[i%2]["name"] + " hit " + game[(i+1)%2]["name"]);
	    console.log("STATS: \n--------");
	    console.log(game[0]["name"] + " hp " + game[0]["hp"]);
	    console.log(game[1]["name"] + " hp " + game[1]["hp"]);
	    console.log("---------\n");

		
	    if(game[0]["hp"] <= 0 || game[1]["hp"] <= 0)
	     gameOver = !gameOver
	}
}



//////////////////////////////////////////////////////////////////////////////////
game[0]["name"] = player1;
game[1]["name"] = player2;

// UNCOMMENTbattle(player1,player2);
	// setInterval(function(){
	// var location = ($(".player")[0]);
	
	// },60);
var toggle = true;


$(document).ready(function(){
	$("p").hide();
	var pk = "pk";
	var num = 0;
	for(var i=0; i<$(".pkb").length;i++)
	{
		pk ="";
	    num = parseInt(i);
		pk = "#pk" + num.toString();
		console.log(pk)
		$(pk)[0].setAttribute("src", "http://vignette3.wikia.nocookie.net/clubpenguin/images/4/4c/Pokeball.png/revision/latest/scale-to-width-down/240?cb=20130901024704");
		$(pk)[0].setAttribute("width","40px");
	}


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
	$(".battleMode").toggleClass("on");
	$(".choice").toggleClass("choiceOn");
	if(toggle)
	$("p").show();
	else
	$("p").hide();
	toggle = !toggle;
	battle(player1,player2);
	});

	// if(toggle){
	// 	$(".choose").show();
	// 	$(".btn").show();
	// 	}
	// else{
	// 	$(".choose").hide();
	// 	$(".btn").hide();		
	// }	
	// toggle = !toggle;





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