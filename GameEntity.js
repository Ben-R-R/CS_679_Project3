// GameEntity.js

var GameEntity = {
	coords : null,
	velocity : null,
	radius : 0,
	aabb : null,
	fixed : false,
	virtual : false, // if an object collides with a virtual entity, it should 
					 // not respond to the collision
	pObject : false,	//flag this to make only the player interact with an object
	acceleration : null,
	isPlayer : false,
	isDeadly : false,
	isMovable : false,
	isKick : false,
	isGrapplePoint : false,
	isRope : false,
	
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
		    
		    if(!(other.virtual || (!this.isPlayer && other.pObject))){
				this.collisionResponse(vScalarMult(resUse,resVec), other);
			}
			
			
			resVec.scalarMult(1 + resUse);
			if(!(this.virtual || (!other.isPlayer && this.pObject))){
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
        theContext.arc(this.coords.x + origin.x, this.coords.y + origin.y, this.radius, 0, Math.PI * 2, true);
        theContext.closePath();
        theContext.stroke();
        theContext.fill();
        
        if(this.resVec){
        	theContext.strokeStyle = "#FF0000";
			theContext.moveTo(this.coords.x + origin.x, this.coords.y + origin.y);
			theContext.lineTo(this.coords.x + this.resVec.x + origin.x, this.coords.y + this.resVec.y + origin.y);
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
	newEnt.aabb = newBox(newEnt.coords.x,newEnt.coords.y,30,30); //BOXCODE
	newEnt.acceleration = newVector(0,0);
	newEnt.fixed = false;
	//newEnt.virtual = true;
	
	newEnt.update = function(elapsedTime){
		this.coords.x = mouseX - origin.x;
		this.coords.y = mouseY - origin.y;
		this.aabb.x = this.coords.x-15;//BOXCODE
		this.aabb.y = this.coords.y-15;//BOXCODE
		this.resVec = null;//BOXCODE
	}
	newEnt.collisionResponse = function(responseVector, other){
		if(vectorError(responseVector) ){
			return;
		}
		
		this.coords.add(responseVector);
		this.aabb.x = this.coords.x - this.aabb.w/2;
		this.aabb.y = this.coords.y - this.aabb.h/2;
		//this.velocity.reflect(vOrthoNormal(responseVector));
		this.resVec = responseVector; 
	}
	newEnt.draw =function(origin){
		theContext.fillStyle = "#000000";
        
        theContext.fillRect(this.aabb.x + origin.x,this.aabb.y + origin.y,this.aabb.w,this.aabb.h);
	}
	return newEnt;
		
}

function newBoxEntity(org, w, h){
	var newEnt = Object.create(GameEntity);
	newEnt.coords = org;
	newEnt.velocity = newVector(0,0);
	newEnt.radius = 0;
	newEnt.aabb = newBox(org.x, org.y, w, h);
	newEnt.acceleration = newVector(0,0);
	newEnt.fixed = true;
	newEnt.draw = function(origin){
		//theContext.strokeStyle = "#000000";
        theContext.fillStyle = "#000000";
        
        theContext.fillRect(this.aabb.x + origin.x,this.aabb.y + origin.y,this.aabb.w,this.aabb.h);
	}
	
	return newEnt;
		
}

function newCheckpointEntity(org, w, h){
	var newEnt = Object.create(GameEntity);
	newEnt.coords = org;
	newEnt.velocity = newVector(0,0);
	newEnt.radius = 0;
	newEnt.aabb = newBox(org.x - w/2, org.y - h/2, w, h);
	newEnt.acceleration = newVector(0,0);
	newEnt.fixed = true;
	newEnt.virtual = true;
	newEnt.isCheckpoint = true;
	newEnt.color = "#0000FF";
	newEnt.draw = function(origin){
		
		theContext.strokeStyle = this.color;
        //theContext.fillStyle = "#000000";
        
        theContext.strokeRect(this.aabb.x + origin.x,this.aabb.y + origin.y,this.aabb.w,this.aabb.h);
	}
	
	newEnt.collisionResponse = function(responseVector, other){
		
		if(other.isPlayer){
			other.checkpoint.disable();
			other.checkpoint = this;
			this.enable();
		}
		
		
	}
	newEnt.disable = function(){
		this.color = "#0000FF";	
	}
	
	newEnt.enable = function(){
		this.color = "#00AA00";	
	}
	
	return newEnt;
		
}

function newRopeEntity(x,y,h){
	var newEnt = Object.create(GameEntity);
	newEnt.coords = newVector(x,y);
	newEnt.velocity = newVector(0,0);
	newEnt.aabb = newBox(x - 1, y, 2, h);
	newEnt.acceleration = newVector(0,0);
	newEnt.fixed = true;
	newEnt.isRope = true;
	newEnt.pObject = true;
	newEnt.draw = function(origin){
		theContext.strokeStyle = "#000000";
		theContext.beginPath();
		theContext.moveTo(this.coords.x + origin.x, this.coords.y + origin.y);
		theContext.lineTo(this.coords.x + origin.x, this.coords.y + this.aabb.h + origin.y);
		theContext.stroke();
	}
	return newEnt;
}

function newSpikeEntity(x,y,w,h,dir,num){
	var newEnt = Object.create(GameEntity);
	newEnt.coords = newVector(x,y);
	newEnt.velocity = newVector(0,0);
	newEnt.radius = 5;
	if(dir == 0 || dir == 2) newEnt.aabb = newBox(x - w/2, y - h/2, w, h);
	else newEnt.aabb = newBox(x - h/2, y - w/2, h, w);
	newEnt.acceleration = newVector(0,0);
	newEnt.theta = dir * Math.PI / 2;
	newEnt.fixed = true;
	newEnt.isDeadly = true;
	newEnt.pObject = true;
	newEnt.w = w;
	newEnt.h = h;
	
	//create a new canvas to pre-render spikes
	var s_canvas = document.createElement('canvas');
	s_canvas.width = w;
	s_canvas.height = h;
	var s_context = s_canvas.getContext('2d');
	
	//pre-render
	var g = s_context.createLinearGradient(0,h,0,0);
	g.addColorStop(0,"black");
	g.addColorStop(0.5,"#000000");
	g.addColorStop(1,"#FF0000");
	s_context.strokeStyle = g;
	s_context.fillStyle = g;
	s_context.beginPath();
	for(i = 0; i < num; i++){
		s_context.moveTo(i*w/num, h);
		s_context.lineTo((i+1)*w/num, h);
		s_context.lineTo((i+0.5)*w/num + 0.5,0);
	}
	s_context.closePath();
	s_context.stroke();
	s_context.fill();
	
	//assign this canvas to the newEnt so we can draw it as an image later
	newEnt.canv = s_canvas;
	
	newEnt.draw = function(origin){
		theContext.translate(this.coords.x + origin.x,this.coords.y + origin.y -this.h/2);
		theContext.rotate(this.theta);
		theContext.translate(-this.w / 2,0);
		
		//draw pre-rendered spikes		
		theContext.drawImage(this.canv, 0, 0);
		
		theContext.translate(this.w / 2,0);
		theContext.rotate(-this.theta);
		theContext.translate(-this.coords.x - origin.x,-this.coords.y - origin.y +this.h/2);
	}
	
	return newEnt;
}

function newGearEntity(x,y){
	var newEnt = Object.create(GameEntity);
	newEnt.coords = newVector(x,y);
	newEnt.velocity = newVector(0,0);
	newEnt.radius = (GearLarge.width/2) - 5;
	newEnt.isDeadly = true;
	//newEnt.aabb = newBox(org.x, org.y, w , h)
	newEnt.acceleration = newVector(0,0);
	newEnt.fixed = true;
	newEnt.theta = 0;	
	newEnt.update = function(eTime){
	    this.theta += eTime * 0.003
        if(this.theta > Math.PI * 2){
			this.theta -= Math.PI * 2;	
		}
        
	}
	
	newEnt.draw = function(origin){
		var x = this.coords.x + origin.x;
		var y = this.coords.y + origin.y;
	
		theContext.translate(x, y)
        theContext.rotate(this.theta);
        theContext.translate(-x,-y)
        theContext.drawImage(GearLarge, x - GearLarge.width/2 , y  - GearLarge.width/2 );
        theContext.setTransform(1,0,0,1,0,0);
	}
	
	return newEnt;
		
}

function newCrateEntity(x,y,w,h){
	var newEnt = Object.create(GameEntity);
	newEnt.coords = newVector(x,y);
	newEnt.velocity = newVector(0,0);
	newEnt.aabb = newBox(newEnt.coords.x - w/2, newEnt.coords.y - h/2, w, h);
	newEnt.acceleration = newVector(0,GRAVITY);
	newEnt.fixed = false;
	newEnt.isMovable = true;
	newEnt.onGround = false;
	newEnt.update = function(eTime){
		this.coords.add(vScalarMult(eTime,this.velocity));
		this.velocity.add(vScalarMult(eTime,this.acceleration));
				
		this.onGround = false;
		
		this.aabb.x = this.coords.x - this.aabb.w / 2;
		this.aabb.y = this.coords.y - this.aabb.h / 2;
	}
	newEnt.collisionResponse = function(responseVector,other){
		if(vectorError(responseVector)){
			return;
		}
		if(other.isPlayer){
			
		} else if(other.isKick){
			if(responseVector.x > 0){
				this.velocity.add(newVector(0.5,-0.2));
			} else if(responseVector.x < 0){
				this.velocity.add(newVector(-0.5,-0.2));
			}
		} else {
			this.coords.add(responseVector);
			if(responseVector.x > 0 && this.velocity.x < 0){
				this.velocity.x	= 0;		
			}else if(responseVector.x < 0 && this.velocity.x > 0){
				this.velocity.x	= 0;		
			}
			if(responseVector.y > 0 && this.velocity.y < 0){
				this.onGround = true;
				this.velocity.y	= 0;
			}else if(responseVector.y < 0 && this.velocity.y > 0){
				this.velocity.y	= 0;
				if(this.velocity.x > 0.1) this.velocity.x -= 0.1;
				else if(this.velocity.x < -0.1) this.velocity.x += 0.1;
				if(this.velocity.x > -0.1 || this.velocity.x < 0.1) this.velocity.x = 0;
			}
		}
		
		this.resVec = responseVector;
	}
	newEnt.draw = function(origin){
		theContext.fillStyle = "#995533";
		theContext.fillRect(this.aabb.x + origin.x, this.aabb.y + origin.y, this.aabb.w, this.aabb.h);
	}
	
	return newEnt;
}


function newSpiderGrappleEntity(x,y){
	var newEnt = Object.create(GameEntity);
	newEnt.coords = newVector(x,y);
	newEnt.velocity = newVector(0,0);
	newEnt.radius = 0;
	newEnt.aabb = newBox(x - 10, y - 10, 20, 20);
	newEnt.acceleration = newVector(0,0);
	newEnt.fixed = true;
	newEnt.isGrapplePoint = true;
	newEnt.draw = function(origin){
		//theContext.strokeStyle = "#000000";
        theContext.fillStyle = "#FF0000";
        
        theContext.fillRect(this.aabb.x + origin.x,this.aabb.y + origin.y,this.aabb.w,this.aabb.h);
	}
	
	return newEnt;
}

// this entity follows the spider and detects when you are close to a grapple
// point
function newSpiderDetectEntity(radius, player){
	var newEnt = Object.create(GameEntity);
	newEnt.coords = newVector(mouseX,mouseY);
	newEnt.velocity = newVector(0,0);
	newEnt.acceleration = newVector(0,0);
	
	newEnt.radius = radius;
	
	newEnt.virtual = true;
	newEnt.contactGrapplePoint = null;
		
	newEnt.fixed = false;
	newEnt.player = player;

	
	newEnt.update = function(elapsedTime){
		// if we are not a spider, don't do anything...
		if(this.player.form !== 's' ){
			this.player._sGrpPnt  = null;
			
			return;		
		}
		
		this.coords.x = this.player.coords.x;//mouseX - origin.x;
		this.coords.y = this.player.coords.y;//mouseY - origin.y;
		
		
		
		//this.player._sGrpPnt  = null;
		
		
		
	}
	
	newEnt.collisionResponse = function(responseVector, other){
		if(vectorError(responseVector) ){
			return;
		}
		
		if(other.isGrapplePoint){
			this.player._sGrpPnt = other;
		}
		
		this.resVec = responseVector; 
	}
	
	newEnt.draw = function(origin){
		if(this.player.form !== "s" ){
			
			return;	
		}
		if(this.player._sGrpPnt){
		    theContext.strokeStyle = "#FF0000";
		} else {
			theContext.strokeStyle = "#00FF00";
		}        
        
		theContext.beginPath();
		theContext.arc(this.coords.x + origin.x , this.coords.y + origin.y, this.radius, 0, 2*Math.PI);
		theContext.stroke();
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
	newEnt.isPlayer = true;
	//set the form value to the current animal form
	newEnt.form = "h";
	newEnt.kick = newKickEntity(-5000,-5000,20,newEnt.radius * 2)	//entity used to "kick" blocks around
	spawnNewEntity(newEnt.kick,staticList);
	newEnt.direction = 1;
	newEnt.impX = 0.3; // impulsive x velocity, 
	newEnt.maxRun = 0.5; // maximum run speed,  
	newEnt.impY = -0.6; // impulsive x velocity, used for jumps
	newEnt.maxFall = 0.5; // maximum fall rate.
	
	// SPIDER STUFF
	newEnt._sState = 0; // current state of the spiders swing
	newEnt._sL = 100; // length of the spider thread for swinging
	newEnt._sE = 0; // total starting swing energy of the spider. Kinetic + potential 
	newEnt._sVa = 0; // starting velociy of the swing, t in n-t coordinates  
	newEnt._sVb = 0; // current velocity of the swing, t in n-t coordinates
	newEnt._sM = 0; // mass of the spider
	newEnt._sA = 0; // current angle of the spider swing 
	newEnt._sGrpPnt = null; // the grapple point of the spider  
	
	// KANGAROO STUFF
	newEnt._kJumps = 0;	//number of jumps available
	newEnt._kJumpA = 0;	//jump acceleration
	newEnt._kdTime = 0;	//current airtime used for disabling doublejump on falls
	
	// SQUIRREL STUFF
	newEnt._ropeState = 0;	//current state of ropeclimbingness
	
	
	spawnNewEntity(newSpiderDetectEntity(newEnt._sL, newEnt), dynamicList);
	
	newEnt.update = function(elapsedTime){
		//press 1 for human
		if(keydown(49)){
			if(this.form != "h"){
				hSound.cloneNode(true).play();
				this.form = "h";
				this.impX = 0.3; // impulsive x velocity, 
				this.maxRun = 0.5; // maximum run speed,  
				this.impY = -0.6; // impulsive x velocity, used for jumps
				this.maxFall = 0.5; // maximum fall rate.
			}
		} 
		//press 2 for cheetah
		else if(keydown(50)){
			if(this.form != "c"){
				cSound.cloneNode(true).play();
				this.form = "c";
				this.impX = 0.3; // impulsive x velocity, 
				this.maxRun = 0.5; // maximum run speed,  
				this.impY = -0.5; // impulsive x velocity, used for jumps
				this.maxFall = 0.5; // maximum fall rate.
			}
		} 
		//press 3 for flying squirrel
		else if(keydown(51)){
			this.form = "f";
			this.impX = 0.3;
			this.maxRun = 0.5;
			this.impY = -0.3;
		}
		//press 4 for kangaroo
		else if(keydown(52)){
			if(this.form != "k"){
				kSound.cloneNode(true).play();
				this.form = "k";
			
				this.maxRun = 0.1; // maximum run speed,  
				this.impY = 0.0; // zero out inpulsive velocity because we will 
								 // be doing our own jumps for the kangaroo 
			}
		}
		//press 5 for spider
		else if(keydown(53)){
			this.form = "s";
			//console.log("Spider Mode Activated");
			this.impX = 0.3; // impulsive x velocity, 
			this.maxRun = 0.5; // maximum run speed,  
			this.impY = -0.3; // impulsive x velocity, used for jumps
			this.maxFall = 0.5; // maximum fall rate.
			this._sState = 0; // starting state of the spider
		}
		
		
		// we set the velocity on a key hit, rather than continuously on a 
		// key down so that if you swich animals you maintain your velocity 
		
		if(keyhit(65)){
		    this.direction = -1;
			this.velocity.x = - this.impX;
		} else if (keyhit(68)){
		    this.velocity.x = this.impX;
			this.direction = 1;
		} else if(keydown(65)){
			this.direction = -1;
			
		} else if(keydown(68)){
			this.direction = 1;
		} else {
			this.velocity.x = 0;
		}
			
		
		
		//human form movement
		if(this.form == "h"){
			// apply impulse to velocity. Animals that override the default behavior
			// should set the impulse to 0 
			if(keydown(32) && this.onGround){
				this.velocity.y = this.impY;
				hJumpSound.cloneNode(true).play();
								
			}
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
				if(tvx <= -.8 && this.wasGround && !this.onGround){
					tvy = -.4;
				}
			}else if(keydown(68)){
				if(tvx == 0){
					tvx = .3;
					
				//can only accelerate while on the ground	
				} else if(tvx < .8  && this.onGround){    
					tvx += .1;
				} 
				this.direction = 1;
				if(tvx >= .8 && this.wasGround && !this.onGround){
					tvy = -.4;
				}
			} else {
				tvx = 0;
			}
			
			// apply impulse to velocity. 
			if(keydown(32) && this.onGround){
				tvy = -.4;
			}
			
			this.velocity.x = tvx;
			this.velocity.y = tvy;
			
			
		//flying squirrel movement 
		} else if(this.form == "f"){
			if(this.onGround){	//ground motion
				if(keydown(32)) this.velocity.y = this.impY;
			} else {	//aerial motion
				
			}
			
		//kangaroo movement	
		} else if(this.form == "k"){
			
			//ground motion
			if(this.onGround){
			
				this.maxRun = 0.2; // maximum run speed,  
				this.impY = 0.0; // impulsive x velocity, used for jumps
				
				this._kJumps = 2;
				this._kdTime = 0;
				if(keydown(65) || keydown(68)){	//left or right hops
					this.velocity.y -= .2;
					this.velocity.x = this.impX * this.direction;
				
				} else {
				    this.velocity.x = 0;	//stops movement on ground
				} 
			}
			//aerial motion
			else{
				this.impX = 0.2; // impulsive x velocity,
				
			}
			
			//jumps
			if(keyhit(32) && this._kJumps > 0){	//initial jump-off
				this.velocity.y = -.6;
				this._kJumps--;
				kJumpSound.cloneNode(true).play();
			}
			
			if(this._kJumps == 2 && this._kdTime < 10){
				this._kdTime++;
			} else if(this._kJumps == 2) {
				this._kJumps = 1;
			} 
			
			//kick
			if(keyhit(69)){
				this.kick.coords.x = this.coords.x + this.radius * this.direction;
				this.kick.coords.y = this.coords.y;
				this.kick.aabb.x = this.coords.x + this.radius * this.direction - this.kick.aabb.w / 2;
				this.kick.aabb.y = this.coords.y - this.kick.aabb.h / 2;
				this.kick.active = true;
				this.kick.virtual = false;
			}
		
		//spider movement	
		} else if(this.form === "s"){
			if(keydown(32) && this.onGround){
				this.velocity.y = this.impY;
			}
			
			if (this._sState === 0){
			    // have we clicked on a grapple point when the spider not already
				// connected to one?
				if(this._sGrpPnt && keydown(32)){
					// are we close enough to reach it?
					//console.log("potential grapple contact: " + LenComp(this.player.coords, this._sGrpPnt.coords, this.player._sL));
					if(LenComp(this.coords, this._sGrpPnt.coords, this._sL)){
						//this._sGrpPnt = this.contactGrapplePoint;
						this._sState = 1;
						console.log("Grapple Contact!");						
					}									
				
				}
			
			} else if (this._sState === 1){
			    if(! LenComp(this.coords, this._sGrpPnt.coords, this._sL)){
					this._sState = 0;		
				}
			}	
		}
		
		this.velocity.add(vScalarMult(elapsedTime,this.acceleration))
		if(this.velocity.y > .5){
		   this.velocity.y = .5;
		} else if(this.velocity.y > .1 && this.form == 'f' && keydown(32)){
			this.velocity.y = .1;
		}
		this.coords.add(vScalarMult(elapsedTime,this.velocity));
		this.wasGround = this.onGround;	//used to check if cheetah just left ground
		this.onGround = false;
		
		
		if( (this.coords.y + origin.y) >= 400){
			origin.y = -this.coords.y + 400;		
		} else if( (this.coords.y + origin.y) <= 200){
			origin.y = -this.coords.y + 200;		
		}
		// = ( - 300) * -0.5;
		
		origin.x = -this.coords.x + 400;
		origin.y = Math.floor(origin.y);
		origin.x = Math.floor(origin.x);
		return STATE_ALIVE;
	}
	
	newEnt.collisionResponse = function(responseVector, other){
		
		// not sure if we need to do this. Was trying to stop the disapearing 
		// ball problem
		if(vectorError(responseVector) ){
			return;
		}
	
		if(other.isDeadly && this.checkpoint ){
			// careful, if we did this.coords = this.checkpoint.coords, we 
			// would cause the checkpoint to move along with the player.
			this.coords.x = this.checkpoint.coords.x;
			this.coords.y = this.checkpoint.coords.y; 			
		}
		if(other.isKick) return;
		if(other.isRope){
			if(this.form != "f") return;
			//TODO: SQUIRREL ROPE CODE
		}
		
		// move so we are not colliding anymore
		this.coords.add(responseVector);
		
		
		//We consider ourselves "on the ground" if there is something to push on.		 
		
		if(responseVector.y < 0){
			this.onGround = true;
			
		}
		
		// if we bump an opposing force, stop. This is not entirely physicly
		// correct but will work for the most part.
		/*if(responseVector.x > 0 && this.velocity.x < 0){
			this.velocity.x	= 0;		
		}else if(responseVector.x < 0 && this.velocity.x > 0){
			this.velocity.x	= 0;		
		} */                       // removed because it messes up the kangaroo
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
					theContext.drawImage(kangaroo1L,this.coords.x - kangaroo1R.width/2 + origin.x,this.coords.y - kangaroo1R.height/2 + origin.y);
				} else {
				    theContext.drawImage(kangaroo1R,this.coords.x - kangaroo1R.width/2 + origin.x,this.coords.y - kangaroo1R.height/2 + origin.y);
				}
			} else {
				if(this.direction === -1){
					theContext.drawImage(kangaroo2L,this.coords.x - kangaroo1R.width/2 + origin.x,this.coords.y - kangaroo1R.height/2 + origin.y);
				} else {
				    theContext.drawImage(kangaroo2R,this.coords.x - kangaroo1R.width/2 + origin.x,this.coords.y - kangaroo1R.height/2 + origin.y);
				}
			}
		} else if(this.form == "h"){
			theContext.drawImage(human1,this.coords.x - human1.width/2 + origin.x,this.coords.y - human1.height/2 + origin.y);
			
			/* NOTE: this code flips the sprite upside-down. Just leaving it here for reference
			theContext.translate(this.coords.x + origin.x,this.coords.y + origin.y);
			theContext.rotate(Math.PI);
			theContext.drawImage(kangaroo1R,-human1.width/2,-human1.height/2);
			theContext.rotate(-Math.PI);
			theContext.translate(-this.coords.x - origin.x,-this.coords.y - origin.y);
			*/
		} else if(this.form == "c"){
			if(this.direction === -1){
				theContext.drawImage(CheetahL,this.coords.x - CheetahR.width/2 + origin.x,this.coords.y - CheetahR.height/2 + origin.y);
			} else {
			    theContext.drawImage(CheetahR,this.coords.x - CheetahR.width/2 + origin.x,this.coords.y - CheetahR.height/2 + origin.y);
			}
		} else if(this.form == "f"){
			theContext.fillStyle = "#FFBB00";
			theContext.beginPath();
			theContext.arc(this.coords.x + origin.x , this.coords.y + origin.y, this.radius, 0, 2*Math.PI);
			theContext.fill();
		} else if (this.form === "s"){
			theContext.fillStyle = "#FF6600";
			//theContext.fillRect(this.coords.x + -this.radius/2 + origin.x, this.coords.y + -this.radius/2 + origin.y,  this.radius * 2,  this.radius * 2);
			theContext.beginPath();
			theContext.arc(this.coords.x + origin.x , this.coords.y + origin.y, this.radius, 0, 2*Math.PI);
			theContext.fill();
			if(this._sState === 1){
			
				theContext.strokeStyle = "#000000";
				theContext.beginPath();
				theContext.moveTo(this._sGrpPnt.coords.x + origin.x, this._sGrpPnt.coords.y + origin.y);
				theContext.lineTo(this.coords.x + origin.x, this.coords.y + origin.y);
				theContext.stroke();
			}
		
		}
		
		
	}
	
	return newEnt;
		
}

/**
 * Object used to "kick" movables around in kangaroo form. 
 */
function newKickEntity(x,y,w,h){	//fake entity that is used to kick crates around.
	var newEnt = Object.create(GameEntity);
	newEnt.coords = newVector(x,y);
	newEnt.radius = w/2;
	newEnt.velocity = newVector(0,0);
	newEnt.acceleration = newVector(0,0);
	newEnt.aabb = newBox(x-w/2,y-h/2,w,h);
	newEnt.isKick = true;
	newEnt.active = false;
	newEnt.update = function(eTime){
		if(this.active) {
		
		this.active = false;	//only active for a single frame
		this.virtual = true; // keep us from 
		} /* else {	//when not active stows self away for later
			this.coords.x = -5000;
			this.coords.y = -5000;
		}   */
		this.aabb.x = this.coords.x - this.aabb.w;
		this.aabb.y = this.coords.y - this.aabb.h;
	}
	newEnt.collisionResponse = function(responseVector, other){	//unaffected by collisions
		if(vectorError(responseVector) ){
			return;
		}
		this.resVec = responseVector;
	}
	newEnt.draw = function(origin){}	//object is not drawn
	return newEnt;
}

var PathNode = {
	coords : null,
	next : null
};
var Path = {
	nextNode : null,
	moveTrack : function(startcor, speed, eTime){
		var dist = speed * eTime;
		var tNext = vAdd(vScalarMult(-1,startcor),this.nextNode.coords);
		if(tNext.length() > dist){
			tNext = vScalarMult(dist / tNext.length(), tNext);
		} else {
			this.nextNode = this.nextNode.next;
		}
		return tNext;
		
	}
};
function newPath(coordList){
	var nPath = Object.create(Path);
	pNode = null;
	nNode = null;
	for(i = 0; i < coordList.length; i++){
		nNode = Object.create(PathNode);
		nNode.coords = coordList[i];
		if(pNode != null){
			pNode.next = nNode;
		} else {
			nPath.nextNode = nNode;
		}
		pNode = nNode;
	}
	nNode.next = nPath.nextNode;
	return nPath;
}

/**
 * Wrapper object that causes the enclosed object to move along a set path at a set velocity. 
 */
function newPathEntity(ent, path, speed){
	var newEnt = Object.create(GameEntity);
	newEnt.object = ent;
	newEnt.path = path;
	newEnt.speed = speed;
	newEnt.coords = ent.coords;
	newEnt.radius = ent.radius;
	newEnt.velocity = ent.velocity;
	newEnt.acceleration = ent.acceleration;
	if(ent.aabb != null) newEnt.aabb = ent.aabb;
	newEnt.fixed = ent.fixed;
	newEnt.virtual = ent.virtual;
	newEnt.isDeadly = ent.isDeadly;
	newEnt.isMovable = ent.isMovable;
	newEnt.isGrapplePoint = ent.isGrapplePoint;
	newEnt.isRope = ent.isRope;
	newEnt.update = function(eTime){
		var reply = this.object.update(eTime);
		var change = this.path.moveTrack(this.object.coords, this.speed, eTime);
		this.object.coords.add(change);
		this.object.aabb.x += change.x;
		this.object.aabb.y += change.y;
		
		this.coords = this.object.coords;
		this.velocity = this.object.velocity;
		this.acceleration = this.object.acceleration;
		if(this.aabb != null) this.aabb = this.object.aabb;
		this.fixed = this.object.fixed;
		this.virtual = this.object.virtual;
		return reply;
	}
	newEnt.collisionResponse = function(responseVector, other){
		this.object.collisionResponse(responseVector, other)
		this.resVec = this.object.resVec;
	}
	newEnt.draw = function(origin){
		this.object.draw(origin);
	}
	
	return newEnt;
}
