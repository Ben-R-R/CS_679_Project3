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
	theContext = theCanvas.getContext("2d");
	

	//====================================================
	// Any calls to initializing functions should go here
	//====================================================
	initInput();
	initSound(); // does nothing right now
	initEntityManager();
	initLevelManager(); // depends on initEntityManager()
	
	startT = Date.now();
	
	
	// run the main loop
	mainLoop();
}

// Main Loop
function mainLoop(){
	elapsedT = Date.now() - startT;
	startT = Date.now();

	updateInput();
	if(elapsedT > 100){
		elapsedT = 100;
	}
	updateEntities(elapsedT);
	theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);	
	drawEntities()
	
	updateSound(); // does nothing right now
	onNextFrame(mainLoop);
}   