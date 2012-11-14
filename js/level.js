//Level format:
//Oh, should we have a background color option?
//the * are section delimiters; do not use a * to represent anything else
/*
statename
tilesetname
width height
*
tiletiletile
tiletiletile
tiletiletile
*
object information (JSON)
*
linking information
*/
/*
Tiles are one character each.  Character values (in ascending order from 0):
 0123456
789ABCDE
FGHIJKLM
NOPQRSTU
VWXYZabc
defghijk
lmnopqrs
tuvwxyz.
so E represents tile 15 and . represents tile 63.  
This system gives a maximum of 64 distinct tiles in a tileset
which I hope is fine for our purposes.
I recommend using a space to represent "no tile" so that looking at your level in a text editor is more fun.
When we figure out collision detection we'll figure out how to specify tile behaviors.
*/
/*
Object and link formats have not yet been nailed down.
*/
var Level = function() {

}
Level.prototype.initialize = function(srcName, state, tileset, w, h, rawTiles, objects, links){
	this.src = srcName;		//level's name (for linking levels later) (speeds things up in the case where you link to yourself)
		
	this.state = state;		//integer value for StateEnum
	console.log(state);
	this.tileset = tileset;	//actual TileSet object

	this.tilew = tileset.w;
	this.tileh = tileset.h;
	this.w = w;
	this.h = h;
	
	this.screenWidthInTiles = GAME_W / this.tilew + 1;
	this.screenHeightInTiles = GAME_H / this.tileh + 1;

	this.build(rawTiles);
	
	//TODO: Incorporate objects and links somehow here.

	this.loadedFlag = true;
}
Level.prototype.build = function(rawTiles){
	this.tiles = new Array(this.h);

	var lines = rawTiles.split("\n");	//first is blank (line with *)
	for (var row = 0; row < this.h; row++) {
		this.tiles[row] = lines[row+1].split("").map(tileFromAsc);
	}
}
tileFromAsc = function(character){
	var asc = character.charCodeAt(0);
	if (asc == 32)				{	return 0;			}
	if (asc > 47 && asc < 58)	{	return asc - 47;	}
	if (asc > 64 && asc < 91)	{	return asc - 54;	}
	if (asc > 96 && asc < 123)	{	return asc - 60;	}
	if (asc == 46)				{	return 63;			}
	return -1	
}
Level.prototype.draw = function(canvas,cameraX,cameraY){
	var startY = Math.floor(cameraY / this.tileh);
	var startX = Math.floor(cameraX / this.tilew);

	for (var row = Math.max(startY,0); row < startY+this.screenHeightInTiles && row < this.h; row++){
		for (var col = Math.max(startX,0); col < startX+this.screenWidthInTiles && col < this.w; col++){
			this.tileset.drawImage(canvas,this.tiles[row][col],
									col*this.tilew-cameraX,
									row*this.tileh-cameraY);
		}
	}
}
