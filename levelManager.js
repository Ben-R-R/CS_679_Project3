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
	
	spawnNewEntity(newSpiderGrappleEntity(1100,300), staticList);
	
	spawnNewEntity(newGearEntity(400 - 10, 300 - 10), staticList);
	spawnNewEntity(newGearEntity(350, 600), staticList);
	//sides
	//spawnNewEntity(newBoxEntity(newVector(0,-100), 800, 100), staticList);
	spawnNewEntity(newBoxEntity(newVector(-100,-100), 100, 800), staticList);
	spawnNewEntity(newBoxEntity(newVector(800,100), 50, 800), staticList);
	spawnNewEntity(newBoxEntity(newVector(0,600), 1600, 100), staticList);
	
	spawnNewEntity(newSpikeEntity(1350,550,1000,100,0,100), staticList);
	
	spawnNewEntity(newPathEntity(newBoxEntity(newVector(1000,100), 100, 20), newPath([newVector(1000,100),newVector(1500,100),newVector(1250,-200)]), 0.1), staticList);
	
	spawnNewEntity(newRopeEntity(1000,20,500), staticList);
	


	// player 
	
	//var player = newGameKeyEntity(775,575, kangaroo1R.height/2)
	var player = newPlayerEntity(775,575, kangaroo1R.height/2);
	var checkpointAlpha = newCheckpointEntity(newVector(775,575), 50, 50);
	player.checkpoint = checkpointAlpha; 
	spawnNewEntity(checkpointAlpha, staticList);
	
	spawnNewEntity(newCheckpointEntity(newVector(800,50), 50, 100), staticList);
		
	spawnNewEntity(player, dynamicList);
	
	spawnNewEntity(newGameMouseEntity(15), dynamicList);
	
	spawnNewEntity(newCrateEntity(200,30,50,50), dynamicList);
}
