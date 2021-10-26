var gameover = document.getElementById("gameover");
var playerChar = document.getElementById("player");
var playerAlive = true;
var playerPos = 5;
var playerHeight = 37;
var playerSpeed = 1;
var score = 0;

// fuck chrome

if (window.chrome != null) {
	alert("just use firefox already")
}

// input

window.addEventListener("keydown", function(e) {
	if (e.keyCode == 37 || e.keyCode ==  65) {
		//left
		heightManager();
		playerSpeed = 1;
		if (playerPos <= 0) { return;}
		playerPos--
		playerChar.style.left = playerPos+"vh"
	}
	if (e.keyCode == 39 || e.keyCode == 68) {
		//right
		heightManager();
		if (playerPos >= 66 && playerAlive) { die();}
		playerPos = playerPos + playerSpeed
		playerChar.style.left = playerPos+"vh"
	}
	if (e.keyCode == 27) {
		document.location = "https://pea.moe/";
	}
	if (e.keyCode == 13) {
		document.location = "https://pea.moe/game/";
	}
	if (e.keyCode == 32) {
		rainbowToggle();
	}
})

// "momentum"

window.addEventListener("keyup", function(e) {
	if (e.keyCode == 39 || e.keyCode == 68){
		playerSpeed++
		if (playerPos >= 68 && playerAlive) { die();}
	}
})

// keeps player from floating on the edge

function heightManager() {
	if (!playerAlive){return;}
	if (playerPos >= 0 && playerPos <=18){
		playerHeight = 37
		playerChar.style.bottom = playerHeight+"vh"
		return;
	}
	if (playerPos >= 18 && playerPos <=31){
		playerHeight = 36
		playerChar.style.bottom = playerHeight+"vh"
		return;
	}
	if (playerPos >= 31 && playerPos <=46){
		playerHeight = 35
		playerChar.style.bottom = playerHeight+"vh"
		return;
	}
	if (playerPos >= 46 && playerPos <=55){
		playerHeight = 33
		playerChar.style.bottom = playerHeight+"vh"
		return;
	}
	if (playerPos >= 55 && playerPos <=66){
		playerHeight = 30
		playerChar.style.bottom = playerHeight+"vh"
		return;
	}
}

// kills the player and records the score

function die() {
	playerAlive = false;
	if (playerHeight > -13) {
		setTimeout(function() {
				playerHeight--
				playerChar.style.bottom = playerHeight+"vh"
				die()
				return;
			gameover.style.opacity = "1";
		}, 20)
		return;
	}
	gameover.style.opacity = "1";
	score = playerPos - 66;
	updateScore()
}
function updateScore() {
	document.getElementById("score").innerHTML = score;
	if (score >= 350){
		rainbowToggle();
	}
}

// rand color

var degree = 0
function hueCommand(newDegree){
	if (typeof InstallTrigger !== 'undefined') return; // firefox
	degree = newDegree
	document.body.style.filter = "hue-rotate("+degree+"deg)";
}

function randColor() {
	hueCommand(Math.round(Math.random() * 360));
}; randColor();

// rainbow

var degree = 0;
var rainbowColorActive = false;
var rainbowColorTimeout = null;
var rainbowStep = 1;

function rainbowColor() {
	if (!rainbowColorActive) {
		clearTimeout(rainbowColorTimeout);
		return;
	}
	if (rainbowStep >= 10) {if (degree >= 36000){degree = 1};}
	else {if (degree >= 360){degree = 1};}
	degree = degree + rainbowStep;
	rainbowColorTimeout = setTimeout("rainbowColor()", 1);
	document.body.style.filter = "hue-rotate("+degree+"deg)";
}

function rainbowSpeed(step) {rainbowStep = step;}

function rainbowToggle() {
	rainbowColorActive = !rainbowColorActive;
	rainbowColor();
}