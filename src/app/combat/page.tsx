import React from 'react';
import CombatHeader from '../../../PACombatComponents/combatheader/combatheader';
import CombatStats from '../../../PACombatComponents/combatstats/combatstats';
import CombatSkills from '../../../PACombatComponents/combatskills/combatskills';



const Combat = () => {
  return (
   <>
     <CombatHeader />
     <CombatStats />
     <CombatSkills />
   </>
  );
};

export default Combat;
