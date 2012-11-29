/*====================================================================
  _   _                                _     
 | | | |_   _ _ __ ___   __ _ _ __    (_)___ 
 | |_| | | | | '_ ` _ \ / _` | '_ \   | / __|
 |  _  | |_| | | | | | | (_| | | | |_ | \__ \
 |_| |_|\__,_|_| |_| |_|\__,_|_| |_(_)/ |___/
                                    |__/     
======================================================================
Contains the Human parts of the player entity.

human variable prefex is '_h' 

=====================================================================*/

// initialize the human specific parts of the entity
// the 'this' keyword does not refer to the player entity, use newEnt
// as you would in a normal constructor function. 
function initHuman(newEnt){


}

// called when the human power is activated.
// purpose is to set any local or player entity level state variables
// you can use the 'this' keyword as you normally would.
// it is posible that this method could be called when the player's animal
// power is already human. If you wish to avoid having state variables reset,
// be sure to test for that.
// 'this.form' will be the _previous_ power. 
// you shouldn't modify this.form in this method. 
function human_enter(){
	if(this.form != "h"){
		hSound.cloneNode(true).play();

		this.impX = 0.3; // impulsive x velocity, 
		this.maxRun = 0.5; // maximum run speed,  
		this.impY = -0.6; // impulsive x velocity, used for jumps
		this.maxFall = 0.5; // maximum fall rate.
	}
}

// called when human power is deactivated
// purpose is to reset local and player entity level state variables
// you can use the 'this' keyword as you normally would.
// in contrast to human_enter(), this method will ONLY be called on switching
// to a different power. 
// This method will be called _before_ the new power's enter method.  
function human_leave(){

}

// called from the update method of the player entity when the human is active.
// you can use the 'this' keyword as you normally would. 
function human_update(elapsedTime){
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
	// apply impulse to velocity. Animals that override the default behavior
	// should set the impulse to 0 
	if(keydown(32) && this.onGround){
		this.velocity.y = this.impY;
		hJumpSound.cloneNode(true).play();
						
	}
	
	this.velocity.add(vScalarMult(elapsedTime,this.acceleration))
	if(this.velocity.y > .5){
	   this.velocity.y = .5;
	} else if(this.velocity.y > .1 && this.form == 'f' && keydown(32)){
		this.velocity.y = .1;
	}
	this.coords.add(vScalarMult(elapsedTime,this.velocity));		
}

// called as the collisionResponse method of the player entity when the human 
// is active
// you can use the 'this' keyword as you normally would. 
function human_collisionResponse(responseVector, other){
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

// called as the draw method of the the player entity when the human is active
// you can use the 'this' keyword as you normally would. 
function human_draw(origin){
	theContext.drawImage(human1,this.coords.x - human1.width/2 + origin.x,this.coords.y - human1.height/2 + origin.y);
			
}