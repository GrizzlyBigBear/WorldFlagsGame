import React, { useState, useEffect } from 'react';

interface Country {
  flags: {
    png: string;
  };
  name: {
    common: string;
  };
}

interface TimeGameProps {
  onRestart: () => void;
}

const TimeGame: React.FC<TimeGameProps> = ({ onRestart }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [currentFlag, setCurrentFlag] = useState('');
  const [countryName, setCountryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [flagIndex, setFlagIndex] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleNextFlag = () => {
    if (flagIndex < 9) {
      setFlagIndex(prev => prev + 1);
      setTimeLeft(10);
      fetchRandomFlag();
    } else {
      setIsGameComplete(true);
    }
  };

  const fetchRandomFlag = async () => {
    try {
      setIsLoading(true);
      setError('');
      setSelectedAnswer(null);
      
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
      const allCountries = await response.json();
      
      // Get random countries for options
      const shuffled = [...allCountries].sort(() => 0.5 - Math.random());
      const selectedCountries = shuffled.slice(0, 4);
      
      // Fetch the specific country for the current flag
      const targetCountry = selectedCountries[0];
      const flagResponse = await fetch(`https://restcountries.com/v3.1/name/${targetCountry.name.common}`);
      const flagData = await flagResponse.json();

      setCurrentFlag(flagData[0].flags.png);
      setCountryName(targetCountry.name.common);
      setOptions(selectedCountries.map(c => c.name.common).sort(() => 0.5 - Math.random()));
    } catch (error) {
      console.error('Fetch error:', error);
      setError(`Failed to load flag: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === countryName) {
      setScore(prev => prev + 1);
    }
    setTimeLeft(0);
  };

  const getButtonColor = (option: string) => {
    if (timeLeft === 0 || selectedAnswer) {
      if (option === countryName) return '#4CAF50'; // Correct answer in green
      if (option === selectedAnswer) return '#f44336'; // Selected wrong answer in red
    }
    return '#fff'; // Default color
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    fetchRandomFlag();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ fontSize: '24px', marginBottom: '20px' }}>
        Flag {flagIndex + 1} of 10
        <br />
        Score: {score}
        <br />
        Time Remaining: {timeLeft}s
      </div>
      
      {isLoading && <div>Loading flag...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      {currentFlag && !isLoading && (
        <div>
          <img 
            src={currentFlag} 
            alt="Guess this flag" 
            style={{ 
              width: '300px',
              height: 'auto',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '20px'
            }}
          />
          
          <div style={{ display: 'grid', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={timeLeft === 0 || selectedAnswer !== null}
                style={{
                  padding: '10px',
                  backgroundColor: getButtonColor(option),
                  color: (timeLeft === 0 || selectedAnswer) && 
                    (option === countryName || option === selectedAnswer) 
                    ? 'white' : 'black',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: (timeLeft === 0 || selectedAnswer) ? 'default' : 'pointer',
                  opacity: (timeLeft === 0 || selectedAnswer) ? 0.8 : 1
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {timeLeft === 0 && (
            <div>
              <h2 style={{ color: '#333' }}>{countryName}</h2>
              {!isGameComplete && (
                <button 
                  onClick={handleNextFlag}
                  style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    marginTop: '10px'
                  }}
                >
                  Next Flag
                </button>
              )}
            </div>
          )}
          
          {isGameComplete && (
            <div>
              <h2>Game Complete! Final Score: {score}/10</h2>
              <button onClick={onRestart}>Play Again</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeGame;
