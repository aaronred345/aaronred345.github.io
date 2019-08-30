/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const canvas = document.getElementById('canvas');
canvas.addEventListener('click', on_canvas_click, false);
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const boardSize = {
    sWidth: (width / 3),
    sHeight: (height / 3)
};

var playerTurn = true;


var gameboard = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]];

function startGame() {
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(0, 0, width, height);
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(width * (1 / 3), 0, 1, height);
    ctx.strokeRect(width * (2 / 3), 0, 1, height);
    ctx.strokeRect(0, height * (1 / 3), width, 1);
    ctx.strokeRect(0, height * (2 / 3), width, 1);
    ctx.closePath();
}

function resetGame(complete) {
    if (complete !== false) {
        startGame();
        gameboard = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]];
        if (complete === 0) {
            alert("Player has won the game");
        } else {
            alert("Computer has won the game");
        }

        playerTurn = true;
    }
}

function drawRed(x, y) {
    var _x = x * boardSize.sWidth;
    var _y = y * boardSize.sHeight;

    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.rect((_x - boardSize.sWidth) + 5, _y - boardSize.sHeight + 5, boardSize.sHeight - 10, boardSize.sWidth - 10);
    ctx.fill();
    ctx.closePath();

    gameboard[y][x] = 0;
    playerTurn = !playerTurn;
}

function drawBlue(x, y) {
    var _x = x * boardSize.sWidth;
    var _y = y * boardSize.sHeight;

    ctx.beginPath();
    ctx.fillStyle = "#0000ff";
    ctx.rect((_x - boardSize.sWidth) + 5, _y - boardSize.sHeight + 5, boardSize.sHeight - 10, boardSize.sWidth - 10);
    ctx.fill();
    ctx.closePath();

    gameboard[y][x] = 2;
    playerTurn = !playerTurn;
}

function on_canvas_click(ev) {
    console.log(ev.clientY, ev.clientX);
    var x = ev.offsetX;
    var y = ev.offsetY;
    console.log(x, y);
    x = parseInt(x / (canvas.offsetHeight / 3));
    y = parseInt(y / (canvas.offsetWidth / 3));
    console.log(x, y);
    console.log('===');
    if (playerTurn) {
        drawRed(x, y);
    } else {
        drawBlue(x, y);
    }
    setTimeout(function () {
        resetGame(checkWinner());
//        bot();
    }, 0);
//    console.dir("=====");
//    console.dir(gameboard[0].toString());
//    console.dir(gameboard[1].toString());
//    console.dir(gameboard[2].toString());
//    console.dir("=====");
}

function checkWinner() {
    for (var i = 0; i < 3; i++) {
        if (gameboard[0][i] !== 1 && gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i]) {
//            console.log("colums: " + gameboard[0][i] + " " + gameboard[1][i] + " " + gameboard[2][i] + " ");
//            console.log(gameboard[0][i]);
            return gameboard[0][i];
        }
    }

    for (var j = 0; j < 3; j++) {
        if (gameboard[j][0] !== 1 && gameboard[j][0] === gameboard[j][1] && gameboard[j][1] === gameboard[j][2]) {
//            console.log("rows: " + gameboard[j][0] + " " + gameboard[j][1] + " " + gameboard[j][2] + " ");
//            console.log(gameboard[j][0]);
            return gameboard[j][0];
        }
    }

    if (gameboard[0][0] !== 1 && gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2]) {
//        console.log("Down Right");
//        console.log(gameboard[0][0]);
        return gameboard[0][0];
    }

    if (gameboard[0][2] !== 1 && gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0]) {
//        console.log("Down Right");
//        console.log(gameboard[2][0]);
        return gameboard[2][0];
    } else
        return false;
}

function initBot () {
    
}

initBot();
startGame();