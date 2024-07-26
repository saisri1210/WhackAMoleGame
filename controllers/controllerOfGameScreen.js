class WhackAMoleController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.isGameActive = false;
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.view.startButtonElement.addEventListener('click', () => this.startGame());
        this.view.boardElement.addEventListener('click', event => this.handleCellClick(event));
    }

    startGame() {
        if (this.isGameRunning()) return;

        this.resetGame();
        this.view.deactivateStartButton();
        this.initializeView();
        this.runGameTimer();
        this.generateMoles();
        this.isGameActive = true;
    }

    isGameRunning() {
        return this.model.timerId !== null || this.model.moleId !== null;
    }

    resetGame() {
        this.model.stopAll();
        this.model.reset();
    }

    initializeView() {
        this.view.clearBoard();
        this.view.renderScore(this.model.score);
        this.view.renderTime(this.model.time);
    }

    runGameTimer() {
        this.model.startTimer(
            time => this.view.renderTime(time),
            () => this.endGame()
        );
    }

    generateMoles() {
        this.model.startMoleGeneration(cellId => this.view.displayMole(cellId));
    }

    handleCellClick(event) {
        if (!this.isGameActive) return;

        const cell = event.target.closest('.cell');
        if (cell) {
            const cellId = cell.dataset.id;
            if (this.model.board[cellId].hasMole) {
                this.model.removeMoleAt(cellId);
                this.model.incrementScore();
                this.view.renderScore(this.model.score);
                this.view.hideMole(cellId);
            }
        }
    }

    endGame() {
        this.model.stopAll();
        this.view.activateStartButton();
        this.isGameActive = false;
        alert('Time is Over!');
    }
}