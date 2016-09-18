/*jshint esversion: 6 */
// ========= ver. 0.0  ===========
// jshint ignore:line

function init() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    // ------------- board drawing ------------------
    let cellSize = 100;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#00ff00";

    // vertical lines
    let i = 1;
    let verticalInterval = setInterval(function() {
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, cellSize * 3);
        ctx.stroke();
        i++;
        if (i === 3) {
            clearInterval(verticalInterval);
        }
    }, 250);

    // horizontal lines
    setTimeout(function() {
        let j = 1;
        let horizontaInterval = setInterval(function() {
            ctx.moveTo(0, j * cellSize);
            ctx.lineTo(cellSize * 3, j * cellSize);
            ctx.stroke();
            j++;
            if (j === 3) {
                clearInterval(horizontaInterval);
            }
        }, 250);
    }, 500);
    // ------------------ end board --------------------

}
