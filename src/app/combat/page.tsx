import React from 'react';
import CombatHeader from '../../../PACombatComponents/combatheader/combatheader';
import CombatStats from '../../../PACombatComponents/combatstats/combatstats';
import CombatSkills from '../../../PACombatComponents/combatskills/combatskills';
import CombatBox from '../../../PACombatComponents/combatbox/combatbox';



const Combat = () => {
  return (
   <>
     <CombatHeader />
     <CombatStats />
     <CombatSkills />
     <CombatBox />
   </>
  );
};

export default Combat;
