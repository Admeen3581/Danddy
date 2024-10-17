'use client'

import { useState } from 'react';
import './hp.css'; 

const HPManager = () => {
  const [currentHP, setCurrentHP] = useState(0); 
  const maxHP = 100; 

  const addHealth = () => {
    setCurrentHP((prevHP) => Math.min(prevHP + 1, maxHP));
  };

  const subtractHealth = () => {
    setCurrentHP((prevHP) => prevHP - 1);
  };

  return (
    <div className="hpContainer">
      <h1 className="statsTitle">HP</h1>
      <div className="hpStats">
        <div>
          <h2>Current HP: {currentHP}</h2>
        </div>
        <div>
          <h2>Max HP: {maxHP}</h2>
        </div>
      </div>
      <div className='changes'>
        <button onClick={addHealth} style={{ margin: '5px' }}>
          Add Health
        </button>
        <button onClick={subtractHealth} style={{ margin: '5px' }}>
          Subtract Health
        </button>
      </div>
    </div>
  );
};

export default HPManager;
