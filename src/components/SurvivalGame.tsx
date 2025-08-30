import React, { useState, useEffect } from 'react';

interface SurvivalGameProps {
  onRestart: () => void;
}

const SurvivalGame: React.FC<SurvivalGameProps> = ({ onRestart }) => {
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
        const shuffled = data.sort(() => 0.5 - Math.random());
        setFlags(shuffled);
        setLoading(false);
        generateOptions(shuffled[0], shuffled);
      } catch (error) {
        console.error('Error fetching flags:', error);
      }
    };
    fetchFlags();
  }, []);

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
      setTimeout(() => {
        setFeedback(null);
        const nextIndex = (currentFlagIndex + 1) % flags.length;
        setCurrentFlagIndex(nextIndex);
        generateOptions(flags[nextIndex], flags);
      }, 2000);
    } else {
      setTimeout(() => {
        setGameOver(true);
      }, 2000);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (gameOver) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Game Over!</h2>
        <p>You got {score} correct in a row!</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => window.location.reload()} style={{
            padding: '10px 20px',
            fontSize: '16px',
            border: '2px solid black',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}>
            Restart
          </button>
          <button onClick={onRestart} style={{
            padding: '10px 20px',
            fontSize: '16px',
            border: '2px solid black',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const currentFlag = flags[currentFlagIndex];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div>SCORE: {score}</div>
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

export default SurvivalGame;
