/*========================================================================
  ____                     _____       _   _ _   _              _     
 |  _ \ _ __ __ ___      _| ____|_ __ | |_(_) |_(_) ___  ___   (_)___ 
 | | | | '__/ _` \ \ /\ / /  _| | '_ \| __| | __| |/ _ \/ __|  | / __|
 | |_| | | | (_| |\ V  V /| |___| | | | |_| | |_| |  __/\__ \_ | \__ \
 |____/|_|  \__,_| \_/\_/ |_____|_| |_|\__|_|\__|_|\___||___(_)/ |___/
                                                             |__/     
==========================================================================
                                                             
========================================================================*/

var imageBank = {};


var ImageDrawEntity = {
	x: 0,
	y: 0,
	w: 0,
	h: 0,
	
	// transformation coords, default is the idenity matrix 
	// 1,0,0,1,0,0
	a:1,
	b:0,
	c:0,
	d:1,
	e:0,
	f:0,
	
	img: null,
	
	update: function(elapsedTime){
		return STATE_ALIVE;
	},
	
	draw: function(origin){
		try{
		
			theContext.drawImage(this.img, this.x + origin.x , this.y + origin.y, this.w, this.h );
	    } catch(e){
		
		}
	
		/*var x = this.x + origin.x;
		var y = this.y + origin.y;
	
		theContext.translate(x, y)
        theContext.rotate(this.theta);
        theContext.translate(-x,-y)
        theContext.drawImage(this.img, x - GearLarge.width/2 , y  - GearLarge.width/2 );
        theContext.setTransform(1,0,0,1,0,0);   */
	}



}

function newImageDraw(imgPath, x,y, w,h){
	if(!(imgPath in imageBank)){
		imageBank[imgPath] = new Image();
		imageBank[imgPath].src = imgPath;
	    console.log(imgPath);
	}
	
	var newImgDr = Object.create(ImageDrawEntity);
	newImgDr.x = x;
	newImgDr.y = y;
	newImgDr.w = w;
	newImgDr.h = h;
	newImgDr.img = imageBank[imgPath];
	
	return newImgDr;
}

function newImageRectDraw(x,y, w,h, color){
	
	
	
	var newImgDr = Object.create(ImageDrawEntity);
	newImgDr.x = x;
	newImgDr.y = y;
	newImgDr.w = w;
	newImgDr.h = h;
	newImgDr.color = color;
	newImgDr.draw = function(origin){
		theContext.fillStyle = this.color;
		theContext.fillRect(this.x + origin.x, this.y + origin.y, this.w, this.h);
	}

	return newImgDr;
}

function newSVGDraw(svgStr){
	
	var newSVG = Object.create(ImageDrawEntity);	
	
	newSVG.svgStr = svgStr;
		                                         	
	newSVG.draw = function(origin){
		theContext.drawSvg(this.svgStr, origin.x, origin.h);
	}

	return newSVG;
}

function newPathDraw(coordArray, fill, stroke, lineWidth, closed){
	var newPath = Object.create(ImageDrawEntity);
	newPath.coordArray = coordArray;
	newPath.fill = fill;
	newPath.stroke = stroke;
	newPath.lineWidth = lineWidth;
	newPath.closed = closed;

	
	
	newPath.draw = function(origin){
		theContext.beginPath();
		
		theContext.moveTo(this.coordArray[0].x + origin.x,this.coordArray[0].y + origin.y);
		
		for(var i = 1; i < this.coordArray.length; i++){
		    var x = this.coordArray[i].x + origin.x;
		    var y = this.coordArray[i].y + origin.y;
		    theContext.lineTo(x,y);
		    
		}
		
		if (this.closed){
			theContext.closePath();		
		}
		
		var tempLineWidth = theContext.lineWidth;
		
		theContext.lineWidth = this.lineWidth;
		theContext.fillStyle = this.fill;
		theContext.strokeStyle = this.stroke;
		theContext.fill();
		theContext.stroke();
		
		theContext.lineWidth = tempLineWidth;	
	
	}
	return newPath;	
}

function newComplexImageDraw(imgPath, x,y, w,h, a,b,c,d,e,f){
	if(!(imgPath in imageBank)){
		imageBank[imgPath] = new Image();
		imageBank[imgPath].src = imgPath;
	
	}
	
	var newImgDr = Object.create(ImageDrawEntity);
	newImgDr.x = x;
	newImgDr.y = y;
	newImgDr.w = w;
	newImgDr.h = h;
	newImgDr.img = imageBank[imgPath];
	
	newImgDr.a = a;
	newImgDr.b =b;
	newImgDr.c=c
	newImgDr.d=d;
	newImgDr.e=e;
	newImgDr.f=f;
	
	newImgDr.draw = function(origin){
		var x = this.x + origin.x;
		var y = this.y + origin.y;
	
		theContext.setTransform(this.a,this.b,this.c,this.d,this.d,this.f);
		 
        theContext.drawImage(this.img, x , y );
        
		theContext.setTransform(1,0,0,1,0,0);   
	}
	
	
	return newImgDr;
}