var ctx = document.getElementById("ctx").getContext("2d");

var ctxWidth = 900;
var ctxHeight = 500;
var rtSpacing = 30;
var bottomSpacing = 10;
var topSpacing = 30;
var nameOfUser = "anon";

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
	x : 30,
	spdX : 3,
	y : 250,
	spdY : 7,
	name : "P",
	font : '30px Arial',
	wallFont : '60px Arial',
	topBottomFont : '10px Arial',
	color : myPink,
	colorWall : appleRed,
	colorTopBottom : skyBlue,
	highPoints : 10,
	w: 30,
	h: 30
};
// end of player

// this is a "Constructor"
Enemy = function(id, passX, passY, passName, passFont, passWallFont, passTopBottomFont, passColor, passWidth, passHeight) {

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
		w: passWidth,
		h: passHeight
	};

	enemyList[id] = enemy;

};

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// end of Enemy() constructor

function addUserName() {
	//var message;
	
	nameOfUser = document.getElementById("userName").value;
	//message = "User name has been entered as " + nameOfUser;
	//document.getElementById("showUserName").innerHTML = message;
	
	ctx.font = "20px Arial";
	ctx.fillStyle = "#FF0000";
	ctx.fillText("Player: " + nameOfUser, 20, 250);
}

function getStartingHP() {
	player.highPoints = document.getElementById("startingHP").value;
	//message = "User name has been entered as " + nameOfUser;
	//document.getElementById("showUserName").innerHTML = message;
}

function updateCanvasWidth() {
	var message;
	
	var gameWidth = document.getElementById("inputCanvasWidth").value;

	if(isNaN(gameWidth) || gameWidth < 500 || gameWidth > 900) {
		message = "Input not valid, you entered " + gameWidth;
		alert(message);
	}
	else {
		message = "Valid input! Setting canvas width to " + gameWidth;
		alert(message);
		document.getElementById("ctx").width = gameWidth;
		ctxWidth = gameWidth;
	}
}

getDistanceBetweenEntity = function(entity1, entity2) {
	var dx = entity1.x - entity2.x;
	var dy = entity1.y - entity2.y;
	return Math.sqrt(dx * dx + dy * dy);

};

testCollisionRectRect = function(rect1, rect2) {
	return rect1.x <= rect2.x + rect2.width
	&& rect2.x <= rect1.x + rect1.width
	&& rect1.y <= rect2.y + rect2.height
	&& rect2.y <= rect1.y + rect1.height;
};

testCollisionEntity = function(entity1, entity2) {
	var rect1 = {
		x: entity1.x,
		y: entity1.y,
		width: entity1.w,
		height: entity1.h
	};
	
	var rect2 = {
		x: entity2.x,
		y: entity2.y,
		width: entity2.w,
		height: entity2.h
	};
	return testCollisionRectRect(rect1, rect2);
};

document.onmousemove = function(mouse) {
	var mouseX = mouse.clientX;
	var mouseY = mouse.clientY;
	console.log("mouse x,y: " + mouseX + "," + mouseY);
	player.x = mouseX - 12;
	player.y = mouseY - 400;
};
updateEntity = function(something) {
	updateEntityPosition(something);
	drawEnemy(something);
};

updateEntityPosition = function(something) {
	var red = getRandomIntInclusive(0, 255);
	var green = getRandomIntInclusive(0, 255);
	var blue = getRandomIntInclusive(0, 255);

	something.x += something.spdX;
	something.y += something.spdY;

	//flips spdX if we hit either the left or the right sides
	if (something.x >= ctxWidth - something.w  || something.x <= 0 - something.w) {// right side OR left side
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

drawPlayer = function(something) {
	ctx.save();
	ctx.font = something.font;
	ctx.fillStyle = something.color;
	//ctx.fillText(something.name, something.x, something.y);
	ctx.fillRect(something.x-something.w/2,something.y-something.h/2,something.w,something.h);
	ctx.restore();
};

drawEnemy = function(something) {
	ctx.save();
	ctx.font = something.font;
	ctx.fillStyle = something.color;
	//ctx.fillText(something.name, something.x, something.y);
	//ctx.fillRect(something.x,something.y,something.w,something.h);
	ctx.fillRect(something.x-something.w/2,something.y-something.h/2,something.w,something.h);
	ctx.restore();
};

drawUserName = function(something) {
	ctx.font = "20px Arial";
	ctx.fillStyle = "#FF0000";
	ctx.fillText("Player: " + nameOfUser, 20, ctxHeight-50);
	
};

update = function() {
	ctx.clearRect(0, 0, ctxWidth, ctxHeight);
	//updateEntity(player);

	drawPlayer(player);
	drawUserName();
	
	var timeSurvived = Date.now() - timeWhenGameStarted;
	if (timeSurvived >= 3000) {
		ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
		ctx.fillRect(ctxWidth-50, 100, 50, 300);
		if(player.x >= ctxWidth-30 && player.y >= 100) {
			alert("You Win!");
			player.highPoints = 10;
			timeWhenGameStarted = Date.now();
		}
		for (var i in enemyList) {
			updateEntity(enemyList[i]);

			var isColliding = testCollisionEntity(player, enemyList[i]);
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
	ctx.fillText("Health Points: " + player.highPoints, 10, 30);
	var currentTime = Date.now() - timeWhenGameStarted;
	ctx.font = "30px Arial";
	ctx.fillStyle = "#FF0000";
	ctx.fillText("Time Survived: " + currentTime / 1000 + " s", 10, 70);

};
// end of update()

Enemy('E1', 70, 60, 'E01', '30px Arial', '60px Arial', '10px Arial', grassGreen,30,30);

Enemy('E2', 80, 50, 'E02', '60px Arial', '30px Arial', '15px Arial', grassGreen,30,60);

Enemy('E3', 75, 50, 'E03', '20px Arial', '80px Arial', '20px Arial', grassGreen,30,30);

Enemy('E4', 70, 60, 'E04', '30px Arial', '60px Arial', '10px Arial', grassGreen,30,60);

Enemy('E5', 80, 50, 'E05', '60px Arial', '30px Arial', '15px Arial', grassGreen,30,30);

setInterval(update, 100);

