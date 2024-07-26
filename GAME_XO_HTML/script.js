let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

function playerMove(index) {
    if (!gameOver && board[index] === "") {
        board[index] = currentPlayer;
        document.getElementById("grid").children[index].innerText = currentPlayer;
        checkWinner();
        if (!gameOver) {
            computerMove();
            checkWinner();
        }
    }
}

function computerMove() {
    let availableMoves = board.reduce((acc, cell, index) => {
        if (cell === "") acc.push(index);
        return acc;
    }, []);

    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    let computerChoice = availableMoves[randomIndex];
    board[computerChoice] = "O";
    document.getElementById("grid").children[computerChoice].innerText = "O";
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            document.getElementById("grid").children[a].style.backgroundColor = "lightgreen";
            document.getElementById("grid").children[b].style.backgroundColor = "lightgreen";
            document.getElementById("grid").children[c].style.backgroundColor = "lightgreen";
            gameOver = true;
            return;
        }
    }

    if (!board.includes("")) {
        gameOver = true;
        return;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    Array.from(document.getElementById("grid").children).forEach(cell => {
        cell.innerText = "";
        cell.style.backgroundColor = "";
    });
}
