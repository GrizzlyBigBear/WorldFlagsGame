import React, { useState, useEffect } from 'react';

interface TotalGameProps {
  total: number;
  onRestart: () => void;
}

const TotalGame: React.FC<TotalGameProps> = ({ total, onRestart }) => {
  const [flags, setFlags] = useState<any[]>([]);
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
        const data = await response.json();
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, total);
        setFlags(shuffled);
        setLoading(false);
        generateOptions(shuffled[0], shuffled);
      } catch (error) {
        console.error('Error fetching flags:', error);
      }
    };
    fetchFlags();
  }, [total]);

  const generateOptions = (currentFlag: any, allFlags: any[]) => {
    const correct = currentFlag.name.common;
    const others = allFlags.filter(f => f.name.common !== correct).sort(() => 0.5 - Math.random()).slice(0, 3).map(f => f.name.common);
    const allOptions = [correct, ...others].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  };

  const handleGuess = (guess: string) => {
    const correct = flags[currentFlagIndex].name.common;
    const isCorrect = guess === correct;
    setFeedback({
      isCorrect,
      message: isCorrect ? 'Correct!' : `Incorrect! The correct answer is ${correct}.`
    });
    if (isCorrect) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setFeedback(null);
      const nextIndex = currentFlagIndex + 1;
      if (nextIndex < total) {
        setCurrentFlagIndex(nextIndex);
        generateOptions(flags[nextIndex], flags);
      } else {
        setGameOver(true);
      }
    }, 2000);
  };

  if (loading) return <div>Loading...</div>;

  if (gameOver) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Game Over!</h2>
        <p>Final Score: {score}/{total}</p>
        <button onClick={onRestart} style={{
          padding: '10px 20px',
          fontSize: '16px',
          border: '2px solid black',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}>
          Play Again
        </button>
      </div>
    );
  }

  const currentFlag = flags[currentFlagIndex];
  const progress = ((currentFlagIndex + 1) / total) * 100;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>SCORE: {score}/{total}</div>
        <div>PROGRESS: {currentFlagIndex + 1}/{total}</div>
      </div>
      <div style={{
        width: '100%',
        height: '20px',
        backgroundColor: '#eee',
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#4CAF50',
          borderRadius: '10px',
          transition: 'width 0.3s ease'
        }}></div>
      </div>
      <div style={{
        aspectRatio: '3/2',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        <img
          src={currentFlag.flags.png}
          alt={`Flag of ${currentFlag.name.common}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      {feedback ? (
        <div style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: feedback.isCorrect ? 'green' : 'red',
          marginBottom: '20px'
        }}>
          {feedback.message}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {options.map(option => (
            <button
              key={option}
              onClick={() => handleGuess(option)}
              style={{
                padding: '15px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TotalGame;
