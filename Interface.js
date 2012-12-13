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
			
			var dCI = function(img,x,y,scale){
				theContext.drawImage(img, x - img.width/2, y - img.height/2 , img.width * scale , img.height * scale);
			}
			
			theContext.globalAlpha = 0.5;
			theContext.fillStyle = "#FFFFFF";
			theContext.font= Math.floor(theCanvas.height * 0.1) +"px Arial";
			
			var tempLineWidth = theContext.lineWidth;
			var tempAlign = theContext.textAlign;
			var gutter = 10;
			var imageWidth = 72;
			var imageHeight = 72;	
			
			theContext.lineWidth = 2.5;
			theContext.textAlign="center"; 
			theContext.fillRect(0, 0, theCanvas.width, theCanvas.height);
			theContext.globalAlpha = 1;	
			theContext.fillStyle = "#FFFFFF";
			theContext.strokeStyle = "#000000";
			theContext.fillText("Paused, press Esc to resume",theCanvas.width/2,theCanvas.height/2-70);
			theContext.strokeText("Paused, press Esc to resume",theCanvas.width/2,theCanvas.height/2-70);
			
			//draw the letters for the powers
			theContext.fillText("Q",
				theCanvas.width/2 - imageWidth*2.5 - gutter*2,
				theCanvas.height/2 + imageHeight + theCanvas.height * 0.05);
			theContext.strokeText("Q",
				theCanvas.width/2 - imageWidth*2.5 - gutter*2,
				theCanvas.height/2 + imageHeight + theCanvas.height * 0.05);
			
			theContext.fillText("W",
				theCanvas.width/2 - imageWidth*1.5 - gutter,
				theCanvas.height/2 + imageHeight + theCanvas.height * 0.05);
			theContext.strokeText("W",
				theCanvas.width/2 - imageWidth*1.5 - gutter,
				theCanvas.height/2 + imageHeight + theCanvas.height * 0.05);
				
			theContext.fillText("E",
				theCanvas.width/2 - imageWidth/2,
				theCanvas.height/2 + imageHeight + theCanvas.height * 0.05);
			theContext.strokeText("E",
				theCanvas.width/2 - imageWidth/2,
				theCanvas.height/2 + imageHeight + theCanvas.height * 0.05);
			
			theContext.fillText("R",
				theCanvas.width/2 + imageWidth/2 + gutter,
				theCanvas.height/2 + imageHeight + theCanvas.height * 0.05);
			theContext.strokeText("R",
				theCanvas.width/2 + imageWidth/2 + gutter,
				theCanvas.height/2 + imageHeight + theCanvas.height * 0.05); 
				
			theContext.fillText("T",
				theCanvas.width/2 + imageWidth*1.5 + gutter*2,
				theCanvas.height/2 + imageHeight + theCanvas.height * 0.05);
			theContext.strokeText("T",
				theCanvas.width/2 + imageWidth*1.5 + gutter*2,
				theCanvas.height/2 + imageHeight + theCanvas.height * 0.05); 
				
			
			//draw icons
			theContext.lineWidth = 8;
			
			theContext.strokeStyle = "#000000";
			
			theContext.strokeRect(
				theCanvas.width/2 - imageWidth*3 - gutter*2.5, 
				theCanvas.height/2 - imageHeight/2-gutter/2, 
				imageWidth*5+gutter*5, 
				imageHeight+gutter );
			
			
			  
			theContext.fillRect(
				theCanvas.width/2 - imageWidth*3 - gutter*2.5, 
				theCanvas.height/2 - imageHeight/2-gutter/2, 
				imageWidth*5+gutter*5, 
				imageHeight+gutter );
					
			dCI (H_Icon, theCanvas.width/2 - imageWidth*2.5 - gutter*2, theCanvas.height/2, 1);
			dCI	(C_Icon, theCanvas.width/2 - imageWidth*1.5 - gutter, theCanvas.height/2, 1);	
		    dCI	(FS_Icon, theCanvas.width/2 - imageWidth/2, theCanvas.height/2, 1);	
		    dCI	(K_Icon, theCanvas.width/2 + imageWidth/2+gutter, theCanvas.height/2, 1);	
		    dCI	(S_Icon, theCanvas.width/2 + imageWidth*1.5 + gutter*2, theCanvas.height/2, 1);	
			
			theContext.lineWidth = tempLineWidth;
			theContext.textAlign= tempAlign; 			
		}
	
	}

}
