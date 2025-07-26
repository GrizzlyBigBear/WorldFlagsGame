"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Score = ({ score }) => {
    return (<div className="score">
            <h2>Score: {score}</h2>
        </div>);
};
exports.default = Score;
