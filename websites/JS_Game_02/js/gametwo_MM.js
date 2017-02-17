var ctx = document.getElementById("ctx").getContext("2d");

var brightRed = "#FF0000";
var brightGreen = "#00FF00";
var brightBlue = "#0000FF";
var myBlack = "#000000";
var myYellow = "#FFFF00";
var myCustomRGBA = "rgba(200, 150, 255, 0.5)";

var gameHeight = 500;
var gameWidth = 500;
var rtSpacing = 30;
var topSpacing = 30;

var enemyList = {};

Enemy = function(id, passX, passY, passspdX, passspdY, passName, passFont, passWallFont, passTopBottomFont, passColor) {

	var enemy = {
		id : id,
		x : passX,
		spdX : passspdX,
		y : passY,
		spdY : passspdY,
		name : passName,
		myFont : passFont,
		wallFont : passWallFont,
		topBottomFont : passTopBottomFont,
		color : passColor
	};
	enemyList[id] = enemy;
};
// end of constructor

// player as an "Object"
var player = {
	x : 50,
	spdX : 7,
	y : 30,
	spdY : 3,
	name : "P",
	myFont : '30px Arial',
	wallFont : '60px Arial',
	topBottomFont : '20px Arial',
	color : "#000000"
};

getDistanceBetweenEntity = function(entity1, entity2) {
	var dx = entity1.x - entity2.x;
	var dy = entity1.y - entity2.y;
	return Math.sqrt(dx * dx + dy * dy);
};

testCollisionEntity = function(entity1, entity2) {
	var distance = getDistanceBetweenEntity(entity1, entity2);
	return distance < 50;
	// Boolean true or false
};

document.onmousemove = function(mouse) {
	var mouseX = mouse.clientX;
	var mouseY = mouse.clientY;
	console.log('mouse x,y: ', mouseX, ', ', mouseY);
	player.x = mouseX - 12;
	player.y = mouseY - 185;
};

entityUpdate = function(something) {
	updateEntityPosition(something);
	drawEntity(something);
};
// end of entityUpdate

updateEntityPosition = function(something) {
	something.x += something.spdX;
	something.y += something.spdY;
	// wall bounce
	if (something.x >= gameWidth - rtSpacing || something.x <= 0) {
		//spdX = -spdX;
		//spdX = spdX * -1;
		something.spdX *= -1;
		something.color = myBlack;
		something.font = something.wallFont;
	}
	// ceiling or floor bounce
	if (something.y >= gameHeight || something.y <= topSpacing) {
		something.spdY *= -1;
		something.color = myCustomRGBA;
		something.font = something.topBottomFont;
	}

};

drawEntity = function(something) {
	ctx.font = something.font;
	ctx.fillStyle = something.color;
	ctx.fillText(something.name, something.x, something.y);
};

update = function() {
	ctx.clearRect(0, 0, gameWidth, gameHeight);

	// when mouse stops, player drifts way
	//entityUpdate(player);

	// when mouse stops, player stops
	drawEntity(player);

	for (var i in enemyList) {
		entityUpdate(enemyList[i]);

		var isColliding = testCollisionEntity(player, enemyList[i]);
		if (isColliding) {
			console.log('Collision!!!');
			//alert('Oh No - Collision!!!');
		}
	}

};
// end of update()

Enemy('E01', 50, 50, 3, 5, 'E01', '30px Arial', '60px Arial', '40px Arial', "#0000FF");
Enemy('E02', 40, 60, 5, 2, 'E02', '60px Arial', '30px Arial', '20px Arial', "#FF0000");
Enemy('E03', 100, 50, 7, 5, 'E03', '90px Arial', '20px Arial', '20px Arial', "#00FF00");

setInterval(update, 50);

