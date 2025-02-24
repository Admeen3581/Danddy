'use client';

import { useEffect, useState } from 'react';
import './hp.css'; 
import useLocalStore from '@/utils/store';
import DeathComponent from './deathroll';

const HPManager = () => {
  const { classesJson } = useLocalStore();
  
  const [currentHP, setCurrentHP] = useState(0);
  const [isDead, setIsDead] = useState(false);

  // Temp fix : I can't get it to save current health
  const maxHP = classesJson.health.max_health; 
  useEffect(() => {
    setCurrentHP(classesJson.health.current_health) 
  }, [maxHP])
  
  const addHealth = () => {
    setCurrentHP((prevHP) => Math.min(prevHP + 1, maxHP));
  };

  const subtractHealth = () => {
    setCurrentHP((prevHP) => {
      const newHP = prevHP - 1;
      if (newHP <= 0) {
        setIsDead(true);
        return 0; 
      }
      return newHP;
    });
  };

  const resetDeathState = () => {
    setIsDead(false);
    setCurrentHP(1);
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
      {isDead ? (
        <DeathComponent onReset={resetDeathState} />
      ) : (
        <div className='changes'>
          <button onClick={addHealth} style={{ margin: '5px' }}>
            Add Health
          </button>
          <button onClick={subtractHealth} style={{ margin: '5px' }}>
            Subtract Health
          </button>
        </div>
      )}
    </div>
  );
};

export default HPManager;
