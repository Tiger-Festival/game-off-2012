var GAME_W = 800;
var GAME_H = 600;
var GAME_FRAMERATE = 60;//fps, duh
var canvas;
var context2D;
var keystate;
var resources;
var debugPos = {x:0, y:0};
function gameLoop()
{
	if(resources.getLoadPercent() < 1.0){
		return;
	}
	keystate.updateKeys();
	context2D.rect(0,0,$(canvas).innerWidth(),$(canvas).innerHeight());
	context2D.fillStyle = '#00ff00';
	context2D.fill();
	if(keystate.keyDown(KeyStateHandler.KeyCodes.E)){
		debugPos.y -= 5;
	}
	if(keystate.keyDown(KeyStateHandler.KeyCodes.S)){
		debugPos.x -= 5;
	}
	if(keystate.keyDown(KeyStateHandler.KeyCodes.D)){
		debugPos.y += 5;
	}
	if(keystate.keyDown(KeyStateHandler.KeyCodes.F)){
		debugPos.x += 5;
	}
	context2D.drawImage(resources.imageMap['resources/A-metroid.jpg'],debugPos.x, debugPos.y,100,100);
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
	resources = new ResourceHandler();
	resources.addImage('resources/A-metroid.jpg');
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