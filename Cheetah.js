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

// called when the cheetah entity activated.
// purpose is to set any local or player entity level state variables
// you can use the 'this' keyword as you normally would. 
// it is posible that this method could be called when the player's animal
// power is already cheetah. If you wish to avoid having state variables reset,
// be sure to test for that
// 'this.form' will be the _previous_ power. 
// you shouldn't modify this.form in this method.
function cheetah_enter(){

}

// called when cheetah entity is deactivated
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
		
}

// called as the collisionResponse method of the player entity when the cheetah 
// is active
// you can use the 'this' keyword as you normally would. 
function cheetah_collisionResponse(responseVector, other){

}

// called as the draw method of the the player entity when the cheetah is active
// you can use the 'this' keyword as you normally would. 
function cheetah_draw(origin){

}
