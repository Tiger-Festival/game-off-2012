/*
	REMEMBER: update the StateEnum when you add more states...
				And then update main.js so that the state gets loaded properly
*/
var State = function(ctx, rsc, keys){
	State.StateEnum = {
		TESTGAMESTATE : 0,
		NUM_GAME_STATES : 1
	};
	this.context2D = ctx;
	this.resources = rsc;
	this.keystates = keys;
}
State.prototype.run = function(){
	window.console.log("you're doing it wrong... gotta inherit bro");
}
State.prototype.draw = function(){
	window.console.log("you're doing it wrong... gotta inherit bro");
}