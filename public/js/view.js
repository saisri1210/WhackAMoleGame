class MoleGameView {
    constructor() {
        this.scoreElement = document.getElementById('score-display');
        this.timeElement = document.getElementById('timer-display');
        this.boardElement = document.getElementById('board');
        this.startButtonElement = document.getElementById('start-btn');
        this.cells = [];
    }

    setupBoard() {
        for (let i = 0; i < 12; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.id = i;

            const moleImage = document.createElement('img');
            moleImage.src = 'public/images/mole.jpg';
            moleImage.className = 'mole-image';
            cell.appendChild(moleImage);

            const snakeImage = document.createElement('img');
            snakeImage.src = 'public/images/snake.jpg';
            snakeImage.className = 'snake-image';
            cell.appendChild(snakeImage);

            this.boardElement.appendChild(cell);
            this.cells.push(cell);
        }
    }

    renderScore(score) {
        this.scoreElement.textContent = `Let's Go, your total score is ${score}`;
    }

    renderTime(time) {
        this.timeElement.textContent = time;
    }

    displayMole(cellId) {
        this.cells[cellId].querySelector('.mole-image').classList.add('show');
    }

    hideMole(cellId) {
        this.cells[cellId].querySelector('.mole-image').classList.remove('show');
    }

    displaySnake(cellId) {
        this.cells.forEach(cell => cell.querySelector('.snake-image').classList.remove('show'));
        this.cells[cellId].querySelector('.snake-image').classList.add('show');
    }

    showAllSnakes() {
        this.cells.forEach(cell => {
            cell.querySelector('.mole-image').classList.remove('show');
            cell.querySelector('.snake-image').classList.add('show');
        });
    }

    clearBoard() {
        this.cells.forEach(cell => {
            this.hideMole(cell.dataset.id);
            cell.querySelector('.snake-image').classList.remove('show');
        });
    }

    deactivateStartButton() {
        this.startButtonElement.disabled = true;
    }

    activateStartButton() {
        this.startButtonElement.disabled = false;
    }
}
