/*=====================================================================
  ____  _                       _____       _   _ _            _     
 |  _ \| | __ _ _   _  ___ _ __| ____|_ __ | |_(_) |_ _   _   (_)___ 
 | |_) | |/ _` | | | |/ _ \ '__|  _| | '_ \| __| | __| | | |  | / __|
 |  __/| | (_| | |_| |  __/ |  | |___| | | | |_| | |_| |_| |_ | \__ \
 |_|   |_|\__,_|\__, |\___|_|  |_____|_| |_|\__|_|\__|\__, (_)/ |___/
                |___/                                 |___/ |__/     
=======================================================================

The base class for the player. Player entity variables that shouldn't
be visible to the animal power parts of the object should use the 
prefix '_p'. 

======================================================================*/

function newPlayerEntity(x,y, radius){
	var newEnt = Object.create(GameEntity);
	
	newEnt.coords = newVector(x,y);
	newEnt.velocity = newVector(0,0);
	newEnt.radius = radius;
	newEnt.acceleration = newVector(0,GRAVITY);
	newEnt.fixed = false;
	newEnt.onGround = false;
	newEnt.isPlayer = true;
	
	
	newEnt.form = "h";   //set the form value to the current animal form
	
	newEnt.direction = 1;

	newEnt.impX = 0.3; // impulsive x velocity, 
	newEnt.maxRun = 0.5; // maximum run speed,  
	newEnt.impY = -0.6; // impulsive x velocity, used for jumps
	newEnt.maxFall = 0.5; // maximum fall rate.

	initKangaroo(newEnt);
	initCheetah(newEnt);
	initFlyingSquirrel(newEnt);
	initSpider(newEnt);
	initHuman(newEnt);
	
	newEnt.power_update = human_update;
	newEnt.power_leave = human_leave;
	newEnt.power_enter = human_enter;
	newEnt.collisionResponse = human_collisionResponse;
	newEnt.update = function(elapsedTime){
		//press 1 for human
		if(keydown(49)){
					
		    if(this.form !== "h"){
				this.power_leave();
			}
			
			// if we just called human_enter(), its 'this' keyword would not 
			// point to the proper place  
			this.power_enter = human_enter;
			this.power_enter();
			
			this.power_leave = human_leave;
			this.power_update = human_update;
			this.collisionResponse = human_collisionResponse;
			
	        this.form = "h";
		//press 2 for cheetah
		} else if(keydown(50)){
			
			if(this.form !== "c"){
				this.power_leave();
			}
			
			// if we just called cheetah_enter(), its 'this' keyword would not 
			// point to the proper place  
			this.power_enter = cheetah_enter;
			this.power_enter();
			
			this.power_leave = cheetah_leave;
			this.power_update = cheetah_update;
			this.collisionResponse = cheetah_collisionResponse;
	        this.form = "c";

		 
		//press 3 for flying squirrel
		} else if(keydown(51)){
			if(this.form !== "f"){
				this.power_leave();
			}
			
			// if we just called flyingSquirrel_enter(), its 'this' keyword would not 
			// point to the proper place  
			this.power_enter = flyingSquirrel_enter;
			this.power_enter();
			
			this.power_leave = flyingSquirrel_leave;
			this.power_update = flyingSquirrel_update;
			this.collisionResponse = flyingSquirrel_collisionResponse;
			
	        this.form = "f";
			
		}
		//press 4 for kangaroo
		else if(keydown(52)){
			if(this.form !== "k"){
				this.power_leave();
			}
			
			// if we just called kangaroo_enter(), its 'this' keyword would not 
			// point to the proper place  
			this.power_enter = kangaroo_enter;
			this.power_enter();
			
			this.power_leave = kangaroo_leave;
			this.power_update = kangaroo_update;
			this.collisionResponse = kangaroo_collisionResponse;
			
	        this.form = "k";
			

		
		//press 5 for spider
		} else if(keydown(53)){
			if(this.form !== "s"){
				this.power_leave();
			}
			
			// if we just called kangaroo_enter(), its 'this' keyword would not 
			// point to the proper place  
			this.power_enter = spider_enter;
			this.power_enter();
			
			this.power_leave = spider_leave;
			this.power_update = spider_update;
			this.collisionResponse = spider_collisionResponse;
			
	        this.form = "s";
		}	
		
		this.power_update(elapsedTime);
		
		
		this.wasGround = this.onGround;	//used to check if cheetah just left ground
		this.onGround = false;
		
		// move screen
		if( (this.coords.y + origin.y) >= 400){
			origin.y = -this.coords.y + 400;		
		} else if( (this.coords.y + origin.y) <= 200){
			origin.y = -this.coords.y + 200;		
		}
		origin.x = -this.coords.x + 400;
		origin.y = Math.floor(origin.y);
		origin.x = Math.floor(origin.x);
		
		
		return STATE_ALIVE;
	}
	
	newEnt.draw = function(origin){
		if(this.form == "k"){
			if(this.onGround){
				if(this.direction === -1){
					theContext.drawImage(kangaroo1L,this.coords.x - kangaroo1R.width/2 + origin.x,this.coords.y - kangaroo1R.height/2 + origin.y);
				} else {
				    theContext.drawImage(kangaroo1R,this.coords.x - kangaroo1R.width/2 + origin.x,this.coords.y - kangaroo1R.height/2 + origin.y);
				}
			} else {
				if(this.direction === -1){
					theContext.drawImage(kangaroo2L,this.coords.x - kangaroo1R.width/2 + origin.x,this.coords.y - kangaroo1R.height/2 + origin.y);
				} else {
				    theContext.drawImage(kangaroo2R,this.coords.x - kangaroo1R.width/2 + origin.x,this.coords.y - kangaroo1R.height/2 + origin.y);
				}
			}
		} else if(this.form == "h"){
			theContext.drawImage(human1,this.coords.x - human1.width/2 + origin.x,this.coords.y - human1.height/2 + origin.y);
			
			/* NOTE: this code flips the sprite upside-down. Just leaving it here for reference
			theContext.translate(this.coords.x + origin.x,this.coords.y + origin.y);
			theContext.rotate(Math.PI);
			theContext.drawImage(kangaroo1R,-human1.width/2,-human1.height/2);
			theContext.rotate(-Math.PI);
			theContext.translate(-this.coords.x - origin.x,-this.coords.y - origin.y);
			*/
		} else if(this.form == "c"){
			if(this.direction === -1){
				theContext.drawImage(CheetahL,this.coords.x - CheetahR.width/2 + origin.x,this.coords.y - CheetahR.height/2 + origin.y);
			} else {
			    theContext.drawImage(CheetahR,this.coords.x - CheetahR.width/2 + origin.x,this.coords.y - CheetahR.height/2 + origin.y);
			}
		} else if(this.form == "f"){
			theContext.fillStyle = "#FFBB00";
			theContext.beginPath();
			theContext.arc(this.coords.x + origin.x , this.coords.y + origin.y, this.radius, 0, 2*Math.PI);
			theContext.fill();
		} else if (this.form === "s"){
			theContext.fillStyle = "#FF6600";
			//theContext.fillRect(this.coords.x + -this.radius/2 + origin.x, this.coords.y + -this.radius/2 + origin.y,  this.radius * 2,  this.radius * 2);
			theContext.beginPath();
			theContext.arc(this.coords.x + origin.x , this.coords.y + origin.y, this.radius, 0, 2*Math.PI);
			theContext.fill();
			if(this._sState === 1){
			
				theContext.strokeStyle = "#000000";
				theContext.beginPath();
				theContext.moveTo(this._sGrpPnt.coords.x + origin.x, this._sGrpPnt.coords.y + origin.y);
				theContext.lineTo(this.coords.x + origin.x, this.coords.y + origin.y);
				theContext.stroke();
			}
		
		}
		
		
	}
	
	return newEnt;

}