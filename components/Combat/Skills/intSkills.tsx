import { getModifier } from "@/utils/characterJsonFunctions";
import useLocalStore from "@/utils/store";
import Stat from "../../../CharSheetsCompon/CSStats/Stat";
import styles from './intSkills.module.css'

const IntSkills = () => {
  const { classesJson, setClassesJson } = useLocalStore();
  
  var numStats = []

  for(var stat in classesJson.stats.intelligence.skills){
    if(classesJson.stats.intelligence.skills[stat]) numStats.push(getModifier(classesJson.stats.intelligence.value)+2);
    else numStats.push(getModifier(classesJson.stats.intelligence.value))
  }

  const stats = {
    arcana: (numStats[0] <= 0 ? numStats[0] : "+"+numStats[0]),
    history: (numStats[1] <= 0 ? numStats[1] : "+"+numStats[1]),
    investigation: (numStats[2] <= 0 ? numStats[2] : "+"+numStats[2]),
    nature: (numStats[3] <= 0 ? numStats[3] : "+"+numStats[3]),
    religion: (numStats[4] <= 0 ? numStats[4] : "+"+numStats[4])
  };

  return (
    <div className={styles.stats}>
      <h2 className={styles.statsTitle}>Int Skills</h2>
      <div className={styles.statsBox}>
        <Stat label="Arcana" value={stats.arcana} />
        <Stat label="History" value={stats.history} />
        <Stat label="Nature" value={stats.nature} />
        <Stat label="Investigation" value={stats.investigation} />
        <Stat label="Religion" value={stats.religion} />
      </div>
    </div>
  );
};

export default IntSkills;
