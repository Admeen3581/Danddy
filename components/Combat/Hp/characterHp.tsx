'use client'

import { useEffect, useState } from 'react';
import './hp.css'; 
import useLocalStore from '@/utils/store';

const HPManager = () => {
  const { classesJson, setClassesJson } = useLocalStore();
  
  const [currentHP, setCurrentHP] = useState(0);
  const [isDead, setIsDead] = useState(false);

  useEffect(() => {
    setCurrentHP(classesJson.health.current_health) 
  }, [])
  const maxHP = classesJson.health.max_health; 

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
