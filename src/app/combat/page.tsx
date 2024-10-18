import SavingThrows from "../../../components/Combat/Saving/savingThrows";
import SensesStats from "../../../components/Combat/Senses/sensesStats";
import IntSkills from "../../../components/Combat/Skills/intSkills";
import DexSkills from "../../../components/Combat/Skills/dexSkills";
import WisSkills from "../../../components/Combat/Skills/wisSkills";
import CharacterStats from "../../../components/Combat/Stats/characterStats";
import ChaSkills from "../../../components/Combat/Skills/chaSkills";
import StrSkills from "../../../components/Combat/Skills/strSkills";
import HPManager from "../../../components/Combat/Hp/characterHp";


const Combat = () => {
  return (
   <>
    <CharacterStats/>
    <SavingThrows/>
    <SensesStats/>
    <WisSkills/>
    <DexSkills/>
    <IntSkills/>
    <ChaSkills/>
    <StrSkills/>
    <HPManager/>
   </>
  );
};

export default Combat;
