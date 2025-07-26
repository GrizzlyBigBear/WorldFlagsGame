import { Game } from './components/Game';
import { flagData } from './utils/flagData';
import './styles/main.css';

const app = document.getElementById('app');

if (app) {
    const game = new Game(flagData);
    game.startGame();
}