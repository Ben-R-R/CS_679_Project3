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

}

// called when the spider entity activated.
// purpose is to set any local or player entity level state variables
// you can use the 'this' keyword as you normally would. 
function spider_enter(){

}

// called when spider entity is deactivated
// purpose is to reset local and player entity level state variables
// you can use the 'this' keyword as you normally would. 
function spider_leave(){

}

// called from the update method of the player entity when the spider is active.
// you can use the 'this' keyword as you normally would. 
function spider_update(elapsedTime){
		
}

// called as the collisionResponse method of the player entity when the spider 
// is active
// you can use the 'this' keyword as you normally would. 
function spider_collisionResponse(responseVector, other){

}

// called as the draw method of the the player entity when the spider is active
// you can use the 'this' keyword as you normally would. 
function spider_draw(origin){

}
