window.addEventListener("load", function(){
				
				
			
			var CANVAS_WIDTH = 900;
			var CANVAS_HEIGHT = 400;
			var GAME_WIDTH = 900;
			var GAME_HEIGHT = 360;
			
			var sprites = {};
			
			var gameLive = true;
			
			var enemies = [{
				x : 100,
				y : 100,
				speedY : 1,
				w : 40,
				h : 40,
				downColor: "#0000FF",
				upColor: "#FF0000"
			}, {
				x : 260,
				y : 100,
				speedY : 2,
				w : 40,
				h : 40,
				downColor: "#00FF00",
				upColor: "#0000FF"
			}, {
				x : 300,
				y : 100,
				speedY : 3,
				w : 40,
				h : 40,
				downColor: "#800000",
				upColor: "#000088"
			}, {
				x : 450,
				y : 100,
				speedY : 7,
				w : 40,
				h : 40,
				downColor: "#FF0000",
				upColor: "#00FF00"
			},
			{
				x : 550,
				y : 100,
				speedY : 1,
				w : 40,
				h : 40,
				downColor: "#0000FF",
				upColor: "#FF0000"
			}, {
				x : 650,
				y : 100,
				speedY : 2,
				w : 40,
				h : 40,
				downColor: "#00FF00",
				upColor: "#0000FF"
			},{
				x : 750,
				y : 100,
				speedY : 3,
				w : 40,
				h : 40,
				downColor: "#800000",
				upColor: "#000088"
			}, {
				x : 850,
				y : 100,
				speedY : 7,
				w : 40,
				h : 40,
				downColor: "#FF0000",
				upColor: "#00FF00"
			},
			
			];
			
			var player = {
				x: 10,
				y: 180,
				speedX: 2,
				w: 40,
				h: 40,
				isMoving: false
			};
			
			var goal = {
				x: 820,
				y: 180,
				w: 50,
				h: 50
				
			};
			
			var movePlayer = function(){
				player.isMoving = true;
				
			};
			
			var stopPlayer = function(){
				player.isMoving = false;
				
			};
			
			var load = function(){
				sprites.player = new Image();
				sprites.player.src = "sprites/hero.png";
				sprites.goal = new Image();
				sprites.goal.src = "sprites/chest.png";
				sprites.enemy = new Image();
				sprites.enemy.src = "sprites/enemy.png";
				sprites.background = new Image();
				sprites.background.src = "sprites/bg.jpg";
			};
			
			var checkCollision = function(rect1, rect2){
				var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
				var closeOnHeight =Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
				
			return closeOnHeight && closeOnWidth;
			};

			var canvas = document.getElementById("myCanvas");
			var ctx = canvas.getContext("2d");
			
			canvas.addEventListener("mousedown", movePlayer);
			canvas.addEventListener("mouseup", stopPlayer);
			

			
			
			var update = function() {
				if(checkCollision(player, goal)) {
					gameLive = false;
					alert("You have won the game");
					//later bump up the difficulty
					window.location("");
				};
				
				var j = 0;
				var n = enemies.length;
				
				if(player.isMoving) {
					player.x += player.speedX;
				};
				
				
				
				enemies.forEach(function(element, index) {
					element.y += element.speedY;
					
				//test for collision between player and each enemy
				if(checkCollision(player, element)) {
					gameLive = false;
					alert('Game Over');
					window.location = "";
				}
					if (element.y >= GAME_HEIGHT) {
						element.y = GAME_HEIGHT;
						element.speedY *= -1;
					}
					else if (element.y <= 0) {
						element.y = 0;
						element.speedY *= -1;
					}
				});
				/*while (j < n) {
					enemies[j].y = enemies[j].y + enemies[j].speedY;
					if (enemies[j].y >= GAME_HEIGHT) {
						enemies[j].y = GAME_HEIGHT;
						enemies[j].speedY *= -1;
					}
					else if (enemies[j].y <= 0) {
						enemies[j].y = 0;
						enemies[j].speedY *= -1;
					}
					j++;
				} */
			};

			var draw = function() {
				ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
				
				//draw background
				ctx.drawImage(sprites.background, 0, 0);
				
				//draw player
				ctx.drawImage(sprites.player, player.x, player.y);
				
				//draw treasure chest
				ctx.drawImage(sprites.goal, goal.x, goal.y);
				
				//ctx.fillStyle = "rgba(128, 128, 0, 0.6)";
				//ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
				
				//ctx.fillStyle = "#000000";
				//ctx.fillRect(player.x, player.y, player.w, player.h);
				//ctx.fillStyle = "#3333FF";
				enemies.forEach(function(element,index) {
					ctx.drawImage(sprites.enemy, element.x, element.y);
				});
				/*for(var j = 0; j < enemies.length; j++) {
					if (enemies[j].speedY > 0) {
						ctx.fillStyle = enemies[j].downColor;
					}
					else if(enemies[j].speedY < 0) {
						ctx.fillStyle = enemies[j].upColor;
					}
					else {
						ctx.fillStyle = "#000000";
					}
					ctx.fillRect(enemies[j].x, enemies[j].y, enemies[j].w, enemies[j].h);
				}*/
				
			};
			var step = function() {
				update();
				draw();
				if (gameLive) {
					window.requestAnimationFrame(step);
				}
			};
			
			load();
			step();
			
			/*
			 * var j = 0;
				var n = enemies.length;
				while (j < n) {
					if (enemies[j].speedY > 0) {
						ctx.fillStyle = enemies[j].downColor;
					}
					else if(enemies[j].speedY < 0) {
						ctx.fillStyle = enemies[j].upColor;
					}
					else {
						ctx.fillStyle = "#000000";
					}
					ctx.fillRect(enemies[j].x, enemies[j].y, enemies[j].w, enemies[j].h);
					j++;
				}
			 */
			});