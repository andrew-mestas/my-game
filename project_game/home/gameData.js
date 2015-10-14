var pokeData = [];
var index = 1;
var urlIndex = 1; 
var urlIndex2 = 1;
var localStoreIndex = 0;

var addPokemon = function(imgLink){
var newPoke = $("<div class=\"col-md-1 col-xs-1 col-s-1 col-lg-1\"><img id=\"" + index + "\"src=\"#\"></div>");
$(".row").append(newPoke);
$("#" + index.toString()).attr("src",imgLink);
index++;


}
var storeData = function(Data){
	pokeData.push("http://pokeapi.co" + Data.image.toString());
	//localStorage.setItem(index-1,pokeData[index-1]);
	addPokemon(pokeData[index-1]);
};

var storeCharacterData = function(data){
	var moves =[];
	for(var i=0; i<data.moves.length;i++){
	if(data.moves[i].level == 1)
	moves.push(data.moves[i].name);
	}
	var info = "{\"1\": \"" + moves[0] + "\",\"2\": \"" + moves[1]+ "\", \"3\":\"heal\",\"4\":\"block\",\"defense\":\"" + data.defense + "\",\"name\": \"" + data.name + "\",\"ifHuman\":false,\"hp\": \"" + data.hp + "\",\"canBeHit\":true,\"attack\": \"" + data.attack + "\",\"type\":\"\"}";	
	console.log(info);
	localStorage.setItem(localStoreIndex, info);
	localStoreIndex++;
};

$(document).ready(function(){
	localStorage.clear();

	if (typeof(Storage) !== "undefined") {
	}
	else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
	console.log("ready");

	function callAjax(){
		// console.log("calling ajax");
		var web = "http://pokeapi.co/api/v1/sprite/" + urlIndex.toString();
		console.log("Ajax " + urlIndex);
	$.ajax(
			web,
		{
			method  : "GET",
			success : function(data,textStatus,something){
			storeData(data);
			urlIndex +=4;
			// console.log(urlIndex);
			if(urlIndex >= 14){
 				clearInterval(stopMe);
 				window.open("/outside/index.html","_parent");
 			}
			}
		}
	);

	console.log("calling ajax");
		var web = "http://pokeapi.co/api/v1/pokemon/" + urlIndex2.toString();
		// console.log(urlIndex2);
	$.ajax(
			web,
		{
			method  : "GET",
			success : function(data,textStatus,something){
			// console.log(data);			
			urlIndex2+=3;
			storeCharacterData(data);
			// // console.log(urlIndex);
			// if(urlIndex >= 10){
 		// 		clearInterval(stopMe);
 				// window.open("../game/game.html","_parent");
 			// }
			}
		}
	);
	};


var stopMe = setInterval(callAjax,2000);

	// function callAjaxGetData(){
		
	// };

});