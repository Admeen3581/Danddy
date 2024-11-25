import useLocalStore from "@/utils/store";
import Stat from "../../charSheets/CSStats/Stat";
import styles from './chaSkills.module.css'
import { getModifier } from "@/utils/characterJsonFunctions";

const ChaSkills = () => {
  const { classesJson } = useLocalStore();
  
  const numStats = []

  for(const stat in classesJson.stats.charisma.skills){
    if(classesJson.stats.charisma.skills[stat]) numStats.push(getModifier(classesJson.stats.charisma.value)+2);
    else numStats.push(getModifier(classesJson.stats.charisma.value))
  }

  const stats = {
    deception: (numStats[0] <= 0 ? numStats[0] : "+"+numStats[0]),
    intimidation: (numStats[1] <= 0 ? numStats[1] : "+"+numStats[1]),
    performance: (numStats[2] <= 0 ? numStats[2] : "+"+numStats[2]),
    persuasion: (numStats[3] <= 0 ? numStats[3] : "+"+numStats[3])
  };

  return (
    <div className={styles.stats}>
      <h2 className={styles.statsTitle}>Cha Skills</h2>
      <div className={styles.statsBox}>
        <Stat label="Deception" value={stats.deception} />
        <Stat label="Intimidation" value={stats.intimidation} />
        <Stat label="Performance" value={stats.performance} />
        <Stat label="Persuasion" value={stats.persuasion} />
      </div>
    </div>
  );
};

export default ChaSkills;
