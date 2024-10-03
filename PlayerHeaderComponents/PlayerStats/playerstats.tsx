import React from 'react';
import './playerstats.css';

const PlayerStats = () => {
  return (
    <div className="PAHome-section">
       <div className="StatsBox">
       <span className="inline-text">Strength</span>
       <span className="inline-text">Dexterity</span>
       <span className="inline-text">Constitution</span>
       <span className="inline-text">Intelligence</span>
       <span className="inline-text">Wisdom</span>
       <span className="inline-text">Charisma</span>
       </div>
    </div>
  );
};

export default PlayerStats;
