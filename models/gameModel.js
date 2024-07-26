class WhackAMoleModel {
    constructor() {
        this.score = 0;
        this.time = 30;
        this.board = Array(12).fill().map((_, i) => ({ id: i, hasMole: false }));
        this.timerId = null;
        this.moleId = null;
    }

    reset() {
        this.score = 0;
        this.time = 30;
        this.board.forEach(cell => cell.hasMole = false);
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
        this.timerId = null;
        this.moleId = null;
    }

    startMoleGeneration(onMoleAppear) {
        this.moleId = setInterval(() => {
            const activeMoles = this.board.filter(cell => cell.hasMole).length;
            if (activeMoles < 3) {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * 12);
                } while (this.board[randomIndex].hasMole);
                this.board[randomIndex].hasMole = true;
                onMoleAppear(randomIndex);
            }
        }, 1000);
    }

    removeMoleAt(index) {
        this.board[index].hasMole = false;
    }

    incrementScore() {
        this.score++;
    }
}
