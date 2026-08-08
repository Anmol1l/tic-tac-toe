const gameboard = ( () => {
    
    const gameboard =  [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    const getGameboard = () => gameboard;
    
    const setMarkPrivate = (playerMark,x,y) => {
        gameboard[x][y] = playerMark;
    };

    const setMarkInherit = () => setMarkPrivate;

    return {getGameboard, setMarkInherit}

}) ();

 function createPlayer(name,mark) {
    const {getGameboard, setMarkInherit} = gameboard;

    name = name;
    mark = mark;
    let status = false;
    const getStatus = () => status;
    const changeStatus = () => { status = true };

    const setMark = (x,y) => {
        setMarkInherit()(mark,x,y);
    };

    return { name, mark, getStatus, changeStatus, getGameboard, setMark};
 }

 const player1 = createPlayer("blue", 1);
 const player2 = createPlayer("red", 2)