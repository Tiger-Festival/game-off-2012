var GAME_W = 800;
var GAME_H = 600;
var GAME_FRAMERATE = 60;//fps, duh
var FPS_UPDATE_RATE = 25;//1 = instant, higher # = slower rate
var canvas;
var context2D;
var scaleFactor = 1;
var lblFPS;
var fps = GAME_FRAMERATE, currTime, prevTime;
var keystate;
var resources;
var states = [];
var currState;
function gameLoop()
{
	if(resources.getLoadPercent() < 1.0){
		return;
	}
	currTime = new Date;
	if(currTime != prevTime){
		var thisFrameFPS = 1000 / (currTime - prevTime);
		fps += (thisFrameFPS - fps) / FPS_UPDATE_RATE;
		prevTime = currTime;
		lblFPS.innerHTML = "FPS: "+fps.toFixed(1);
	}
	keystate.updateKeys();
	//RUN STATE HERE//
	var runVal = states[currState].run();
	context2D.save();
	context2D.scale(scaleFactor,scaleFactor);
	context2D.fillStyle = '#00ff00';
	context2D.fillRect(0,0,GAME_W,GAME_H);
	//DRAW STATE HERE//
	states[currState].draw();
	context2D.restore();
	if(runVal != currState){
		//TODO: update this switch statement when you make additional states
		switch(runVal){
			case State.StateEnum.TESTGAMESTATE:
				states[runVal] = new TestGameState(context2D, resources, keystate);
				break;
		}
		currState = runVal;
	}
}
function scaleCanvas()
{
	scaleFactor = Math.min(window.innerWidth/GAME_W, window.innerHeight/GAME_H);
	canvas.width = GAME_W*scaleFactor;
	$(canvas).css({"position":"fixed", "left":((window.innerWidth - canvas.width)/2)+"px"});
	$(lblFPS).css({"position":"fixed", "left":((window.innerWidth - canvas.width)/2)+"px"});
	canvas.height = GAME_H*scaleFactor;
	context2D = canvas.getContext('2d');
	context2D.GAME_W = GAME_W;
	context2D.GAME_H = GAME_H;
}
$(document).ready(function() {
	currTime = prevTime = new Date;
	resources = new ResourceHandler();
	resources.addImage('resources/A-metroid.jpg');
	canvas = document.getElementById("gameCanvas");
	canvas.width = GAME_W;
	canvas.height = GAME_H;
	lblFPS = document.getElementById("lblFPS");
	scaleCanvas();
	$(window).resize(function() {
		scaleCanvas();
	});
	keystate = new KeyStateHandler();
	$(window).keydown(function(event){
		keystate.registerKeyState((event.which) ? event.which : event.keyCode, true);
	});
	$(window).keyup(function(event){
		keystate.registerKeyState((event.which) ? event.which : event.keyCode, false);
	});
	//TODO: change this when a new starting state is made
	currState = State.StateEnum.TESTGAMESTATE;
	states[currState] = new TestGameState(context2D, resources, keystate);
	setInterval(gameLoop, 1000/GAME_FRAMERATE);
});