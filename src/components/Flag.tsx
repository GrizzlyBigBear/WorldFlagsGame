import React from 'react';

interface FlagProps {
    flagSrc: string;
    countryName: string;
    onGuess: (country: string) => void;
}

const Flag: React.FC<FlagProps> = ({ flagSrc, countryName, onGuess }) => {
    return (
        <div className="flag-container" onClick={() => onGuess(countryName)}>
            <img src={flagSrc} alt={`Flag of ${countryName}`} className="flag-image" />
        </div>
    );
};

export default Flag;