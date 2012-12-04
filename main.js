// JavaScript Document

// Program entry point
window.onload = function () {
	
	// get the animation frame function 
	onNextFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function FrameRequestCallback */callback, /* DOMElement Element */element) {
            window.setTimeout(callback, 1000 / 60);
        };
	
	// get the canvas and the context
	theCanvas = document.getElementById("maincanvas");
	theCanvas.width = window.innerWidth;
	theCanvas.height = window.innerHeight;
	theContext = theCanvas.getContext("2d");
	

	//====================================================
	// Any calls to initializing functions should go here
	//====================================================
	initInput();
	initSound(); // does nothing right now
	initEntityManager();
	initLevelManager(); // depends on initEntityManager()
	
	startT = Date.now();
	
	HUD.init();
	// run the main loop
	mainLoop();
}

// Main Loop
function mainLoop(){
	elapsedT = Date.now() - startT;
	startT = Date.now();
	
	if(elapsedT > 100){
		elapsedT = 100;
	}
	if(!pauseScreen.paused){
		updateEntities(elapsedT);
	}
	
	if(keyhit(27)){
		pauseScreen.paused = ! pauseScreen.paused;
	}
	
	HUD.update(elapsedT);
	theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);	
	drawEntities()
	HUD.draw();
	
	updateSound(); // does nothing right now
	updateInput();
	
	onNextFrame(mainLoop);
}   