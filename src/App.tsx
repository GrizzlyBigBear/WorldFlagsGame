import React, { useState } from 'react';
import TimeGame from './components/TimeGame';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<'time' | 'total' | null>(null);

  const startGame = (mode: 'time' | 'total') => {
    setGameMode(mode);
    setGameStarted(true);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px',
      gap: '20px'
    }}>
      {!gameStarted && (
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '40px'
        }}>
          WORLD FLAGS GAME!!!
        </h1>
      )}

      {!gameStarted && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <button 
            onClick={() => startGame('time')}
            style={{
              padding: '15px 30px',
              fontSize: '20px',
              border: '2px solid black',
              backgroundColor: 'white',
              cursor: 'pointer',
              minWidth: '250px'
            }}
          >
            TIME CHALLENGE
          </button>
          <button 
            onClick={() => startGame('total')}
            style={{
              padding: '15px 30px',
              fontSize: '20px',
              border: '2px solid black',
              backgroundColor: 'white',
              cursor: 'pointer',
              minWidth: '250px'
            }}
          >
            TOTAL CHALLENGE
          </button>
        </div>
      )}

      {gameStarted && gameMode === 'time' && (
        <TimeGame onRestart={() => setGameStarted(false)} />
      )}
    </div>
  );
}

export default App;
