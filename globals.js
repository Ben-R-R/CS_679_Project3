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

var kangaroo1R = new Image();
var kangaroo2R = new Image();

var kangaroo1L = new Image();
var kangaroo2L = new Image();

var human1 = new Image();

kangaroo1R.src = './images/Kangaroo1.png';
kangaroo2R.src = './images/Kangaroo2.png';

kangaroo1L.src = './images/Kangaroo-1.png';
kangaroo2L.src = './images/Kangaroo-2.png';       

human1.src = './images/human1.png';