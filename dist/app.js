"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./components/Game");
const flagData_1 = require("./utils/flagData");
require("./styles/main.css");
const app = document.getElementById('app');
if (app) {
    const game = new Game_1.Game(flagData_1.flagData);
    game.startGame();
}
