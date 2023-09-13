import * as sn from "./script/snake.js"

const boardSize = {
    'width' : 15, 
    'height' : 15
};

let initValue = {
    'speed':1, 
    'startingPos': Math.floor((boardSize.height*boardSize.width)/2), 
    'foodStockInit':10
};

const dir = {
    "ArrowUp":-boardSize.width, 
    "ArrowDown":boardSize.width, 
    "ArrowLeft":-1, 
    "ArrowRight":1, 
    "None":0
};


function initBoard() {
    let boardInnerHTML = ""
    for (let l = 0; l < boardSize.height; l++) {
        boardInnerHTML += "<div class=\"line\">";
        for (let c = 0; c < boardSize.width; c++) {
            boardInnerHTML += "<div class=\"square\"></div>";
        }
        boardInnerHTML += "</div>";
    }
    document.getElementsByClassName("board")[0].innerHTML = boardInnerHTML;
}

function printSnake(snakeBody, foodPos) {
    document.getElementsByClassName("square")[foodPos].style.backgroundColor = "red";
    for (let i = 0; i<snakeBody.length; i++) {
        document.getElementsByClassName("square")[snakeBody[i].pos].style.backgroundColor = "green";
    }
}

let snakeBody = [];
let dirPrevious = "None"
let dirCurrent = "";
let gameStatus;
let foodStock;
let foodPos;
let speed;

function reset() {
    gameStatus = Boolean(false);
    snakeBody = sn.initSnake("None",initValue,dir);
    foodStock = 4;
    speed = document.getElementById("speedrange").valueAsNumber;
    dirPrevious = "None";
    foodPos = sn.spawnFood(snakeBody,boardSize);
    initBoard();
    printSnake(snakeBody,foodPos);
}

reset();

let loop = function (){
    speed = document.getElementById("speedrange").valueAsNumber;
    if (gameStatus){
        snakeBody = sn.move(snakeBody, dirCurrent, dir);
        dirPrevious = dirCurrent;
        if (foodStock > 0) {
            snakeBody = sn.increaseSnakeSize(snakeBody,dir);
            foodStock--;
        }
        if (sn.isHeadOnPos(foodPos, snakeBody)) {
            foodPos = sn.spawnFood(snakeBody,boardSize);
            foodStock ++;
        }
        if (sn.isHeadOnSnake(snakeBody) || sn.isOutOfBound(snakeBody, boardSize, dirCurrent)) {
            reset();
        }
        initBoard();
        printSnake(snakeBody, foodPos);
    }
    setTimeout(loop, 400 - speed)
}

setTimeout(loop, 1)

addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "ArrowRight" || event.key === "ArrowDown") {
        if (dir[dirPrevious]!=-dir[event.key]){
            dirCurrent = event.key;
            gameStatus = Boolean(true);
        }
    }
    if (event.key === "Enter") {
        //gameStatus = false;
        reset();
    }
});

// document.getElementsByClassName("board")[0].style.backgroundImage = "url('./files/matback.jpg')";
// document.getElementsByClassName("board")[0].style.backgroundSize = "100%";