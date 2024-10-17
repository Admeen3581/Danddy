import Stat from "../../../CharSheetsCompon/CSStats/Stat";
import styles from './intSkills.module.css'

const IntSkills = () => {
  const stats = {
    arcana: 11,
    history: 10,
    investigation: 10,
    religion: 10
  };

  return (
    <div className={styles.stats}>
      <h2 className={styles.statsTitle}>Int Skills</h2>
      <div className={styles.statsBox}>
        <Stat label="Arcana" value={stats.arcana} />
        <Stat label="History" value={stats.history} />
        <Stat label="Investigation" value={stats.investigation} />
        <Stat label="Religion" value={stats.religion} />
      </div>
    </div>
  );
};

export default IntSkills;
