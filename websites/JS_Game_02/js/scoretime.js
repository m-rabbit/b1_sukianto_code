var ctx = document.getElementById("ctx").getContext("2d");

var ctxWidth = 900;
var ctxHeight = 500;
var rtSpacing = 30;
var bottomSpacing = 10;
var topSpacing = 30;

var appleRed = "#FF0000";
var skyBlue = "#0000FF";
var grassGreen = "#00FF00";
var canaryYellow = "#FFFF00";
var myBlack = "#000000";
var myPink = "rgba(255, 102, 153, 0.5)";

var enemyList = {};

var timeWhenGameStarted = Date.now();

// player as an object
var player = {
	x : 300,
	spdX : 3,
	y : 300,
	spdY : 7,
	name : "P",
	font : '30px Arial',
	wallFont : '60px Arial',
	topBottomFont : '10px Arial',
	color : myPink,
	colorWall : appleRed,
	colorTopBottom : skyBlue,
	highPoints : 10
};
// end of player

// this is a "Constructor"
Enemy = function(id, passX, passY, passName, passFont, passWallFont, passTopBottomFont, passColor) {

	var enemy = {
		id : id,
		x : passX,
		spdX : getRandomIntInclusive(1, 200),
		y : passY,
		spdY : getRandomIntInclusive(1, 200),
		name : passName,
		font : passFont,
		wallFont : passWallFont,
		topBottomFont : passTopBottomFont,
		color : passColor,
	};

	enemyList[id] = enemy;

};

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// end of Enemy() constructor

getDistanceBetweenEntity = function(entity1, entity2) {
	var dx = entity1.x - entity2.x;
	var dy = entity1.y - entity2.y;
	return Math.sqrt(dx * dx + dy * dy);

};

testCollisionRectRect = function(rect1, rect2) {
	return rect1.x <= rect2.x + rect2.w
	&& rect2.x <= rect1.x + rect1.w
	&& rect1.y <= rect2.y + rect2.h
	&& rect2.y <= rect1.y + rect1.h;
};


document.onmousemove = function(mouse) {
	var mouseX = mouse.clientX;
	var mouseY = mouse.clientY;
	console.log("mouse x,y: " + mouseX + "," + mouseY);
	player.x = mouseX - 12;
	player.y = mouseY - 125;
};
updateEntity = function(something) {
	updateEntityPosition(something);
	drawEntity(something);
};

updateEntityPosition = function(something) {
	var red = getRandomIntInclusive(0, 255);
	var green = getRandomIntInclusive(0, 255);
	var blue = getRandomIntInclusive(0, 255);

	something.x += something.spdX;
	something.y += something.spdY;

	//flips spdX if we hit either the left or the right sides
	if (something.x >= ctxWidth - rtSpacing  || something.x <= 0) {// right side OR left side
		something.spdX *= -1;
		something.color = "rgb(" + red + "," + green + "," + blue + ")";
		something.font = something.wallFont;
	}

	// flip spdY if we hit either the ceiling OR the floor
	if (something.y >= ctxHeight - bottomSpacing || something.y <= topSpacing) {// || is a Boolean for "OR"
		something.spdY *= -1;
		something.color = "rgb(" + red + "," + green + "," + blue + ")";
		something.font = something.topBottomFont;
	}
};

drawEntity = function(something) {
	ctx.font = something.font;
	ctx.fillStyle = something.color;
	ctx.fillText(something.name, something.x, something.y);
};

update = function() {
	ctx.clearRect(0, 0, ctxWidth, ctxHeight);
	//updateEntity(player);

	drawEntity(player);
	var timeSurvived = Date.now() - timeWhenGameStarted;
	if (timeSurvived >= 3000) {
		ctx.fillStyle = 'green';
		ctx.fillRect(850, 100, 50, 300);
		if(player.x >= 850 && player.y >= 100) {
			alert("You Win!");
			player.highPoints = 10;
			timeWhenGameStarted = Date.now();
		}
		for (var i in enemyList) {
			updateEntity(enemyList[i]);

			var isColliding = testCollisionRectRect(player, enemyList[i]);
			if (isColliding) {
				player.highPoints--;
				//console.log("Collision!");
				if (player.highPoints < 0) {
					alert("Game Over! time = " + timeSurvived / 1000 + " s");
					player.highPoints = 10;
					timeWhenGameStarted = Date.now();
				}
			}
		};
	}

	ctx.font = "30px Arial";
	ctx.fillStyle = "#FF0000";
	ctx.fillText("Points: " + player.highPoints, 10, 30);
	var currentTime = Date.now() - timeWhenGameStarted;
	ctx.font = "30px Arial";
	ctx.fillStyle = "#FF0000";
	ctx.fillText("Time Survived: " + currentTime / 1000 + " s", 10, 70);

};
// end of update()

Enemy('E1', 70, 60, 'E01', '30px Arial', '60px Arial', '10px Arial', grassGreen);

Enemy('E2', 80, 50, 'E02', '60px Arial', '30px Arial', '15px Arial', grassGreen);

Enemy('E3', 75, 50, 'E03', '20px Arial', '80px Arial', '20px Arial', grassGreen);

Enemy('E4', 70, 60, 'E04', '30px Arial', '60px Arial', '10px Arial', grassGreen);

Enemy('E5', 80, 50, 'E05', '60px Arial', '30px Arial', '15px Arial', grassGreen);

setInterval(update, 100);

