/*============================================================================= 
  _____ _       _             ____              _               _    _     
 |  ___| |_   _(_)_ __   __ _/ ___|  __ _ _   _(_)_ __ _ __ ___| |  (_)___ 
 | |_  | | | | | | '_ \ / _` \___ \ / _` | | | | | '__| '__/ _ \ |  | / __|
 |  _| | | |_| | | | | | (_| |___) | (_| | |_| | | |  | | |  __/ |_ | \__ \
 |_|   |_|\__, |_|_| |_|\__, |____/ \__, |\__,_|_|_|  |_|  \___|_(_)/ |___/
          |___/         |___/          |_|                        |__/     
===============================================================================

Contains the Flying Squirrel parts of the player entity.

flying squirrel variable prefex is '_f' 

==============================================================================*/

// initialize the flying squirrel specific parts of the entity
// the 'this' keyword does not refer to the player entity, use newEnt
// as you would in a normal constructor function. 
function initFlyingSquirrel(newEnt){


}

// called when the flying squirrel power is activated.
// purpose is to set any local or player entity level state variables
// you can use the 'this' keyword as you normally would.
// it is posible that this method could be called when the player's animal
// power is already flying squirrel. If you wish to avoid having state variables reset,
// be sure to test for that.
// 'this.form' will be the _previous_ power. 
// you shouldn't modify this.form in this method. 
function flyingSquirrel_enter(){
	this.impX = 0.3;
	this.maxRun = 0.5;
	this.impY = -0.3;
}

// called when flying squirrel power is deactivated
// purpose is to reset local and player entity level state variables
// you can use the 'this' keyword as you normally would.
// in contrast to flyingSquirrel_enter(), this method will ONLY be called on switching
// to a different power.   
// This method will be called _before_ the new power's enter method. 
function flyingSquirrel_leave(){

}

// called from the update method of the player entity when the flying squirrel is active.
// you can use the 'this' keyword as you normally would. 
function flyingSquirrel_update(elapsedTime){
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
	
	if(this.onGround){	//ground motion
		if(keydown(32)) this.velocity.y = this.impY;
	} else {	//aerial motion
				
	}
	
	this.velocity.add(vScalarMult(elapsedTime,this.acceleration))
	if(this.velocity.y > .5){
	   this.velocity.y = .5;
	} else if(this.velocity.y > .1 && this.form == 'f' && keydown(32)){
		this.velocity.y = .1;
	}
	this.coords.add(vScalarMult(elapsedTime,this.velocity));		
}

// called as the collisionResponse method of the player entity when the flying squirrel 
// is active
// you can use the 'this' keyword as you normally would. 
function flyingSquirrel_collisionResponse(responseVector, other){

}

// called as the draw method of the the player entity when the flying squirrel is active
// you can use the 'this' keyword as you normally would. 
function flyingSquirrel_draw(origin){

}