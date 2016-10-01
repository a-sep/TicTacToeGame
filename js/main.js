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

// wont to play with human or computer(default)
function chooseOpponent(){

  if (currentPlayer) {
      document.getElementById("initCanvas").style.display = 'none'; // jshint ignore:line
      drawBoard();
  }
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
        humanTurn = false;
        let pos = getMousePos(canvas, e);
        if (data[pos.row][pos.col] === 0) {
            data[pos.row][pos.col] = currentPlayer;
            moveCounter++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBoard();
            testResult(); // test result with currentPlayer and then change a player
            togglePlayer(); // w tej funkcji odpalic kompa lub drugiego gracza
            console.log('moveCounter human', moveCounter);
        }
    });
}

function testResult() {
    if ((data[0][0] === currentPlayer && data[0][1] === currentPlayer && data[0][2] === currentPlayer) || (data[1][0] === currentPlayer && data[1][1] === currentPlayer && data[1][2] === currentPlayer) || (data[2][0] === currentPlayer && data[2][1] === currentPlayer && data[2][2] === currentPlayer) || (data[0][0] === currentPlayer && data[1][0] === currentPlayer && data[2][0] === currentPlayer) || (data[0][1] === currentPlayer && data[1][1] === currentPlayer && data[2][1] === currentPlayer) || (data[0][2] === currentPlayer && data[1][2] === currentPlayer && data[2][2] === currentPlayer) || (data[0][0] === currentPlayer && data[1][1] === currentPlayer && data[2][2] === currentPlayer) || (data[0][2] === currentPlayer && data[1][1] === currentPlayer && data[2][0] === currentPlayer)) {
        console.log(currentPlayer, ' is a winner');

        //TODO jestes zwyciezca canvas i reset gry po kliknieciu

        setTimeout(function() {
            location.reload(); // jshint ignore:line
        }, 2000);
    } else if (moveCounter === 9) {
        // jesli nie ma juz zer w data to remis
        console.log(moveCounter, 'brak miejsc - koniec gry REMIS'); // jshint ignore:line

        setTimeout(function() {
            location.reload(); // jshint ignore:line
        }, 2000);
    }
}
//***************---------------------zmiana gracza------------------------------------***********************
let humanTurn = false;
let twoPlayers = false;
// let twoPlayers = true;

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
    // testuj mozliwosc swojej wygranej na wszystkich polach
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
    // testuj mozliwosc wygranej przeciwnika (human) na wszystkich polach
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
    // obstaw srodek jesli wolny
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
        // wez random zero z naroznika i podmien
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
        //TODO najpierw sprawdz swoja wygrana na wszystkich polach a potem kontragracza na wszystkich polach
        dataTest[a][b] = currentPlayer;
        if ((dataTest[0][0] === currentPlayer && dataTest[0][1] === currentPlayer && dataTest[0][2] === currentPlayer) || (dataTest[1][0] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[1][2] === currentPlayer) || (dataTest[2][0] === currentPlayer && dataTest[2][1] === currentPlayer && dataTest[2][2] === currentPlayer) || (dataTest[0][0] === currentPlayer && dataTest[1][0] === currentPlayer && dataTest[2][0] === currentPlayer) || (dataTest[0][1] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[2][1] === currentPlayer) || (dataTest[0][2] === currentPlayer && dataTest[1][2] === currentPlayer && dataTest[2][2] === currentPlayer) || (dataTest[0][0] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[2][2] === currentPlayer) || (dataTest[0][2] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[2][0] === currentPlayer)) {
            data[a][b] = currentPlayer;
            moveCounter++;
            stop = true;
            console.log('spokojnie wygra comp ...');
        } else {
            dataTest[a][b] = 0;
        }
        console.log('spokojnie test move');
    }
    function testContraMove(a, b) {
        //TODO najpierw sprawdz swoja wygrana na wszystkich polach a potem kontragracza na wszystkich polach
        togglePlayer();
        dataTest[a][b] = currentPlayer;
        if ((dataTest[0][0] === currentPlayer && dataTest[0][1] === currentPlayer && dataTest[0][2] === currentPlayer) || (dataTest[1][0] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[1][2] === currentPlayer) || (dataTest[2][0] === currentPlayer && dataTest[2][1] === currentPlayer && dataTest[2][2] === currentPlayer) || (dataTest[0][0] === currentPlayer && dataTest[1][0] === currentPlayer && dataTest[2][0] === currentPlayer) || (dataTest[0][1] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[2][1] === currentPlayer) || (dataTest[0][2] === currentPlayer && dataTest[1][2] === currentPlayer && dataTest[2][2] === currentPlayer) || (dataTest[0][0] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[2][2] === currentPlayer) || (dataTest[0][2] === currentPlayer && dataTest[1][1] === currentPlayer && dataTest[2][0] === currentPlayer)) {
            togglePlayer();
            data[a][b] = currentPlayer;
            moveCounter++;
            stop = true;
            console.log('spokojnie CONTRA compa ...');
        } else {
            togglePlayer();
            dataTest[a][b] = 0;
        }
        console.log('spokojnie test move');
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();

    console.log(moveCounter, 'test ', dataTest);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//***********************************************************************************************************************
// TODO dodac wybor gry z czlowiekiem lub komputerem , ustawic jakis checkin na twoPlayers = true;
// TODO

// function togglePlayer() {
//     currentPlayer === 1
//         ? currentPlayer = 2
//         : currentPlayer = 1; // jshint ignore:line
// }
