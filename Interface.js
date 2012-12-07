var HUD = {
	items : [],
	init : function(){
		
		this.items.push(pauseScreen);
	},
	update : function(elapsedTime){
		for(i = 0; i < this.items.length; i++){
			this.items[i].update(elapsedTime);	//universal stats can be kept in HUD object
		}
	},
	draw : function(){
		for(i = 0; i < this.items.length; i++){
			this.items[i].draw();
		}
	}
};
var wander = {	//just a test item. Figure we don't have to instantiate items, so just using vars as is.
	x : 700,
	y : 300,
	update : function(elapsedTime){
		this.x += (Math.random() - 0.5)*10;
		this.y += (Math.random() - 0.5)*10;
	},
	draw : function(){  
		theContext.fillStyle = "#ffffff";
		theContext.fillRect(this.x, this.y, 50, 50); 
	}
};

var pauseScreen = {
	
	paused : false,
	
	update : function(elapsedTime){
		 	
	},
	
	draw: function(){
		if(this.paused){
			theContext.globalAlpha = 0.5;
			theContext.fillStyle = "#FFFFFF";
			theContext.font= Math.floor(theCanvas.height * 0.1) +"px Arial";
			var tempLineWidth = theContext.lineWidth;
		
			theContext.lineWidth = 2.5;
			theContext.textAlign="center"; 
			theContext.fillRect(0, 0, theCanvas.width, theCanvas.height);
			theContext.globalAlpha = 1;	
			theContext.fillStyle = "#FFFFFF";
			theContext.strokeStyle = "#000000";
			theContext.fillText("Paused, press Esc to resume",theCanvas.width/2,theCanvas.height/2);
			theContext.strokeText("Paused, press Esc to resume",theCanvas.width/2,theCanvas.height/2 );
			theContext.lineWidth =tempLineWidth;  			
		}
	
	}

}
