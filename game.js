operation();

function operation() {
    $("#blueBox").css({top: 200, left: 200, position:'absolute'});
}

document.onkeydown = function(e) {
    var blueBoxOffset = $("#blueBox").offset();
    var moveLength = 10;
    switch (e.keyCode) {
        case 37:
            var moveLeft = blueBoxOffset.left - moveLength;
            $("#blueBox").css({top: blueBoxOffset.top, left: moveLeft, position: 'absolute'});
            break;
        case 38:
            var moveUp = blueBoxOffset.top - moveLength;
            $("#blueBox").css({top: moveUp, left: blueBoxOffset.left, position: 'absolute'});
            break;
        case 39:
            var moveRight = blueBoxOffset.left + moveLength;
            $("#blueBox").css({top: blueBoxOffset.top, left: moveRight, position: 'absolute'});
            break;
        case 40:
            var moveDown = blueBoxOffset.top + moveLength;
            $("#blueBox").css({top: moveDown, left: blueBoxOffset.left, position: 'absolute'});
            break;
    }
};
