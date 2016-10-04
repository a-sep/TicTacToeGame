/*jshint esversion: 6 */
// ========= ver. 1.0  ===========
// jshint ignore:line
"use strict";
let initCanvas = document.getElementById("initCanvas"); // jshint ignore:line
let initCtx = initCanvas.getContext("2d");
let canvas = document.getElementById("mainCanvas"); // jshint ignore:line
let ctx = canvas.getContext("2d");
let cellSize = 100;
let currentPlayer = 0; // 0=none , 1=circle, 2=cross
let moveCounter = 0;
let twoPlayers = false;

// start data for board
let data = [
    [
        0, 0, 0
    ],
    [
        0, 0, 0
    ],
    [0, 0, 0]
];

function getMousePos(canv, evt) {
    let rect = canv.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
        col: Math.floor((evt.clientX - rect.left) / cellSize),
        row: Math.floor((evt.clientY - rect.top) / cellSize)
    };
}

// ----starts with body onload="init()"
function init() {
    document.getElementById("mainCanvas").style.display = 'none'; // jshint ignore:line
    // background
    let gradient = initCtx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#98ebfe");
    gradient.addColorStop(1, "#b6fa79");
    initCtx.fillStyle = gradient;
    initCtx.fillRect(0, 0, initCanvas.width, initCanvas.height);
    // info for player
    initCtx.font = "bold 30px Lato";
    initCtx.fillStyle = "#000000";
    initCtx.textLetterSpacing = 3;
    initCtx.fillText("Choose Your Team", initCanvas.width / 8, initCanvas.height / 3.5);

    // circle
    let x = 0.5 * cellSize;
    let y = 1.5 * cellSize;
    let radius = cellSize * 0.35;
    let gradientCircle = initCtx.createRadialGradient(x + 10, y - 10, 3, x, y, radius);
    gradientCircle.addColorStop(0, "#fffff0");
    gradientCircle.addColorStop(0.99, '#a81010');
    gradientCircle.addColorStop(1, '#252525');
    initCtx.fillStyle = gradientCircle;
    initCtx.beginPath();
    initCtx.arc(x, y, radius, 0, Math.PI * 2, false);
    initCtx.fill();

    // cross
    let gradientCross = initCtx.createLinearGradient(2.8 * cellSize, 1.2 * cellSize, 2.2 * cellSize, 1.8 * cellSize);
    gradientCross.addColorStop(0.4, "#0018bb");
    gradientCross.addColorStop(0.5, "#fffff0");
    gradientCross.addColorStop(0.6, "#0018bb");
    initCtx.strokeStyle = gradientCross;
    initCtx.beginPath();
    initCtx.moveTo(2.2 * cellSize, 1.2 * cellSize);
    initCtx.lineTo(2.8 * cellSize, 1.8 * cellSize);
    initCtx.moveTo(2.2 * cellSize, 1.8 * cellSize);
    initCtx.lineTo(2.8 * cellSize, 1.2 * cellSize);
    initCtx.lineWidth = 10;
    initCtx.lineCap = 'round';
    initCtx.stroke();
    // choose your player with click
    choosePlayer();
} // ----- end of init()

function choosePlayer() {
    initCanvas.addEventListener('click', function(e) {
        let pos = getMousePos(initCanvas, e);
        if (pos.row === 1 && pos.col === 0) {
            currentPlayer = 1; // player is a circle
        } else if (pos.row === 1 && pos.col === 2) {
            currentPlayer = 2; //player is a cross
        }
        if (currentPlayer) {
            chooseOpponent();
        }
    });
}

// wont to play with human or computer(default)
function chooseOpponent() {
    let gradient = initCtx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#98ebfe");
    gradient.addColorStop(1, "#b6fa79");
    initCtx.fillStyle = gradient;
    initCtx.fillRect(0, 0, initCanvas.width, initCanvas.height);
    // info for player
    initCtx.font = "bold 28px Lato";
    initCtx.fillStyle = "#000000";
    initCtx.textLetterSpacing = 3;
    initCtx.fillText("TWO Players", initCanvas.width / 4, initCanvas.height / 4);
    initCtx.fillText("or", initCanvas.width / 2.1, initCanvas.height / 2);
    initCtx.fillText("ONE Player", initCanvas.width / 4, initCanvas.height / 1.3);

    initCanvas.addEventListener('click', function(e) {
        let pos = getMousePos(initCanvas, e);
        let click = false;
        if (pos.row === 1) {
            twoPlayers = false; // player vs player
            click = true;
        } else if (pos.row === 0) {
            click = true;
            twoPlayers = true; // player vs player
        }
        if (currentPlayer && click) {
            document.getElementById("initCanvas").style.display = 'none'; // jshint ignore:line
            drawBoard();
        }
    });
}

function drawBoard() {
    document.getElementById("mainCanvas").style.display = 'inline'; // jshint ignore:line
    // background
    let gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#98ebfe");
    gradient.addColorStop(1, "#b6fa79");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // board drawing
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0018bb";
    // vertical lines
    for (let i = 1; i < 3; i++) {
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, cellSize * 3);
        ctx.stroke();
    }
    // horizontal lines
    for (let j = 1; j < 3; j++) {
        ctx.moveTo(0, j * cellSize);
        ctx.lineTo(cellSize * 3, j * cellSize);
        ctx.stroke();
    }
    drawData();
} // ---- end of drawBoard()

function drawData() {
    // drawing circles and cross on board
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            let value = data[i][j];

            switch (value) {
                case 1:
                    //draw a circle
                    let x = (j + 0.5) * cellSize;
                    let y = (i + 0.5) * cellSize;
                    let radius = cellSize * 0.35;
                    let gradientCircle = ctx.createRadialGradient(x + 10, y - 10, 3, x, y, radius);
                    gradientCircle.addColorStop(0, "#fffff0");
                    gradientCircle.addColorStop(0.99, '#a81010');
                    gradientCircle.addColorStop(1, '#252525');
                    ctx.fillStyle = gradientCircle;
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
                    ctx.fill();
                    break;
                case 2:
                    // draw a cross
                    let gradientCross = ctx.createLinearGradient((j + 0.8) * cellSize, (i + 0.2) * cellSize, (j + 0.2) * cellSize, (i + 0.8) * cellSize);
                    gradientCross.addColorStop(0.4, "#0018bb");
                    gradientCross.addColorStop(0.5, "#fffff0");
                    gradientCross.addColorStop(0.6, "#0018bb");
                    ctx.strokeStyle = gradientCross;
                    ctx.beginPath();
                    ctx.moveTo((j + 0.2) * cellSize, (i + 0.2) * cellSize);
                    ctx.lineTo((j + 0.8) * cellSize, (i + 0.8) * cellSize);
                    ctx.moveTo((j + 0.2) * cellSize, (i + 0.8) * cellSize);
                    ctx.lineTo((j + 0.8) * cellSize, (i + 0.2) * cellSize);
                    ctx.lineWidth = 10;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                    break;
            }
        }
    }
        playGame();
}

function playGame() {
    canvas.addEventListener('click', function(e) {
        humanTurn = false;
        let pos = getMousePos(canvas, e);
        if (data[pos.row][pos.col] === 0) {
            data[pos.row][pos.col] = currentPlayer;
            moveCounter++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBoard();
            testResult(); // test result with currentPlayer
            togglePlayer(); // change player
        }
    });
}

function testResult() {
    if ((data[0][0] === currentPlayer && data[0][1] === currentPlayer && data[0][2] === currentPlayer) || (data[1][0] === currentPlayer && data[1][1] === currentPlayer && data[1][2] === currentPlayer) || (data[2][0] === currentPlayer && data[2][1] === currentPlayer && data[2][2] === currentPlayer) || (data[0][0] === currentPlayer && data[1][0] === currentPlayer && data[2][0] === currentPlayer) || (data[0][1] === currentPlayer && data[1][1] === currentPlayer && data[2][1] === currentPlayer) || (data[0][2] === currentPlayer && data[1][2] === currentPlayer && data[2][2] === currentPlayer) || (data[0][0] === currentPlayer && data[1][1] === currentPlayer && data[2][2] === currentPlayer) || (data[0][2] === currentPlayer && data[1][1] === currentPlayer && data[2][0] === currentPlayer)) {
        finalScore(currentPlayer);
        let st = setTimeout(function() {
            location.reload(); // jshint ignore:line
        }, 2000);
    } else if (moveCounter === 9) {
        finalScore();
        let st = setTimeout(function() {
            location.reload(); // jshint ignore:line
        }, 2000);
    }
}

function finalScore(player) {
    // clear canvas and show background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#98ebfe");
    gradient.addColorStop(1, "#b6fa79");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 36px Lato";
    ctx.fillStyle = "#000000";
    ctx.textLetterSpacing = 3;
    if (player === 1) {
        ctx.fillText("The winner is", initCanvas.width / 8, initCanvas.height / 3.5);
        // circle
        let x = 1.5 * cellSize;
        let y = 1.5 * cellSize;
        let radius = cellSize * 0.35;
        let gradientCircle = ctx.createRadialGradient(x + 10, y - 10, 3, x, y, radius);
        gradientCircle.addColorStop(0, "#fffff0");
        gradientCircle.addColorStop(0.99, '#a81010');
        gradientCircle.addColorStop(1, '#252525');
        ctx.fillStyle = gradientCircle;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fill();
    } else if (player === 2) {
        ctx.fillText("The winner is", initCanvas.width / 8, initCanvas.height / 3.5);
        // cross
        let gradientCross = ctx.createLinearGradient(1.8 * cellSize, 1.2 * cellSize, 1.2 * cellSize, 1.8 * cellSize);
        gradientCross.addColorStop(0.4, "#0018bb");
        gradientCross.addColorStop(0.5, "#fffff0");
        gradientCross.addColorStop(0.6, "#0018bb");
        ctx.strokeStyle = gradientCross;
        ctx.beginPath();
        ctx.moveTo(1.2 * cellSize, 1.2 * cellSize);
        ctx.lineTo(1.8 * cellSize, 1.8 * cellSize);
        ctx.moveTo(1.2 * cellSize, 1.8 * cellSize);
        ctx.lineTo(1.8 * cellSize, 1.2 * cellSize);
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.stroke();
    } else {
        ctx.fillText("DRAW", initCanvas.width / 3, initCanvas.height / 2);
    }

}
//***************--------------------- changing a player ------------------------------------***********************
let humanTurn = false;

function togglePlayer() {
    currentPlayer === 1
        ? currentPlayer = 2
        : currentPlayer = 1; // jshint ignore:line

    if (!twoPlayers && !humanTurn) {
        computersTurn();
        testResult();
        togglePlayer();
    }
}

function computersTurn() {
    humanTurn = true;
    let dataTest = data;
    let stop = false;
    // check - can computer win?
    for (let i = 0; i < dataTest.length; i++) {
        for (let j = 0; j < dataTest.length; j++) {

            if (dataTest[i][j] === 0) {
                testMove(i, j);
                if (stop) {
                    break;
                }
            }
        }
        if (stop) {
            break;
        }
    }
    // check - can human win?
    for (let i = 0; i < dataTest.length; i++) {
        for (let j = 0; j < dataTest.length; j++) {
            if (dataTest[i][j] === 0) {
                testContraMove(i, j);
                if (stop) {
                    break;
                }
            }
        }
        if (stop) {
            break;
        }
    }
    // if middle is free take it!
    if (!stop && data[1][1] === 0) {
        data[1][1] = currentPlayer;
        moveCounter++;
        stop = true;
    }
    //jesli computer ma juz srodek a w pionie lub poziomie jest wolne to obstaw
    if (!stop && data[1][1] === currentPlayer) {
        if (data[0][1] === 0 && data[2][1] === 0) {
            data[0][1] = currentPlayer;
            moveCounter++;
            stop = true;
        } else if (data[1][0] === 0 && data[1][2] === 0) {
            data[1][0] = currentPlayer;
            moveCounter++;
            stop = true;
        }

    }

    if (!stop) {
        // teake a corner
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (data[i][j] === 0 && i != 1 && j != 1 && !stop) {
                    data[i][j] = currentPlayer;
                    moveCounter++;
                    stop = true;
                    break;
                    console.log('wstaw do roga');
                }
                if (stop) {
                    break;
                }
            }
        }

    }

    if (!stop) {
        let count = 0;
        do {
            count++;
            console.log('do - while');
            let row = getRandomIntInclusive(0, 2);
            let col = getRandomIntInclusive(0, 2);
            if (data[row][col] === 0) {
                data[row][col] = currentPlayer;
                moveCounter++;
                console.log('coordinate ', row, col);
                console.log('moveCounter random', moveCounter);
                stop = true;
                break;
            }
        } while (count < 500 || stop);
    }

    function testMove(a, b) {
        dataTest[a][b] = currentPlayer;
        if ((dataTest[0][0] === currentPlayer && dataTest[0][1] === currentPlayer && dataTest[0][2] === currentPlayer) || (dataTest[1][0] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[1][2] === currentPlayer) || (dataTest[2][0] === currentPlayer && dataTest[2][1] === currentPlayer && dataTest[2][2] === currentPlayer) || (dataTest[0][0] === currentPlayer && dataTest[1][0] === currentPlayer && dataTest[2][0] === currentPlayer) || (dataTest[0][1] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[2][1] === currentPlayer) || (dataTest[0][2] === currentPlayer && dataTest[1][2] === currentPlayer && dataTest[2][2] === currentPlayer) || (dataTest[0][0] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[2][2] === currentPlayer) || (dataTest[0][2] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[2][0] === currentPlayer)) {
            data[a][b] = currentPlayer;
            moveCounter++;
            stop = true;
        } else {
            dataTest[a][b] = 0;
        }
    }

    function testContraMove(a, b) {
        togglePlayer();
        dataTest[a][b] = currentPlayer;
        if ((dataTest[0][0] === currentPlayer && dataTest[0][1] === currentPlayer && dataTest[0][2] === currentPlayer) || (dataTest[1][0] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[1][2] === currentPlayer) || (dataTest[2][0] === currentPlayer && dataTest[2][1] === currentPlayer && dataTest[2][2] === currentPlayer) || (dataTest[0][0] === currentPlayer && dataTest[1][0] === currentPlayer && dataTest[2][0] === currentPlayer) || (dataTest[0][1] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[2][1] === currentPlayer) || (dataTest[0][2] === currentPlayer && dataTest[1][2] === currentPlayer && dataTest[2][2] === currentPlayer) || (dataTest[0][0] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[2][2] === currentPlayer) || (dataTest[0][2] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[2][0] === currentPlayer)) {
            togglePlayer();
            data[a][b] = currentPlayer;
            moveCounter++;
            stop = true;
        } else {
            togglePlayer();
            dataTest[a][b] = 0;
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
