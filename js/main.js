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

// data for board
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
    initCtx.font = "bold 28px Lato";
    initCtx.fillStyle = "#000000";
    initCtx.textLetterSpacing = 3;
    initCtx.fillText("Choose Your Team", initCanvas.width / 7, initCanvas.height / 3.5);
    // circle
    initCtx.beginPath();
    initCtx.arc(0.5 * cellSize, 1.5 * cellSize, cellSize * 0.35, 0, Math.PI * 2, false);
    initCtx.fillStyle = "#a81010";
    initCtx.fill();
    // cross
    initCtx.beginPath();
    initCtx.moveTo(2.2 * cellSize, 1.2 * cellSize);
    initCtx.lineTo(2.8 * cellSize, 1.8 * cellSize);
    initCtx.moveTo(2.2 * cellSize, 1.8 * cellSize);
    initCtx.lineTo(2.8 * cellSize, 1.2 * cellSize);
    initCtx.lineWidth = 10;
    initCtx.lineCap = 'round';
    initCtx.strokeStyle = "#0018bb";
    initCtx.stroke();
    // choose your player with click
    choosePlayer();
} // ----- end of init()

function choosePlayer() {
    initCanvas.addEventListener('click', function(e) {
        let pos = getMousePos(initCanvas, e);
        // console.log(pos.row, pos.col); // jshint ignore:line
        if (pos.row === 1 && pos.col === 0) {
            currentPlayer = 1; // player is a circle
        } else if (pos.row === 1 && pos.col === 2) {
            currentPlayer = 2; //player is a cross
        }
        if (currentPlayer) {
            document.getElementById("initCanvas").style.display = 'none'; // jshint ignore:line
            drawBoard();
        }
        // console.log('currentPlayer', currentPlayer);
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
                    // draw a circle
                    ctx.beginPath();
                    ctx.arc((j + 0.5) * cellSize, (i + 0.5) * cellSize, cellSize * 0.35, 0, Math.PI * 2, false);
                    ctx.fillStyle = "#a81010";
                    ctx.fill();
                    break;
                case 2:
                    // draw a cross
                    ctx.beginPath();
                    ctx.moveTo((j + 0.2) * cellSize, (i + 0.2) * cellSize);
                    ctx.lineTo((j + 0.8) * cellSize, (i + 0.8) * cellSize);
                    ctx.moveTo((j + 0.2) * cellSize, (i + 0.8) * cellSize);
                    ctx.lineTo((j + 0.8) * cellSize, (i + 0.2) * cellSize);
                    ctx.lineWidth = 10;
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = "#0018bb";
                    ctx.stroke();
                    break;
            }
        }
    }
    playGame();
}

function playGame() {
    canvas.addEventListener('click', function(e) {
        let pos = getMousePos(canvas, e);
        if (data[pos.row][pos.col] === 0) {
            data[pos.row][pos.col] = currentPlayer;
            moveCounter++;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBoard();
            testResult();
        }
    });
    // console.log('data ' + data); // jshint ignore:line
}

function testResult() {
    let status; // draw, win, loose

    if ((data[0][0] === currentPlayer && data[0][1] === currentPlayer && data[0][2] === currentPlayer) || (data[1][0] === currentPlayer && data[1][1] === currentPlayer && data[1][2] === currentPlayer) || (data[2][0] === currentPlayer && data[2][1] === currentPlayer && data[2][2] === currentPlayer) || (data[0][0] === currentPlayer && data[1][0] === currentPlayer && data[2][0] === currentPlayer) || (data[0][1] === currentPlayer && data[1][1] === currentPlayer && data[2][1] === currentPlayer) || (data[0][2] === currentPlayer && data[1][2] === currentPlayer && data[2][2] === currentPlayer) || (data[0][0] === currentPlayer && data[1][1] === currentPlayer && data[2][2] === currentPlayer) || (data[0][2] === currentPlayer && data[1][1] === currentPlayer && data[2][0] === currentPlayer)) {
        status = ' win';
        console.log(currentPlayer, status);
        setTimeout(function() {
            location.reload(); // jshint ignore:line
        }, 1000);
    }
    // jesli nie ma juz zer w data to remis
    if (moveCounter === 9) {
        status = 'draw';
        console.log('brak miejsc - koniec gry', status); // jshint ignore:line
    }
    togglePlayer();
}

function togglePlayer() {
    currentPlayer === 1
        ? currentPlayer = 2
        : currentPlayer = 1; // jshint ignore:line
}
