// globals.js

//level paths
var currLevel = 0;
var levels = [];

levels.push("levels/BasicTutorial.svg");
levels.push("levels/CheetahTutorial.svg");
levels.push("levels/squirrelTutorial.svg");
levels.push("levels/kangarooTutorial.svg");
levels.push("levels/spiderTutorial.svg");
levels.push("levels/test4.svg");
levels.push("levels/test6.svg"); 
levels.push("levels/queueTutorial.svg"); 
//console.log(levels[0]+" "+levels[1]);

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

var mouse1 = false;
var MOVE_LEFT_KEY = 37;
var MOVE_RIGHT_KEY = 39;
var JUMP_KEY = 68;// D   //32;
var CHANGE_KEY = 70;// F  //32;
var QUEUE_MODE_KEY = 71;// G  //32;

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

// stores the origin

origin = null;


// gravitational constant
GRAVITY = 0.0015;

var kangaroo1R = new Image();
kangaroo1R.src = './images/Kangaroo1.png';
var kangaroo2R = new Image();
kangaroo2R.src = './images/Kangaroo2.png';

var kangaroo1L = new Image();
kangaroo1L.src = './images/Kangaroo-1.png';
var kangaroo2L = new Image();
kangaroo2L.src = './images/Kangaroo-2.png';  

var CheetahL = new Image();
CheetahL.src = './images/Cheetah-1.png';
var CheetahR = new Image();
CheetahR.src = './images/Cheetah1.png';

var SquirrelR = new Image();
SquirrelR.src = './images/Squirrel-1.png';

var human1 = new Image();
human1.src = './images/human1.png';

var GearLarge = new Image();
GearLarge.src = './images/AAGear.png';

var Spike = new Image();
Spike.src = './images/Spike.png';
