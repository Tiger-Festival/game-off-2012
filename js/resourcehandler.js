var ResourceHandler = function(){
	this.imageMap = {};
	this.tilesetMap = {};
	this.levelMap = {};
	this.errorCount = 0;
	this.resourcePath = "resources/";
	this.tilesetPath = "resources/tilesets/";
	this.levelPath = "resources/levels/";
}
ResourceHandler.prototype.addImage = function(src){
	var image = new Image();
	this.imageMap[src] = image;
	$(image).load($.proxy(function(){this.imageMap[src].loadedFlag = true;}, this));
	image.src = src;
}
ResourceHandler.prototype.loadTilesets = function(){
	var request = new XMLHttpRequest();
	//request.crossOrigin = "anonymous";
	request.open("GET", "resources/tilesets/tilesets.json", false); //synchronous
    request.send();
    var tilesetQueue = eval(request.responseText);
    
    var that = this;
    for (var i = 0; i < tilesetQueue.length; i++)
    {
        var path = that.tilesetPath + tilesetQueue[i];
        var tilesetName = (tilesetQueue[i].split("\."))[0];
        that.tilesetMap[tilesetName] = new TileSet();	
        request = new XMLHttpRequest();
        request.open("GET",path,true); //asynchronous
        request.path = path;
        request.onerror = function()
        {
            console.log(this);
			that.errorCount++;
		};
        request.onload = function()
        {
            console.log("Retrieved tileset JSON file "+this.path);
			var tilesetData = eval(request.responseText);
            
            if (tilesetData.length != 4)
            {
                console.log("Received bad tileset format from server for file "+this.path);
			    that.errorCount++;
                return;
            }
            
            var imagePath = that.tilesetPath+tilesetData[0];
            var imageData = that.imageMap[imagePath];
            if (typeof imageData == 'undefined')	//TODO: test this thorougly!
            {
            	that.addImage(imagePath);
            	imageData = that.imageMap[imagePath];
            }
            
			that.tilesetMap[tilesetName].initialize(imageData,tilesetData[1],tilesetData[2],tilesetData[3]);

            console.log("Created tileset "+tilesetName+"!");
        };
        request.send();
    }   
}
ResourceHandler.prototype.loadLevels = function(){
	var request = new XMLHttpRequest();
	//request.crossOrigin = "anonymous";
	request.open("GET", "resources/levels/levels.json", false); //synchronous
    request.send();
    var levelQueue = eval(request.responseText);
    
    var that = this;
    for (var i = 0; i < levelQueue.length; i++)
    {
        var path = that.levelPath + levelQueue[i];
        var levelName = (levelQueue[i].split("\."))[0];
        that.levelMap[levelName] = new Level();
        request = new XMLHttpRequest();
        request.open("GET",path,true); //asynchronous
        request.path = path;
        request.onerror = function()
        {
            console.log(this);
			that.errorCount++;
		};
        request.onload = function()
        {
            console.log("Retrieved level file "+this.path);
			var levelText = request.responseText.split('*');
			var levelHeaders = levelText[0].split('\n');
            
            if (levelText.length != 4 || levelHeaders.length != 4)
            {
                console.log("Received bad level format from server for file "+this.path);
                console.log(levelText.length+" sections (should be 4) and "+levelHeaders.length+" headers (should be 4)");
			    that.errorCount++;
                return;
            }
            
            //this has to be bad idiomatically; isn't eval evil?  Also how to error checking this?
            var state = eval("State.StateEnum."+levelHeaders[0]);
            var tileset = that.tilesetMap[levelHeaders[1]];
            var dimensions = levelHeaders[2].split(" ");
            var width = parseInt(dimensions[0]);
            var height = parseInt(dimensions[1]);
            
			that.levelMap[levelName].initialize(levelName,state,tileset,width,height,levelText[1],levelText[2],levelText[3]);

            console.log("Created level "+levelName+"!");
        };
        request.send();
    } 

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
	for(var tileset in this.tilesetMap){
		if(typeof this.tilesetMap[tileset].loadedFlag != 'undefined'){
			numLoaded++;
		}
		total++;
	}
	for(var level in this.levelMap){
		if(typeof this.levelMap[level].loadedFlag != 'undefined'){
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
