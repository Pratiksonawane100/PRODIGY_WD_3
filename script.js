document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameActive = true;

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = parseInt(cell.id);

        if (cell.textContent !== '' || !gameActive) return;

        cell.textContent = currentPlayer;
        checkWin();
        checkDraw();
        togglePlayer();
    };

    const togglePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const checkWin = () => {
        winningCombos.forEach(combo => {
            const [a, b, c] = combo;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                cells[a].classList.add('win');
                cells[b].classList.add('win');
                cells[c].classList.add('win');
                gameActive = false;
                alert(`${currentPlayer} wins!`);
            }
        });
    };

    const checkDraw = () => {
        if ([...cells].every(cell => cell.textContent !== '')) {
            gameActive = false;
            alert('It\'s a draw!');
        }
    };

    const resetGame = () => {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
        });
        gameActive = true;
        currentPlayer = 'X';
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
