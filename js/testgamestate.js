var TestGameState = function(ctx, rsc, keys){
	this.context2D = ctx;
	this.resources = rsc;
	this.keystates = keys;
	this.debugPos = {x:0, y:0};
}
TestGameState.prototype = new State();
TestGameState.prototype.run = function(){
	if(this.keystates.keyDown(KeyStateHandler.KeyCodes.E)){
		this.debugPos.y -= 5;
	}
	if(this.keystates.keyDown(KeyStateHandler.KeyCodes.S)){
		this.debugPos.x -= 5;
	}
	if(this.keystates.keyDown(KeyStateHandler.KeyCodes.D)){
		this.debugPos.y += 5;
	}
	if(this.keystates.keyDown(KeyStateHandler.KeyCodes.F)){
		this.debugPos.x += 5;
	}
	return State.StateEnum.TESTGAMESTATE;
}
TestGameState.prototype.draw = function(){
	this.context2D.drawImage(this.resources.imageMap['resources/A-metroid.jpg'],this.debugPos.x,this.debugPos.y,100,100);
}