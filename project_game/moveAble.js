// MOVE OBJECT DIAGONALLY
// Thank you Medda86 S.O.
$(document).ready(function(){

	var movementSpeed = 2;
	var intervalSpeed = 60;
	var runAnimation = false;
	var animationSpeed = 10;

	var leftMarginLimit = parseInt($('.player').parent().css('width')) - parseInt($('.player').css('width'));
	var topMarginLimit = parseInt($('.player').parent().css('height')) - parseInt($('.player').css('height'));
	var leftMargin = parseInt($('.player').css('margin-left'));
	var topMargin = parseInt($('.player').css('margin-top'));
	var animationComplete = true;

	// flags
	var left = false;
	var right = false;
	var up = false;
	var down = false;

	$(document).keyup(function(key) {

		if (key.which == 37){left = false;}
		if (key.which == 39){right = false;}
		if (key.which == 38){up = false;}
		if (key.which == 40){down = false;}
	});
	
	$(document).keydown(function(key) {

		if (key.which == 37){left = true;}
		if (key.which == 39){right = true;}
		if (key.which == 38){up = true;}
		if (key.which == 40){down = true;}
	});


	

	setInterval(runMovement,intervalSpeed);
	
	function runMovement() {

		if (animationComplete){

			// LEFT
			if (left){
				leftMargin -=movementSpeed;
				if (leftMargin < 0){leftMargin = 0;}
				if (leftMargin > leftMarginLimit){leftMargin = leftMarginLimit;}
			}
			
			// RIGHT
			if (right){
				leftMargin +=movementSpeed;
				if (leftMargin < 0){leftMargin = 0;}
				if (leftMargin > leftMarginLimit){leftMargin = leftMarginLimit;}
			}
			
			// UP
			if (up){
				topMargin -=movementSpeed;
				if (topMargin < 0){topMargin = 0;}
				if (topMargin > topMarginLimit){topMargin = topMarginLimit;}
			}
			
			// DOWN
			if (down){
				topMargin +=movementSpeed;
				if (topMargin < 0){topMargin = 0;}
				if (topMargin > topMarginLimit){topMargin = topMarginLimit;}
			}

				// ANIMATION?
				if (runAnimation){
					animationComplete = false;
					$('.player').animate({'margin-left': leftMargin+'px','margin-top': topMargin+'px'},animationSpeed,function(){
						animationComplete = true;
					});
				}
					else{
						$('.player').css({'margin-left': leftMargin+'px','margin-top': topMargin+'px'});
					}
					
		}
		//console.log($(".player")[0]);

	}

});
