import useLocalStore from "@/utils/store";
import Stat from "../../../CharSheetsCompon/CSStats/Stat";
import savingStyles from './savingThrows.module.css'
import { getModifier } from "@/utils/characterJsonFunctions";

const SavingThrows = () => {
  const { classesJson, setClassesJson } = useLocalStore();
 
  const stats = {
    strength: getModifier(classesJson.stats.strength.value),
    dex: getModifier(classesJson.stats.dexterity.value),
    constitution: getModifier(classesJson.stats.constitution.value),
    int: getModifier(classesJson.stats.intelligence.value),
    wis: getModifier(classesJson.stats.wisdom.value),
    cha: getModifier(classesJson.stats.charisma.value)
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
