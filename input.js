// input.js

function initInput(){
	window.addEventListener("keydown", function (e) {
        //console.log(e.keyCode);
        if( !( e.keyCode in keysStateBuffer  ) || keysStateBuffer [e.keyCode] === KEY_STATE.FIRST_UP || keysStateBuffer [e.keyCode] === KEY_STATE.UP){
			keysStateBuffer [e.keyCode] = KEY_STATE.FIRST_HIT;
		} 
    }, false);
    
    window.addEventListener("keyup", function (e) { 
		keysStateBuffer [e.keyCode] = KEY_STATE.FIRST_UP; 
	}, false);

}

function updateInput(){
	for(key in keysStateBuffer ){
		if(keysStateBuffer [key] === KEY_STATE.FIRST_UP){
			keysStateBuffer [key] = KEY_STATE.UP; 
		} else if(keysStateBuffer [key] === KEY_STATE.FIRST_HIT){
		    keysStateBuffer [key] = KEY_STATE.DOWN;
		}
	}
}

// helper function to determine if a key is currently being held down
function keydown(scancode){
	return (scancode in keysStateBuffer) && (keysStateBuffer[scancode] === KEY_STATE.FIRST_HIT || keysStateBuffer[scancode] === KEY_STATE.DOWN);
}

// helper function to determine if a key has been first pressed this frame
function keyhit(scancode){
	return (scancode in keysStateBuffer) && (keysStateBuffer[scancode] === KEY_STATE.FIRST_HIT );

}
