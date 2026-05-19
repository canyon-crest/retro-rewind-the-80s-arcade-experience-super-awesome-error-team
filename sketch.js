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
	text("Hey-T Game", 0, -25);
	text("Click anywhere to begin", 0, 25);
	document.getElementById("body").addEventListener("click", playScreen);
    
};

let walls;
let player, evilGuy, duck;
let watermelon, milk, black, matcha, mango, grapefruit, green, peach, oolong, passion;

let milkTea = [milk, black];
let matchaTea = [milk, matcha];
let mangoGrapefruit = [mango, grapefruit, green];
let grapefruitGreen = [grapefruit, green];
let peachOolong = [milk, peach, oolong];
let passionGreen = [green, passion];
let watermelonSmoothie = [watermelon];

let drinks = [milkTea, matchaTea, mangoGrapefruit, grapefruitGreen, peachOolong, passionGreen, watermelonSmoothie];
let ingredientsAvailable = ["watermelon", "milk", "black", "matcha", "mango", "grapefruit", "green", "peach", "oolong", "passion", "boba", "lychee", "cheese"];
let ingredientsCollected = [];

function playScreen() {
	document.getElementById("body").removeEventListener("click", playScreen);
    player = new Sprite();
    playerSetup();
    
    evilGuy = new Sprite(-620, 220);
    evilSetup();

    duck = new Sprite(620, -220);
    duckSetup();

    watermelon = new Sprite(100, -70);
    watermelonSetup();

    mango = new Sprite(-620, -70);
    mangoSetup();

    peach = new Sprite(500, -100);
    peachSetup();

    milk = new Sprite(500, 200);
    milkSetup();

    grapefruit = new Sprite(-60, 200);
    grapeFruitSetup();

    passion = new Sprite(250, -220);
    passionSetup();

    oolong = new Sprite(-200, 150);
    oolongSetup();

    matcha = new Sprite(-200, 0);
    matchaSetup();
    
    black = new Sprite(-250, -210);
    blackSetup();

    green = new Sprite(-520, 110);
    greenSetup();


    walls = buildMazeFromGrid(mazeGrid);

    q5.update = function(){
        background('skyblue');

        player.vel.x = 0;
        player.vel.y = 0;

        if (kb.pressing('left'))  player.vel.x = -3;
        if (kb.pressing('right')) player.vel.x = 3;
        if (kb.pressing('up'))    player.vel.y = -3;
        if (kb.pressing('down'))  player.vel.y = 3;

        (player.collides(walls));
        
        if (player.overlaps(milk)){
            ingredientsCollected.push("milk");
            milk.delete();
        }

        if (player.overlaps(black)){
            ingredientsCollected.push("black");
            black.delete();
        }

        if (player.overlaps(matcha)){
            ingredientsCollected.push("matcha");
            matcha.delete();
        }

        if (player.overlaps(mango)){
            ingredientsCollected.push("mango");
            mango.delete();
        }

        if (player.overlaps(grapefruit)){
            ingredientsCollected.push("grapefruit");
            grapefruit.delete();
        }

        if (player.overlaps(green)){
            ingredientsCollected.push("green");
            green.delete();
        }

        if (player.overlaps(peach)){
            ingredientsCollected.push("peach");
            peach.delete();
        }

        if (player.overlaps(oolong)){
            ingredientsCollected.push("oolong");
            oolong.delete();
        }

        if (player.overlaps(passion)){
            ingredientsCollected.push("passion");
            passion.delete();
        }

        if (player.overlaps(watermelon)){
            ingredientsCollected.push("watermelon");
            watermelon.delete();
        }
        console.log(ingredientsCollected);

        let distance = dist(player, evilGuy);
        if (distance > 50){
            evilGuy.direction = evilGuy.angleTo(player);

            // checks if it's barely moving (stuck sliding on a wall)
            let actualSpeed = Math.sqrt(evilGuy.vel.x ** 2 + evilGuy.vel.y ** 2);
            if (actualSpeed < 1){
                evilGuy.speed = 10;  // push harder to slide along walls
            } 
            else{
                evilGuy.speed = 2.5;  // normal speed in open space
            }
        } 
        else if (distance < 20){
            evilGuy.speed = 0;
        }

        evilGuy.collides(walls);


        let distance2 = dist(player, duck);
        if (distance2 > 50){
            duck.direction = duck.angleTo(player);

            // checks if it's barely moving (stuck sliding on a wall)
            let actualSpeed2 = Math.sqrt(duck.vel.x ** 2 + duck.vel.y ** 2);
            if (actualSpeed2 < 1){
                duck.speed = 10;  // push harder to slide along walls
            } 
            else{
                duck.speed = 2.5;  // normal speed in open space
            }
        } 
        else if (distance2 < 20){
            duck.speed = 0;
        }

        duck.collides(walls);
    }
}

function endScreen(){
    textSize(32);
    textAlign(CENTER, CENTER);
    background("white");
    fill("pink");
    text("Congratulations! This is the end :)", 0, 0);
}

function playerSetup(){
    player.addAni(
        'images/bobagirl_1.png',
        'images/bobagirl_2.png',
    );
    player.ani.frameDelay = 10;
    player.width = 60;
    player.height = 90;
    player.scale = 0.4;
    player.physics = DYNAMIC;
    player.rotationLock = true;
}

function evilSetup(){
    evilGuy.diameter = 30;
    evilGuy.img = '😈';
    evilGuy.physics = DYNAMIC;
    evilGuy.rotationLock = true;
}

function duckSetup(){
    duck.diameter = 30;
    duck.addAni('images/evilduck.png', 2, '256x256');
    duck.ani.frameDelay = 4;
    duck.scale = 0.4;
    duck.width = 40;
    duck.height = 40;
    duck.physics = DYNAMIC;
    duck.rotationLock = true;
}

function passionSetup(){
    passion.addAni('images/passionfruit.png', 11, '256x256');
    passion.ani.frameDelay = 6;
    passion.scale = 0.4;
    passion.width = 40;
    passion.height = 40;
    passion.physics = STATIC;
    passion.rotationLock = true;
}

function oolongSetup(){
    oolong.addAni('images/oolong.png', 12, '256x256');
    oolong.ani.frameDelay = 6;
    oolong.scale = 0.4;
    oolong.width = 40;
    oolong.height = 40;
    oolong.physics = STATIC;
    oolong.rotationLock = true;
}

function peachSetup(){
    peach.addAni('images/peach_sheet.png', 11, '256x256');
    peach.ani.frameDelay = 6;
    peach.scale = 0.4;
    peach.width = 40;
    peach.height = 40;
    peach.physics = STATIC;
    peach.rotationLock = true;
}

function greenSetup(){
    green.addAni('images/green.png', 12, '256x256');
    green.ani.frameDelay = 6;
    green.scale = 0.4;
    green.width = 40;
    green.height = 40;
    green.physics = STATIC;
    green.rotationLock = true;
}

function grapeFruitSetup(){
    grapefruit.addAni('images/grapefruit.png', 11, '256x256');
    grapefruit.ani.frameDelay = 6;
    grapefruit.scale = 0.4;
    grapefruit.width = 40;
    grapefruit.height = 40;
    grapefruit.physics = STATIC;
    grapefruit.rotationLock = true;
}

function mangoSetup(){
    mango.addAni('images/mango piksel.png', 7, '256x256');
    mango.ani.frameDelay = 6;
    mango.scale = 0.4;
    mango.width = 40;
    mango.height = 40;
    mango.physics = STATIC;
    mango.rotationLock = true;
}

function matchaSetup(){
    matcha.addAni('images/matcha.png', 9, '256x256');
    matcha.ani.frameDelay = 6;
    matcha.scale = 0.4;
    matcha.width = 40;
    matcha.height = 40;
    matcha.physics = STATIC;
    matcha.rotationLock = true;
}

function blackSetup(){
    black.addAni('images/black tea.png', 7, '256x256');
    black.ani.frameDelay = 6;
    black.scale = 0.4;
    black.width = 40;
    black.height = 40;
    black.physics = STATIC;
    black.rotationLock = true;
}

function milkSetup(){
    milk.addAni('images/milk.png', 9, '520x520');
    milk.ani.frameDelay = 6;
    milk.scale = 0.2;
    milk.width = 40;
    milk.height = 40;
    milk.physics = STATIC;
    milk.rotationLock = true;
}

function watermelonSetup(){
    watermelon.addAni(
        'images/watermelon_1.png',
        'images/watermelon_2.png',
        'images/watermelon_3.png',
        'images/watermelon_4.png',
        'images/watermelon_5.png',
        'images/watermelon_6.png',
        'images/watermelon_7.png',
        'images/watermelon_8.png',
        'images/watermelon_9.png',
        'images/watermelon_10.png',
        'images/watermelon_11.png',
        'images/watermelon_12.png',
    );
    watermelon.ani.frameDelay = 6;
    watermelon.scale = 0.4;
    watermelon.width = 40;
    watermelon.height = 40;
    watermelon.physics = STATIC;
    watermelon.rotationLock = true;
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
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,1],
    [1,1,1,1,0,1,0,0,0,0,0,0,0,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1,1,1],
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
