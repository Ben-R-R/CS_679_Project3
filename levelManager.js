// levelManager.js

/**
 * just a placeholder for now
 * */
function initLevelManager(){
	for(var i =0; i < 30; i++){
		spawnNewEntity(
			newGameEntity(
				newVector(
					Math.random() * theCanvas.width, 
					Math.random() * theCanvas.height
					),
				newVector(Math.random() * .5 - 1, Math.random() * .5 - 1),
				10), 
			staticList);
	}
}
