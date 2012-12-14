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
	doneX: false,
	doneY: false,
	scale:1,
	
	update: function(elapsedTime){
		
		var dX = this.tX - this.x;
		var dY = this.tY - this.y;
	    
		if(dX * dX > Math.pow(this.vX * this.speed * elapsedTime,2)){
			this.x += this.vX * this.speed * elapsedTime		
		
		} else {
			this.x = this.tX;
			this.doneX = true;
			
		}
		
		if(dY * dY > Math.pow(this.vY * this.speed * elapsedTime,2)){
			this.y += this.vY * this.speed * elapsedTime		
		
		} else {
			this.y = this.tY;
			this.doneY = true;
		}
		return this.doneY && this.doneX;
	},
	
	 draw: function(origin){
		theContext.drawImage(this.image,this.x,this.y, this.image.width * this.scale, this.image.height * this.scale );
	}

}

function newpqAnHelper(x,y,dx,dy, speed, image, scale){
	var newEnt = Object.create(pqAnHelper);
	newEnt.x = x;
	newEnt.y = y;
	newEnt.tX = dx;
	newEnt.tY = dy;
	newEnt.speed = speed;
	newEnt.scale = scale;
	
	var vX = dx - x;
	var vY = dy - y;
	
	var l = vX * vX + vY * vY;
	l = Math.sqrt(l);
	
	vX = vX/l;
	vY = vY/l;
	
	newEnt.vX = vX;
	newEnt.vY = vY;
	
	newEnt.image = image;
	
	return newEnt;

}



var PowerQueue = {
	queue: null,
	animationList: null,
	
	createQueueBackup : function(){
	 	this.oldQueue = newList();
	 	this.oldQueue.pushBack(this.player.form);
	
		for( obj in this.queue){
			
			this.oldQueue.pushBack(obj);		
		}
	},
	
	restoreQueueFromBackup : function(){
		this.player.changePower(this.oldQueue.popFront());
		this.queue = newList();
	
		for( obj in this.oldQueue){
		
			this.queue.pushBack(obj);		
		}
		this.createQueueBackup();	
	},
	
	player: null,
	x: 0,
	y: 0,
	mode: 0,
	image: H_Icon,
	iW: H_Icon.width,
	update: function(elapsedTime){
		
		 updateList(this.animationList,elapsedTime);
		
		
		if(this.queue.size < 5){
	
			if(charhit('W')){
				// cheetah
				this.image = C_Icon;
				
				this.queue.pushBack(this.image);
			    this.createQueueBackup(); 
				spawnNewEntity(newpqAnHelper(
					theCanvas.width/2,
					theCanvas.height/2,
					this.x + this.iW * (this.queue.size - 1) , this.y, 
					0.6, this.image,0.7), this.animationList);
				
			} else if(charhit('E')){
				// flying squirrel
				this.image = FS_Icon;
				this.queue.pushBack(this.image);
				this.createQueueBackup(); 
				spawnNewEntity(newpqAnHelper(
					theCanvas.width/2,
					theCanvas.height/2,
					this.x + this.iW * (this.queue.size - 1) , this.y, 
					0.6, this.image,0.7), this.animationList);
			} else if(charhit('R')){
				// kangaroo		
				this.image = K_Icon;
				this.queue.pushBack(this.image);
				this.createQueueBackup(); 
				spawnNewEntity(newpqAnHelper(
					theCanvas.width/2,
					theCanvas.height/2,
					this.x + this.iW * (this.queue.size - 1) , this.y, 
					0.6, this.image,0.7), this.animationList);
			} else if(charhit('T')){
				// spider		
				this.image = S_Icon;
				this.queue.pushBack(this.image);
				this.createQueueBackup(); 
				spawnNewEntity(newpqAnHelper(
					theCanvas.width/2,
					theCanvas.height/2,
					this.x + this.iW * (this.queue.size - 1) , this.y, 
					0.6, this.image,0.7), this.animationList);
			} else if(charhit('Q')){
				// human		
				this.image = H_Icon;
				this.queue.pushBack(this.image);
				this.createQueueBackup(); 
				spawnNewEntity(newpqAnHelper(
					theCanvas.width/2,
					theCanvas.height/2,
					this.x + this.iW * (this.queue.size - 1) , this.y, 
					0.6, this.image,0.7), this.animationList);
			}
			
		}	
	
	    if(keyhit(CHANGE_KEY)){  
			var temp = this.queue.popFront();
			
			if(temp === H_Icon){
				this.player.changePower("h");
			} else if(temp === C_Icon){
			    this.player.changePower("c");
			} else if(temp === FS_Icon){
			    this.player.changePower("f");
			} else if(temp === K_Icon){
			    this.player.changePower("k");
			} else if(temp === S_Icon){
			    this.player.changePower("s");
			} else {
				if(this.player.form === 'h'){
				   this.player.changePower("c");
				} else if(this.player.form === 'c'){
				   this.player.changePower("f");
				} else if(this.player.form === 'f'){
				   this.player.changePower("k");
				} else if(this.player.form === 'k'){
				   this.player.changePower("s");
				} else if(this.player.form === 's'){
				   this.player.changePower("h");
				}
			}
		} else if(keyhit(DELETE_KEY)){
			 
			this.queue.popBack();
			this.createQueueBackup();
		}
		
			
	},
	
	draw: function(){
	    
	    var _offset = 0;
		this.iW = this.image.width;
		for(i_img in this.queue){
			
			theContext.drawImage(i_img, this.x + _offset * this.iW, this.y , this.image.width * 0.7 , this.image.height * 0.7);
			_offset++;
		} 
		
		drawList(this.animationList);
	}

}

function initPowerQueue(player){
	self = PowerQueue;
	self.queue = newList();
	self.oldQueue = null;
	
	self.x = theCanvas.width/2 - self.image.width/2;
	self.y = theCanvas.height - self.image.height;
	self.player = player;
	self.createQueueBackup();
	self.animationList = newList(); 

}