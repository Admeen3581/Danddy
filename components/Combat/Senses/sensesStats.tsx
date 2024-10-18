import Stat from "../../../CharSheetsCompon/CSStats/Stat";
import styles from './sensesStats.module.css'

const SensesStats = () => {
  const stats = {
    perception: 11,
    investigation: 10,
    insight: 10
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
