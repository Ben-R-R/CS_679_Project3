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


}

// called when the kangaroo entity activated.
// purpose is to set any local or player entity level state variables
// you can use the 'this' keyword as you normally would. 
function kangaroo_enter(){

}

// called when kangaroo entity is deactivated
// purpose is to reset local and player entity level state variables
// you can use the 'this' keyword as you normally would. 
function kangaroo_leave(){

}

// called from the update method of the player entity when the kangaroo is active.
// you can use the 'this' keyword as you normally would. 
function kangaroo_update(elapsedTime){
		
}

// called as the collisionResponse method of the player entity when the kangaroo 
// is active
// you can use the 'this' keyword as you normally would. 
function kangaroo_collisionResponse(responseVector, other){

}

// called as the draw method of the the player entity when the kangaroo is active
// you can use the 'this' keyword as you normally would. 
function kangaroo_draw(origin){

}
