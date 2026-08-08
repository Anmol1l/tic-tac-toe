const gameboard = ( () => {
    
    const board =  [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    const getBoard = () => board;
    
    const setMarkPrivate = (playerMark,x,y) => {
        board[x][y] = playerMark;
    };

    const setMarkInherit = () => setMarkPrivate;

    return {getBoard, setMarkInherit}

}) ();

 function createPlayer(name,mark) {
    const {getBoard, setMarkInherit} = gameboard;

    name = name;
    mark = mark;
    let status = false;
    const getStatus = () => status;
    const changeStatus = () => { status = true };

    const setMark = (x,y) => {
        setMarkInherit()(mark,x,y);
    };

    return { name, mark, getStatus, changeStatus, getBoard, setMark};
 }
 
 const player1 = createPlayer("blue", 1);
 const player2 = createPlayer("red", 2);