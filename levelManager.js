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
				newVector(Math.random() * .3 - 0.6, Math.random() * .3 - 0.6),
				Math.random() * 7 + 8), 
			dynamicList);
	}
	
	spawnNewEntity(newBoxEntity(newVector(100,100), 100, 20), staticList);
	
	spawnNewEntity(newBoxEntity(newVector(200,100), 200, 200), staticList);
}
