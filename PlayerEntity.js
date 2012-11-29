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

function newGamePlayerEntity(x,y, radius){
	var newEnt = Object.create(GameEntity);
	newEnt.coords = newVector(x,y);
	newEnt.velocity = newVector(0,0);
	newEnt.radius = radius;
	newEnt.acceleration = newVector(0,GRAVITY);
	newEnt.fixed = false;
	newEnt.onGround = false;
	newEnt.isPlayer = true;
	//set the form value to the current animal form
	newEnt.form = "h";
	
	newEnt.direction = 1;

	newEnt.impX = 0.3; // impulsive x velocity, 
	newEnt.maxRun = 0.5; // maximum run speed,  
	newEnt.impY = -0.6; // impulsive x velocity, used for jumps
	newEnt.maxFall = 0.5; // maximum fall rate.
	
	// SPIDER STUFF
	
	newEnt.disableMove = false;	
	
	
	// KANGAROO STUFF
	
	
	// SQUIRREL STUFF
	newEnt._ropeState = 0;	//current state of ropeclimbingness
	
	

	newEnt.update = function(elapsedTime){
		//press 1 for human
		if(keydown(49)){
			this.form = "h";		
		
		} 
		//press 2 for cheetah
		else if(keydown(50)){
			 this.form = "c";

		} 
		//press 3 for flying squirrel
		else if(keydown(51)){
			this.form = "f";
			
		}
		//press 4 for kangaroo
		else if(keydown(52)){
			this.form = "k";
			

		}
		//press 5 for spider
		else if(keydown(53)){
			this.form = "s";
			
			this.disableMove = true;
		}	
		
		//human form movement
		if(this.form == "h"){
			
		//cheetah form movement
		} else if(this.form == "c"){
			
		//flying squirrel movement 
		} else if(this.form == "f"){
			
		//kangaroo movement	
		} else if(this.form == "k"){
		
		//spider movement	
		} else if(this.form === "s"){
				
		}
		
		
		this.wasGround = this.onGround;	//used to check if cheetah just left ground
		this.onGround = false;
		
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
	
	newEnt.collisionResponse = function(responseVector, other){
		
		// not sure if we need to do this. Was trying to stop the disapearing 
		// ball problem
		if(vectorError(responseVector) ){
			return;
		}
	
		if(other.isDeadly && this.checkpoint ){
			// careful, if we did this.coords = this.checkpoint.coords, we 
			// would cause the checkpoint to move along with the player.
			this.coords.x = this.checkpoint.coords.x;
			this.coords.y = this.checkpoint.coords.y; 			
		}
		if(other.isKick) return;
		if(other.isRope){
			if(this.form != "f") return;
			//TODO: SQUIRREL ROPE CODE
		}
		
		// move so we are not colliding anymore
		this.coords.add(responseVector);
		
		
		//We consider ourselves "on the ground" if there is something to push on.		 
		
		if(responseVector.y < 0){
			this.onGround = true;
			
		}
		
		// if we bump an opposing force, stop. This is not entirely physicly
		// correct but will work for the most part.
		/*if(responseVector.x > 0 && this.velocity.x < 0){
			this.velocity.x	= 0;		
		}else if(responseVector.x < 0 && this.velocity.x > 0){
			this.velocity.x	= 0;		
		} */                       // removed because it messes up the kangaroo
		if(responseVector.y > 0 && this.velocity.y < 0){
			this.velocity.y	= 0;		
		}else if(responseVector.y < 0 && this.velocity.y > 0){
			this.velocity.y	= 0;		
		}  
		
		// hold on to the response vector, currently we only do this so we can
		// draw it for debugging purposes  
		this.resVec = responseVector; 
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