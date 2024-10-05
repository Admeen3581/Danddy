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
       <!--Add message alert popup when CP-46 merged to main.-->
   </>
  );
};

export default Combat;
