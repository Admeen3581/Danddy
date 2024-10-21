import Stat from "../../../CharSheetsCompon/CSStats/Stat";
import styles from './strSkills.module.css'

const StrSkills = () => {
  const stats = {
    athletics: 10
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
