const gameboard = (() => {

    const board = [
        [0, 0, 0],
        [0, 0, 0],
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

    let winStatus = null;

    const getWinStatus = () => winStatus;
    const changeWinStatusPrivate = (winner) => { winStatus = winner };

    const changeWinStatusInherit = () => changeWinStatusPrivate;

    return { getBoard, setMarkInherit, getLastMark, getWinStatus, changeWinStatusInherit }

})();

let turns = 0
const createPlayer = (name, mark) => {
    const { getBoard, setMarkInherit, getLastMark, getWinStatus } = gameboard;

    name = name;
    mark = mark;

    const setMark = (x, y) => {

        if (getWinStatus()) {
            const winner = getWinStatus();
            console.log(`Game over ${winner} won`)
        }

        else if (!getBoard()[x][y] && getLastMark() != mark && turns < 10) {
            setMarkInherit()(mark, x, y);
            checkWin(name, mark);
            console.log(getBoard())
            turns++;
        }
        else if (getBoard()[x][y] != 0) {
            console.log("Occupied")
        }
        else if (getLastMark() == mark) {
            console.log("Not Your Turn")
        }
        else if (turns >= 9) {
            console.log("Draw refresh")
        }
    };

    return { name, mark, getBoard, setMark };
}

const player1 = createPlayer("blue", 1);
const player2 = createPlayer("red", 2);

function checkWin(playerName, playerMark) {
    const { getBoard, changeWinStatusInherit } = gameboard;

    const row1 = ((getBoard()[0][0] == getBoard()[0][1]) && (getBoard()[0][1] == getBoard()[0][2])) && (getBoard()[0][2] == playerMark);
    const row2 = ((getBoard()[1][0] == getBoard()[1][1]) && (getBoard()[1][1] == getBoard()[1][2])) && (getBoard()[1][2] == playerMark);
    const row3 = ((getBoard()[2][0] == getBoard()[2][1]) && (getBoard()[2][1] == getBoard()[2][2])) && (getBoard()[2][2] == playerMark);

    const col1 = ((getBoard()[0][0] == getBoard()[1][0]) && (getBoard()[1][0] == getBoard()[2][0])) && (getBoard()[2][0] == playerMark);
    const col2 = ((getBoard()[0][1] == getBoard()[1][1]) && (getBoard()[1][1] == getBoard()[2][1])) && (getBoard()[2][1] == playerMark);
    const col3 = ((getBoard()[0][2] == getBoard()[1][2]) && (getBoard()[1][2] == getBoard()[2][2])) && (getBoard()[2][2] == playerMark);

    const diag1 = ((getBoard()[0][0] == getBoard()[1][1]) && (getBoard()[1][1] == getBoard()[2][2])) && (getBoard()[2][2] == playerMark);
    const diag2 = ((getBoard()[0][2] == getBoard()[1][1]) && (getBoard()[1][1] == getBoard()[2][0])) && (getBoard()[2][0] == playerMark);

    const changeWinStatus = (playerName) => {
        changeWinStatusInherit()(playerName)
    }

    if ((row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2) == 1) {
        console.log(`${playerName} Won`)
        changeWinStatus(playerName);
    }
    if ((row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2) == 2) {
        console.log(`${playerName} Won`)
        changeWinStatus(playerName);
    }
}