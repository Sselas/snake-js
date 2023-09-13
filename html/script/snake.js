export function initSnake(dirInit, initValue = initValueArray){
    return [
        {
            dirFromPrevious: dirInit,
            pos: initValue.startingPos
        },
    ];
}

//PRECOND: snakeBody is already initialized, ie non empty
//         '''tail.pos + dir[tail.dirFromPrevious]''' is an available position
export function increaseSnakeSize(snakeBody, dir){
    const tail = snakeBody[snakeBody.length-1];
    return [
        ...snakeBody,
        {
            dirFromPrevious: tail.dirFromPrevious,
            pos: tail.pos - dir[tail.dirFromPrevious],
        }
    ];
}

export function move(snakeBody, dirCurrent, dir) {
    let snakeCopy = [...snakeBody];
    snakeCopy.unshift({
        dirFromPrevious: dirCurrent,
        pos: -1,
    });
    snakeCopy[0].pos = snakeCopy[1].pos + dir[dirCurrent];
    snakeCopy.pop();
    return snakeCopy;
}

export function isOutOfBound(snakeBody, board, dirCurrent) {
    if (dirCurrent === 'ArrowLeft' || dirCurrent === 'ArrowRight') {
        return (Math.trunc(snakeBody[0].pos/board.width) !== Math.trunc(snakeBody[1].pos/board.width));
    }
    else if (dirCurrent === 'ArrowUp' || dirCurrent === 'ArrowDown') {
        return ((snakeBody[0].pos < 0) || (snakeBody[0].pos) >= board.width * board.height);
    }
    return false;
}

export function isCoordOnSnake(coord, snakeBody) {
    for (let i=0; i<snakeBody.length; i++) {
        if (snakeBody[i].pos === coord) {
            return true;
        }
    }
    return false;
}

export function isHeadOnSnake(snakeBody) {
    for (let i=1; i<snakeBody.length; i++) {
        if (snakeBody[i].pos === snakeBody[0].pos) {
            return true;
        }
    }
    return false;
}

export function isHeadOnPos(coord, snakeBody) {
    return (snakeBody[0].pos === coord);
}

export function spawnFood(snakeBody,board) {
    let rand = Math.floor(Math.random()*board.width*board.height);
    if (snakeBody.length === board.width*board.height) {
        return -1;
    }
    while (isCoordOnSnake(rand,snakeBody)) {
        rand = (rand+1)%(board.width*board.height);
    }
    return rand;
}