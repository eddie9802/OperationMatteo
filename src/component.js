function component(width, height, colour, x, y, type) // Creates a component object
{
    // Components type, for most objects this is null
    this.type = type;
    //this.gamearea = myGameArea;

    // Sets colour of component
    this.colour = colour;

    // Size of component
    this.width = width;
    this.height = height;

    // Components initial speed
    this.speedX = 0;
    this.speedY = 0;

    // Components position
    this.x = x;
    this.y = y;

    // Sets objects new position
    this.newPos = function()
    {
        this.x += this.speedX;
        this.y += this.speedY;
    }


    // Determines if object has crashed with another object on screen
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
