// globals.js

var theCanvas = null;
var theContext = null;

// pointer to the browser's request animation frame method
var onNextFrame = null;


var startT = 0; // stores the time the current frame started
var elapsedT = 10; // stores the time since the last frame

/**
 * stores the key state in <scancode>:<state> format, where <state> is 
 * an element in KEY_STATE
 * because keys are not placed in this buffer until the first time they are 
 * pressed, you should use the following to test for a key press:
 * (<scancode> in keysStateBuffer) && keysStateBuffer[<scancode>] === KEY_STATE.FIRST_HIT
 * alternately, use the  keydown() and  keyhit() functions from input.js
 */
var keysStateBuffer = {};

var KEY_STATE = {
	FIRST_HIT:0,
	DOWN:1,
	FIRST_UP:2,
	UP:3

};

var STATE_DEAD = true;
var STATE_ALIVE = false;

/**
 * UserExeption 
 *
 * Really just a simple user defined exeption. Included mostly because 
 * List.js needs it.
 *      
 *  */
var UserException = {
   message : "",
   name : "UserException"
}

function newUserException(message) {
   var newUserEx = Object.create(UserException);
   newUserEx.message = message;
   newUserEx.name = "UserException";
}

// stores the coordinates of the mouse relitive to the canvas;
mouseX = 0;
mouseY = 0;

// gravitational constant
GRAVITY = 0.0015;