const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitButton = document.getElementById("submit");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";

submitButton.addEventListener("click", startGame);

function startGame() {
    const player1Name = player1Input.value;
    const player2Name = player2Input.value;

    if (!player1Name || !player2Name) {
        alert("Please enter names for both players.");
        return;
    }

    player1Input.disabled = true;
    player2Input.disabled = true;
    submitButton.disabled = true;

    messageDiv.textContent = `${player1Name}, you're up!`;

    cells.forEach(cell => {
        cell.addEventListener("click", () => makeMove(cell, player1Name, player2Name));
    });
}

function makeMove(cell, player1Name, player2Name) {
    if (cell.textContent === "") {
        cell.textContent = currentPlayer;
        cell.style.pointerEvents = "none";

        if (checkWin()) {
            messageDiv.textContent = `${currentPlayer === "X" ? player1Name : player2Name} congratulations, you won!`;
            cells.forEach(cell => (cell.style.pointerEvents = "none"));
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            messageDiv.textContent = `${currentPlayer === "X" ? player1Name : player2Name}, you're up!`;
        }
    }
}

function checkWin() {
    const winningCombos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
            cells[a - 1].textContent === cells[b - 1].textContent &&
            cells[b - 1].textContent === cells[c - 1].textContent &&
            cells[a - 1].textContent !== ""
        ) {
            return true;
        }
    }

    return false;
}
