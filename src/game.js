var player, enemy, coin, score, deathScreen;

var playerXPos = 10;
var playerYPos = 120;

var enemyXPos = 200;
var enemyYPos = 200;

$(function() {
    RenderEngine.init(); // Sets up 2D canvas
    initGamePieces(); // Creates all game objects
    Game(); // Contains the game loop and game related variables
});

// Creates all game objects and places most on canvas
function initGamePieces() 
{
    player = new component(20, 20, "green", playerXPos, playerYPos);
    enemy = new component(25, 25, "red", enemyXPos, enemyYPos);
    coin = new component(10, 10, "yellow", 10, 200);
    scoreBoard = new component("30px", "Consolas", "black", 280, 40, "text");
    deathScreen = new component(100, 50, "black", 10, 200, "text");

    // Places player, enemy and coin objects on canvas
    RenderEngine.update(player);
    RenderEngine.update(enemy);
    RenderEngine.update(coin);

    // Sets scoreBoard to 0 and places it on canvas
    scoreBoard.text = "Score: 0";
    RenderEngine.update(scoreBoard);
}


var Game = function()
{ 
    let score = 0; // The score of the game
    let isDead = false;
    let frameNo = 0;
    let velocity = [1, -1, 0]; // Contains all the speeds components can be
    let keys = []; // Stores all the keys that have been pressed

    setInterval(function gameLoop()
    {
        listenForKeyPress();

        if (player.crashWith(enemy))
        {
            playerDeath();

        }  else {
        
            if (player.crashWith(coin)) { // Detects player collision with coin
                coinCollision();
            }

            randomAI(); // Makes enemy move at random
            enemyWallCollision(); // Makes enemy bounce off walls

            RenderEngine.clearCanvas();
            frameNo += 1; // Increments frame number

            // Resets player speed so speed is not kept after key press
            player.speedX = 0;
            player.speedY = 0;

            playerMove(); // Checks for user input and responds accordingly
        
            player.newPos();
            enemy.newPos();
            RenderEngine.update(coin);
            RenderEngine.update(player);
            RenderEngine.update(enemy);
            scoreBoard.text = "Score: " + score;
            RenderEngine.update(scoreBoard);
        }

    }, 10);

    // Event listener for keyPresses, stores key number in key
    function listenForKeyPress()
    {
        window.addEventListener('keydown', function (e)
        {

        keys = (keys || []);
        keys[e.keyCode] = (e.type == "keydown");

        })

        window.addEventListener('keyup', function (e)
        {
            keys[e.keyCode] = (e.type == "keydown");
        })
    }


    // Deals with player movement
    function playerMove()
    {
        if (keys[37] && player.x >= 0) {
            player.speedX = -1;
        }
        if (keys[39] && player.x <= getBoundary(player).x) {
            player.speedX = 1;
        }
        if (keys[38] && player.y >= 0) {
            player.speedY = -1;
        }
        if (keys[40] && player.y <= getBoundary(player).y) {
            player.speedY = 1; 
        }
    }

    // Determines movement of random AI
    function randomAI()
    {
        let AIChangeRate = 100;
        if (frameNo % AIChangeRate == 0) { // Changes AI movement every AIChangeRate number of frames

            // Generates random numbers between 0 and 2 which will be the indexes of velocity
            var aiSpeedX = Math.floor((Math.random() * 3));
            var aiSpeedY = Math.floor((Math.random() * 3));

            // velocity contains the 3 velocities the enemy can be. 1, 0 and -1.
            enemy.speedX = velocity[aiSpeedX];
            enemy.speedY = velocity[aiSpeedY];
        }
    }


    // Function deals with player death
    function playerDeath() 
    {

        // Presents death message to user
        deathScreen.text = "You died. Press r to respawn.";
        RenderEngine.update(deathScreen);
        
        if (keys[82]) { // If r is pressed game components are reset
            player.x = playerXPos;
            player.y = playerYPos;

            enemy.x = enemyXPos;
            enemy.y = enemyYPos;

            frameNo = 0;
            isDead = false;
            score = 0;
        }
    }


    // Function deals with the event of a player picking up a coin
    function coinCollision() 
    {
        score = score + 1; // Increments score if collision

        // Gets boundary of where coin can spawn
        var coinXBoundary = RenderEngine.CANVAS_WIDTH - coin.width; 
        var coinYBoundary = RenderEngine.CANVAS_HEIGHT - coin.height;

        // Generates random coordinates within the boundaries
        var newCoinX = Math.floor((Math.random() * coinXBoundary));
        var newCoinY = Math.floor((Math.random() * coinYBoundary));

        // Sets coin position
        coin.x = newCoinX;
        coin.y = newCoinY;
    }


    // Gets the maximum x and y co_ordinate a component can traverse to
    function getBoundary(component) 
    {
        var x = RenderEngine.CANVAS_WIDTH - component.width;
        var y = RenderEngine.CANVAS_HEIGHT - component.height;

        return {
            x : x,
            y : y
        }
    }


    // Checks if enemy has collided with wall and makes them change direction if they have
    function enemyWallCollision() 
    {
        if (enemy.x == getBoundary(enemy).x) {
            enemy.speedX = -1;
        }
        if (enemy.x == 0) {
            enemy.speedX = 1;
        }
        if (enemy.y == getBoundary(enemy).y) {
            enemy.speedY = -1;
        }
        if (enemy.y == 0) {
            enemy.speedY = 1;
        }
    }
}

