var RenderEngine = function ()
{
    const CANVAS_WIDTH = 1280;
    const CANVAS_HEIGHT = 720;

    let ctx;

    function init() // Creates a 2D canvas
    { 
        ctx = document.getElementById('canvas').getContext('2d');
    }


    function update(gamePiece) // Places a gamePiece on the canvas
    {

        if (gamePiece.type == "text")
        {
        ctx.font = gamePiece.width + " " + gamePiece.height;
        ctx.fillStyle = gamePiece.colour;
        ctx.fillText(gamePiece.text, gamePiece.x, gamePiece.y);
        }
        else
        {
        ctx.fillStyle = gamePiece.colour;
        ctx.fillRect(gamePiece.x, gamePiece.y, gamePiece.width, gamePiece.height);
        }
    }


    function clearCanvas() 
    {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }


    return {
        init : init,
        update : update,
        clearCanvas : clearCanvas,
        CANVAS_HEIGHT : CANVAS_HEIGHT,
        CANVAS_WIDTH : CANVAS_WIDTH
    }
}();
//RenderEngine.init();