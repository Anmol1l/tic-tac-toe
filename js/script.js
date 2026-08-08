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
            checkWin();
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

function checkWin() {
    const { getBoard } = gameboard;

    const row1 = getBoard()[0][0] && getBoard()[0][1] && getBoard()[0][2];
    const row2 = getBoard()[1][0] && getBoard()[1][1] && getBoard()[1][2];
    const row3 = getBoard()[2][0] && getBoard()[2][1] && getBoard()[2][2];

    const col1 = getBoard()[0][0] && getBoard()[1][0] && getBoard()[2][0];
    const col2 = getBoard()[1][1] && getBoard()[1][1] && getBoard()[1][2];
    const col3 = getBoard()[2][0] && getBoard()[2][1] && getBoard()[2][2];

    const diag1 = getBoard()[0][0] && getBoard()[1][1] && getBoard()[2][2];
    const diag2 = getBoard()[0][2] && getBoard()[1][1] && getBoard()[2][0];


    if (row1 == 1 || row2 == 1 || row3 == 1 || col1 == 1 || col2 ==1 || col3 ==1 || diag1 == 1 || diag2 == 1) {
        console.log("1 win")
    }
    if (row1 == 2 || row2 == 2 || row3 == 2 || col1 == 2 || col2 == 2 || col3 == 2 || diag1 == 2 || diag2 == 2) {
        console.log("2 win")
    }
}