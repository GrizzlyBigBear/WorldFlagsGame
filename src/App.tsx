import React, { useState, useEffect } from 'react';
import TimeGame from './components/TimeGame';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<'time' | 'total' | null>(null);
  const [backgroundFlags, setBackgroundFlags] = useState<string[]>([]);

  useEffect(() => {
    const fetchRandomFlags = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=flags');
        const data = await response.json();
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selectedFlags = shuffled.slice(0, 18).map((item: any) => item.flags.png);
        setBackgroundFlags(selectedFlags);
      } catch (error) {
        console.error('Error fetching flags:', error);
      }
    };
    fetchRandomFlags();
  }, []);

  const startGame = (mode: 'time' | 'total') => {
    setGameMode(mode);
    setGameStarted(true);
  };

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px',
      gap: '20px',
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      {backgroundFlags.map((flag, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return (
          <img
            key={index}
            src={flag}
            alt=""
            style={{
              position: 'absolute',
              top: `${(row * 100) / 6}%`,
              left: `${(col * 100) / 3}%`,
              width: `${100 / 3}%`,
              height: `${100 / 6}%`,
              objectFit: 'contain',
              opacity: 0.3,
              zIndex: -1
            }}
          />
        );
      })}
      {!gameStarted && (
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '40px',
          position: 'relative',
          zIndex: 1
        }}>
          WORLD FLAGS GAME!!!
        </h1>
      )}

      {!gameStarted && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          position: 'relative',
          zIndex: 1
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
