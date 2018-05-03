$("#blueBox").css({top: 200, left: 200, position:'absolute'});

// Moves blue box in direction of arrow key
document.onkeydown = function(e) {
    var blueBoxOffset = $("#blueBox").offset();
    var moveLength = 5;
    switch (e.keyCode) {
        case 37: // Move left
            var moveLeft = blueBoxOffset.left - moveLength;
            $("#blueBox").css({top: blueBoxOffset.top, left: moveLeft, position: 'absolute'});
            break;
        case 38: // Move up
            var moveUp = blueBoxOffset.top - moveLength;
            $("#blueBox").css({top: moveUp, left: blueBoxOffset.left, position: 'absolute'});
            break;
        case 39: // Move right
            var moveRight = blueBoxOffset.left + moveLength;
            $("#blueBox").css({top: blueBoxOffset.top, left: moveRight, position: 'absolute'});
            break;
        case 40: // Move down
            var moveDown = blueBoxOffset.top + moveLength;
            $("#blueBox").css({top: moveDown, left: blueBoxOffset.left, position: 'absolute'});
            break;
    }
};
