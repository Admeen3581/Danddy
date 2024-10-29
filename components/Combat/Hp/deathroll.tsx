import { useState } from "react";

const DeathComponent = () => {
  const [deathCount, setDeathCount] = useState(0); 
  const [saveCount, setSaveCount] = useState(0);

  const handleSave = () => {
    setSaveCount((prevCount) => prevCount + 1);
  };

  const handleNewDeath = () => {
    setDeathCount((prevCount) => prevCount + 1);
  };


   return (
   <div>
     <h1>You have died</h1>
   </div>
   );
};

export default DeathComponent;