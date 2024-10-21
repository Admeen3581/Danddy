import React from 'react';
import Stat from '../../../CharSheetsCompon/CSStats/Stat';
import styles from './characterStats.module.css';

const CharacterStats = () => {
  const stats = {
    strength: 5000,
    dex: 30,
    constitution: 20,
    int: 100,
    wis: 50,
    rizz: 999
  };

  return (
    <div className={styles.stats}>
      <h2 className={styles.statsTitle}>Character Stats</h2>
      <div className={styles.statsBox}>
        <Stat label="Strength" value={stats.strength} />
        <Stat label="Dexterity" value={stats.dex} />
        <Stat label="Constitution" value={stats.constitution} />
        <Stat label="Intelligence" value={stats.int} />
        <Stat label="Wisdom" value={stats.wis} />
        <Stat label="Charisma" value={stats.rizz} />
      </div>
    </div>
  );
};

export default CharacterStats;
