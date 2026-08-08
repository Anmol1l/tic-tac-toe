const gameboard = {
    gameboard: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
}

 function createPlayer(name,mark) {
    name = name;
    mark = mark;
    let status = false;
    const getStatus = () => status;
    const changeStatus = () => { status = true };

    return {name, mark, getStatus, changeStatus};
 }

 const player1 = createPlayer("blue", 1);
 const player2 = createPlayer("red", 2)