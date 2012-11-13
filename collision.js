// collision.js

/**
 * Axis aligned bounding box collision test
 * 
 * returns a response vector for box2   
 */ 
function aabb_aabb(box1, box2){
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