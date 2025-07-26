export function checkAnswer(selectedCountry: string, correctCountry: string): boolean {
    return selectedCountry.toLowerCase() === correctCountry.toLowerCase();
}

export function updateScore(currentScore: number, isCorrect: boolean): number {
    return isCorrect ? currentScore + 1 : currentScore;
}

export function resetGame(): void {
    // Logic to reset the game state
}