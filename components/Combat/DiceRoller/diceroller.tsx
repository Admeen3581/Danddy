import React, { useState, useEffect } from 'react';
import './diceroller.css';

const DiceRoller: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rolls, setRolls] = useState<{ sides: number; value: number }[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  const togglePopup = () => {
    if (isOpen) {
      resetRolls();
    }
    setIsOpen(!isOpen);
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    const popup = document.getElementById('image-popup');
    const button = document.getElementById('popup-button');
    if (
      popup && !popup.contains(event.target as Node) &&
      button && !button.contains(event.target as Node)
    ) {
      resetRolls(); // Reset rolls when clicking outside
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
    setRolls(prevRolls => [...prevRolls, { sides, value: rolledValue }]);
    setTotal(prevTotal => (prevTotal || 0) + rolledValue);
  };

  const diceImages = [
    { src: 'https://static.thenounproject.com/png/2453696-200.png', sides: 4, alt: 'D4' },
    { src: 'https://static.thenounproject.com/png/2453695-200.png', sides: 6, alt: 'D6' },
    { src: 'https://static.thenounproject.com/png/2453699-200.png', sides: 8, alt: 'D8' },
    { src: 'https://static.thenounproject.com/png/2453698-200.png', sides: 10, alt: 'D10' },
    { src: 'https://static.thenounproject.com/png/2453697-200.png', sides: 12, alt: 'D12' },
    { src: 'https://static.thenounproject.com/png/2453700-200.png', sides: 20, alt: 'D20' },
  ];

  const resetRolls = () => {
    setRolls([]);
    setTotal(null);
  };

  return (
    <>
    <div id="popup-button" className="popup-button" onClick={togglePopup}>
    <img src="https://cdn-icons-png.flaticon.com/512/6545/6545894.png" alt="Open Dice Roller" style={{ width: '50px', height: '50px' }} />
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
      {rolls.length > 0 && (
        <div className="result-popup">
          <h2 style={{ color: 'black' }}>Rolls:</h2>
          <ul>
            {rolls.map((roll, index) => (
              <li key={index}>
                D{roll.sides}: {roll.value}
              </li>
            ))}
          </ul>
          {total !== null && <h1 style={{ color: 'red', fontSize: '2.5em' }}>{total}</h1>}
          <button onClick={resetRolls}>Close</button>
        </div>
      )}
    </>
  );
};

export default DiceRoller;
