// Enemies our player must avoid
let allEnemies = []; //Array of enemies

let characterArray = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];

const scoreSelector = document.querySelector('.score'); //Score selector
const livesSelector = document.querySelector('.lives'); //Lives selector

let score = 0; //Score
let lives = 3; //Lives

let Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    const enemyPosition = [50, 130, 220]; //Array containing the Y axis starting postions of the bugs

    this.speed = Math.floor((Math.random() * 100) + 20); //Random speed between 20 and 100
    this.enemyX = 0; //Enemies starting X coordinate
    this.enemyY = this.enemyY; // Enemies starting coordinate, this is set later
    
    //If statement checking the length of the array and setting bugs in start position

    if(allEnemies.length == 0){
    this.enemyY = enemyPosition[0]; //Selects where to position the bug

    } else if(allEnemies.length == 1){
    this.enemyY = enemyPosition[1];

    } else if(allEnemies.length == 2){
    this.enemyY = enemyPosition[2];
    //If there is more than three bugs in the allEnemies arrray
    } else if(allEnemies.length > 2){

    this.enemyY = enemyPosition[Math.floor(Math.random() * 3)]; //Select a random position out of the enemy position array
    }
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.enemyX = this.enemyX + this.speed * dt;
    //If checks the enemies postion, if it's more than 500 then minus 100
    if (this.enemyX > 500){
        this.enemyX = -100;
    }

    // Collision detection 
    if (Math.abs(this.enemyX - player.playerX) < 70 && Math.abs(this.enemyY - player.playerY) < 70) {
        //Reset player position
        player.playerX = 200;
        player.playerY = 400;
        //Remove one life
        lives -= 1;
        //Check to see if the player is out of lives
        if(lives == 0){
            gameOver(); //Calls gameover
        }
    livesSelector.innerHTML = lives; //Displays current lives
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.enemyX, this.enemyY);
};

//Push three enemies into the allEnemies array for game start
for (let i = 0; i < 3; i++) {
  allEnemies.push(new Enemy());
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function() {
    let playerX = 200; //Player starting position
    let playerY = 400;
    this.playerX = playerX;
    this.playerY = playerY;
    this.sprite = 'images/char-boy.png'; //Player character image
};

Player.prototype.update = function() {
//Check to see if the player is at the water
    if(this.playerY < 0){
        //Reset position
        this.playerX = 200;
        this.playerY = 400;
        //Increment the score
        score += 1;
        //Display score
        scoreSelector.innerHTML = score;
        //Push an extra enemy into the array
        allEnemies.push(new Enemy());
    }
};

//Draw player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.playerX, this.playerY);
};

//Check for keypress and set paremeters for the game board

Player.prototype.handleInput = function(keyCode){
//Switch statement to listen for a certain keypress then break
//Ternary operator check position of player and if the keypress is a valid move
    switch (keyCode) {
        case 'left': //Selects the key   
            return (this.playerX > 0) ? this.playerX -= 100 : this.playerX - 0;//Checks if move is valid else minus nothing
        break;
        case 'up':     
            return (this.playerY > 0) ? this.playerY -= 92 : this.playerY - 0;
        break;
        case 'right':
            return (this.playerX < 400) ? this.playerX += 100 : this.playerX - 0;
        break;
        case 'down':
            return (this.playerY < 400) ? this.playerY += 92 : this.playerY - 0;
        break;
        case 'space': //Check for spacebar keypress and call changeCharacter if true, if not false
            return (this.playerY == 400 && this.playerX == 200) ? changeCharacter() : false;
        break;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player = new Player();

//Change character function selects a random character from the characterArray
function changeCharacter(){
    player.sprite = characterArray[Math.floor(Math.random() * 5)];
}

//Game over function to reset the game board
function gameOver(){
    allEnemies = []; //Remove all enemies
    for (let i = 0; i < 3; i++) {
        allEnemies.push(new Enemy()); //Add three enemies back
    }
    //Reset player position
    player.playerX = 200;
    player.playerY = 400;
    //Reset score
    score = 0;
    //Display new score
    scoreSelector.innerHTML = score;
    //Reset lives
    lives = 3;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});