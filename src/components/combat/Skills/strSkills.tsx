import useLocalStore from "@/utils/store";
import Stat from "../../charSheets/CSStats/Stat";
import styles from './strSkills.module.css'
import { getModifier } from "@/utils/characterJsonFunctions";

const StrSkills = () => {
  const { classesJson, setClassesJson } = useLocalStore();
    
  var numStats = []

  for(var stat in classesJson.stats.dexterity.skills){
    if(classesJson.stats.strength.skills[stat]) numStats.push(getModifier(classesJson.stats.strength.value)+2);
    else numStats.push(getModifier(classesJson.stats.strength.value))
  }

  const stats = {
    athletics: (numStats[0] <= 0 ? numStats[0] : "+"+numStats[0])
  };

  return (
    <div className={styles.stats}>
      <h2 className={styles.statsTitle}>Str Skills</h2>
      <div className={styles.statsBox}>
        <Stat label="Athletics" value={stats.athletics} />
      </div>
    </div>
  );
};

export default StrSkills;
