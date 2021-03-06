/*=================================================================
  _  __                                         _     
 | |/ /__ _ _ __   __ _  __ _ _ __ ___   ___   (_)___ 
 | ' // _` | '_ \ / _` |/ _` | '__/ _ \ / _ \  | / __|
 | . \ (_| | | | | (_| | (_| | | | (_) | (_) | | \__ \
 |_|\_\__,_|_| |_|\__, |\__,_|_|  \___/ \___(_)/ |___/
                  |___/                      |__/     
===================================================================

Contains the Kangaroo parts of the player entity.
                  
kangaroo variable prefex is '_k' 

=================================================================*/

// initialize the kangaroo specific parts of the entity
// the 'this' keyword does not refer to the player entity, use newEnt
// as you would in a normal constructor function. 
function initKangaroo(newEnt){
	
	newEnt.kick = newKickEntity(-5000,-5000,20,newEnt.radius * 2)	//entity used to "kick" blocks around
	spawnNewEntity(newEnt.kick,staticList);
	
	newEnt._kJumps = 0;	//number of jumps available
	newEnt._kJumpA = 0;	//jump acceleration
	newEnt._kdTime = 0;	//current airtime used for disabling doublejump on falls
	newEnt._kdY = 0;	//y-coordinate of last time on ground, used for disabling doublejump
}

// called when the kangaroo power is activated.
// purpose is to set any local or player entity level state variables
// you can use the 'this' keyword as you normally would.
// it is posible that this method could be called when the player's animal
// power is already kangaroo. If you wish to avoid having state variables reset,
// be sure to test for that. 
// 'this.form' will be the _previous_ power. 
// you shouldn't modify this.form in this method.
function kangaroo_enter(){
   	if(this.form != "k"){
		if(!mute){
			kSound.cloneNode(true).play();
		}
		
				
		this.maxRun = 0.1; // maximum run speed,  
		this.impY = 0.0; // zero out inpulsive velocity because we will 
						// be doing our own jumps for the kangaroo			
	}
	
}

// Called when kangaroo power is deactivated.
// Purpose is to reset local and player entity level state variables.
// You can use the 'this' keyword as you normally would. 
// In contrast to kangaroo_enter(), this method will ONLY be called on switching
// to a different power.
// This method will be called _before_ the new power's enter method.   
function kangaroo_leave(){
	
}

// called from the update method of the player entity when the kangaroo is active.
// you can use the 'this' keyword as you normally would. 
function kangaroo_update(elapsedTime){
	
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
	
	//ground motion
	if(this.onGround){
	
		this.maxRun = 0.2; // maximum run speed,  
		this.impY = 0.0; // impulsive x velocity, used for jumps
		
		this._kJumps = 2;
		this._kdTime = 0;
		this._kdY = this.coords.y;
		if(keydown(MOVE_LEFT_KEY) || keydown(MOVE_RIGHT_KEY)){	//left or right hops
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
	if(keyhit(JUMP_KEY) && this._kJumps > 0){	//initial jump-off
		this.velocity.y = -.6;
		this._kJumps--;
		if(!mute){
			kJumpSound.cloneNode(true).play();
		}
	}
	
	if(this._kJumps == 2 && this._kdTime < 3){
		if(this.coords.y > this._kdY) this._kdTime++;
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
	
	this.velocity.add(vScalarMult(elapsedTime,this.acceleration))
	if(this.velocity.y > .5){
	   this.velocity.y = .5;
	} else if(this.velocity.y > .1 && this.form == 'f' && keydown(32)){
		this.velocity.y = .1;
	}
	this.coords.add(vScalarMult(elapsedTime,this.velocity));		
}

// called as the collisionResponse method of the player entity when the kangaroo 
// is active
// you can use the 'this' keyword as you normally would. 
function kangaroo_collisionResponse(responseVector, other){
	if(other.isDeadly && this.checkpoint ){
		// careful, if we did this.coords = this.checkpoint.coords, we 
		// would cause the checkpoint to move along with the player.
		this.coords.x = this.checkpoint.coords.x;
		this.coords.y = this.checkpoint.coords.y;
		PowerQueue.restoreQueueFromBackup(); 			
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

// called as the draw method of the the player entity when the kangaroo is active
// you can use the 'this' keyword as you normally would. 
function kangaroo_draw(origin){
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
}
