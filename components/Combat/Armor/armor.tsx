import Stat from "../../CharSheetsComponents/CSStats/Stat";
import styles from './armor.module.css'

const Armor = () => {
  
  return (
    <div className={styles.stats}>
      <h2 className={styles.statsTitle}>AC & Initiative</h2>
      <div className={styles.statsBox}>
        <Stat label="Armor Class" value="16" />
        <Stat label="Initiative" value="+1" />
      </div>
    </div>
  );
};

export default Armor;
