var GAME_W = 800;
var GAME_H = 600;
var GAME_FRAMERATE = 60;//fps, duh
var canvas;
var context2D;
var keystate;
function gameLoop()
{
	keystate.updateKeys();
	if(keystate.keyNewPress(KeyStateHandler.KeyCodes.A)){
		window.console.log("NEW PRESSED A!");
	}
	if(keystate.keyNewRelease(KeyStateHandler.KeyCodes.A)){
		window.console.log("NEW RELEASED A!");
	}
	if(keystate.keyDown(KeyStateHandler.KeyCodes.A)){
		window.console.log("PRESSED A!");
	}
	if(keystate.keyUp(KeyStateHandler.KeyCodes.A)){
		window.console.log("RELEASED A!");
	}
}
function scaleCanvas()
{
	scaleFactor = Math.min(window.innerWidth/GAME_W, window.innerHeight/GAME_H);
	canvas.width = GAME_W*scaleFactor;
	$(canvas).css({"position":"fixed", "left":((window.innerWidth - canvas.width)/2)+"px"});
	canvas.height = GAME_H*scaleFactor;
	context2D = canvas.getContext('2d');
}
$(document).ready(function() {
	canvas = document.getElementById("gameCanvas");
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
	setInterval(gameLoop, 1000/GAME_FRAMERATE);
});