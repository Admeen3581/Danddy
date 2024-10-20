import SavingThrows from "../../../components/Combat/Saving/savingThrows";
import SensesStats from "../../../components/Combat/Senses/sensesStats";
import IntSkills from "../../../components/Combat/Skills/intSkills";
import DexSkills from "../../../components/Combat/Skills/dexSkills";
import WisSkills from "../../../components/Combat/Skills/wisSkills";
import CharacterStats from "../../../components/Combat/Stats/characterStats";
import ChaSkills from "../../../components/Combat/Skills/chaSkills";
import StrSkills from "../../../components/Combat/Skills/strSkills";
import HPManager from "../../../components/Combat/Hp/characterHp";
import PlayerConditions from "../../../components/Combat/Conditions/conditions";
import Inventory from "../../../components/Combat/Inventory/inventory";
import './combatComp.css'

const Combat = () => {
  return (
   <>
    <CharacterStats/>
    <div className="combats-container">
      <div className="throws">
        <SavingThrows/>
        <SensesStats/>
      </div>

    <WisSkills/>
    <DexSkills/>
    <IntSkills/>
    <ChaSkills/>
    <StrSkills/>
    <HPManager/>  
    <PlayerConditions/>
    <Inventory/>
    </div>
   </>
  );
};

export default Combat;
