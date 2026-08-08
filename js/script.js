const gameboard = (() => {

    const board = [
        [2, 0, 0],
        [0, 0, 0],
        [1, 1, 0],
    ];

    const getBoard = () => board;

    const setMarkPrivate = (playerMark, x, y) => {
        board[x][y] = playerMark;
    };

    const setMarkInherit = () => setMarkPrivate;

    return { getBoard, setMarkInherit }

})();

function createPlayer(name, mark) {
    const { getBoard, setMarkInherit } = gameboard;

    name = name;
    mark = mark;
    let status = false;
    const getStatus = () => status;
    const changeStatus = () => { status = true };

    const setMark = (x, y) => {
        setMarkInherit()(mark, x, y);
        win();
    };

    return { name, mark, getStatus, changeStatus, getBoard, setMark };
}

const player1 = createPlayer("blue", 1);
const player2 = createPlayer("red", 2);

const winCombos = {

}



function checkWin() {
    const {getBoard} = gameboard;

    const row1 = getBoard()[0][0] && getBoard()[0][1] && getBoard()[0][2];
    const row2 = getBoard()[1][0] && getBoard()[1][1] && getBoard()[1][2];
    const row3 = getBoard()[2][0] && getBoard()[2][1] && getBoard()[2][2];
    
    const col1 = getBoard()[0][0] && getBoard()[1][0] && getBoard()[2][0];
    const col2 = getBoard()[1][1] && getBoard()[1][1] && getBoard()[1][2];
    const col3 = getBoard()[2][0] && getBoard()[2][1] && getBoard()[2][2];

    const diag1 = getBoard()[0][0] && getBoard()[1][1] && getBoard()[2][2];
    const diag2 = getBoard()[0][2] && getBoard()[1][1] && getBoard()[2][0];


    if ((row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2) === 1) {
        console.log("1 win")
    }
    if ((row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2)=== 2) {
        console.log("2 win")
    }


}