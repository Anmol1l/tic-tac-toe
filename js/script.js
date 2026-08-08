const gameboard = (() => {

    const board = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
    ];

    let lastMark = 0;

    const getLastMark = () => lastMark;

    const getBoard = () => board;

    const setMarkPrivate = (playerMark, x, y) => {
        lastMark = playerMark
        board[x][y] = playerMark;
    };

    const setMarkInherit = () => setMarkPrivate;

    return { getBoard, setMarkInherit, getLastMark }

})();

function createPlayer(name, mark) {
    const { getBoard, setMarkInherit, getLastMark } = gameboard;

    name = name;
    mark = mark;
    let status = false;
    const getStatus = () => status;
    const changeStatus = () => { status = true }; 

    const setMark = (x, y) => {

        if (!getBoard()[x][y] && getLastMark() != mark){
            setMarkInherit()(mark, x, y);
            checkWin(mark);
            console.log(getBoard())
        }
        else if(getBoard()[x][y] != 0) {
            console.log("Occupied")
        }
        else if(getLastMark() == mark) {
            console.log("Not Your Turn")
        }
    };

    return { name, mark, getStatus, changeStatus, getBoard, setMark };
}

const player1 = createPlayer("blue", 1);
const player2 = createPlayer("red", 2);

function checkWin(playerMark) {
    const { getBoard } = gameboard;
    
    const row1 = ((getBoard()[0][0] == getBoard()[0][1]) && (getBoard()[0][1] == getBoard()[0][2])) && (getBoard()[0][2] == playerMark);
    const row2 = ((getBoard()[1][0] == getBoard()[1][1]) && (getBoard()[1][1] == getBoard()[1][2])) && (getBoard()[1][2] == playerMark);
    const row3 = ((getBoard()[2][0] == getBoard()[2][1]) && (getBoard()[2][1] == getBoard()[2][2])) && (getBoard()[2][2] == playerMark);
    
    const col1 = ((getBoard()[0][0] == getBoard()[1][0]) && (getBoard()[1][0] == getBoard()[2][0])) && (getBoard()[2][0] == playerMark);
    const col2 = ((getBoard()[0][1] == getBoard()[1][1]) && (getBoard()[1][1] == getBoard()[2][1])) && (getBoard()[2][1] == playerMark);
    const col3 = ((getBoard()[0][2] == getBoard()[1][2]) && (getBoard()[1][2] == getBoard()[2][2])) && (getBoard()[2][2] == playerMark);

    const diag1 = ((getBoard()[0][0] == getBoard()[1][1]) && (getBoard()[1][1] == getBoard()[2][2])) && (getBoard()[2][2] == playerMark);
    const diag2 = ((getBoard()[0][2] == getBoard()[1][1]) && (getBoard()[1][1] == getBoard()[2][0])) && (getBoard()[2][0] == playerMark);


    if ((row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2) == 1) {
        console.log("1 win")
    }
    if ((row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2) == 2) {
        console.log("2 win")
    }
}