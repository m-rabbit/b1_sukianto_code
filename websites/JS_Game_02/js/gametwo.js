var ctx = document.getElementById("ctx").getContext("2d");

// player
var player = {
	x: 50,
	spdX: 15*Math.random(),
	y: 40,
	spdY: 12*Math.random(),
	name: "P",
	myFont: '30px Arial',
	color: "#FF0000"
};

//enemy
var enemy = {
	x: 70,
	spdX: 15*Math.random(),
	y: 40,
	spdY: 12*Math.random(),
	name: "E",
	myFont: '30px Arial',
	color: "#FF0000"
};


var gameHeight = 500;
var gameWidth = 500;
var rightSpacing = 75;
var topSpacing = 25;


//ctx.fillText('P', x, y);

function entityUpdate(entity) {
	var red =  Math.floor(Math.random() * (255 - 0));
	var green = Math.floor(Math.random() * (255 - 0));
	var blue = Math.floor(Math.random() * (255 - 0));
	
	//player
	entity.x += entity.spdX;
	entity.y += entity.spdY;
	if(entity.x >= gameWidth-rightSpacing || entity.x <= 10) {
		//spdX = -spdX;
		//spdX = spdX*-1;
		entity.spdX *= -1;
		entity.color = "rgb(" + red + "," + green + "," + blue + ")";
	}
	if(entity.y >= gameHeight || entity.y <= topSpacing) {
		entity.spdY *= -1;
		entity.color = "rgb(" + red + "," + green + "," + blue + ")";
	}
	
	ctx.font = entity.myFont;
	ctx.fillStyle = entity.color;
	ctx.fillText(entity.name, entity.x, entity.y);
	//console.log('I am inside update: x = ',x,' y = ',y);
}; //end of update


function update() {
	ctx.clearRect(0,0,gameWidth,gameHeight);
	entityUpdate(player);
	entityUpdate(enemy);
};


setInterval(update,50);

