import useLocalStore from "@/utils/store";
import Stat from "../../charSheets/CSStats/Stat";
import styles from './dexSkills.module.css'
import { getModifier } from "@/utils/characterJsonFunctions";

const IntSkills = () => {

  const { classesJson } = useLocalStore();
  
  let numStats = []

  for(let stat in classesJson.stats.dexterity.skills){
    if(classesJson.stats.dexterity.skills[stat]) numStats.push(getModifier(classesJson.stats.dexterity.value)+2);
    else numStats.push(getModifier(classesJson.stats.dexterity.value))
  }

  const stats = {
    acrobat: (numStats[0] <= 0 ? numStats[0] : "+"+numStats[0]),
    sleight: (numStats[1] <= 0 ? numStats[1] : "+"+numStats[1]),
    stealth: (numStats[2] <= 0 ? numStats[2] : "+"+numStats[2])
  };

  return (
    <div className={styles.stats}>
      <h2 className={styles.statsTitle}>Dex Skills</h2>
      <div className={styles.statsBox}>
        <Stat label="Acrobatics" value={stats.acrobat} />
        <Stat label="Sleight Of Hand" value={stats.sleight} />
        <Stat label="Stealth" value={stats.stealth} />
      </div>
    </div>
  );
};

export default IntSkills;
