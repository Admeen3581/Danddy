import React from 'react';
import Stat from '../../../CharSheetsCompon/CSStats/Stat';
import styles from './characterStats.module.css';
import useLocalStore from '@/utils/store';

const CharacterStats = () => {
  const { classesJson, setClassesJson } = useLocalStore();

  const stats = {
    strength: classesJson.stats.strength.value,
    dex: classesJson.stats.dexterity.value,
    constitution: classesJson.stats.constitution.value,
    int: classesJson.stats.intelligence.value,
    wis: classesJson.stats.wisdom.value,
    rizz: classesJson.stats.charisma.value
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
