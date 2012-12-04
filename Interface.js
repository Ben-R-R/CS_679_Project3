var HUD = {
	items : [],
	init : function(){
		this.items.push(wander);
	},
	update : function(){
		for(i = 0; i < this.items.length; i++){
			this.items[i].update();	//universal stats can be kept in HUD object
		}
	},
	draw : function(){
		for(i = 0; i < this.items.length; i++){
			this.items[i].draw();
		}
	}
};
var wander = {	//just a test item. Figure we don't have to instantiate items, so just using vars as is.
	x : 700,
	y : 300,
	update : function(){
		this.x += (Math.random() - 0.5)*10;
		this.y += (Math.random() - 0.5)*10;
	},
	draw : function(){
		theContext.fillStyle = "#ffffff";
		theContext.fillRect(this.x, this.y, 50, 50);
	}
};
