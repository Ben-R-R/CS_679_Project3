// levelManager.js

/**
 * just a placeholder for now
 * */
function initLevelManager(){
	/*for(var i =0; i < 3; i++){
		spawnNewEntity(
			newGameEntity(
				newVector(
					Math.random() * theCanvas.width, 
					Math.random() * theCanvas.height
					),
				newVector(Math.random() * .3 - 0.6, Math.random() * .3 - 0.6),
				Math.random() * 7 + 8), 
			dynamicList);
	}  */
	
	spawnNewEntity(newBoxEntity(newVector(100,100), 100, 20), staticList);
	
	spawnNewEntity(newBoxEntity(newVector(200,100), 200, 200), staticList);
	
	//spawnNewEntity(newBoxEntity(newVector(400 - 20,300), 20, 400), staticList);
	
	spawnNewEntity(newBoxEntity(newVector(100 ,300), 200, 20), staticList);
	
	spawnNewEntity(newBoxEntity(newVector(600 ,400), 20, 200), staticList); 
	 
	spawnNewEntity(newBoxEntity(newVector(750 ,100), 200, 20), staticList);
	
	spawnNewEntity(newBoxEntity(newVector(0 ,500), 100, 20), staticList);
	
	spawnNewEntity(newGearEntity(400 - 10, 300 - 10), staticList);
	
	//sides
	spawnNewEntity(newBoxEntity(newVector(0,-100), 800, 100), staticList);
	spawnNewEntity(newBoxEntity(newVector(-100,-100), 100, 800), staticList);
	spawnNewEntity(newBoxEntity(newVector(800,100), 50, 800), staticList);
	spawnNewEntity(newBoxEntity(newVector(0,600), 1600, 100), staticList);

	spawnNewEntity(newGameKeyEntity(100,20, kangaroo1R.height/2), dynamicList);
	
	spawnNewEntity(newGameMouseEntity(15), dynamicList);
}
