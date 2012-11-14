var TileSet = function(){
	
}
TileSet.prototype.initialize = function(image, numTiles, w, h){
	this.image = image;
	this.numTiles = numTiles;
	this.w = w;
	this.h = h;
	this.tilesPerRow = Math.floor(image.width / this.w);
	this.loadedFlag = true;
}
TileSet.prototype.drawImage = function(canvas,tileNum,x,y){
	var sx = (tileNum % this.tilesPerRow) * this.w;
	var sy = Math.floor(tileNum / this.tilesPerRow) * this.h;
	canvas.drawImage(this.image,sx,sy,this.w,this.h,x,y,this.w,this.h);
}
