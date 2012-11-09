var ResourceHandler = function(){
	this.imageMap = {};
}
ResourceHandler.prototype.addImage = function(src){
	var image = new Image();
	this.imageMap[src] = image;
	$(image).load($.proxy(function(){this.imageMap[src].loadedFlag = true;}, this));
	image.src = src;
}
ResourceHandler.prototype.getLoadPercent = function(){
	var total = 0;
	var numLoaded = 0;
	for(var image in this.imageMap){
		if(typeof this.imageMap[image].loadedFlag != 'undefined'){
			numLoaded++;
		}
		total++;
	}
	if(total > 0){
		return numLoaded / total;
	}else{
		return 1.0;
	}
}