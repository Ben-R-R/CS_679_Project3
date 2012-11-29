/*====================================================================
  _   _                                _     
 | | | |_   _ _ __ ___   __ _ _ __    (_)___ 
 | |_| | | | | '_ ` _ \ / _` | '_ \   | / __|
 |  _  | |_| | | | | | | (_| | | | |_ | \__ \
 |_| |_|\__,_|_| |_| |_|\__,_|_| |_(_)/ |___/
                                    |__/     
======================================================================
Contains the Human parts of the player entity.

human variable prefex is '_c' 

=====================================================================*/

// initialize the human specific parts of the entity
// the 'this' keyword does not refer to the player entity, use newEnt
// as you would in a normal constructor function. 
function initHuman(newEnt){


}

// called when the human entity activated.
// purpose is to set any local or player entity level state variables
// you can use the 'this' keyword as you normally would. 
function human_enter(){

}

// called when human entity is deactivated
// purpose is to reset local and player entity level state variables
// you can use the 'this' keyword as you normally would. 
function human_leave(){

}

// called from the update method of the player entity when the human is active.
// you can use the 'this' keyword as you normally would. 
function human_update(elapsedTime){
		
}

// called as the collisionResponse method of the player entity when the human 
// is active
// you can use the 'this' keyword as you normally would. 
function human_collisionResponse(responseVector, other){

}

// called as the draw method of the the player entity when the human is active
// you can use the 'this' keyword as you normally would. 
function human_draw(origin){

}