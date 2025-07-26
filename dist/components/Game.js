"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(flags) {
        this.score = 0;
        this.currentFlagIndex = 0;
        this.flags = flags;
        this.totalFlags = flags.length;
    }
    startGame() {
        this.currentFlagIndex = 0;
        this.score = 0;
        this.displayNextFlag();
    }
    displayNextFlag() {
        if (this.currentFlagIndex < this.totalFlags) {
            const flag = this.flags[this.currentFlagIndex];
            // Logic to display the flag image and prompt user for input
        }
        else {
            this.endGame();
        }
    }
    checkAnswer(userAnswer) {
        const correctAnswer = this.flags[this.currentFlagIndex].country;
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            this.score++;
        }
        this.currentFlagIndex++;
        this.displayNextFlag();
    }
    endGame() {
        // Logic to display the final score and end the game
    }
    getScore() {
        return this.score;
    }
}
exports.Game = Game;
exports.default = Game;
