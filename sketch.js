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
	text("Papa's Smoothie-Land", 0, 0);
}

// world.gravity.y = 10;

// let ball = new Sprite();
// ball.diameter = 50;
// ball.img = '😉';

// let groundA = new Sprite();
// groundA.x = -120;
// groundA.width = 220;
// groundA.rotation = 30;
// groundA.physics = STATIC;

// let groundB = new Sprite();
// groundB.x = 120;
// groundB.width = 220;
// groundB.rotation = -30;
// groundB.physics = STATIC;

// q5.update = function () {
// 	background('blue');
// 	text('click to jump!', 0, -50);

// 	if (mouse.presses()) ball.vel.y = -5;
// };