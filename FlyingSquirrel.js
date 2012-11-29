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

// called when the flying squirrel entity activated.
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

// called when flying squirrel entity is deactivated
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