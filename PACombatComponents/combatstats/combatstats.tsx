import React from 'react';
import './combatstats.css';

const CombatStats = () => {
  return (
    <div className="CombatHome-section">
       <div className="CBStatsBox">
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

export default CombatStats;
