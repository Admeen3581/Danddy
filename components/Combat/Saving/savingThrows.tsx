import useLocalStore from "@/utils/store";
import Stat from "../../../CharSheetsCompon/CSStats/Stat";
import savingStyles from './savingThrows.module.css'
import { getModifier } from "@/utils/characterJsonFunctions";

const SavingThrows = () => {
  const { classesJson, setClassesJson } = useLocalStore();

  var numStats = []

  for(var stat in classesJson.stats){
    if(classesJson.stats[stat].saving_throw) numStats.push(getModifier(classesJson.stats[stat].value) + 2)
    else numStats.push(getModifier(classesJson.stats[stat].value))
  }
 
  const stats = {
    strength: (numStats[0] <= 0 ? numStats[0] : "+"+numStats[0]),
    dex: (numStats[1] <= 0 ? numStats[1] : "+"+numStats[1]),
    constitution: (numStats[2] <= 0 ? numStats[2] : "+"+numStats[2]),
    int: (numStats[3] <= 0 ? numStats[3] : "+"+numStats[3]),
    wis: (numStats[4] <= 0 ? numStats[4] : "+"+numStats[4]),
    cha: (numStats[5] <= 0 ? numStats[5] : "+"+numStats[5])
  };

  return (
    <div className={savingStyles.stats}>
      <h2 className={savingStyles.statsTitle}>Saving Throws</h2>
      <div className={savingStyles.statsBox}>
        <Stat label="Strength" value={stats.strength} />
        <Stat label="Dexterity" value={stats.dex} />
        <Stat label="Constitution" value={stats.constitution} />
        <Stat label="Intelligence" value={stats.int} />
        <Stat label="Wisdom" value={stats.wis} />
        <Stat label="Charisma" value={stats.cha} />
      </div>
    </div>
  );
};

export default SavingThrows;
