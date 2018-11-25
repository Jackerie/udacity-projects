const xMultiplier = 101;
const yMultiplier = 83;

// Enemies our player must avoid
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.speed = Math.random() * (6 - 1) + 1;

    this.x = convertX(0);
    this.y = convertY(row);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (convertX(dt) * this.speed);
    if (this.x > convertX(5)) this.x = convertX(-1);

    // this.x = 10
    // player.x = 90
    // this.x - player.x = -80
    // convertX(.60)? -> 50
    // is -80 < 50? yes
    //     -80
    // 🐞--------😎
    // is 20 < 50? yes
    // 🐞--😎
    if (this.y == player.y && Math.abs(this.x - player.x) < convertX(.60)) {
        player = new Player();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// returns the x position as a function of the size of a cell
var convertX = function(x) {
    return (x * xMultiplier);
}

// returns the y position as a function of the size of a cell
var convertY = function(y) {
    return (y * yMultiplier) - (yMultiplier / 2)
}

// Enemies our player must avoid
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    this.x = convertX(2);
    this.y = convertY(5);
};

// Check if the player is in the water
Player.prototype.update = function() {
    if (this.y == convertY(0)) {
        let modal = document.getElementsByClassName("modal-window");
         modal[0].classList.add("open");
        console.log("winner winner chicken dinner");
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key === undefined) return;

    if (key === 'left') {
        this.x = (this.x - (1 * xMultiplier)).clamp(convertX(0), convertX(4))
    } else if (key === 'down') {
        this.y = (this.y + (1 * yMultiplier)).clamp(convertY(0), convertY(5))
    } else if (key === 'right') {
        this.x = (this.x + (1 * xMultiplier)).clamp(convertX(0), convertX(4))
    } else {
        this.y = (this.y - (1 * yMultiplier)).clamp(convertY(0), convertY(6))
    }
}

Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};

// create enemies and player
const numEnemies = 3;
var allEnemies = [];
for (var i = 0; i < numEnemies; i++) {
    allEnemies.push(new Enemy(i + 1));
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
