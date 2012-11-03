var GAME_W = 800;
var GAME_H = 600;
var GAME_FRAMERATE = 60;//fps, duh
var canvas;
var context2D;
function gameLoop()
{
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
	setInterval(gameLoop, 1000/GAME_FRAMERATE);
});