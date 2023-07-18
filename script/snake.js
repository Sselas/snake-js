const boardSize = {
    'width' : 10, 
    'height' : 10
}
const initValueArray = {
    'speed':1, 
    'startingPos':(boardSize.height+1)*boardSize.width/2, 
    'foodStockInit':0
}
const dir = {
    'up':-boardSize.width, 
    'down':boardSize.width, 
    'left':-1, 
    'right':1, 
    'none':0
}

export function initSnake(dirInit, initValue = initValueArray){
    return {speed : initValue.speed,
            body : [
                {   dirFromPrevious: dirInit,
                    pos: initValue.startingPos}
            ],
            dirCurrent : dirInit,
            foodStock : initValue.foodStockInit,
    };
}

//PRECOND: snakeBody is already initialized, ie non empty
//         '''tail.pos + dir[tail.dirFromPrevious]''' is an available position
export function increaseSnakeSize(snakeBody){
    const tail = snakeBody[snakeBody.length-1];
    return [
        ...snakeBody,
        {
            dirFromPrevious: tail.dirFromPrevious,
            pos: tail.pos - dir[tail.dirFromPrevious],
        }
    ];
}

export function move(snakeBody, dirCurrent, board = boardSize) {
    let snakeCopy = [...snakeBody];
    snakeCopy.unshift({
        dirFromPrevious: dirCurrent,
        pos: -1,
    });
    if (dirCurrent === 'left' || dirCurrent === 'right') {
        
        snakeCopy[0].pos = snakeCopy[1].pos + dir[dirCurrent] + (Math.trunc(snakeCopy[1].pos/board.width) - Math.trunc((snakeCopy[1].pos + dir[dirCurrent])/board.width))*board.width;
    }
    else if (dirCurrent === 'up' || dirCurrent === 'down') {
        snakeCopy[0].pos = (snakeCopy[1].pos + dir[dirCurrent] + board.width*board.height) % (board.width*board.height);
    }
    else {
        throw new Error("Non recognized direction : " + dirCurrent);
    }
    snakeCopy.pop();
    return snakeCopy;
}