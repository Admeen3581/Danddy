import React from 'react';
import './playerstats.css';
import { getModifier } from '@/utils/characterJsonFunctions';
import { readDatabaseRoute } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';

const PlayerStats = () => {
  const { classesJson, setClassesJson } = useLocalStore();
  readDatabaseRoute("characters/testerCharacterCreation")
    .then((result) => {
      setClassesJson(result)
    })
    
  return (
    <div className="PAstats-home"> 
      <div className="StatsBox">
        <span className="inline-text">Strength: {getModifier(classesJson.stats.strength.value)}</span>
        <span className="inline-text">Dexterity: {getModifier(classesJson.stats.dexterity.value)}</span>
        <span className="inline-text">Constitution: {getModifier(classesJson.stats.constitution.value)}</span>
        <span className="inline-text">Intelligence: {getModifier(classesJson.stats.intelligence.value)}</span>
        <span className="inline-text">Wisdom: {getModifier(classesJson.stats.wisdom.value)}</span>
        <span className="inline-text">Charisma: {getModifier(classesJson.stats.charisma.value)}</span>
      </div>
    </div>
  );
};

export default PlayerStats;
