// GameEntity.js

var kangaJumps = 0;	//number of jumps available as kangaroo
var kangaJmpA = 0;	//kangaroo jump acceleration

var GameEntity = {
	coords : null,
	velocity : null,
	radius : 0,
	aabb : null,
	fixed : false,
	virtual : false, // if an object collides with a virtual entity, it should 
					 // not respond to the collision
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
		
		/*if( this.velocity.x < 0 && this.coords.x < 0){
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
		}*/
		
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
		} else if(other.fixed){
		    resUse = -1;
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
		    
		    if(!other.virtual){
				this.collisionResponse(vScalarMult(resUse,resVec), other);
			}
			
			
			resVec.scalarMult(1 + resUse);
			if(!this.virtual){
				other.collisionResponse(resVec, this);
			}
			
			 
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
		if(vectorError(responseVector) ){
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
	newEnt.fixed = false;
	newEnt.virtual = true;
	newEnt.update = function(elapsedTime){
		this.coords.x = mouseX;
		this.coords.y = mouseY;
	}
	newEnt.collisionResponse = function(responseVector, other){
		if(vectorError(responseVector) ){
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

/**
 * i.e. the player for now - may need to move into its own file
 *
 **/
function newGameKeyEntity(x,y, radius){
	var newEnt = Object.create(GameEntity);
	newEnt.coords = newVector(x,y);
	newEnt.velocity = newVector(0,0);
	newEnt.radius = radius;
	newEnt.acceleration = newVector(0,GRAVITY);
	newEnt.fixed = false;
	newEnt.onGround = false;
	//set the form value to the current animal form
	newEnt.form = "h";
	
	newEnt.direction = 1;
	
	newEnt.update = function(elapsedTime){
		//press 1 for human
		if(keydown(49)){
			this.form = "h";
		} 
		//press 2 for cheetah
		else if(keydown(50)){
			this.form = "c";
		} 
		/* TODO: Unblock to add flying squirrel
		//press 3 for flying squirrel
		else if(keydown(51)){
			this.form = "f";
		}
		*/
		//press 4 for kangaroo
		else if(keydown(52)){
			this.form = "k";
		}
		/* TODO: Unblock to add spider
		//press 5 for spider
		else if(keydown(52)){
			this.form = "s";
		}
		*/
		//human form movement
		if(this.form == "h"){
			if(keydown(65)){
				this.direction = -1;
				this.velocity.x = -.3;
			}else if(keydown(68)){
				this.velocity.x = .3;
				this.direction = 1;
			} else {
				this.velocity.x = 0;
			}
			
			// apply impulse to velocity. 
			if(keydown(32) && this.onGround){
				this.velocity.y = -.6;
								
			}
			
			this.velocity.add(vScalarMult(elapsedTime,this.acceleration))
			if(this.velocity.y > .5){
			   this.velocity.y = .5;
			}
			this.coords.add(vScalarMult(elapsedTime,this.velocity))
			
			// we assume we are not on the ground unless the physics engine tells 
			// us otherwise.
			this.onGround = false;
			return STATE_ALIVE; 
			
		//cheetah form movement
		} else if(this.form == "c"){
			var tvx = this.velocity.x;
			var tvy = this.velocity.y;
			
			if(keydown(65)){
				if(tvx == 0){
					tvx = -.3;
				
				//can only accelerate while on the ground
				} else if(tvx > -.8 && this.onGround){
					tvx -= .1;
				}
				this.direction = -1;
			}else if(keydown(68)){
				if(tvx == 0){
					tvx = .3;
					
				//can only accelerate while on the ground	
				} else if(tvx < .8  && this.onGround){    
					tvx += .1;
				} 
				this.direction = 1;
			} else {
				tvx = 0;
			}
			
			// apply impulse to velocity. 
			if(keydown(32) && this.onGround){
				tvy = -.4;
			}
			
			this.velocity.x = tvx;
			this.velocity.y = tvy;
			
			//this bit can probably be moved outside for all of them
			//unless we want to apply special cases to certain powers
			this.velocity.add(vScalarMult(elapsedTime,this.acceleration))
			if(this.velocity.y > .5){
			   this.velocity.y = .5;
			}
			this.coords.add(vScalarMult(elapsedTime,this.velocity))
			
			// we assume we are not on the ground
			this.onGround = false;
			return STATE_ALIVE;
			
		//flying squirrel movement 
		} else if(this.form == "f"){
		
		//kangaroo movement	
		} else if(this.form == "k"){
			
			//ground motion
			if(this.onGround){
				kangaJumps = 2;
				if(keydown(65) || keydown(68)){	//left or right hops
					this.velocity.y -= .2;
				} else this.velocity.x = 0;	//stops movement on ground
			}
			//aerial motion
			else{
				if(keydown(65)){	//left movement in air
					this.velocity.x -= .15;
					this.direction = -1;
				}
				if(keydown(68)){	//right movement in air
					this.velocity.x += .15;
					this.direction = 1;
				}
				
				if(this.velocity.x > .3) this.velocity.x = .3;
				else if(this.velocity.x < -.3) this.velocity.x = -.3;
			}
			//jumps
			if(keyhit(32) && kangaJumps > 0){	//initial jump-off
				this.velocity.y = -.35;
				kangaJumps--;
				kangaJmpA = -.12;
			} else if(keydown(32) && kangaJmpA < -0.01){	//jump "carry"
				this.velocity.y += kangaJmpA;
				kangaJmpA = kangaJmpA / 1.4;
			}
			
			this.velocity.add(vScalarMult(elapsedTime,this.acceleration))
			if(this.velocity.y > .5){
			   this.velocity.y = .5;
			}
			this.coords.add(vScalarMult(elapsedTime,this.velocity))
			//assume we're not on the ground
			this.onGround = false;
			return STATE_ALIVE;
		}
		
		//spider movement
		else if(this.form == "s"){
			
		}
	}
	
	newEnt.collisionResponse = function(responseVector, other){
		
		// not sure if we need to do this. Was trying to stop the disapearing 
		// ball problem
		if(vectorError(responseVector) ){
			return;
		}
	
		
		// move so we are not colliding anymore
		this.coords.add(responseVector);
		
		/**
		 * We consider ourselves "on the ground" if there is something to 
		 * push on.		 
		 **/ 
		if(responseVector.y < 0){
			this.onGround = true;
			
		}
		
		// if we bump an opposing force, stop. This is not entirely physicly
		// correct but will work for the most part.
		if(responseVector.x > 0 && this.velocity.x < 0){
			this.velocity.x	= 0;		
		}else if(responseVector.x < 0 && this.velocity.x > 0){
			this.velocity.x	= 0;		
		}
		if(responseVector.y > 0 && this.velocity.y < 0){
			this.velocity.y	= 0;		
		}else if(responseVector.y < 0 && this.velocity.y > 0){
			this.velocity.y	= 0;		
		}  
		
		// hold on to the response vector, currently we only do this so we can
		// draw it for debugging purposes  
		this.resVec = responseVector; 
	}
	
	newEnt.draw = function(origin){
		if(this.form == "k"){
			if(this.onGround){
				if(this.direction === -1){
					theContext.drawImage(kangaroo1L,this.coords.x - kangaroo1R.width/2,this.coords.y - kangaroo1R.height/2);
				} else {
				    theContext.drawImage(kangaroo1R,this.coords.x - kangaroo1R.width/2,this.coords.y - kangaroo1R.height/2);
				}
			} else {
				if(this.direction === -1){
					theContext.drawImage(kangaroo2L,this.coords.x - kangaroo1R.width/2,this.coords.y - kangaroo1R.height/2);
				} else {
				    theContext.drawImage(kangaroo2R,this.coords.x - kangaroo1R.width/2,this.coords.y - kangaroo1R.height/2);
				}
			}
		} else if(this.form == "h"){
			theContext.drawImage(human1,this.coords.x - human1.width/2,this.coords.y - human1.height/2);
		}
		
		
	}
	
	return newEnt;
		
}