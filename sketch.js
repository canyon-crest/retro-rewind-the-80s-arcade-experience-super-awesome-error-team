await Canvas();
var screen = "start"
let gameOver = false;
let walls;
let player, evilGuy, duck;
let grapefruitGreenTea, matchaDrink, mangoDrink, passionFruitDrink, watermelonSmoothie, milkTea, peachOolong;
let ingredients = new Group();

if (screen === "start") {
	abc();
}
function abc() {
    grapefruitGreenTea = new Sprite(-150,40);
    ggtDrinkSetup();

    matchaDrink = new Sprite(-100,40);
    mDrinkSetup();

    mangoDrink = new Sprite(-50,40);
    mangoDrinkSetup();

    passionFruitDrink = new Sprite(0,40);
    passionFruitDrinkSetup();

    watermelonSmoothie = new Sprite(50,40);
    watermelonSmoothieSetup();

    milkTea = new Sprite(100,40);
    milkTeaSetup();

    peachOolong = new Sprite(150,40);
    peachOolongSetup();

    q5.update = function() {
        background("white");
        fill("pink");
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Hey-T Game", 0, -40);
        text("Click anywhere to begin", 0, 20);
    };

	document.getElementById("body").addEventListener("click", playScreen);
};

let recipes = { // like a dictionary
    "Milk Tea": ["milk", "black"], // every string before comma = key
    "Matcha Tea": ["milk", "matcha"],
    "Mango Grapefruit Green Tea": ["mango", "grapefruit", "green"],
    "Grapefruit Green Tea": ["grapefruit", "green"],
    "Peach Oolong Tea": ["milk", "peach", "oolong"],
    "Passion Fruit Green Tea": ["green", "passion"],
    "Watermelon Smoothie": ["watermelon"]
};

let recipeNames = Object.keys(recipes); // each key gives us a list to use
let currentDrink = "";
let neededIngredients = [];

let completedDrinks = [];
let ingredientsCollected = [];

function nextRound() {
    ingredientsCollected = [];

    // remove leftover sprites by moving them off screen
    for (let i = ingredients.length - 1; i >= 0; i--) {
        ingredients[i].x = 9999;
        ingredients[i].y = 9999;
    }
    
    // get remaining drinks
    let remaining = recipeNames.filter(function(name) { // filters out completed drinks, keeping only the ones we haven't made yet
        return !completedDrinks.includes(name);
    });
    // short for:
    // let remaining = [];
    // for (let i = 0; i < recipeNames.length; i++) {
    //     if (!completedDrinks.includes(recipeNames[i])) {
    //         remaining.push(recipeNames[i]);
    //     }
    // }

    // example:
    // Round 1: completedDrinks = [] → filter keeps all 7 → remaining.length = 7
    // Round 2: completedDrinks = ["Milk Tea"] → filter skips Milk Tea → remaining.length = 6
    // Round 3: completedDrinks = ["Milk Tea", "Matcha Tea"] → filter skips both → remaining.length = 5
    // ...
    // Round 7: completedDrinks has 6 drinks → remaining.length = 1
    // Round 8: completedDrinks has all 7 → remaining.length = 0 → endScreen()
    
    // if no drinks left, you win!
    if (remaining.length === 0) {
        gameOver = true;

        // YEET!
        player.x = 9999;
        player.y = 9999;
        evilGuy.x = 9999;
        evilGuy.y = 9999;
        duck.x = 9999;
        duck.y = 9999;
        evilGuy.speed = 0;
        duck.speed = 0;
            
        // hide all walls
        for (let i = walls.length - 1; i >= 0; i--) {
            walls[i].x = 9999;
            walls[i].y = 9999;
            walls[i].width = 0;
            walls[i].height = 0;
        }
        return;
    }

    currentDrink = remaining[Math.floor(Math.random() * remaining.length)];
    neededIngredients = recipes[currentDrink];
    console.log("Make: " + currentDrink, "Need: " + neededIngredients);

    // map ingredient names to their setup functions
    let setupFunctions = {
        "watermelon": watermelonSetup,
        "mango": mangoSetup,
        "peach": peachSetup,
        "milk": milkSetup,
        "grapefruit": grapeFruitSetup,
        "passion": passionSetup,
        "oolong": oolongSetup,
        "matcha": matchaSetup,
        "black": blackSetup,
        "green": greenSetup,
        "grapefruitGreenTea": ggtDrinkSetup,
        "matchaDrink": mDrinkSetup,
        "mangoDrink": mangoDrinkSetup,
        "passionFruitDrink": passionFruitDrinkSetup,
        "watermelonSmoothie": watermelonSmoothieSetup,
        "milkTea": milkTeaSetup,
        "peachOolong": peachOolongSetup
    };

    let positions = [{x: 100, y: -70}, {x: -620, y: -70}, {x: 500, y: -100}, {x: 500, y: 200}, {x: -60, y: 200}, {x: 250, y: -220}, {x: -200, y: 150}, {x: -200, y: 0}, {x: -250, y: -210}, {x: -520, y: 110}];

    // shuffles ingredient positions
    for (let i = positions.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = positions[i];
    positions[i] = positions[j];
    positions[j] = temp;
    }

    // another dictionary except for ingredient positions
    for (let i = 0; i < neededIngredients.length; i++) {
    let name = neededIngredients[i];
    let pos = positions[i]; // grab the next shuffled position
    let sprite = new Sprite(pos.x, pos.y);
    
    window[name] = sprite;
    setupFunctions[name]();
    
    sprite.name = name;
    ingredients.add(sprite);
    }
}

function playScreen() {
	document.getElementById("body").removeEventListener("click", playScreen);

    grapefruitGreenTea.x = 9999;
    matchaDrink.x = 9999;
    mangoDrink.x = 9999;
    passionFruitDrink.x = 9999;
    watermelonSmoothie.x = 9999;
    milkTea.x = 9999;
    peachOolong.x = 9999;

    nextRound();

    player = new Sprite(0,20);
    playerSetup();
    
    evilGuy = new Sprite(-620, 220);
    evilSetup();

    duck = new Sprite(620, -220);
    duckSetup();

    walls = buildMazeFromGrid(mazeGrid);

    q5.update = function(){
        if (gameOver) {
            background("white");
            fill("pink");
            textSize(32);
            textAlign(CENTER, CENTER);
            text("Game over! You have made " + completedDrinks.length + " drinks. There are " + (7 - completedDrinks.length) + " drinks left to make!", 0, 0);
            for (let i = ingredients.length - 1; i >= 0; i--) {
                ingredients[i].x = 9999;
                ingredients[i].y = 9999;
            }
            return;
        }
        
        background('skyblue');

        fill("black");
        textSize(18);
        textAlign(CENTER, CENTER);
        text("Make: " + currentDrink, 0, -320);

        player.vel.x = 0;
        player.vel.y = 0;

        if (kb.pressing('left'))  player.vel.x = -3;
        if (kb.pressing('right')) player.vel.x = 3;
        if (kb.pressing('up'))    player.vel.y = -3;
        if (kb.pressing('down'))  player.vel.y = 3;

        player.collides(walls);

        if (player.overlaps(evilGuy) || player.overlaps(duck)){
            gameOver = true;

            player.x = 9999;
            player.y = 9999;
            evilGuy.x = 9999;
            evilGuy.y = 9999;
            duck.x = 9999;
            duck.y = 9999;
            evilGuy.speed = 0;
            duck.speed = 0;
            
            // hide all walls
            for (let i = walls.length - 1; i >= 0; i--) {
                walls[i].x = 9999;
                walls[i].y = 9999;
                walls[i].width = 0;
                walls[i].height = 0;
            }
            return;
        }

        if (ingredientsCollected.length === neededIngredients.length) {
            let gotAll = neededIngredients.every(function(i) {
                return ingredientsCollected.includes(i);
            });
        if (gotAll) {
            completedDrinks.push(currentDrink);
            console.log("You made " + currentDrink + "! (" + completedDrinks.length + "/" + recipeNames.length + ")");
            nextRound();
        }
    }

        evilGuy.overlaps(ingredients);
        evilGuy.collides(walls);
        duck.overlaps(ingredients); 
        duck.collides(walls);
        evilGuy.overlaps(duck);

        player.overlaps(ingredients, function(p, ingredient){
            ingredientsCollected.push(ingredient.name)
            ingredient.delete();
            console.log(ingredientsCollected);
        })

        let distance = dist(player.x, player.y, evilGuy.x, evilGuy.y);
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
        else if (distance < 10){
            evilGuy.speed = 0;
            console.log("Caught by Hare!");
        }


        let distance2 = dist(player.x, player.y, duck.x, duck.y);
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
        else if (distance2 < 10){
            duck.speed = 0;
            console.log("Caught by Hare's duck!");
        }
    }
}

function playerSetup(){
    player.addAni(
        'images/bobagirl_1.png',
        'images/bobagirl_2.png',
    );
    player.ani.frameDelay = 10;
    player.width = 40;
    player.height = 90;
    player.scale = 0.4;
    player.physics = DYNAMIC;
    player.rotationLock = true;
}

function evilSetup(){
    evilGuy.diameter = 30;
    evilGuy.addAni('images/hare.png', 2, '320x320');
    evilGuy.ani.frameDelay = 6;
    evilGuy.scale = 0.3;
    evilGuy.width = 40;
    evilGuy.height = 40;
    evilGuy.physics = DYNAMIC;
    evilGuy.rotationLock = true;
}

function duckSetup(){
    duck.diameter = 30;
    duck.addAni('images/evilduck.png', 2, '256x256');
    duck.ani.frameDelay = 5;
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

function ggtDrinkSetup(){
    grapefruitGreenTea.addAni('images/grapefruit gt.png', 7, '256x256');
    grapefruitGreenTea.ani.frameDelay = 6;
    grapefruitGreenTea.scale = 0.6;
    grapefruitGreenTea.width = 40;
    grapefruitGreenTea.height = 40;
}

function mDrinkSetup(){
    matchaDrink.addAni('images/matcha_drink.png', 10, '256x256');
    matchaDrink.ani.frameDelay = 6;
    matchaDrink.scale = 0.6;
    matchaDrink.width = 40;
    matchaDrink.height = 40;
}

function mangoDrinkSetup(){
    mangoDrink.addAni('images/mango_grapefruit_drink.png', 9, '256x256');
    mangoDrink.ani.frameDelay = 6;
    mangoDrink.scale = 0.6;
    mangoDrink.width = 40;
    mangoDrink.height = 40;
}

function passionFruitDrinkSetup(){
    passionFruitDrink.addAni('images/passionfruit_drink.png', 9, '256x256');
    passionFruitDrink.ani.frameDelay = 6;
    passionFruitDrink.scale = 0.6;
    passionFruitDrink.width = 40;
    passionFruitDrink.height = 40;
}

function watermelonSmoothieSetup(){
    watermelonSmoothie.addAni('images/watermelon_smoothie.png', 7, '256x256');
    watermelonSmoothie.ani.frameDelay = 6;
    watermelonSmoothie.scale = 0.6;
    watermelonSmoothie.width = 40;
    watermelonSmoothie.height = 40;
}

function milkTeaSetup(){
    milkTea.addAni('images/milk_tea.png', 7, '256x256');
    milkTea.ani.frameDelay = 6;
    milkTea.scale = 0.6;
    milkTea.width = 40;
    milkTea.height = 40;
}

function peachOolongSetup(){
    peachOolong.addAni('images/peach_oolong.png', 7, '256x256');
    peachOolong.ani.frameDelay = 6;
    peachOolong.scale = 0.6;
    peachOolong.width = 40;
    peachOolong.height = 40;
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
    [1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,1,1,1,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,1],
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

function restartShortcut(event){
    if (event.key === "r"){
        event.preventDefault();
        player.delete();
        evilGuy.delete();
        duck.delete();

        for (let i = ingredients.length - 1; i >= 0; i--) {
            ingredients[i].x = 9999;
            ingredients[i].y = 9999;
        }

        for (let i = walls.length - 1; i >= 0; i--) {
            walls[i].x = 9999;
            walls[i].y = 9999;
            walls[i].width = 0;
            walls[i].height = 0;
        }
        gameOver = false;
        completedDrinks = [];
        playScreen();
    }
}
document.addEventListener("keydown", restartShortcut);