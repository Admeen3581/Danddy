import React, { useState, useEffect } from 'react';
import './diceroller.css';

const DiceRoller: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const togglePopup = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    const popup = document.getElementById('image-popup');
    const button = document.getElementById('popup-button');
    if (
      popup && !popup.contains(event.target as Node) &&
      button && !button.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const rollDice = (sides: number) => {
    const rolledValue = Math.floor(Math.random() * sides) + 1;
    setResult(`Rolled a D${sides}: ${rolledValue}`);
  };

  const diceImages = [
    { src: 'https://static.thenounproject.com/png/2453696-200.png', sides: 4, alt: 'D4' },
    { src: 'https://static.thenounproject.com/png/2453695-200.png', sides: 6, alt: 'D6' },
    { src: 'https://static.thenounproject.com/png/2453699-200.png', sides: 8, alt: 'D8' },
    { src: 'https://static.thenounproject.com/png/2453698-200.png', sides: 10, alt: 'D10' },
    { src: 'https://static.thenounproject.com/png/2453697-200.png', sides: 12, alt: 'D12' },
    { src: 'https://static.thenounproject.com/png/2453700-200.png', sides: 20, alt: 'D20' },
  ];

  return (
    <>
      <div id="popup-button" className="popup-button" onClick={togglePopup}>
        +
      </div>
      {isOpen && <div className="overlay" />}
      {isOpen && (
        <div id="image-popup" className="image-popup">
          {diceImages.map(dice => (
            <img
              key={dice.sides}
              src={dice.src}
              alt={dice.alt}
              onClick={() => rollDice(dice.sides)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      )}
      {result && (
        <div className="result-popup">
          {result}
          <button onClick={() => setResult(null)}>Close</button>
        </div>
      )}
    </>
  );
};

export default DiceRoller;
