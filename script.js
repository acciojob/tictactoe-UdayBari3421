document.addEventListener('DOMContentLoaded', function () {
            const container = document.querySelector('.container');
            const submitButton = document.getElementById('submit');
            const board = document.getElementById('board');
            const message = document.querySelector('.message');
            let currentPlayer = 1;
            let player1Name, player2Name;

            submitButton.addEventListener('click', function () {
                player1Name = document.getElementById('player-1').value;
                player2Name = document.getElementById('player-2').value;

                container.removeChild(submitButton);
                container.removeChild(document.getElementById('player-1'));
                container.removeChild(document.getElementById('player-2'));

                const h1 = document.createElement('h1');
                h1.textContent = 'Tic Tac Toe';
                container.appendChild(h1);

                container.appendChild(message);

                for (let i = 1; i <= 9; i++) {
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    cell.id = i;
                    cell.addEventListener('click', handleCellClick);
                    board.appendChild(cell);
                }

                updateMessage();
            });

            function handleCellClick() {
                const cell = event.target;

                if (!cell.textContent) {
                    cell.textContent = currentPlayer === 1 ? 'X' : 'O';
                    if (checkWin()) {
                        message.textContent = `${currentPlayer === 1 ? player1Name : player2Name}, congratulations you won!`;
                        disableClicks();
                    } else if (checkDraw()) {
                        message.textContent = 'It\'s a draw!';
                    } else {
                        currentPlayer = 3 - currentPlayer; // Switch player
                        updateMessage();
                    }
                }
            }

            function updateMessage() {
                message.textContent = `${currentPlayer === 1 ? player1Name : player2Name}, you're up!`;
            }

            function checkWin() {
                const cells = document.querySelectorAll('.cell');
                const winningCombos = [
                    [1, 2, 3], [4, 5, 6], [7, 8, 9],
                    [1, 4, 7], [2, 5, 8], [3, 6, 9],
                    [1, 5, 9], [3, 5, 7]
                ];

                return winningCombos.some(combo =>
                    combo.every(cellNum => cells[cellNum - 1].textContent === (currentPlayer === 1 ? 'X' : 'O'))
                );
            }

            function checkDraw() {
                const cells = document.querySelectorAll('.cell');
                return Array.from(cells).every(cell => cell.textContent !== '');
            }

            function disableClicks() {
                const cells = document.querySelectorAll('.cell');
                cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
            }
        });