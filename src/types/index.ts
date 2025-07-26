export interface Flag {
    country: string;
    imageUrl: string;
}

export interface GameState {
    score: number;
    currentFlag: Flag | null;
    totalFlags: number;
    guessedFlags: Flag[];
}