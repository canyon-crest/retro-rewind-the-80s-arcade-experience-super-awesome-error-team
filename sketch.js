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
	document.getElementById("body").addEventListener("click", playScreen);
    
};

let walls;
function playScreen() {
	document.getElementById("body").removeEventListener("click", playScreen);
    playerSetup();
    evilSetup();
    walls = buildMazeFromGrid(mazeGrid);

    q5.update = function() {
        background('skyblue');

        player.vel.x = 0;
        player.vel.y = 0;

        if (kb.pressing('left'))  player.vel.x = -5;
        if (kb.pressing('right')) player.vel.x = 5;
        if (kb.pressing('up'))    player.vel.y = -5;
        if (kb.pressing('down'))  player.vel.y = 5;

        (player.collides(walls)); // physics engine already does the work

        let distance = dist(player, evilGuy);
        if (distance > 50) {
            evilGuy.direction = evilGuy.angleTo(player);
            evilGuy.speed = 2;
        } else if (distance < 20) evilGuy.speed = 0;

        player.img.scale.x = abs(player.direction) < 90 ? -1 : 1;

        if (evilGuy.speed > 0) {
            evilGuy.img.scale.x = abs(evilGuy.direction) < 90 ? -1 : 1;
        }
    }
// world.gravity.y = 10;
}

function endScreen() {
    textSize(32);
    textAlign(CENTER, CENTER);
    background("white");
    fill("pink");
    text("Congratulations! This is the end :)", 0, 0);
}

let player = new Sprite();
function playerSetup() {
    player.addAni(
        'images/bobagirl_1.png',
        'images/bobagirl_2.png',
    );
    player.ani.delay = 5;
    player.diameter = 30;
    player.physics = DYNAMIC;
}

let evilGuy = new Sprite(-620, 220);
function evilSetup() {
    evilGuy.diameter = 30;
    evilGuy.img = '😈';
    evilGuy.physics = DYNAMIC;

}

const CELL = 40; // size of each grid cell

function buildMazeFromGrid(grid) {
    let walls = new Group();
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 1) {
                let wall = new Sprite();
                wall.x = col * CELL - (grid[0].length * CELL) / 2 + CELL / 2;
                wall.y = row * CELL - (grid.length * CELL) / 2 + CELL / 2;
                wall.width = CELL;
                wall.height = CELL;
                wall.physics = STATIC;
                wall.color = 'darkblue';
                walls.add(wall);
            }
        }
    }
    return walls;
}

let mazeGrid = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1],
    [1,0,1,1,1,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,0,0,1,0,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,1,0,0,1],
    [1,1,1,1,0,1,0,0,0,0,0,0,0,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,0,0,1,0,1,0,1,1,1,0,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,1,1,0,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1],
    [1,1,1,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,1,1,1,1,0,1,0,0,0,0,1,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// function wallMap() {
//     let walls = new Group();

//     function makeWall(x, y, w, h) { // for duplicating walls efficiently
//         let wall = new Sprite();
//         wall.x = x;
//         wall.y = y;
//         wall.width = w;
//         wall.height = h;
//         wall.physics = STATIC;
//         wall.color = 'darkblue';
//         walls.add(wall);
//         return wall;
//     }

//     // outer borders
//     let top    = makeWall(0, -290, 1220, 10);
//     let bottom = makeWall(0, 290, 1220, 10);
//     let left   = makeWall(-610, 0, 10, 590);
//     let right  = makeWall(610, 0, 10, 590);

//     // inner maze walls (to be edited)
//     let topbox = makeWall(0, -30, 200, 10);
//     let bottombox = makeWall(0, 30, 200, 10);
//     let leftbox_up = makeWall(-100, -70, 10, 90);
//     let leftbox_down = makeWall(-100, 70, 10, 90);
//     let rightbox_up = makeWall(100, -70, 10, 90);
//     let right_down = makeWall(100, 70, 10, 90);
// }
