// levelManager.js

function initLevelManager(path){
	$("#level").empty();
	$("#level").load(path, parseInkscapeFile);
	
	//spawnNewEntity(newGameMouseEntity(15), dynamicList);
}



function parseInkscapeFile(){
	//spawn boxes ---------------------------------------
	$("#box").children().each(function(){
		var tx = Math.ceil($(this).attr("x"));
		var ty = Math.ceil($(this).attr("y"));
		var tw = Math.ceil($(this).attr("width"));
		var th = Math.ceil($(this).attr("height"));

		spawnNewEntity(newBoxEntity(newVector(tx, ty), tw, th),staticList);
	});
	
	//spawn gears ---------------------------------------
	$("#gear").children().each(function(){
		var tx = Math.ceil($(this).attr("x"));
		var ty = Math.ceil($(this).attr("y"));
		var tw = Math.ceil($(this).attr("width"));
		var th = Math.ceil($(this).attr("height"));
		
		spawnNewEntity(newGearEntity(tx + tw/2, ty + th/2), staticList);
	});
	
	//spawn checkpoints ---------------------------------
	$("#checkpoint").children().each(function(){
		var tw = Math.ceil($(this).attr("width"));
		var th = Math.ceil($(this).attr("height"));
		var tx = Math.ceil($(this).attr("x"))+tw/2;
		var ty = Math.ceil($(this).attr("y"))+th/2;
		
		spawnNewEntity(newCheckpointEntity(newVector(tx, ty), tw, th), staticList);
	});
	
	//spawn ropes ---------------------------------------
	$("#rope").children().each(function(){
		var tx = Math.ceil($(this).attr("x1"));
		var ty = Math.ceil($(this).attr("y1"));
		var th = Math.abs(Math.ceil($(this).attr("y2"))-ty);
		
		spawnNewEntity(newRopeEntity(tx, ty, th), staticList);
	});
	
	//spawn spikes --------------------------------------
	$("#spike").children().each(function(){
		var tx = Math.ceil($(this).attr("x"));
		var ty = Math.ceil($(this).attr("y"));
		var tw = Math.ceil($(this).attr("width"));
		var th = Math.ceil($(this).attr("height"));
		var tnum = Math.floor(tw/10);

		spawnNewEntity(newSpikeEntity(tx+tw/2, ty+th/2, tw, th, 0, tnum), staticList);
	});
	
	
	//spawn grapple points ------------------------------
	$("#grapple").children().each(function(){
		var tx = Math.ceil($(this).attr("x"));
		var ty = Math.ceil($(this).attr("y"));
		var tw = Math.ceil($(this).attr("width"));
		var th = Math.ceil($(this).attr("height"));
		
		spawnNewEntity(newSpiderGrappleEntity(tx+tw/2, ty+th/2), staticList);
	});
	
	//spawn moving platforms ----------------------------
	$("#moving").children().each(function(){
		if( ! ($(this).is("g"))) {
			return; // we aren't a group, so we can't parse this		
		}
		
		var xforms = this.getAttribute('transform');
		var moveingType = this.getAttribute('type'); // so we can have moving things other than gears 
		
		if(! moveingType){
			moveingType = 'box';
		}
		
		var firstX = 0;
		var firstY = 0;
		if(xforms){
			var parts  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
			firstX = parseFloat(parts[1]);
			firstY = parseFloat(parts[2]);
		}
		
		var rect = $(this).children("rect");
		var tx = Math.ceil(rect.attr("x")) + firstX;
		var ty = Math.ceil(rect.attr("y")) + firstY;
		var tw = Math.ceil(rect.attr("width"));
		var th = Math.ceil(rect.attr("height"));
		
		var path = $(this).children("path");
		var points = path.attr("d").split(" ");
		
		
		
		
		var pts = new Array();

		var speed = 0.1;

		if(path.attr('speed') !== undefined ){
			speed = parseFloat(path.attr('speed'));			
		}

		// test for improperly formated taggs
		if(points[0] !== 'm'){
			return;		
		}
		
		var currX = firstX;
		var currY = firstY;
		
		for(var i = 1; i < points.length; i++){

			
			
			if(points[i] === 'z'){
				break;			
			}
			
			var temp = points[i].split(",");
			
			currX += parseFloat(temp[0]);
			currY += parseFloat(temp[1]);			
			
			if(currX === NaN || currY === NaN){
				console.log("Path Error" + path.attr("id"));
				return;
			} 
			
			pts.push(newVector(currX, currY));
		}
		
		var entity;
		
		if(moveingType === 'box'){
			entity =  newBoxEntity(newVector(tx,ty), tw, th);
		} else if(moveingType === 'gear'){
		    entity =  newGearEntity(tx + tw/2, ty + th/2);
		}
		
		spawnNewEntity(newPathEntity(entity, newPath(pts), speed), staticList);
		

	});
	
	var parseGroupToDrawables = function($target, self, parentM, firstX, firstY, callback){
		
		// first we see if there is any kind of overarching transform 
		// we need to account for.
		var xforms = self.getAttribute('transform');
		
		var transformM = null;
		
		if(xforms){
		    if(xforms.charAt(0) === 'm'){
				
			    transformM = xforms.substr(7, xforms.length - 8).split(',');
				for(var i = 0; i < transformM.length; i++){
					transformM[i] = parseFloat(transformM[i]);
				}
				
				if(parentM){
					var temp = new Array();
					var t = parentM;
					var p = transformM;
					temp[0] = p[0] * t[0] + p[1] * t[2];
					temp[1] = p[0] * t[1] + p[1] * t[3];
					
					temp[2] = p[2] * t[0] + p[3] * t[2];
					temp[3] = p[2] * t[1] + p[3] * t[3];
					
					temp[4] = p[4] * t[0] + p[5] * t[2] + t[4];
					temp[5] = p[4] * t[1] + p[5] * t[3] + t[5];
					
					
					transformM = temp;						
				}
							 
			} else if(xforms.charAt(0) === 's'){
				
				var parts  = /scale\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
				
				
			    transformM = new Array();
			    
			    transformM[0] = parseFloat(parts[1]);
			    transformM[1] = 0;
			    transformM[2] = 0;
			    transformM[3] = parseFloat(parts[2]);
			    transformM[4] = 0;
			    transformM[5] = 0;
			    
				
				
				if(parentM){
					var temp = new Array();
					var t = parentM;
					var p = transformM;
					temp[0] = p[0] * t[0] + p[1] * t[2];
					temp[1] = p[0] * t[1] + p[1] * t[3];
					
					temp[2] = p[2] * t[0] + p[3] * t[2];
					temp[3] = p[2] * t[1] + p[3] * t[3];
					
					temp[4] = p[4] * t[0] + p[5] * t[2] + t[4];
					temp[5] = p[4] * t[1] + p[5] * t[3] + t[5];
					
					
					transformM = temp;						
				}
							 
			} else{
		        // this mess parses the translate form of the transform attribute 
				var parts  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
				firstX += parseFloat(parts[1]);
				firstY += parseFloat(parts[2]);
			}
		}
		
		// account for the fact that we might be a child of something that has a matrix
		// and not have a matrix ourself
		if(!transformM && parentM){
			transformM = parentM.slice(0); 	// might not be wise to asign the 
											// parent matrix directly (we don't 
											// know what might happen to it in  
											// the future) so we make a copy	
		}
		
		if($target.is("rect")){
		
			var tx = parseFloat($target.attr("x"));
		
			
			var ty = parseFloat($target.attr("y"));
			var tw = Math.ceil($target.attr("width"));
			var th = Math.ceil($target.attr("height"));
			
			// get the fill color			
			var color = self.style.fill;
			
			// give a default color if no fill color
			if(!color){
				color = "#808080";
			}
			
			// need to make sure that the offset is integrated into the 
			// transformation matrix if there is one. 
			if(transformM){
				transformM[4] += firstX;
				transformM[5] += firstY;
			}else {
			    tx += firstX;
				ty += firstY;
			}
			
			callback(newRectDraw(tx,ty, tw,th, color, transformM));
			
		
		} else if($target.is("path")){
		    
			// get the path discription. currently only linear paths 
			// are supported.
			var points = $target.attr("d").split(" ");
			
			var pts = new Array();
			
			// should be 'm' or 'M'
			var type = points[0];
	        
			var currX = firstX;
			var currY = firstY;
			
			var closed = false;
			
			for(var i = 1; i < points.length; i++){

				// if it is a closed path there will be a 'z' at the end.
				if(points[i] === 'z'){
					closed = true;
					break;			
				}
				
				var temp = points[i].split(",");
				
				if(type === 'm'){
					currX += parseFloat(temp[0]);
					currY += parseFloat(temp[1]);
				} else {
				    currX = parseFloat(temp[0]) + firstX;
					currY = parseFloat(temp[1]) + firstY;
				}
							
				// This could happen if we try to parse a path that is not 
				// made up of line segments.
				if(currX === NaN || currY === NaN){
					console.log("Path Error" + path.attr("id"));
					return;
				} 
				
				pts.push(newVector(currX, currY));
			}
			
			// get the attributes of the path			
			var fill = self.style.fill;
			var stroke = self.style.stroke;	
			var lineWidth = $target.css("stroke-width");
		  	
			
			callback(newPathDraw(pts, fill, stroke, lineWidth, closed, transformM));
				
		} else if($target.is("image")){
			var tx = Math.ceil($target.attr("x")) ;
			var ty = Math.ceil($target.attr("y")) ;
			var tw = Math.ceil($target.attr("width"));
			var th = Math.ceil($target.attr("height"));
			var src = $target.attr("src");
			
			if(transformM){
				transformM[4] += firstX;
				transformM[5] += firstY;
			}else {
			    tx += firstX;
				ty += firstY;
			}
				
			callback(newImageDraw(src, tx,ty, tw,th, transformM));	
		
		// is this a group of child objects?
		// if so, recursivly parse them.
		} else if($target.is("g")){
			
			$target.children().each(function(){
				var $target2 = $(this);	
				
				parseGroupToDrawables($target2, this, transformM, firstX, firstY, callback); 
			});
				
		} else if($target.is("text")){
			
			var style = $target.css("font-style") + " "  + $target.css("font-weight") + " " + $target.css("font-size") + " " + $target.css("font-family");
			
			var fill = self.style.fill;
			var stroke = self.style.stroke;
			
			//style
			
			$target.children().each(function(){
				var $target2 = $(this);	
				var text = $target2.text();
				
				
				
				var tx = Math.ceil($target2.attr("x")) ;
				var ty = Math.ceil($target2.attr("y")) ;
				
				if(transformM){
					transformM[4] += firstX;
					transformM[5] += firstY;
				}else {
				    tx += firstX;
					ty += firstY;
				}
					
				callback(newFontDraw( text, tx, ty, fill, stroke, style, transformM));
				
			});
				
		}
	
	}
	
	if($("#background").css("display") !== "none"){
	
	
		//spawn scenery points ------------------------------
		$("#background").children().each(function(){
		
			var $target = $(this);
	
			
			// start parsing background elements.
			// origin is 0,0, and there is no transformation matrix. 		
			//parseBackgroundElement();
			
			function cb(drawObj){
				spawnNewEntity(drawObj, sceneryList);	
			}
			 
			parseGroupToDrawables($target, this, null, 0, 0, cb);
			
			
		});  
	}
	
	// links 
	$("#links").children().each(function(){
		var $target = $(this);
		if ($target.is("g")){
			var firstX = 0;
			var firstY = 0;
			var xforms = this.getAttribute('transform');
		
			var transformM = null;
		
			if(xforms){
			    if(xforms.charAt(0) === 'm'){
					
				    transformM = xforms.substr(7, xforms.length - 8).split(',');
					for(var i = 0; i < transformM.length; i++){
						transformM[i] = parseFloat(transformM[i]);
					}
					
					if(parentM){
						var temp = new Array();
						var t = parentM;
						var p = transformM;
						temp[0] = p[0] * t[0] + p[1] * t[2];
						temp[1] = p[0] * t[1] + p[1] * t[3];
						
						temp[2] = p[2] * t[0] + p[3] * t[2];
						temp[3] = p[2] * t[1] + p[3] * t[3];
						
						temp[4] = p[4] * t[0] + p[5] * t[2] + t[4];
						temp[5] = p[4] * t[1] + p[5] * t[3] + t[5];
						
						
						transformM = temp;						
					}
								 
				} else if(xforms.charAt(0) === 's'){
					
					var parts  = /scale\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
					
					
				    transformM = new Array();
				    
				    transformM[0] = parseFloat(parts[1]);
				    transformM[1] = 0;
				    transformM[2] = 0;
				    transformM[3] = parseFloat(parts[2]);
				    transformM[4] = 0;
				    transformM[5] = 0;
				    
					
					
					if(parentM){
						var temp = new Array();
						var t = parentM;
						var p = transformM;
						temp[0] = p[0] * t[0] + p[1] * t[2];
						temp[1] = p[0] * t[1] + p[1] * t[3];
						
						temp[2] = p[2] * t[0] + p[3] * t[2];
						temp[3] = p[2] * t[1] + p[3] * t[3];
						
						temp[4] = p[4] * t[0] + p[5] * t[2] + t[4];
						temp[5] = p[4] * t[1] + p[5] * t[3] + t[5];
						
						
						transformM = temp;						
					}
								 
				} else{
			        // this mess parses the translate form of the transform attribute 
					var parts  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
					firstX += parseFloat(parts[1]);
					firstY += parseFloat(parts[2]);
				}
			}
		
		    var tw = 0;
			var th = 0;
			var tx = 0;
			var ty = 0;
			var link = ""; 
		    var auto = false;
		    
			
			var drawArr = new Array();
			
			$target.children().each(function(){
				var $target2 = $(this);	

				if(this.getAttribute('ismain') === "true"){
					
					function cb2(drawObj){
						tw = drawObj.w;
						th = drawObj.h;
						tx = drawObj.x;
						ty = drawObj.y;		
					}
					parseGroupToDrawables($target2, this, transformM, firstX, firstY, cb2); 	
					
					if(this.getAttribute("autoactivate")){
					  	auto = true;
					}
					
					link = $(this).attr("link");
				} else {
					function cb(drawObj){
						drawArr.push(drawObj);	
					}
					parseGroupToDrawables($target2, this, transformM, firstX, firstY, cb); 	
				}		
			});
			
			spawnNewEntity(newDoorEntity(newVector(tx,ty), tw, th, link, drawArr, auto), staticList);
		} else if($target.is("rect")){
			tw = Math.ceil($(this).attr("width"));
			th = Math.ceil($(this).attr("height"));
			tx = Math.ceil($(this).attr("x"));
			ty = Math.ceil($(this).attr("y"));
			link = $(this).attr("link");
			if(this.getAttribute("autoactivate") === "true"){
				auto = true;
				console.log("auto = true");
			}
			 console.log(this.getAttribute("style"));
			spawnNewEntity(newDoorEntity(newVector(tx,ty), tw, th, link, null, auto), staticList);
			
		}	
	});  
	
	
	//spawn player & start ------------------------------
	var next = $("#start");
	var tw = Math.ceil(next.attr("width"));
	var th = Math.ceil(next.attr("height"));
	var tx = Math.ceil(next.attr("x"))+tw/2;
	var ty = Math.ceil(next.attr("y"))+th/2;
	
	var player = newPlayerEntity(tx,ty, kangaroo1R.height/2)
	var checkpointAlpha = newCheckpointEntity(newVector(tx,ty), tw, th);
	player.checkpoint = checkpointAlpha; 
	spawnNewEntity(checkpointAlpha, staticList);
	spawnNewEntity(player, dynamicList);
	
	
	//spawn finish checkpoint ----------------------------
	var next = $("#finish");
	var tw = Math.ceil(next.attr("width"));
	var th = Math.ceil(next.attr("height"));
	var tx = Math.ceil(next.attr("x"))+tw/2;
	var ty = Math.ceil(next.attr("y"))+th/2;
	
	var checkpointOmega = newCheckpointEntity(newVector(tx, ty), tw, th);
	checkpointOmega.finish = true;
	spawnNewEntity(checkpointOmega, staticList);

}