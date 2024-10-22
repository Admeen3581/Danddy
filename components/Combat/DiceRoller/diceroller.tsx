import React, { useState, useEffect } from 'react';
import './diceroller.css';

const DiceRoller: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the popup
  const togglePopup = () => setIsOpen(!isOpen);

  // Close the popup when clicking outside
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

  return (
    <>
      <div id="popup-button" className="popup-button" onClick={togglePopup}>
        +
      </div>
      {isOpen && <div className="overlay" />}
      {isOpen && (
        <div id="image-popup" className="image-popup">
          <img src="https://static.thenounproject.com/png/2453696-200.png" alt="D4" />
          <img src="https://static.thenounproject.com/png/2453695-200.png" alt="D6" />
          <img src="https://static.thenounproject.com/png/2453699-200.png" alt="D8" />
          <img src="https://static.thenounproject.com/png/2453698-200.png" alt="D10" />
          <img src="https://static.thenounproject.com/png/2453697-200.png" alt="D12" />
          <img src="https://static.thenounproject.com/png/2453700-200.png" alt="D20" />
        </div>
      )}
    </>
  );
};

export default DiceRoller;
