import * as sn from "./script/snake.js"

const boardSize = {
    'width' : 31, 
    'height' : 25
};

let initValue = {
    'speed':1, 
    'startingPos': Math.floor(boardSize.height*boardSize.width/2), 
    'foodStockInit':10
};

const dir = {
    'up':-boardSize.width, 
    'down':boardSize.width, 
    'left':-1, 
    'right':1, 
    'none':0
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
let dirCurrent = "";
let gameStatus;
let foodStock;
let foodPos;
let speed;

function reset() {
    gameStatus = Boolean(false);
    snakeBody = sn.initSnake("right",initValue,dir);
    foodStock = 4;
    speed = 25;
    foodPos = sn.spawnFood(snakeBody,boardSize);
    initBoard();
    printSnake(snakeBody,foodPos);
}

reset();

setInterval(function (){
    if (gameStatus){
        snakeBody = sn.move(snakeBody, dirCurrent, boardSize, dir);
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
    if (event.key === "ArrowLeft") {
        if (dirCurrent!="right"){
            dirCurrent = "left";
            gameStatus = Boolean(true);
        }
    }
    if (event.key === "ArrowUp") {
        if (dirCurrent!="down"){
            dirCurrent = "up";
            gameStatus = Boolean(true);
        }
    }
    if (event.key === "ArrowRight") {
        if (dirCurrent!="left"){
            dirCurrent = "right";
            gameStatus = Boolean(true);
        }
    }
    if (event.key === "ArrowDown") {
        if (dirCurrent!="up"){
            dirCurrent = "down";
            gameStatus = Boolean(true);
        }
    }
    if (event.key === "Enter") {
        reset();
    }
});