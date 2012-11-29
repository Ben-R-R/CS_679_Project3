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
			if(this.form != "h"){
				hSound.cloneNode(true).play();
				this.form = "h";
				this.impX = 0.3; // impulsive x velocity, 
				this.maxRun = 0.5; // maximum run speed,  
				this.impY = -0.6; // impulsive x velocity, used for jumps
				this.maxFall = 0.5; // maximum fall rate.
			}
			this.disableMove = false;
		} 
		//press 2 for cheetah
		else if(keydown(50)){
			if(this.form != "c"){
				cSound.cloneNode(true).play();
				this.form = "c";
				this.impX = 0.3; // impulsive x velocity, 
				this.maxRun = 0.5; // maximum run speed,  
				this.impY = -0.5; // impulsive x velocity, used for jumps
				this.maxFall = 0.5; // maximum fall rate.
			}
			this.disableMove = false;
		} 
		//press 3 for flying squirrel
		else if(keydown(51)){
			this.form = "f";
			
		}
		//press 4 for kangaroo
		else if(keydown(52)){
			this.form = "k";
			
			this.disableMove = false;
		}
		//press 5 for spider
		else if(keydown(53)){
			this.form = "s";
			
			this.disableMove = true;
		}
		
		
		// we set the velocity on a key hit, rather than continuously on a 
		// key down so that if you swich animals you maintain your velocity 
		if(!this.disableMove){
			if(keyhit(65)){
			    this.direction = -1;
				this.velocity.x = - this.impX;
			} else if (keyhit(68)){
			    this.velocity.x = this.impX;
				this.direction = 1;
			} else if(keydown(65)){
				this.direction = -1;
				
			} else if(keydown(68)){
				this.direction = 1;
			} else {
				this.velocity.x = 0;
			}
		}
		
			
		
		
		//human form movement
		if(this.form == "h"){
			// apply impulse to velocity. Animals that override the default behavior
			// should set the impulse to 0 
			if(keydown(32) && this.onGround){
				this.velocity.y = this.impY;
				hJumpSound.cloneNode(true).play();
								
			}
		//cheetah form movement
		} else if(this.form == "c"){
			var tvx = this.velocity.x;
			var tvy = this.velocity.y;
			
			if(keydown(65)){
				if(tvx == 0){
					tvx = -.3;
				
				//can only accelerate while on the ground
				} else if(tvx > -.8 && this.onGround){
					tvx -= .1;
				}
				this.direction = -1;
				if(tvx <= -.8 && this.wasGround && !this.onGround){
					tvy = -.4;
				}
			}else if(keydown(68)){
				if(tvx == 0){
					tvx = .3;
					
				//can only accelerate while on the ground	
				} else if(tvx < .8  && this.onGround){    
					tvx += .1;
				} 
				this.direction = 1;
				if(tvx >= .8 && this.wasGround && !this.onGround){
					tvy = -.4;
				}
			} else {
				tvx = 0;
			}
			
			// apply impulse to velocity. 
			if(keydown(32) && this.onGround){
				tvy = -.4;
			}
			
			this.velocity.x = tvx;
			this.velocity.y = tvy;
			
			
		//flying squirrel movement 
		} else if(this.form == "f"){
			if(this.onGround){	//ground motion
				if(keydown(32)) this.velocity.y = this.impY;
			} else {	//aerial motion
				
			}
			
		//kangaroo movement	
		} else if(this.form == "k"){
			
			//ground motion
			if(this.onGround){
			
				this.maxRun = 0.2; // maximum run speed,  
				this.impY = 0.0; // impulsive x velocity, used for jumps
				
				this._kJumps = 2;
				this._kdTime = 0;
				if(keydown(65) || keydown(68)){	//left or right hops
					this.velocity.y -= .2;
					this.velocity.x = this.impX * this.direction;
				
				} else {
				    this.velocity.x = 0;	//stops movement on ground
				} 
			}
			//aerial motion
			else{
				this.impX = 0.2; // impulsive x velocity,
				
			}
			
			//jumps
			if(keyhit(32) && this._kJumps > 0){	//initial jump-off
				this.velocity.y = -.6;
				this._kJumps--;
				kJumpSound.cloneNode(true).play();
			}
			
			if(this._kJumps == 2 && this._kdTime < 10){
				this._kdTime++;
			} else if(this._kJumps == 2) {
				this._kJumps = 1;
			} 
			
			//kick
			if(keyhit(69)){
				this.kick.coords.x = this.coords.x + this.radius * this.direction;
				this.kick.coords.y = this.coords.y;
				this.kick.aabb.x = this.coords.x + this.radius * this.direction - this.kick.aabb.w / 2;
				this.kick.aabb.y = this.coords.y - this.kick.aabb.h / 2;
				this.kick.active = true;
				this.kick.virtual = false;
			}
		
		//spider movement	
		} else if(this.form === "s"){
			
			// on ground jumps
			if(keydown(32) && this.onGround){
				this.velocity.y = this.impY;
			}
			
			// falling through air 
			if (this._sState === 0){
			    if(this.onGround){
					if(keyhit(65)){
					    this.direction = -1;
						this.velocity.x = - this.impX;
					} else if (keyhit(68)){
					    this.velocity.x = this.impX;
						this.direction = 1;
					} else if(keydown(65)){
						this.direction = -1;
						
					} else if(keydown(68)){
						this.direction = 1;
					} else {
						this.velocity.x = 0;
					}
				} else {
				 	if(keydown(65)){
						this.direction = -1;
						this.velocity.x = Math.abs(this.velocity.x) * -1;
					} else if(keydown(68)){
						this.direction = 1;
						this.velocity.x = Math.abs(this.velocity.x)
					}
				}
				
				
				// have we clicked on a grapple point when the spider not already
				// connected to one?
				if(this._sGrpPnt && keydown(32)){
				
					// are we close enough to reach it?
					if(LenComp(this.coords, this._sGrpPnt.coords, this._sLmax)){
						
						
						
						var normVector = newVector(this._sGrpPnt.coords.x  - this.coords.x, this._sGrpPnt.coords.y  - this.coords.y)
						this._sL = normVector.length();
						// make sure there is tension on the rope
						if( vDot(normVector, this.velocity) >= 0){
						
							// get the angle of the swing
							this._sA = Math.atan2(normVector.y ,-normVector.x );
							
							// get a tangent unit vector							                             
							var tanVector = vOrthoNormal(normVector);
							tanVector.normalize();
							tanVector.scalarMult(-1);
							// figure out how much of the velocity will 
							// contribute to the radial velocity
							this._sVa = vDot(this.velocity, tanVector);

							// calculate the starting energy of the spider
							// potential energy = mgh = 0 // Let our currnet position be the datum
							// kinetic energy = (0.5)mv^2														
							this._sE = (0.5 * this._sM * Math.pow(this.velocity.length(), 2 ) );// + (this._sM * -this.coords.y * GRAVITY)
							
							this._sYDatum = this.coords.y;																				
							
							// on to the swinging! 
							this._sState = 2;	
							//this.disableMove = true;						
						} else {
							// if there is no tension on the rope, transition 
							// to state 1.
							
							this._sState = 1;
						}
						
						
						
					}									
				
				}
				
			// falling while connected to grapple point
			} else if (this._sState === 1){
			    if(! LenComp(this.coords, this._sGrpPnt.coords, this._sL)){
					this._sState = 0;		
				}
			} else if(this._sState === 2){
				this._sA += this._sVa / (this._sL * 0.1);
				this.coords.x = this._sGrpPnt.coords.x + Math.cos(this._sA) * this._sL;
				this.coords.y = this._sGrpPnt.coords.y + Math.sin(this._sA) * this._sL;
				if(!keydown(32)){
					console.log("795");
					this._sState = 0;
					this.velocity.x = -Math.sin(this._sA) * this._sVa;
					this.velocity.y = Math.cos(this._sA) * this._sVa;
					//this.disableMove = false;
				}
				 				
			}	
		}
		
		this.velocity.add(vScalarMult(elapsedTime,this.acceleration))
		if(this.velocity.y > .5){
		   this.velocity.y = .5;
		} else if(this.velocity.y > .1 && this.form == 'f' && keydown(32)){
			this.velocity.y = .1;
		}
		this.coords.add(vScalarMult(elapsedTime,this.velocity));
		this.wasGround = this.onGround;	//used to check if cheetah just left ground
		this.onGround = false;
		
		
		if( (this.coords.y + origin.y) >= 400){
			origin.y = -this.coords.y + 400;		
		} else if( (this.coords.y + origin.y) <= 200){
			origin.y = -this.coords.y + 200;		
		}
		// = ( - 300) * -0.5;
		
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