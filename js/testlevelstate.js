var TestLevelState = function(ctx, rsc, keys, levelName){
	this.context2D = ctx;
	this.resources = rsc;
	this.keystates = keys;
	this.debugPos = {x:0, y:0};
	this.cameraPos = {x:0, y:0};
	this.level = this.resources.levelMap[levelName];
}
TestLevelState.prototype = new State();
TestLevelState.prototype.run = function(){
	if(this.keystates.keyDown(KeyStateHandler.KeyCodes.E)){
		this.debugPos.y -= 15;
	}
	if(this.keystates.keyDown(KeyStateHandler.KeyCodes.S)){
		this.debugPos.x -= 15;
	}
	if(this.keystates.keyDown(KeyStateHandler.KeyCodes.D)){
		this.debugPos.y += 15;
	}
	if(this.keystates.keyDown(KeyStateHandler.KeyCodes.F)){
		this.debugPos.x += 15;
	}
	if(this.keystates.keyDown(KeyStateHandler.KeyCodes.UP_ARROW)){
		this.cameraPos.y -= 15;
	}
	if(this.keystates.keyDown(KeyStateHandler.KeyCodes.LEFT_ARROW)){
		this.cameraPos.x -= 15;
	}
	if(this.keystates.keyDown(KeyStateHandler.KeyCodes.DOWN_ARROW)){
		this.cameraPos.y += 15;
	}
	if(this.keystates.keyDown(KeyStateHandler.KeyCodes.RIGHT_ARROW)){
		this.cameraPos.x += 15;
	}
	return State.StateEnum.TESTLEVELSTATE;
}
TestLevelState.prototype.draw = function(){
	this.level.draw(this.context2D,this.cameraPos.x,this.cameraPos.y);
	//this.context2D.drawImage(this.level.tileset.image,0,0);
	/*
	for (var i = 0; i < 64; i++)
		this.level.tileset.drawImage(this.context2D,i,50+(i%8)*32,50+Math.floor(i/8)*32);
	*/
	this.context2D.drawImage(this.resources.imageMap['resources/A-metroid.jpg'],this.debugPos.x-this.cameraPos.x,this.debugPos.y-this.cameraPos.y,100,100);
}
