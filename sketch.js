await Canvas();
var screen = "start"
if (screen === "start") {
	abc();
}
function abc() {
	textSize(32);
	textAlign(CENTER, CENTER);
	background("white")
	fill("pink");
	text("Papa's Smoothie-Land", 0, -25);
	text("Click anywhere to begin", 0, 25);
	document.getElementById("body").addEventListener("click", (playScreen));
};

function playScreen() {
	document.getElementById("body").removeEventListener("click", (playScreen));
// world.gravity.y = 10;

let ball = new Sprite();
ball.diameter = 50;
ball.img = '🤯';
ball.physics = DYNAMIC;

function collideX(){
	ball.vel.x = 0;
}

function collideY(){
	ball.vel.y = 0;
}

addEventListener("keydown", function(draw){
	if (kb.pressing('left')) {
		ball.vel.x = -5;
		ball.vel.y = 0;
		return;
	}

	else if (kb.pressing('right')) {
		ball.vel.x = 5;
		ball.vel.y = 0;
		return;
	} 

	else if (kb.pressing('up')) {
		ball.vel.x = 0;
		ball.vel.y = -5;
		return;
	} 
	else if (kb.pressing('down')) {
		ball.vel.x = 0;
		ball.vel.y = 5;
		return;
	} 
	else {
		ball.vel.x = 0;
		ball.vel.y = 0;
		return;
	}
})


let groundA = new Sprite();
groundA.x = -520;
groundA.width = 220;
groundA.height = 10;
groundA.rotation = 90;
groundA.physics = STATIC;
q5.update = function() {
	clear();
	if (ball.collides(groundA)){
		collideX();
		console.log('hit');
	}
}

let groundB = new Sprite();
groundB.x = 520;
groundB.width = 220;
groundB.height = 10;
groundB.rotation = 90;
groundB.physics = STATIC;

q5.update = function () {
	background('blue');
	text('click to jump!', 0, -50);

	if (mouse.presses()) ball.vel.y = -5;
};
};

function endScreen() {
	textSize(32);
	textAlign(CENTER, CENTER);
	background("white")
	fill("pink");
	text("Congratulations! This is the end :)", 0, 0);
};