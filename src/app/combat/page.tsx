import SavingThrows from "../../../components/Combat/Saving/savingThrows";
import SensesStats from "../../../components/Combat/Senses/sensesStats";
import CharacterStats from "../../../components/Combat/Stats/characterStats";


const Combat = () => {
  return (
   <>
    <CharacterStats/>
    <SavingThrows/>
    <SensesStats/>
   </>
  );
};

export default Combat;
