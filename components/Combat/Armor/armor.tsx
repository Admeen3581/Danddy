import Stat from "../../../CharSheetsCompon/CSStats/Stat";
import styles from './armor.module.css'

const SensesStats = () => {
  
  return (
    <div className={styles.stats}>
      <h2 className={styles.statsTitle}>Senses</h2>
      <div className={styles.statsBox}>
        <Stat label="Armor Class" value="16" />
        <Stat label="Initiative" value="+1" />
      </div>
    </div>
  );
};

export default SensesStats;
