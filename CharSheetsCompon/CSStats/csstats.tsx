import React from 'react';
import './csstats.css';
import Stat from './Stat';

const CSStats = () => {
  const stats = {
    health: 100,
    strength: 50,
    dex: 30,
    constitution: 20,
    int: 100,
    wis: 50,
    rizz: 999
  };

  return (
    <div className="stats">
      <h2 className="stats-title">Character Stats</h2>
      <div className="stats-box">
        <Stat label="Health" value={stats.health} />
        <Stat label="Strength" value={stats.strength} />
        <Stat label="Dexterity" value={stats.dex} />
        <Stat label="Constitution" value={stats.constitution} />
        <Stat label="Intelligence" value={stats.int} />
        <Stat label="Wisdom" value={stats.wis} />
        <Stat label="Rizz" value={stats.rizz} />
      </div>
    </div>
  );
};

export default CSStats;
