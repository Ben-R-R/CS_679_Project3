// sound.js
/*

Placeholder functions for sound 

*/
var hSound;
var hJumpSound;
var cSound;
var cJumpSound;
var kSound;
var kJumpSound;

function initSound(){
	hSound = new Audio('sound/human.ogg');
	hJumpSound = new Audio('sound/hjump.ogg');
	cSound  = new Audio('sound/cheetah.ogg');
	cJumpSound = new Audio('sound/cjump.ogg');
	kSound = new Audio('sound/kangaroo.ogg');
	kJumpSound = new Audio('sound/kjump.ogg');
	
	hSound.load();
	cSound.load();
	kSound.load();
	kJumpSound.load();
}

function updateSound(){
	//empty for now
} 
