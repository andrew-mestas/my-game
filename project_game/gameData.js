var pokeData = [];
var index = 1;
var urlIndex = 1; 

var addPokemon = function(imgLink){
var newPoke = $("<div class=\"col-md-1 col-xs-1 col-s-1 col-lg-1\"><img id=\"" + index + "\"src=\"#\"></div>");
$(".row").append(newPoke);
$("#" + index.toString()).attr("src",imgLink);
index++;


}
var storeData = function(Data){
	pokeData.push("http://pokeapi.co" + Data.image.toString());
	addPokemon(pokeData[index-1]);
};

$(document).ready(function(){
	console.log("ready");

	function callAjax(){
		console.log("calling ajax");
		var web = "http://pokeapi.co/api/v1/sprite/" + urlIndex.toString();
		console.log("Ajax " + web);
	$.ajax(
			web,
		{
			method  : "GET",
			success : function(data,textStatus,something){
			storeData(data);
			urlIndex+=4;
			console.log(urlIndex);
			if(urlIndex >= 10){
 				clearInterval(stopMe);
 				window.open("game.html","_parent");
 			}
			}
		}
	);
	};

var stopMe = setInterval(callAjax,2000);

});