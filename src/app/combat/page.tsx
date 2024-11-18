"use client"

import SavingThrows from "../../components/combat/Saving/savingThrows";
import SensesStats from "../../components/combat/Senses/sensesStats";
import IntSkills from "../../components/combat/Skills/intSkills";
import DexSkills from "../../components/combat/Skills/dexSkills";
import WisSkills from "../../components/combat/Skills/wisSkills";
import CharacterStats from "../../components/combat/Stats/characterStats";
import ChaSkills from "../../components/combat/Skills/chaSkills";
import StrSkills from "../../components/combat/Skills/strSkills";
import HPManager from "../../components/combat/Hp/characterHp";
import PlayerConditions from "../../components/combat/Conditions/conditions";
import Inventory from "../../components/combat/Inventory/inventory";
import useLocalStore from '@/utils/store';
import { readDatabaseRoute } from "@/utils/httpRequester";
import DiceRoller from "../../components/combat/DiceRoller/diceroller";
import './combatComp.css'
import Armor from "../../components/combat/Armor/armor";
import Actions from "../../components/combat/Actions/actions";

const Combat = () => {
  const { classesJson, setClassesJson } = useLocalStore();
  if(classesJson.user_id == ""){
    readDatabaseRoute("characters/testerCharacterCreation")
    .then((result) => {
      setClassesJson(result)
    })
  }

  return (
   <>
    <div className="top-container">
    <HPManager/>  
    <Armor/>
    <PlayerConditions/>
    </div>
    <CharacterStats/>
    <div className="combats-container">
      <div className="throws">
        <SavingThrows/>
        <SensesStats/>
      </div>

    <div className="skills-section">
      <StrSkills/>
      <DexSkills/>
      <IntSkills/>
      <WisSkills/>
      <ChaSkills/>
    </div>
    
    <div className="actions">
      <Inventory/>
      <Actions/>
    </div>
    <DiceRoller/>
    </div>
   </>
  );
};

export default Combat;
