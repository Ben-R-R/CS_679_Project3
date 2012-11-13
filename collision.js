// collision.js

/**
 * Axis aligned bounding box collision test
 * 
 * returns a response vector for box2   
 */ 
function AABB_AABB(box1, box2){
	var s1 = box1.x
	var s2 = box2.x
	var e1 = box1.x + box1.w;
	var e2 = box2.x + box2.w;
	var result = 0;
	var d1 = e1 - s2;
	var d2 = e2 - s1;
	if(s1 < e2 && s2 < e1){
			
	}
				
}

function circle_circle(pos1, r1, pos2, r2){
	var res = newVector( pos2.x - pos1.x,  pos2.y - pos1.y);
	responseInside = false;
	var dd = res.x * res.x + res.y * res.y;
	var L = r1 + r2;
	var LL = L * L;
	
	if(dd < LL){
		var res2 = vScalarMult(L - res.length(), vNormal(res));
		
		return res2;	
	}
	
	return null; 

}

function AABB_circle(box, pos, r){
	var boxMin = newVector(box.x, box,y);
	var boxMax = newVector(box.x + box.w, box.y + box.h);
	
	var InterDistVect = newVector(0,0);

	var d = 0;
	var e = 0;
	
	var inside = true;
	var AxisSet = {"x":null, "y":null,}
	
	var i;
	for(i in AxisSet){
		if((e = pos[i] - boxMin[i]) < 0){
			if( e < -r){
				return null;
			}
			inside = false;
			res[i] = e;
			d += (e * e)
		
		} else if ((e = pos[i] - boxMax[i]) > 0){
			if( e > r){
				return null;
			}
			inside = false;
			res[i] = e;
			d += (e * e)
		} else { // we know it collides, just figure out the direction of the response vector:
		
		
			var e2 = (pos[i] - boxMin[i]);
			// at this point the e vectors are along the line of action of the
			// response vector, but point in the wrong direction. 
			AxisSet[i] = (e2 < -e) ? -e2: -e;
		}
	}
	if(inside){
		// find the closest edge
		var minDist = Math.abs(AxisSet["x"]);
		var axis = "x"
		for (i in AxisSet){
			if(Math.abs(AxisSet[i]) < minDist){
				minDist = Math.abs(AxisSet[i]);
				axis = i;	
			}
							
		}
		
		res[axis] = AxisSet[axis];
		
	}
	responseInside = inside;
	if(d > (r * r) ){
		return null;
	}
	return res ;

	

} 