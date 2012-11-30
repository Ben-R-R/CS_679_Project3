// levelManager.js

function initLevelManager(){
	$("#level").load("levels/test4.svg", parseInkscapeFile);
	
	spawnNewEntity(newGameMouseEntity(15), dynamicList);
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
	
	//spawn scenery points ------------------------------
	$("#background").children().each(function(){
	
		var $target = $(this);
		
		if($target.is("rect")){
			var tx = Math.ceil($target.attr("x"));
			var ty = Math.ceil($target.attr("y"));
			var tw = Math.ceil($target.attr("width"));
			var th = Math.ceil($target.attr("height"));
			
			spawnNewEntity(newImageRectDraw(tx,ty, tw,th), sceneryList);	
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