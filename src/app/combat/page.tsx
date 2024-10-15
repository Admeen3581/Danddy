import SavingThrows from "../../../components/Combat/Saving/savingThrows";
import SensesStats from "../../../components/Combat/Senses/sensesStats";
import DexSkills from "../../../components/Combat/Skills/dexSkills";
import WisSkills from "../../../components/Combat/Skills/wisSkills";
import CharacterStats from "../../../components/Combat/Stats/characterStats";


const Combat = () => {
  return (
   <>
    <CharacterStats/>
    <SavingThrows/>
    <SensesStats/>
    <WisSkills/>
    <DexSkills/>
   </>
  );
};

export default Combat;
