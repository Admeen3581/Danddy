import Stat from "../../../CharSheetsCompon/CSStats/Stat";
import savingStyles from './savingThrows.module.css'

const SavingThrows = () => {
  const stats = {
    strength: "+7",
    dex: "-1",
    constitution: "+5",
    int: "0",
    wis: "+1",
    cha: "-1"
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
