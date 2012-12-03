/*============================================================================= 
  _____ _       _             ____              _               _    _     
 |  ___| |_   _(_)_ __   __ _/ ___|  __ _ _   _(_)_ __ _ __ ___| |  (_)___ 
 | |_  | | | | | | '_ \ / _` \___ \ / _` | | | | | '__| '__/ _ \ |  | / __|
 |  _| | | |_| | | | | | (_| |___) | (_| | |_| | | |  | | |  __/ |_ | \__ \
 |_|   |_|\__, |_|_| |_|\__, |____/ \__, |\__,_|_|_|  |_|  \___|_(_)/ |___/
          |___/         |___/          |_|                        |__/     
===============================================================================

Contains the Flying Squirrel parts of the player entity.

flying squirrel variable prefex is '_f' 

==============================================================================*/
// Flying Squirrel globals

var _fsNormal = 3783;
var _fsClamber = 2384;
var _fsClamberCheck1 = 4834;
var _fsClamberCheck2 = 3824;
var _fsDrop = 2845;
var _fsGrab = 8637;
var _fsGrabCheck1 = 7047;
var _fsGrabCheck2 = 8537;
var _fsJumpOff = 3812;
var _fsJumpCheck = 5683;
var _fsWallJump = 8566;

// initialize the flying squirrel specific parts of the entity
// the 'this' keyword does not refer to the player entity, use newEnt
// as you would in a normal constructor function. 
function initFlyingSquirrel(newEnt){
 	newEnt._fClimbState = _fsNormal;	//current state of ropeclimbingness
 	newEnt._frCor = 0;
 	newEnt._fcTime = 0;
 	newEnt._fcMaxTime = 10;
}

// called when the flying squirrel power is activated.
// purpose is to set any local or player entity level state variables
// you can use the 'this' keyword as you normally would.
// it is posible that this method could be called when the player's animal
// power is already flying squirrel. If you wish to avoid having state variables reset,
// be sure to test for that.
// 'this.form' will be the _previous_ power. 
// you shouldn't modify this.form in this method. 
function flyingSquirrel_enter(){
	this._fClimbState = _fsNormal;
	this._fcTime = 0;
	this.impX = 0.3;
	this.maxRun = 0.5;
	this.impY = -0.5;
}

// called when flying squirrel power is deactivated
// purpose is to reset local and player entity level state variables
// you can use the 'this' keyword as you normally would.
// in contrast to flyingSquirrel_enter(), this method will ONLY be called on switching
// to a different power.   
// This method will be called _before_ the new power's enter method. 
function flyingSquirrel_leave(){

}

// called from the update method of the player entity when the flying squirrel is active.
// you can use the 'this' keyword as you normally would. 
function flyingSquirrel_update(elapsedTime){
	var nMove = false;	//used to trigger normal movement
	var rMove = false;	//triggers rope traversal
	var wMove = false;	//triggers wall clamber
	
	if(this.onGround){	//ground motion
		this._fClimbState = _fsNormal;
		this._fcTime = 0;
	}
	switch(this._fClimbState){
		case _fsNormal:
		nMove = true;
		break;
		case _fsClamber:
		wMove = true;
		this.velocity.y = -0.3;
		if(this._fcTime > this._fcMaxTime){
			this._fClimbState = _fsDrop;
			this._fcTime = 0;
		} else {
			this._fClimbState = _fsClamberCheck1;
			this._fcTime++;	
		}
		break;
		case _fsClamberCheck1:
		wMove = true;
		this.velocity.y = -0.3;
		this._fClimbState = _fsClamberCheck2;
		break;
		case _fsClamberCheck2:
		this.velocity.y = -0.3;
		wMove = true;
		this._fClimbState = _fsDrop;
		break;
		case _fsDrop:
		nMove = true;
		break;
		case _fsGrab:
		this._fClimbState = _fsGrabCheck1;
		rMove = true;
		break;
		case _fsGrabCheck1:
		this._fClimbState = _fsGrabCheck2;
		rMove = true;
		break;
		case _fsGrabCheck2:
		this._fClimbState = _fsNormal;
		rMove = true;
		break;
		case _fsJumpOff:
		this._fClimbState = _fsJumpCheck;
		nMove = true;
		break;
		case _fsJumpCheck:
		this._fClimbState = _fsNormal;
		nMove = true;
		break;
		case _fsWallJump:
		this.velocity.add(vScalarMult(elapsedTime, this.acceleration));
		wMove = true;
		break;
		
	}
	
	if(nMove){
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
	
	if(this.onGround){	//ground motion
		if(keydown(32)) this.velocity.y = this.impY;
	} else {	//aerial motion
		if(wMove){
			if(keyhit(32)){
				this.direction = -this.direction;
				this.velocity.x = this.direction * 0.2;
				this.velocity.y = -0.4;
				this._fClimbState = _fsWallJump;
			}
		} else if(rMove){	//movement on ropes
			this.velocity.x = (this._frCor - this.coords.x) / 20;
			if(this.velocity.x > 0.1) this.velocity.x = 0.1;
			else if(this.velocity.x < -0.1) this.velocity.x = -0.1;
			else{
				this.velocity.x = 0;
				this.coords.x = this._frCor;
			}
			if(keydown(87)) this.velocity.y = -this.impX;
			else if(keydown(83)) this.velocity.y = this.impX;
			else this.velocity.y = 0;
			if(keyhit(32)){	
				if(keydown(65)){
					this.direction = -1;
					this.velocity.x = -this.impX;
					this.velocity.y = this.impY;
					this._fClimbState = _fsJumpOff;
				}
				else if(keydown(68)){
					this.direction = 1;
					this.velocity.x = this.impX;
					this.velocity.y = this.impY;
					this._fClimbState = _fsJumpOff;
				}
			}
		}
	}
	
	if(nMove) this.velocity.add(vScalarMult(elapsedTime,this.acceleration));
	if(this.velocity.y > .5){
	   this.velocity.y = .5;
	} if(this.velocity.y > .1 && keydown(32)){
		this.velocity.y = .1;
	}
	this.coords.add(vScalarMult(elapsedTime,this.velocity));		
}

// called as the collisionResponse method of the player entity when the flying squirrel 
// is active
// you can use the 'this' keyword as you normally would. 
function flyingSquirrel_collisionResponse(responseVector, other){
	if(other.isDeadly && this.checkpoint ){
		// careful, if we did this.coords = this.checkpoint.coords, we 
		// would cause the checkpoint to move along with the player.
		this.coords.x = this.checkpoint.coords.x;
		this.coords.y = this.checkpoint.coords.y; 			
	}
	if(other.isKick) return;
	if(other.isRope){
		if(this._fClimbState == _fsNormal || this._fClimbState == _fsDrop) {	//not in contact with rope yet
			this._fClimbState = _fsGrab;
			this._frCor = other.coords.x;	//squirrel will gravitate towards x-coordinate of rope
		} else if(this._fClimbState == _fsGrabCheck1 || this._fClimbState == _fsGrabCheck2) {	//continued contact with rope while climbing
			this._fClimbState = _fsGrab;
		} else if(this._fClimbState == _fsJumpCheck) {	//continued contact with rope while jumping off
			this._fClimbState = _fsJumpOff;
		}
		return;
	}
	
	// move so we are not colliding anymore
	this.coords.add(responseVector);
	
	
	//We consider ourselves "on the ground" if there is something to push on.		 
	
	if(responseVector.y < 0){
		this.onGround = true;
	}
	if(!this.onGround && responseVector.x * this.direction < 0 && (this._fClimbState == _fsNormal || this._fClimbState == _fsClamber || this._fClimbState == _fsClamberCheck1 || this._fClimbState == _fsClamberCheck2 || this._fClimbState == _fsWallJump)){
		this._fClimbState = _fsClamber;
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

// called as the draw method of the the player entity when the flying squirrel is active
// you can use the 'this' keyword as you normally would. 
function flyingSquirrel_draw(origin){
	theContext.fillStyle = "#FFBB00";
	theContext.beginPath();
	theContext.arc(this.coords.x + origin.x , this.coords.y + origin.y, this.radius, 0, 2*Math.PI);
	theContext.fill();
}