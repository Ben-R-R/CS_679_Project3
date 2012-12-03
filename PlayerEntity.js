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
	newEnt.draw = human_draw;
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
			this.draw = human_draw;
			
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
			this.draw = cheetah_draw;
			
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
			this.draw = flyingSquirrel_draw;
			
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
			this.draw = kangaroo_draw;
			
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
			this.draw = spider_draw;
			
	        this.form = "s";
		}	
		
		this.power_update(elapsedTime);
		
		
		this.wasGround = this.onGround;	//used to check if cheetah just left ground
		this.onGround = false;
		
		// move screen
		if( (this.coords.y + origin.y) >= theCanvas.height - theCanvas.height * 0.4){
			origin.y = -this.coords.y + theCanvas.height -  theCanvas.height * 0.4;		
		} else if( (this.coords.y + origin.y) <=   theCanvas.height * 0.4){
			origin.y = -this.coords.y +  theCanvas.height * 0.4;		
		}
		origin.x = -this.coords.x + theCanvas.width/2;
		origin.y = Math.floor(origin.y);
		origin.x = Math.floor(origin.x);
		
		
		return STATE_ALIVE;
	}
	
	return newEnt;

}