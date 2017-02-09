var ctx = document.getElementById("ctx").getContext("2d");

// player
var player = {
	x: 50,
	spdX: 15*Math.random(),
	y: 40,
	spdY: 12*Math.random(),
	w: 50,
	h: 50,
	color: "#FF0000"
};

//enemy
var enemy1 = {
	x: 70,
	spdX: 15*Math.random(),
	y: 40,
	spdY: 12*Math.random(),
	w: 100,
	h: 50,
	myFont: '30px Arial',
	color: "#FF0000"
};

var enemy2 = {
	x: 70,
	spdX: 15*Math.random(),
	y: 40,
	spdY: 12*Math.random(),
	w: 50,
	h: 100,
	color: "#FF0000"
};


var gameHeight = 500;
var gameWidth = 500;
var topSpacing = 0;


//ctx.fillText('P', x, y);

function entityUpdate(entity) {
	var red =  Math.floor(Math.random() * (255 - 0));
	var green = Math.floor(Math.random() * (255 - 0));
	var blue = Math.floor(Math.random() * (255 - 0));
	
	//player
	entity.x += entity.spdX;
	entity.y += entity.spdY;
	if(entity.x >= gameWidth-entity.w || entity.x <= 0) {
		//spdX = -spdX;
		//spdX = spdX*-1;
		entity.spdX *= -1;
		entity.color = "rgba(" + red + "," + green + "," + blue + ",0.5)";
	}
	if(entity.y >= gameHeight-entity.h || entity.y <= topSpacing) {
		entity.spdY *= -1;
		entity.color = "rgba(" + red + "," + green + "," + blue + ",0.5)";
	}
	
	ctx.font = entity.myFont;
	ctx.fillStyle = entity.color;
	ctx.fillRect(entity.x, entity.y, entity.w, entity.h);
	//console.log('I am inside update: x = ',x,' y = ',y);
}; //end of update


function update() {
	ctx.clearRect(0,0,gameWidth,gameHeight);
	entityUpdate(player);
	entityUpdate(enemy1);
	entityUpdate(enemy2);
};


setInterval(update,50);

