import Stat from "../../../CharSheetsCompon/CSStats/Stat";
import styles from './chaSkills.module.css'

const ChaSkills = () => {
  const stats = {
    deception: 11,
    intimidation: 10,
    performance: 10,
    persuasion: 10
  };

  return (
    <div className={styles.stats}>
      <h2 className={styles.statsTitle}>Cha Skills</h2>
      <div className={styles.statsBox}>
        <Stat label="Deception" value={stats.deception} />
        <Stat label="Intimidation" value={stats.intimidation} />
        <Stat label="Performance" value={stats.performance} />
        <Stat label="Persuasion" value={stats.persuasion} />
      </div>
    </div>
  );
};

export default ChaSkills;
