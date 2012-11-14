// Vector 

var Vector = {
	x : 0,
	y : 0,
	//dot: function(rhVec){
	//	this.x *= rhVec.x;
	//	this.y *= rhVec.y;	
	//},
	add : function(rhVec){
		this.x += rhVec.x;
		this.y += rhVec.y;
	},
	scalarMult : function(scalar){
		this.x *= scalar;
		this.y *= scalar;
			
	},
	normalize : function(){
		var length = Math.sqrt(this.x * this.x + this.y * this.y);
		this.x = this.x/length;
		this.y = this.y/length;
	},
	length : function(){
		return  Math.sqrt(this.x * this.x + this.y * this.y);
	},
	// mirrors the vector over the line of the given vector
	reflect : function(rhs){
		if(rhs.x === 0 && rhs.y === 0){
			return;
		}
	
		var a = vScalarMult(2 * (vDot(this, rhs)/vDot(rhs, rhs)), rhs);
		
		this.scalarMult(-1);
		var b = vAdd(a,this);
		this.x = b.x;
		this.y = b.y;
		
		 	
	},
	set : function (x,y){
		this.x = x;
		this.y = y;
	}
};

// returns a vector that is the sum of the two given vectors
function vAdd(lhs, rhs){
	var vec = Object.create(Vector);
	vec.x = lhs.x + rhs.x;
	vec.y = lhs.y + rhs.y;
	return vec;
}
function vDot(lhs, rhs){
	
	return lhs.x * rhs.x + lhs.y * rhs.y;	
}

function vNormal(lhs){
	var vec = Object.create(Vector);
	var length = Math.sqrt(lhs.x * lhs.x + lhs.y * lhs.y);
	vec.x = lhs.x/length;
	vec.y = lhs.y/length;
	return vec;	
}
function vOrthoNormal(lhs){
	var vec = Object.create(Vector);
	vec.x = -lhs.y;
	vec.y = lhs.x;
	return vec;	
}

function vScalarMult(scalar, lhs){
	var vec = Object.create(Vector);
	vec.x = lhs.x * scalar;
	vec.y = lhs.y * scalar;
	return vec;	
}







function newVector(x,y){
	var vec = Object.create(Vector);
	vec.x = x;
	vec.y = y;
	return vec;	
}

var Box = {
	x : 0,
	y : 0,
	w : 0,
	h : 0,
	
	move : function(vec){
		this.x += vec.x;
		this.y += vec.y;	
	}

}

function newBox(x,y,w,h){
	var outBox = Object.create(Box);
	outBox.x = x;
	outBox.y = y;
	outBox.w = w;
	outBox.h = h;
	return outBox;
}