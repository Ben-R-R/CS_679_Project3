// sound.js
var hSound;
var hJumpSound;
var cSound;
var kSound;
var kJumpSound;
var fsSound;
var sSound;
var sGrapple;
var background;
var mute = false;

function initSound(){
    hSound = new Audio('sound/human.ogg');
    hJumpSound = new Audio('sound/hjump.ogg');
    cSound  = new Audio('sound/cheetah2.ogg');
    kSound = new Audio('sound/kangaroo.ogg');
    kJumpSound = new Audio('sound/kjump.ogg');
	fsSound = new Audio('sound/squirrel.ogg');
	sSound = new Audio('sound/spider.ogg');
	sGrapple = new Audio('sound/sgrapple.ogg');
	background = new Audio('sound/background.wav');
	
    hSound.load();
    hJumpSound.load();
    cSound.load();
    kSound.load();
    kJumpSound.load();
	fsSound.load();
	sSound.load();
	sGrapple.load();
	background.load();
	
	background.play();
	background.loop = true;
	background.volume = .5;
}

function muteFunc(){
	if(mute){
		background.volume = .5;
	} else{
		background.volume = 0;
	}
	mute = !mute;
}

function updateSound(){
	if(keyhit(MUTE_KEY)){
		muteFunc();
	}
} 
