/*==================================================================
  ____        _     _           _     
 / ___| _ __ (_) __| | ___ _ __(_)___ 
 \___ \| '_ \| |/ _` |/ _ \ '__| / __|
  ___) | |_) | | (_| |  __/ |_ | \__ \
 |____/| .__/|_|\__,_|\___|_(_)/ |___/
       |_|                   |__/     
====================================================================

Contains the Spider parts of the player entity.

spider variable prefex is '_s' 

==================================================================*/

// initialize the spider specific parts of the entity
// the 'this' keyword does not refer to the player entity, use newEnt
// as you would in a normal constructor function. 
function initSpider(newEnt){
	newEnt._sState = 0; // current state of the spiders swing
	newEnt._sL = 100; // length of the spider thread for swinging
	newEnt._sLmax = 100; // maximum length of the spider swing
	newEnt._sE = 0; // total starting swing energy of the spider. Kinetic + potential
	newEnt._sYDatum = 0; // datum for mesuring the changes in potential energy
	newEnt._sVa = 0; // starting velociy of the swing, t in n-t coordinates  
	newEnt._sVb = 0; // current velocity of the swing, t in n-t coordinates
	newEnt._sM = 1; // mass of the spider
	newEnt._sA = 0; // current angle of the spider swing 
	newEnt._sGrpPnt = null; // the grapple point of the spider
	
	spawnNewEntity(newSpiderDetectEntity(newEnt._sLmax, newEnt), dynamicList);  

}

// called when the spider power is activated.
// purpose is to set any local or player entity level state variables
// you can use the 'this' keyword as you normally would. 
// it is posible that this method could be called when the player's animal
// power is already spider. If you wish to avoid having state variables reset,
// be sure to test for that.
// 'this.form' will be the _previous_ power. 
// you shouldn't modify this.form in this method.
function spider_enter(){
	//console.log("Spider Mode Activated");
	this.impX = 0.3; // impulsive x velocity, 
	this.maxRun = 0.5; // maximum run speed,  
	this.impY = -0.3; // impulsive x velocity, used for jumps
	this.maxFall = 0.5; // maximum fall rate.
	this._sState = 0; // starting state of the spider
}

// called when spider power is deactivated
// purpose is to reset local and player entity level state variables
// you can use the 'this' keyword as you normally would.
// in contrast to spider_enter(), this method will ONLY be called on switching
// to a different power.
// This method will be called _before_ the new power's enter method.    
function spider_leave(){

}

// called from the update method of the player entity when the spider is active.
// you can use the 'this' keyword as you normally would. 
function spider_update(elapsedTime){
	// on ground jumps
	if(keydown(32) && this.onGround){
		this.velocity.y = this.impY;
	}
	
	// falling through air 
	if (this._sState === 0){
	    if(this.onGround){
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
		} else {
		 	if(keydown(65)){
				this.direction = -1;
				this.velocity.x = Math.abs(this.velocity.x) * -1;
			} else if(keydown(68)){
				this.direction = 1;
				this.velocity.x = Math.abs(this.velocity.x)
			}
		}
		
		
		// have we clicked on a grapple point when the spider not already
		// connected to one?
		if(this._sGrpPnt && keydown(32)){
		
			// are we close enough to reach it?
			if(LenComp(this.coords, this._sGrpPnt.coords, this._sLmax)){
				
				
				
				var normVector = newVector(this._sGrpPnt.coords.x  - this.coords.x, this._sGrpPnt.coords.y  - this.coords.y)
				this._sL = normVector.length();
				// make sure there is tension on the rope
				if( vDot(normVector, this.velocity) >= 0){
				
					// get the angle of the swing
					this._sA = Math.atan2( normVector.x , normVector.y );
					
					// get a tangent unit vector							                             
					var tanVector = vOrthoNormal(normVector);
					tanVector.normalize();
					tanVector.scalarMult(-1);
					// figure out how much of the velocity will 
					// contribute to the radial velocity
					this._sVa = vDot(this.velocity, tanVector);

					// calculate the starting energy of the spider
					// potential energy = mgh = 0 // Let our currnet position be the datum
					// kinetic energy = (0.5)mv^2														
					this._sE = (0.5 * this._sM * Math.pow(this.velocity.length(), 2 ) );// + (this._sM * -this.coords.y * GRAVITY)
					
					this._sYDatum = this.coords.y;																				
					
					// on to the swinging! 
					this._sState = 2;	
					//this.disableMove = true;						
				} else {
					// if there is no tension on the rope, transition 
					// to state 1.
					
					this._sState = 1;
				}
				
				
				
			}									
		
		}
		
	// falling while connected to grapple point
	} else if (this._sState === 1){
	    if(! LenComp(this.coords, this._sGrpPnt.coords, this._sL)){
			this._sState = 0;		
		}
	} else if(this._sState === 2){
		this._sA += this._sVa / (this._sL * 0.1);
		this.coords.x = this._sGrpPnt.coords.x + Math.cos(this._sA) * this._sL;
		this.coords.y = this._sGrpPnt.coords.y + Math.sin(this._sA) * this._sL;
		if(!keydown(32)){
			
			this._sState = 0;
			this.velocity.x = -Math.sin(this._sA) * this._sVa;
			this.velocity.y = Math.cos(this._sA) * this._sVa;
			//this.disableMove = false;
		}
		 				
	}
	
	if(this._sState === 0 || this._sState === 1){
		this.velocity.add(vScalarMult(elapsedTime,this.acceleration))
		if(this.velocity.y > .5){
		   this.velocity.y = .5;
		} else if(this.velocity.y > .1 && this.form == 'f' && keydown(32)){
			this.velocity.y = .1;
		}
		this.coords.add(vScalarMult(elapsedTime,this.velocity));
	}
		
}

// called as the collisionResponse method of the player entity when the spider 
// is active
// you can use the 'this' keyword as you normally would. 
function spider_collisionResponse(responseVector, other){
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

// called as the draw method of the the player entity when the spider is active
// you can use the 'this' keyword as you normally would. 
function spider_draw(origin){
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
