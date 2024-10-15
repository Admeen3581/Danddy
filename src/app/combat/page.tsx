import SavingThrows from "../../../components/Combat/Saving/savingThrows";
import SensesStats from "../../../components/Combat/Senses/sensesStats";
import WisSkills from "../../../components/Combat/Skills/wisSkills";
import CharacterStats from "../../../components/Combat/Stats/characterStats";


const Combat = () => {
  return (
   <>
    <CharacterStats/>
    <SavingThrows/>
    <SensesStats/>
    <WisSkills/>
   </>
  );
};

export default Combat;
