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
}

// called when the kangaroo entity activated.
// purpose is to set any local or player entity level state variables
// you can use the 'this' keyword as you normally would.
// it is posible that this method could be called when the player's animal
// power is already kangaroo. If you wish to avoid having state variables reset,
// be sure to test for that. 
// 'this.form' will be the _previous_ power. 
// you shouldn't modify this.form in this method.
function kangaroo_enter(){
   	if(this.form != "k"){
		kSound.cloneNode(true).play();
		
				
		this.maxRun = 0.1; // maximum run speed,  
		this.impY = 0.0; // zero out inpulsive velocity because we will 
						// be doing our own jumps for the kangaroo			
	}
	
}

// called when kangaroo entity is deactivated
// purpose is to reset local and player entity level state variables
// you can use the 'this' keyword as you normally would. 
// in contrast to kangaroo_enter(), this method will ONLY be called on switching
// to a different power.
// This method will be called _before_ the new power's enter method.   
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
