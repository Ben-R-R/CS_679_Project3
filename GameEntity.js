// GameEntity.js

var GameEntity = {
	coords : null,
	velocity : null,
	radius : 0,
	aabb : null,
	fixed : false,
	acceleration : null,
	/**
	 * Update the entity, this usualy entails moving and animating the entity 
	 * In the special case of the player entity, this is where you would read 
	 * and respond to input. If something happened last frame that caused the
	 * entity to be removed from the playing field, this method should return
	 * STATE_DEAD, else it should return STATE_ALIVE. Note that a player entity
	 * should never return STATE_DEAD.	 	 	 	 
	 **/
	update : function(elapsedTime){
		this.coords.add(vScalarMult(elapsedTime, this.velocity));
		
		//this.velocity.add(vScalarMult(elapsedTime, this.acceleration))
		
		if( this.velocity.x < 0 && this.coords.x < 0){
			this.coords.x = 0;
			this.velocity.x = -this.velocity.x;
		}
		if(this.velocity.y < 0 && this.coords.y < 0){
			this.coords.y = 0;
			this.velocity.y = -this.velocity.y;
		}
		
		if(this.velocity.x > 0 && this.coords.x > theCanvas.width){
			this.coords.x = theCanvas.width;
			this.velocity.x = -this.velocity.x;
		}
		if(this.velocity.y > 0 && this.coords.y > theCanvas.height){
			this.coords.y = theCanvas.height;
			this.velocity.y = -this.velocity.y;
		}
		
		return STATE_ALIVE;			
	},
	
	/**
	 *collides this entity with the other entity
	 *	 
	 * Calls this and the other entity's collisionResponse function.
	 * Consequently, this should only be called once on each object pair 
	 * per frame. 
	 * 	 
	 * For two objects, A and B, it shouldn't matter if the calls is 
	 * A.collideWith(B) or B.collideWith(A)
	 * 
	 * The general method for A.collideWith(B) is for A to get the B->A 
	 * response vector, subtract the portion it intends to respond to, and 
	 * then call B.collisionResponse(...) with the remainder. 	  	 	 
	 */	 	  
	collideWith: function(other){
		
		// indicates what portion of the response vector we use
		var resUse = -0.5;
		if(this.fixed){
			resUse = 0;			
		}
	
		var resVec = null;
		if(this.aabb === null){
			if(other.aabb === null){
				resVec = circle_circle(this.coords, this.radius, other.coords, other.radius);
			} else {
				resVec = AABB_circle(other.aabb, this.coords, this.radius);
				if(resVec !== null){
					resVec.scalarMult(-1);
				}
			}
			
		} else {
			if(other.aabb === null){
				resVec = AABB_circle(this.aabb, other.coords, other.radius);
			} else {
			    resVec = AABB_AABB(this.aabb, other.aabb);
			}
			
		}
		
		
		
		if(resVec !== null){
		    
			this.collisionResponse(vScalarMult(resUse,resVec), other);
			resVec.scalarMult(1 + resUse);
			other.collisionResponse(resVec);
			 
		}	
	},
	
	/**
	 * This is the method where you would respond to collisions. Usualy this 
	 * will entail a displacement along the response vector, but sometimes you
	 * might do something else, for example in the case of a player entity 
	 * colliding with spikes, you would not move, but rather switch to the 
	 * spike death sprite. 	 	 	 
	 **/
	collisionResponse : function(responseVector, other){
		if(responseVector == NaN){
			return;
		}
		this.coords.add(responseVector);
		this.velocity.reflect(vOrthoNormal(responseVector));
		this.resVec = responseVector; 
	},
	
	/**
	 * This method draws the entity to theContext. 
	 * 
	 * The parameter origin is a vector that should be added to the
	 * x and y parameters for drawing calls. This will allow us to implement
	 * scrolling later 	 	 
	 **/
	draw : function(origin){
		theContext.strokeStyle = "#000000";
        theContext.fillStyle = "#0099FF";
        
		theContext.beginPath(); 
        theContext.arc(this.coords.x, this.coords.y, this.radius, 0, Math.PI * 2, true);
        theContext.closePath();
        theContext.stroke();
        theContext.fill();
        
        if(this.resVec){
        	theContext.strokeStyle = "#FF0000";
			theContext.moveTo(this.coords.x,this.coords.y);
			theContext.lineTo(this.coords.x + this.resVec.x, this.coords.y + this.resVec.y );
			theContext.stroke();	
		}
        
	}

}

function newGameEntity(coords, velocity, radius){
	var newEnt = Object.create(GameEntity);
	newEnt.coords = coords;
	newEnt.velocity = velocity;
	newEnt.radius = radius;
	newEnt.acceleration = newVector(0,0);

	return newEnt;
		
}

function newGameMouseEntity(radius){
	var newEnt = Object.create(GameEntity);
	newEnt.coords = newVector(mouseX,mouseY);
	newEnt.velocity = newVector(0,0);
	newEnt.radius = radius;
	newEnt.acceleration = newVector(0,0);
	newEnt.fixed = true;
	newEnt.update = function(elapsedTime){
		this.coords.x = mouseX;
		this.coords.y = mouseY;
	}
	newEnt.collisionResponse = function(responseVector, other){
		if(responseVector == NaN){
			return;
		}
		//this.coords.add(responseVector);
		//this.velocity.reflect(vOrthoNormal(responseVector));
		this.resVec = responseVector; 
	}
	return newEnt;
		
}

function newBoxEntity(org, w, h){
	var newEnt = Object.create(GameEntity);
	newEnt.coords = org;
	newEnt.velocity = newVector(0,0);
	newEnt.radius = 0;
	newEnt.aabb = newBox(org.x, org.y, w , h)
	newEnt.acceleration = newVector(0,0);
	newEnt.fixed = true;
	newEnt.draw = function(origin){
		//theContext.strokeStyle = "#000000";
        theContext.fillStyle = "#000000";
        
        theContext.fillRect(this.aabb.x,this.aabb.y,this.aabb.w,this.aabb.h);
	}
	
	return newEnt;
		
}