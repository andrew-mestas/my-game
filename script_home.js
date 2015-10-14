var battle = false;

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 400,
	height: 400
}


var myGame = new Kiwi.Game('content', 'myGame', null, gameOptions);
var myState = new Kiwi.State('myState');


myState.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addSpriteSheet( 'characterSprite', 'red.png', 32, 32);
    this.addJSON('tilemap','map.json');
	this.addSpriteSheet('tiles','tileset-wesley.png',16,16);

}

myState.create = function(){
	
 
    Kiwi.State.prototype.create.call( this );

    this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap( this, 'tilemap', this.textures.tiles );

    //this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.background, 0, 0 );
    this.character = new Kiwi.GameObjects.Sprite( this, this.textures.characterSprite, 150, 150 );
    this.leftKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.LEFT );
    this.rightKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.RIGHT );
    this.downKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.DOWN );
    this.upKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.UP );

    this.character.animation.add( 'idleright', [7], 0.1, false );
    this.character.animation.add( 'idleleft', [4], 0.1, false );
    this.character.animation.add( 'idleup', [10], 0.1, false );
    this.character.animation.add( 'idledown', [1], 0.1, false );
    this.character.animation.add( 'moveup', [9, 10, 11], 0.1, true );
    this.character.animation.add( 'moveright', [6, 7, 8], 0.1, true );
    this.character.animation.add( 'moveleft', [5, 4, 3], 0.1, true );
    this.character.animation.add( 'movedown', [0, 1, 2], 0.1, true );

    this.facing = 'idledown';

    this.character.animation.play( 'idledown' );

	this.addChild( this.tilemap.layers[0] );
   	this.addChild( this.tilemap.layers[1] );
    this.addChild( this.character );



   	this.character.scaleX = 0.6;
   	this.character.scaleY = 0.6;
    $("#1compositeCanvas")[0].style.height = "125%";
    $("#1compositeCanvas")[0].style.width = "125%"


};

myState.update = function(){
	Kiwi.State.prototype.update.call(this);
        if ( this.downKey.isDown ) {
        	this.facing = 'down';
        	if ( this.character.transform.y < 290 && checkTree(this))
                this.character.transform.y+=1;
            if ( this.character.animation.currentAnimation.name != ( 'move' + this.facing ))
                this.character.animation.play( 'move' + this.facing );
        }
        else if ( this.leftKey.isDown && checkFence(this)&& checkTree(this)) {
            this.facing = 'left';
            if ( this.character.transform.x >= 0 )
                this.character.transform.x-=1;
            if ( this.character.animation.currentAnimation.name != 'moveleft' )
                this.character.animation.play( 'moveleft' );
        }
        else if ( this.upKey.isDown && checkTree(this) && checkFence(this)) {
            this.facing = 'up';
            if ( this.character.transform.y > 3 )
                this.character.transform.y-=1;
            if ( this.character.animation.currentAnimation.name != 'moveup' )
                this.character.animation.play( 'moveup' );
        }
        else if ( this.rightKey.isDown && checkFence(this)) {
            this.facing = 'right';
            if ( this.character.transform.x < 290 )
                this.character.transform.x+=1;
            if ( this.character.animation.currentAnimation.name != 'moveright' )
                this.character.animation.play( 'moveright' );
        }
        else {
            if ( this.character.animation.currentAnimation.name != 'idle' + this.facing ){
                this.character.animation.play('idle' + this.facing);
             }
        }
         // console.log("coord: " + this.character.transform.x + " , " + this.character.transform.y);
        if( this.character.transform.x >= 98 && battle == false && this.character.transform.x <= 113 &&   this.character.transform.y <= 235 &&   this.character.transform.y >= 223)
        	{battle = !battle;
             $("#mainMusic")[0].pause();
        	 window.open("game.html","_parent");
        	}

};

	
    	


var checkTree= function(thisThing){

	if (thisThing.character.transform.x <=25)
		{
			console.log("hit a tree");
			return false;
    	}
    	// if(thisThing.character.transform.y >= 138 && thisThing.character.transform.x <=25)
    	// {
    	// 	console.log("hit a higher tree");
    	// }
    if(thisThing.character.transform.y <= 43 && thisThing.character.transform.x <=152)
    	{
    		console.log("hit a the top tree");
    		return false;
    	}
    	return true;
};


var checkFence = function(thisThing){
	if(thisThing.character.transform.y <130 && thisThing.character.transform.y >41 && thisThing.character.transform.x >=154 && thisThing.character.transform.x <=176)
		{
			console.log("hit a fence");
			return false;
		}
	if(thisThing.character.transform.y <=139 && thisThing.character.transform.y >=103 && thisThing.character.transform.x >177 && thisThing.character.transform.x < 266)
		{
			console.log("hit another fence");
			return false
		}
	return true;
};

myGame.states.addState( myState );


myGame.states.switchState("myState");

