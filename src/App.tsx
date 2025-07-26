import React, { useState } from 'react';
import TimeGame from './components/TimeGame';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const startTimeBasedGame = () => {
    setGameStarted(true);
  };

  const handleRestart = () => {
    setGameStarted(false);
  };

  return (
    <div>
      <h1>World Flags Game</h1>
      {!gameStarted ? (
        <button onClick={startTimeBasedGame}>
          Start Time Challenge
        </button>
      ) : (
        <TimeGame onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
