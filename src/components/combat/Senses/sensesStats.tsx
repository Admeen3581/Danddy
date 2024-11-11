import useLocalStore from "@/utils/store";
import Stat from "../../charSheets/CSStats/Stat";
import styles from './sensesStats.module.css'

const SensesStats = () => {
  const { classesJson, setClassesJson } = useLocalStore();
  
  const stats = {
    perception: classesJson.stats.wisdom.value,
    investigation: classesJson.stats.intelligence.value,
    insight: classesJson.stats.wisdom.value
  };

  return (
    <div className={styles.stats}>
      <h2 className={styles.statsTitle}>Senses</h2>
      <div className={styles.statsBox}>
        <Stat label="Passive Perception" value={stats.perception} />
        <Stat label="Passive Investigation" value={stats.investigation} />
        <Stat label="Passive Insight" value={stats.insight} />
      </div>
    </div>
  );
};

export default SensesStats;
