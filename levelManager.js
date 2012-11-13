// levelManager.js

/**
 * just a placeholder for now
 * */
function initLevelManager(){
	for(var i =0; i < 10; i++){
		spawnNewEntity(
			newGameEntity(
				newVector(
					Math.random() * theCanvas.width, 
					Math.random() * theCanvas.height
					),
				newVector(Math.random() * .3 - 1, Math.random() * .3 - 1),
				10), 
			dynamicList);
	}
}
