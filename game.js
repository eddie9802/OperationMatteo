var player, enemy, coin, score;

// Creates canvas
var mainCanvas = document.createElement("canvas");

var playerXPos = 10;
var playerYPos = 120;

  function startGame()
  {
    myGameArea.start();
    player = new component(20, 20, "green", playerXPos, playerYPos);
    enemy = new component(25, 25, "red", 20, 150);
    coin = new component(10, 10, "yellow", 10, 200);
    scoreBoard = new component("30px", "Consolas", "black", 280, 40, "text");
  }

    function component(width, height, color, x, y, type)
    {
        this.type = type;
        this.gamearea = myGameArea;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.update = function()
    {
      ctx = myGameArea.context;
      if (this.type == "text")
      {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
      }
      else
      {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
    this.newPos = function()
    {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function(otherobj)
    {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width);
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.height);
      var crash = true;
      if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright))
      {
          crash = false;
      }
      return crash;
    }
  }

  var myGameArea =
  { 
      score : 0,
      isDead : false,
      frameNo : 0,
      canvas : mainCanvas,
      start : function()
      {
            this.canvas.width = 500;
            this.canvas.height = 280;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 10);
            window.addEventListener('keydown', function (e)
            {
              myGameArea.keys = (myGameArea.keys || []);
              myGameArea.keys[e.keyCode] = (e.type == "keydown");
            })
            window.addEventListener('keyup', function (e)
            {
                myGameArea.keys[e.keyCode] = (e.type == "keydown");
            })
      },
      clear : function()
      {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
      stop : function() {
        clearInterval(this.interval);
      }
  }




function makeNewPosition(){

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 20;
    var w = $(window).width() - 20;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];

}

function animateDiv(){
    var newq = makeNewPosition();
    $('coin').animate({ top: newq[0], left: newq[1] }, function(){
      animateDiv();
    });
}


  function updateGameArea()
  {

    if (player.crashWith(enemy))
    {

        // Ensures alert is only printed once
        if (myGameArea.isDead == false) {
            alert("You died. Press r to respawn.");
            myGameArea.isDead = true;

            // makes myGameArea.keys empty so player velocity is not carried over to next life
            myGameArea.keys = [];
        }

        //myGameArea.stop();

        // Checks if r was pressed, if it is player position is reset to original position
        if (myGameArea.keys && myGameArea.keys[82]) {
            player.x = playerXPos;
            player.y = playerYPos;
            myGameArea.frameNo = 0;
            myGameArea.isDead = false;
            myGameArea.score = 0;
        }
        
    } else
    {
        // Detects player collision with coin
        if (player.crashWith(coin)) {
            myGameArea.score = myGameArea.score + 1; // Increments score if collision

            // Gets boundary of where coin can spawn
            var coinXBoundary = myGameArea.canvas.width - coin.width; 
            var coinYBoundary = myGameArea.canvas.height - coin.height;

            // Generates random coordinates within the boundaries
            var newCoinX = Math.floor((Math.random() * coinXBoundary));
            var newCoinY = Math.floor((Math.random() * coinYBoundary));

            // Sets coin position
            coin.x = newCoinX;
            coin.y = newCoinY;

        }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    player.speedX = 0;
    player.speedY = 0;
    enemy.x += Math.floor((Math.random() * -0.5) + 0.5);
    enemy.y += Math.floor((Math.random() * -0.5) + 0.5);

    // Are the boundaries of the player
    var xBoundary = myGameArea.canvas.width - player.width;
    var yBoundary = myGameArea.canvas.height - player.height;

    // Checks for user input
    if (myGameArea.keys && myGameArea.keys[37] && player.x >= 0) {player.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[39] && player.x <= xBoundary) {player.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[38] && player.y >= 0) {player.speedY = -1; }
    if (myGameArea.keys && myGameArea.keys[40] && player.y <= yBoundary) {player.speedY = 1; }
    player.newPos();
    coin.update();
    player.update();
    enemy.update();
    scoreBoard.text= "Score: " + myGameArea.score;
    scoreBoard.update();
    }
  }
