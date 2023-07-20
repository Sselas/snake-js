import * as sn from "./script/snake.js"

const boardSize = {
    'width' : 10, 
    'height' : 10
};

let initValue = {
    'speed':1, 
    'startingPos': Math.floor(boardSize.height*boardSize.width/2), 
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
    document.getElementsByClassName("square")[foodPos].innerHTML = "F";
    for (let i = 0; i<snakeBody.length; i++) {
        document.getElementsByClassName("square")[snakeBody[i].pos].innerHTML = "S";
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
    speed = 25;
    dirPrevious = "None";
    foodPos = sn.spawnFood(snakeBody,boardSize);
    initBoard();
    printSnake(snakeBody,foodPos);
}

reset();

setInterval(function (){
    if (gameStatus){
        console.log(snakeBody);
        snakeBody = sn.move(snakeBody, dirCurrent, boardSize, dir);
        dirPrevious = dirCurrent;
        if (foodStock > 0) {
            snakeBody = sn.increaseSnakeSize(snakeBody,dir);
            foodStock--;
        }
        if (sn.isHeadOnPos(foodPos, snakeBody)) {
            foodPos = sn.spawnFood(snakeBody,boardSize);
            foodStock ++;
        }
        if (sn.isHeadOnSnake(snakeBody)) {
            reset();
        }
        initBoard();
        printSnake(snakeBody, foodPos);
    }
},400-10*speed);

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