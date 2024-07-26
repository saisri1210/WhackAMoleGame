class WhackAMoleModel {
    constructor() {
        this.score = 0;
        this.time = 30;
        this.board = Array(12).fill().map((_, i) => ({ id: i, hasMole: false, hasSnake: false }));
        this.timerId = null;
        this.moleId = null;
        this.snakeId = null;
    }

    reset() {
        this.score = 0;
        this.time = 30;
        this.board.forEach(cell => {
            cell.hasMole = false;
            cell.hasSnake = false;
        });
    }

    startTimer(onTick, onEnd) {
        this.timerId = setInterval(() => {
            this.time--;
            onTick(this.time);
            if (this.time === 0) {
                this.stopAll();
                onTick(0);
                onEnd();
            }
        }, 1000);
    }

    stopAll() {
        clearInterval(this.timerId);
        clearInterval(this.moleId);
        clearInterval(this.snakeId);
        this.timerId = null;
        this.moleId = null;
        this.snakeId = null;
    }

    startMoleGeneration(onMoleAppear, onMoleDisappear) {
        this.moleId = setInterval(() => {
            const activeMoles = this.board.filter(cell => cell.hasMole).length;
            if (activeMoles < 3) {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * 12);
                } while (this.board[randomIndex].hasMole || this.board[randomIndex].hasSnake);
                this.board[randomIndex].hasMole = true;
                onMoleAppear(randomIndex);
                setTimeout(() => {
                    if (this.board[randomIndex].hasMole) {
                        this.board[randomIndex].hasMole = false;
                        onMoleDisappear(randomIndex);
                    }
                }, 2000);
            }
        }, 1000);
    }

    startSnakeGeneration(onSnakeAppear) {
        this.snakeId = setInterval(() => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * 12);
            } while (this.board[randomIndex].hasMole);
            this.board.forEach(cell => cell.hasSnake = false);
            this.board[randomIndex].hasSnake = true;
            onSnakeAppear(randomIndex);
        }, 2000);
    }

    removeMoleAt(index) {
        this.board[index].hasMole = false;
    }

    incrementScore() {
        this.score++;
    }

    snakeClick() {
        this.board.forEach(cell => {
            cell.hasMole = false;
            cell.hasSnake = true;
        });
    }
}
