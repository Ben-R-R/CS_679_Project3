// levelManager.js

function initLevelManager(){
	$("#level").load("levels/test6.svg", parseInkscapeFile);
	
	//spawnNewEntity(newGameMouseEntity(15), dynamicList);
}

function parseFile(){
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
		var tx = Math.ceil($(this).attr("cx"));
		var ty = Math.ceil($(this).attr("cy"));
		
		spawnNewEntity(newGearEntity(tx, ty), staticList);
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
		var ty = Math.ceil($(this).attr("y"))
		
		spawnNewEntity(newSpiderGrappleEntity(tx, ty), staticList);
	});
	
	//spawn moving platforms ----------------------------
	$("#moving").children().each(function(){
		var rect = $(this).children("rect");
		var tx = Math.ceil(rect.attr("x"));
		var ty = Math.ceil(rect.attr("y"));
		var tw = Math.ceil(rect.attr("width"));
		var th = Math.ceil(rect.attr("height"));
		
		var path = $(this).children("polygon");
		var points = path.attr("points").split(" ");
		
		var pts = new Array();
		//length-1 because polygon has spaces at end of "points" attribute
		for(var i = 0; i < points.length-1; i++){
			var temp = points[i].split(",");
			pts.push(temp[0]);
			pts.push(temp[1]);
		}
		
		//2 point path
		if(pts.length == 4){
			var px1 = Math.ceil(pts[0]);
			var py1 = Math.ceil(pts[1]);
			var px2 = Math.ceil(pts[2]);
			var py2 = Math.ceil(pts[3]);
			
			spawnNewEntity(newPathEntity(newBoxEntity(newVector(tx,ty), tw, th), newPath([newVector(px1, py1),newVector(px2,py2)]), 0.1), staticList);
		} 
		//3 point path
		else if(pts.length == 6){
			var px1 = Math.ceil(pts[0]);
			var py1 = Math.ceil(pts[1]);
			var px2 = Math.ceil(pts[2]);
			var py2 = Math.ceil(pts[3]);
			var px3 = Math.ceil(pts[4]);
			var py3 = Math.ceil(pts[5]);
			
			spawnNewEntity(newPathEntity(newBoxEntity(newVector(tx,ty), tw, th), newPath([newVector(px1, py1),newVector(px2,py2),newVector(px3,py3)]), 0.1), staticList);
		} 
		//4 point path
		else if(pts.length == 8){
			var px1 = Math.ceil(pts[0]);
			var py1 = Math.ceil(pts[1]);
			var px2 = Math.ceil(pts[2]);
			var py2 = Math.ceil(pts[3]);
			var px3 = Math.ceil(pts[4]);
			var py3 = Math.ceil(pts[5]);
			var px4 = Math.ceil(pts[6]);
			var py4 = Math.ceil(pts[7]);
			
			spawnNewEntity(newPathEntity(newBoxEntity(newVector(tx,ty), tw, th), newPath([newVector(px1, py1),newVector(px2,py2),newVector(px3,py3),newVector(px4,py4)]), 0.1), staticList);
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

			console.log(currX + " , " + currY);
			
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
		
		spawnNewEntity(newPathEntity(newBoxEntity(newVector(tx,ty), tw, th), newPath(pts), speed), staticList);
		

	});
	
	//spawn scenery points ------------------------------
	$("#background").children().each(function(){
	
		var $target = $(this);
		
		if($target.is("rect")){
			var tx = Math.ceil($target.attr("x"));
			var ty = Math.ceil($target.attr("y"));
			var tw = Math.ceil($target.attr("width"));
			var th = Math.ceil($target.attr("height"));
			
			try{			
				var color = this.style.fill;
			}catch(e){
				console.log($target.attr("id"));	
			}
			if(!color){
				color = "#808080";
			}
			
			spawnNewEntity(newImageRectDraw(tx,ty, tw,th, color), sceneryList);	
		} else if($target.is("path")){
		    
			var xforms = this.getAttribute('transform');
			var firstX = 0;
			var firstY = 0;
			
			if(xforms){
				var parts  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
				firstX = parseFloat(parts[1]);
				firstY = parseFloat(parts[2]);
			}
			
			var points = $(this).attr("d").split(" ");
		
			var pts = new Array();
	
			var type = points[0];
	
			
			var currX = firstX;
			var currY = firstY;
			
			var closed = false;
			
			for(var i = 1; i < points.length; i++){

				//console.log(currX + " , " + currY);
				
				if(points[i] === 'z'){
					closed = true;
					break;			
				}
				
				var temp = points[i].split(",");
				
				if(type === 'm'){
					currX += parseFloat(temp[0]);
					currY += parseFloat(temp[1]);
				} else {
				    currX = parseFloat(temp[0]);
					currY = parseFloat(temp[1]);
				}
							
				
				if(currX === NaN || currY === NaN){
					console.log("Path Error" + path.attr("id"));
					return;
				} 
				
				pts.push(newVector(currX, currY));
			}
		
			//spawnNewEntity(newPathEntity(newBoxEntity(newVector(tx,ty), tw, th), newPath(pts), speed), staticList);
			
						
			var fill = this.style.fill;
			var stroke = this.style.stroke;	
			var lineWidth = $(this).css("stroke-width");
		  	
			
			spawnNewEntity(newPathDraw(pts, fill, stroke, lineWidth, closed), sceneryList);
				
		} else if($target.is("image")){
			var tx = Math.ceil($target.attr("x"));
			var ty = Math.ceil($target.attr("y"));
			var tw = Math.ceil($target.attr("width"));
			var th = Math.ceil($target.attr("height"));
			var src = $target.attr("src");	
			spawnNewEntity(newImageDraw(src, tx,ty, tw,th), sceneryList);	
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

}