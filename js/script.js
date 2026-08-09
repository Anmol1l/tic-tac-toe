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

        else if (!getBoard()[x][y] && getLastMark() != mark && turns < 8) {
            setMarkInherit()(mark, x, y);
            checkWin(name, mark);
            console.log(getBoard())
            ++turns;
        }
        else if (getBoard()[x][y] != 0) {
            console.log("Occupied")
        }
        else if (getLastMark() == mark) {
            console.log("Not Your Turn")
        }
        else {
            console.log("Draw refresh")
        }
    };

    return { name, mark, getBoard, setMark };
}

const blue = createPlayer("blue", 1);
const red = createPlayer("red", 2);

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

const userInterface = ((blue, red) => {

    let turn = null
    const board = document.querySelector('.board')

    const blueSide = document.querySelector('.blue-box')
    const redSide = document.querySelector('.red-box')

    blueSide.addEventListener('click', () => {
        turn = blue;
        bgOnTurn();
        blueSide.style.display = "none";
        redSide.style.display = "none";
    })

    redSide.addEventListener('click', () => {
        turn = red;
        bgOnTurn();
        blueSide.style.display = "none";
        redSide.style.display = "none";
    })

    const bgOnTurn = () => {
        if (turn == blue) {
            board.style.backgroundColor = '#366ef235';
        }

        if (turn == red) {
            board.style.backgroundColor = '#f060603f';
        }
    }


    const doTurn = (x, y) => {

        if (turn == blue) {
            blue.setMark(x, y)
            turn = red
            bgOnTurn()
        }

        else if (turn == red) {
            red.setMark(x, y)
            turn = blue
            bgOnTurn()
        }
    }


    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.addEventListener('click', () => {
            const cordsString = box.dataset.cords;
            const cords = cordsString.split(",");

            if (turn == blue && !(box.classList.contains('cross') || box.classList.contains('circle'))) {
                box.classList.add('cross')
                doTurn(cords[0], cords[1]);
            }
            else if (turn == red && !(box.classList.contains('cross') || box.classList.contains('circle'))) {
                box.classList.add('circle')
                doTurn(cords[0], cords[1]);
            }

        })
    })

})(blue, red);

