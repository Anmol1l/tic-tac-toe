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

const createPlayer = (name, mark) => {
    const { getBoard, setMarkInherit, getLastMark, getWinStatus } = gameboard;

    name = name;
    mark = mark;

    const setMark = (x, y) => {


        if (!getBoard()[x][y] && getLastMark() != mark && !getWinStatus()) {
            setMarkInherit()(mark, x, y);
            checkWin(name, mark);
            checkDraw()
            // console.log(getBoard())
        }
        else if (getBoard()[x][y] != 0) {
            console.log("Occupied")
        }
        else if (getLastMark() == mark) {
            console.log("Not Your Turn")
        }
        else {
            console.log("something went wrong")
        }
    };

    return { name, mark, getBoard, setMark };
}

const blue = createPlayer("Blue", 1);
const red = createPlayer("Red", 2);

function checkWin(playerName, playerMark) {

    const { getBoard, changeWinStatusInherit } = gameboard;
    const { updateDisplay, colorWinIndex } = userInterface;

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
        const winIndex = getWinIndex(playerMark);
        updateDisplay(`${playerName} Won`);
        colorWinIndex(winIndex);
        changeWinStatus(playerName);
    }
    if ((row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2) == 2) {
        const winIndex = getWinIndex(playerMark);
        updateDisplay(`${playerName} Won`);
        colorWinIndex(winIndex);
        changeWinStatus(playerName);
    }
}

function checkDraw() {

    const { updateDisplay } = userInterface;

    const { getBoard, getWinStatus } = gameboard;

    for (const row of getBoard()) {
        for (const element of row) {
            if (element === 0)
                return false;
        }
    }
    if (!getWinStatus())
        updateDisplay("Game Draw Refresh")

}

function getWinIndex(playerMark) {

    const { getBoard, changeWinStatusInherit } = gameboard;

    let winIndex;

    const row1 = ((getBoard()[0][0] == getBoard()[0][1]) && (getBoard()[0][1] == getBoard()[0][2])) && (getBoard()[0][2] == playerMark) ? winIndex = "0,0 0,1 0,2" : null;
    const row2 = ((getBoard()[1][0] == getBoard()[1][1]) && (getBoard()[1][1] == getBoard()[1][2])) && (getBoard()[1][2] == playerMark) ? winIndex = "1,0 1,1 1,2" : null;
    const row3 = ((getBoard()[2][0] == getBoard()[2][1]) && (getBoard()[2][1] == getBoard()[2][2])) && (getBoard()[2][2] == playerMark) ? winIndex = "2,0 2,1 2,2" : null;

    const col1 = ((getBoard()[0][0] == getBoard()[1][0]) && (getBoard()[1][0] == getBoard()[2][0])) && (getBoard()[2][0] == playerMark) ? winIndex = "0,0 1,0 2,0" : null;
    const col2 = ((getBoard()[0][1] == getBoard()[1][1]) && (getBoard()[1][1] == getBoard()[2][1])) && (getBoard()[2][1] == playerMark) ? winIndex = "0,1 1,1 2,1" : null;
    const col3 = ((getBoard()[0][2] == getBoard()[1][2]) && (getBoard()[1][2] == getBoard()[2][2])) && (getBoard()[2][2] == playerMark) ? winIndex = "0,2 1,2 2,2" : null;

    const diag1 = ((getBoard()[0][0] == getBoard()[1][1]) && (getBoard()[1][1] == getBoard()[2][2])) && (getBoard()[2][2] == playerMark) ? winIndex = "0,0 1,1 2,2" : null;
    const diag2 = ((getBoard()[0][2] == getBoard()[1][1]) && (getBoard()[1][1] == getBoard()[2][0])) && (getBoard()[2][0] == playerMark) ? winIndex = "0,2 1,1 2,0" : null;

    return winIndex;

}

const userInterface = ((blue, red) => {

    const updateDisplay = (message) => {

        const display = document.querySelector('.display');

        if (message == "Blue Won") {
            display.style.color = "#366ef2"
            display.style.fontWeight = "700"
        }

        if (message == "Red Won") {
            display.style.color = "#f06060"
            display.style.fontWeight = "700"
        }

        display.textContent = message;
    }

    let turn = blue;
    const board = document.querySelector('.board')

    const blueSide = document.querySelector('.blue-box')
    const redSide = document.querySelector('.red-box')

    blueSide.addEventListener('click', () => {
        turn = blue;
        bgOnTurn();
        updateDisplay("Game Started")
        blueSide.style.display = "none";
        redSide.style.display = "none";
    })

    redSide.addEventListener('click', () => {
        turn = red;
        bgOnTurn();
        updateDisplay("Game Started")
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
    bgOnTurn()
    
    let firstClick = true
    hideCornerOnFirstClick = () => {
        updateDisplay("Game Started")
        blueSide.style.display = "none";
        redSide.style.display = "none";
        firstClick = false;
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

    const colorWinIndex = (winIndex) => {
        const winIndexArray = winIndex.split(" ");
        const winSquare1 = document.querySelector(`div[data-cords = "${winIndexArray[0]}"]`);
        const winSquare2 = document.querySelector(`div[data-cords = "${winIndexArray[1]}"]`);
        const winSquare3 = document.querySelector(`div[data-cords = "${winIndexArray[2]}"]`);

        winSquare1.style.backgroundColor = "#1deb1d67"
        winSquare2.style.backgroundColor = "#1deb1d67"
        winSquare3.style.backgroundColor = "#1deb1d67"
    }

    const boxes = document.querySelectorAll('.box');


    boxes.forEach(box => {
        box.addEventListener('click', () => {
            const cordsString = box.dataset.cords;
            const cords = cordsString.split(",");

            if (firstClick == true) {
                hideCornerOnFirstClick();
            }

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

    return { updateDisplay, colorWinIndex };

})(blue, red);

