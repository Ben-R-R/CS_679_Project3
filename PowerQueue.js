/*=====================================================================
  ____                         ___                           _     
 |  _ \ _____      _____ _ __ / _ \ _   _  ___ _   _  ___   (_)___ 
 | |_) / _ \ \ /\ / / _ \ '__| | | | | | |/ _ \ | | |/ _ \  | / __|
 |  __/ (_) \ V  V /  __/ |  | |_| | |_| |  __/ |_| |  __/_ | \__ \
 |_|   \___/ \_/\_/ \___|_|   \__\_\\__,_|\___|\__,_|\___(_)/ |___/
                                                          |__/     
======================================================================*/

var H_Icon = new Image();
H_Icon.src = './images/HumanIcon.png';

var C_Icon = new Image();
C_Icon.src = './images/CheetahIcon.png';

var S_Icon = new Image();
S_Icon.src = './images/SpiderIcon.png';

var K_Icon = new Image();
K_Icon.src = './images/KangarooIcon.png';

var FS_Icon = new Image();
FS_Icon.src = './images/FlyingSquirrelIcon.png';


/*
Power Queue Animation Helper Object. 
*/
var pqAnHelper = {
	image: null,
	x: 0,
	y: 0,
	tX: 0,
	tY: 0,
	speed: 0,
	vX: 0,
	vY: 0,
	update: function(elapsedTime){
		
		var dX = this.tX - this.x;
		var dY = this.tY - this.y;
	    
		if(dX * dX > Math.pow(this.vX * this.speed * elapsedTime,2)){
			this.x += this.vX * this.speed * elapsedTime		
		
		} else {
			this.x = this.tX;
		}
		
		if(dY * dY > Math.pow(this.vY * this.speed * elapsedTime,2)){
			this.y += this.vY * this.speed * elapsedTime		
		
		} else {
			this.y = this.tY;
		}
	},
	
	 draw: function(){
		theContext.drawImage(this.image,this.x,this.y);
	}

}

var PowerQueue = {
	queue: null,
	animationList: null,
	
	player: null,
	x: 0,
	y: 0,
	mode: 0,
	image: H_Icon,
	update: function(elapsedTime){
		if(this.mode === 0){		
			
			if(charhit('Z')){
				// cheetah
				this.image = C_Icon;
			} else if(charhit('X')){
				// flying squirrel
				this.image = FS_Icon;
			} else if(charhit('C')){
				// kangaroo		
				this.image = K_Icon;
			} else if(charhit('V')){
				// spider		
				this.image = S_Icon;
			} else if(charhit('B')){
				// human		
				this.image = H_Icon;
			} else if(charhit(' ')){
				// leave queue mode
			}
		} else if (this.mode === 1){
		
		}			
	},
	
	draw: function(){
		
		theContext.drawImage(this.image,theCanvas.width/2 - this.image.width/2, theCanvas.height - this.image.height, this.image.width * 0.7 , this.image.height * 0.7);	
	
	}

}

function initPowerQueue(player){
	self = PowerQueue;
	self.queue = newList();
	self.player = player;
	self.animationList = newList(); 

}