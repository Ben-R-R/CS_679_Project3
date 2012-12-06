// entityManager.js

/**
 * This physics system is a merely a first order approximation.
 * 
 * First, entities are moved based on their current velocities. (This happens
 * inside the update() method) Any accelerations are also applied at this stage.
 * 
 * Second, entities are run through a single iteration of a collision-response 
 * cycle. A typical response is to displace the entity along the response 
 * vector, and adjust the velocity accordingly. It is posible that at the end 
 * of this step entities have, as a result of two collision responses, twice 
 * displaced themselves and ended up intersecting with another entity. However,
 * as long as the density of physics objects is kept to a minimum, this 
 * shouldn't be a problem. 
 * 
 * Finaly, the entities are drawn to the screen.              
 *
 *
 */


/**
 * List of static entities. It is not necessarily true that these entities
 * don't move, but the assumption will be that they do not need to collide 
 * with other entities in the static list.  
 */      
var staticList = null; 

/**
 * List of dynamic entities. Entities in this list will be checked for
 * collision with all entities in the staticList, and all other entities 
 * in the dynamicList. 
 */
var dynamicList = null;
 
/* This list is for entities that never interact with anything */
var sceneryList = null;

/* This list is for particles. Particles do not interact, and the list
 * size is capped to prevent slowdown from too many particles */                        
var particleList = null;

var MAX_PARTICLES = 500;

/**
 * Temporarily stores new entities in the case where they are spawned during
 * the iteration of their target list.  
 */ 
var tempStorageList = null

/**
 * initialize the entity manager.
 * 
 * Note the isIterating field we add to the lists, this 
 * is because we will often try to spawn new entities while we are iterating 
 * through the lists. The isIterating field will allow us to differ adding new
 * entities to the lists until we are through updating.  
 * */
function initEntityManager(){
	
	
	staticList = newList();
	staticList.isIterating = false; 
	
	dynamicList = newList();
	dynamicList.isIterating = false;
	 
	sceneryList = newList();
	sceneryList.isIterating = false;
	
	particleList = newList();
	particleList.isIterating = false;

	tempStorageList = newList();
	
	origin = newVector(100,-10);
} 

/**
 * you will need to have created the entity prior to calling this function
 * 
 * if E is a pre-created entity, and you want to add it to the static list, 
 * the call would look like this:
 * 
 * spawnNewEntity(E, staticList);  
 *  
 * */
function spawnNewEntity(entity, list){
	if(list.isIterating){
		tempStorageList.pushBack({ L : list, E : entity });		
	} else {
		list.pushBack(entity);
	}
}

/**
 * internal function that moves all the entities in the tempStorageList to
 * their proper lists.   
 * */
function addSpawnedEntities(){
	while(tempStorageList.size > 0){
		var temp = tempStorageList.popFront();
		temp[L].pushBack(temp[E]);
		
	}
}

function updateList(list,elapsedTime){
	
	var iter = list.iterator(); 
	list.isIterating = true;
	
	var tempEntity = null;
	
	while(iter.hasNext()){
		tempEntity = iter.next();
		
		if(tempEntity.update(elapsedTime) === STATE_DEAD){
			iter.removeCurrent();
		}
			
	}

	list.isIterating = false;
}

/**
 * This function moves and collides all game enities. Expects the time since 
 * the last call to this method as a parameter.  
 * */
function updateEntities(elapsedTime){
	
	
	//  S T A T I C    L I S T 
	updateList(staticList,elapsedTime); 

	//  D Y N A M I C   L I S T  
	updateList(dynamicList,elapsedTime);

	// S C E N E R Y   L I S T 
	updateList(sceneryList,elapsedTime);

	// P A R T I C L E   L I S T
	var iter = particleList.iterator(); 
	particleList.isIterating = true;
	var tempEntity = null;
	
	while(iter.hasNext()){
		tempEntity = iter.next();
		if(tempEntity.update(elapsedTime) === STATE_DEAD || particleList.size > MAX_PARTICLES){
			iter.removeCurrent();
		}	
	}

	particleList.isIterating = false;
	

	
	
	// this is O(n^2), but in the future we may be able to improve this: 
	//var staticIter = staticList.iterator();
	//var dynamicIter = staticList.iterator();
	
	for(statEnt in staticList){
		for(dynEnt in dynamicList){
			statEnt.collideWith(dynEnt);	
		}
	}
	
	//console.log(dynamicList);
	
	for(dynPair in dynamicList.pairs){
		
		 dynPair.A.collideWith(dynPair.B);
	}
	
	addSpawnedEntities();
	
}  

function drawList(list){
	for(var entity in list){
		entity.draw(origin); 
	}
}

function drawEntities(){
	
	// S C E N E R Y   L I S T 
	drawList(sceneryList);

	//  S T A T I C    L I S T 
	drawList(staticList); 

	//  D Y N A M I C   L I S T  
	drawList(dynamicList);
	
	// P A R T I C L E   L I S T
	drawList(particleList);
}