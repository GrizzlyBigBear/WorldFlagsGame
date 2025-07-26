"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetGame = exports.updateScore = exports.checkAnswer = void 0;
function checkAnswer(selectedCountry, correctCountry) {
    return selectedCountry.toLowerCase() === correctCountry.toLowerCase();
}
exports.checkAnswer = checkAnswer;
function updateScore(currentScore, isCorrect) {
    return isCorrect ? currentScore + 1 : currentScore;
}
exports.updateScore = updateScore;
function resetGame() {
    // Logic to reset the game state
}
exports.resetGame = resetGame;
