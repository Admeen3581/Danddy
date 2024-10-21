import Stat from "../../../CharSheetsCompon/CSStats/Stat";
import styles from './dexSkills.module.css'

const IntSkills = () => {
  const stats = {
    acrobat: 11,
    sleight: 10,
    stealth: 10
  };

  return (
    <div className={styles.stats}>
      <h2 className={styles.statsTitle}>Dex Skills</h2>
      <div className={styles.statsBox}>
        <Stat label="Acrobatics" value={stats.acrobat} />
        <Stat label="Sleight Of Hand" value={stats.sleight} />
        <Stat label="Stealth" value={stats.stealth} />
      </div>
    </div>
  );
};

export default IntSkills;
