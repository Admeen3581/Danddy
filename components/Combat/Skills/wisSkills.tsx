import Stat from "../../../CharSheetsCompon/CSStats/Stat";
import styles from './wisSkills.module.css'

const WisSkills = () => {
  const stats = {
    animal: 11,
    insight: 10,
    medicine: 10,
    perception: 10,
    survival: 10
  };

  return (
    <div className={styles.stats}>
      <h2 className={styles.statsTitle}>Wis Skills</h2>
      <div className={styles.statsBox}>
        <Stat label="Animal Handling" value={stats.animal} />
        <Stat label="Insight" value={stats.insight} />
        <Stat label="Medicine" value={stats.medicine} />
        <Stat label="Perception" value={stats.perception} />
        <Stat label="Survival" value={stats.survival} />
      </div>
    </div>
  );
};

export default WisSkills;
