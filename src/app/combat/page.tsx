"use client"

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
import useLocalStore from '@/utils/store';
import { readDatabaseRoute } from "@/utils/httpRequester";
import DiceRoller from "../../../components/Combat/DiceRoller/diceroller";
import './combatComp.css'
import Armor from "../../../components/Combat/Armor/armor";

const Combat = () => {
  const { classesJson, setClassesJson } = useLocalStore();
  readDatabaseRoute("characters/testerCharacterCreation")
    .then((result) => {
      setClassesJson(result)
    })
  

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
    
    <Inventory/>
    <DiceRoller/>
    </div>
   </>
  );
};

export default Combat;
