import useLocalStore from "@/utils/store";
import Stat from "../../charSheets/CSStats/Stat";
import styles from './wisSkills.module.css'
import { getModifier } from "@/utils/characterJsonFunctions";

const WisSkills = () => {
  const { classesJson } = useLocalStore();
  
  let numStats = []

  for(let stat in classesJson.stats.wisdom.skills){
    if(classesJson.stats.wisdom.skills[stat]) numStats.push(getModifier(classesJson.stats.wisdom.value)+2);
    else numStats.push(getModifier(classesJson.stats.wisdom.value))
  }

  const stats = {
    animal: (numStats[0] <= 0 ? numStats[0] : "+"+numStats[0]),
    insight: (numStats[1] <= 0 ? numStats[1] : "+"+numStats[1]),
    medicine: (numStats[2] <= 0 ? numStats[2] : "+"+numStats[2]),
    perception: (numStats[3] <= 0 ? numStats[3] : "+"+numStats[3]),
    survival: (numStats[4] <= 0 ? numStats[4] : "+"+numStats[4])
  };

  return (
    <div className={styles.stats}>
      <h2 className={styles.statsTitle}>Wis Skills</h2>
      <div className={styles.statsBox}>
        <Stat label="Animal Handling" value={stats.animal} />
        <Stat label="Insight" value={stats.insight} />
        <Stat label="Medicine" value={stats.medicine} />
        <Stat label="Perception" value={stats.perception} />
        <Stat label="Survival" value={stats.survival} />
      </div>
    </div>
  );
};

export default WisSkills;
