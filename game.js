var myVar;
operation();

function operation() {
    $("#blueBox").css({top: 200, left: 200, position:'absolute'});
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
        $("#blueBox").css({top: 200, left: 200, position:'absolute'});
            break;
        case 38:
            alert('up');
            break;
        case 39:
            alert('right');
            break;
        case 40:
            alert('down');
            break;
    }
};
