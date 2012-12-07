/*=================================================================
   ____ _               _        _        _     
  / ___| |__   ___  ___| |_ __ _| |__    (_)___ 
 | |   | '_ \ / _ \/ _ \ __/ _` | '_ \   | / __|
 | |___| | | |  __/  __/ || (_| | | | |_ | \__ \
  \____|_| |_|\___|\___|\__\__,_|_| |_(_)/ |___/
                                       |__/     
===================================================================

Contains the Cheetah parts of the player entity.

cheetah variable prefex is '_c' 

=================================================================*/

// initialize the cheetah specific parts of the entity
// the 'this' keyword does not refer to the player entity, use newEnt
// as you would in a normal constructor function. 
function initCheetah(newEnt){


}

// called when the cheetah power is activated.
// purpose is to set any local or player entity level state variables
// you can use the 'this' keyword as you normally would. 
// it is posible that this method could be called when the player's animal
// power is already cheetah. If you wish to avoid having state variables reset,
// be sure to test for that
// 'this.form' will be the _previous_ power. 
// you shouldn't modify this.form in this method.
function cheetah_enter(){
	if(this.form != "c"){
		cSound.cloneNode(true).play();
	
		this.impX = 0.3; // impulsive x velocity, 
		this.maxRun = 0.5; // maximum run speed,  
		this.impY = -0.5; // impulsive x velocity, used for jumps
		this.maxFall = 0.5; // maximum fall rate.
	}
}

// called when cheetah power is deactivated
// purpose is to reset local and player entity level state variables
// you can use the 'this' keyword as you normally would.
// in contrast to cheetah_enter(), this method will ONLY be called on switching
// to a different power.
// This method will be called _before_ the new power's enter method. 
function cheetah_leave(){

}

// called from the update method of the player entity when the cheetah is active.
// you can use the 'this' keyword as you normally would. 
function cheetah_update(elapsedTime){
	if(keyhit(MOVE_LEFT_KEY)){
	    this.direction = -1;
		this.velocity.x = - this.impX;
	} else if (keyhit(MOVE_RIGHT_KEY)){
	    this.velocity.x = this.impX;
		this.direction = 1;
	} else if(keydown(MOVE_LEFT_KEY)){
		this.direction = -1;
		
	} else if(keydown(MOVE_RIGHT_KEY)){
		this.direction = 1;
	} else {
		this.velocity.x = 0;
	}

	var tvx = this.velocity.x;
	var tvy = this.velocity.y;
	
	if(keydown(MOVE_LEFT_KEY)){
		if(tvx == 0){
			tvx = -.3;
		
		//can only accelerate while on the ground
		} else if(tvx > -.8 && this.onGround){
			tvx -= .1;
		}
		this.direction = -1;
		if(tvx <= -.8 && this.wasGround && !this.onGround && keydown(JUMP_KEY)){
			tvy = -.4;
		}
	}else if(keydown(MOVE_RIGHT_KEY)){
		if(tvx == 0){
			tvx = .3;
			
		//can only accelerate while on the ground	
		} else if(tvx < .8  && this.onGround){    
			tvx += .1;
		} 
		this.direction = 1;
		if(tvx >= .8 && this.wasGround && !this.onGround && keydown(JUMP_KEY)){
			tvy = -.4;
		}
	} else {
		tvx = 0;
	}
	
	// apply impulse to velocity. 
	if(keyhit(JUMP_KEY) && this.onGround){
		tvy = -.4;
	}
	
	this.velocity.x = tvx;
	this.velocity.y = tvy;
	
	this.velocity.add(vScalarMult(elapsedTime,this.acceleration))
	if(this.velocity.y > .5){
	   this.velocity.y = .5;
	} else if(this.velocity.y > .1 && this.form == 'f' && keydown(32)){
		this.velocity.y = .1;
	}
	this.coords.add(vScalarMult(elapsedTime,this.velocity));		
}

// called as the collisionResponse method of the player entity when the cheetah 
// is active
// you can use the 'this' keyword as you normally would. 
function cheetah_collisionResponse(responseVector, other){
	if(other.isDeadly && this.checkpoint ){
		// careful, if we did this.coords = this.checkpoint.coords, we 
		// would cause the checkpoint to move along with the player.
		this.coords.x = this.checkpoint.coords.x;
		this.coords.y = this.checkpoint.coords.y; 			
	}
	if(other.isKick) return;
	if(other.isRope) return;
	
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

// called as the draw method of the the player entity when the cheetah is active
// you can use the 'this' keyword as you normally would. 
function cheetah_draw(origin){
	if(this.direction === -1){
		theContext.drawImage(CheetahL,this.coords.x - CheetahR.width/2 + origin.x,this.coords.y - CheetahR.height/2 + origin.y);
	} else {
	    theContext.drawImage(CheetahR,this.coords.x - CheetahR.width/2 + origin.x,this.coords.y - CheetahR.height/2 + origin.y);
	}
}
