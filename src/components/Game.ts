import { Flag } from '../types';

export class Game {
    private score: number;
    private currentFlagIndex: number;
    private flags: Flag[];
    private totalFlags: number;

    constructor(flags: Flag[]) {
        this.score = 0;
        this.currentFlagIndex = 0;
        this.flags = flags;
        this.totalFlags = flags.length;
    }

    public startGame(): void {
        this.currentFlagIndex = 0;
        this.score = 0;
        this.displayNextFlag();
    }

    private displayNextFlag(): void {
        if (this.currentFlagIndex < this.totalFlags) {
            const flag = this.flags[this.currentFlagIndex];
            // Logic to display the flag image and prompt user for input
        } else {
            this.endGame();
        }
    }

    public checkAnswer(userAnswer: string): void {
        const correctAnswer = this.flags[this.currentFlagIndex].country;
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            this.score++;
        }
        this.currentFlagIndex++;
        this.displayNextFlag();
    }

    private endGame(): void {
        // Logic to display the final score and end the game
    }

    public getScore(): number {
        return this.score;
    }
}

export default Game;