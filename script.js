//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const submitButton = document.getElementById("submit");
    let currentPlayer = "X";
    let gameOver = false;

    // Create the tic-tac-toe board cells
    for (let i = 1; i <= 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }

    // Handle cell click event
    function handleCellClick(event) {
        if (gameOver) return;

        const cell = event.target;
        if (cell.textContent === "") {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer.toLowerCase());

            if (checkWin()) {
                gameOver = true;
                message.textContent = `${currentPlayer} congratulations you won!`;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                message.textContent = `${currentPlayer === "X" ? player1Input.value : player2Input.value}, you're up!`;
            }
        }
    }

    // Check for a win
    function checkWin() {
        const cells = document.querySelectorAll(".cell");
        const winningCombos = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
            [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
            [1, 5, 9], [3, 5, 7] // Diagonals
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (cells[a - 1].textContent && cells[a - 1].textContent === cells[b - 1].textContent && cells[b - 1].textContent === cells[c - 1].textContent) {
                return true;
            }
        }

        if ([...cells].every(cell => cell.textContent !== "")) {
            gameOver = true;
            message.textContent = "It's a draw!";
        }

        return false;
    }

    // Handle form submission to start the game
    document.getElementById("player-form").addEventListener("submit", function (event) {
        event.preventDefault();
        player1Input.disabled = true;
        player2Input.disabled = true;
        submitButton.disabled = true;
        message.textContent = `${player1Input.value}, you're up`;
    });
});
