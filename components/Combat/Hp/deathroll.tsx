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
      <div>
        <h2>Death Count: {deathCount}</h2>
        <h2>Save Count: {saveCount}</h2>
      </div>
      <button onClick={handleSave} style={{ margin: '5px' }}>
        Save
      </button>
      <button onClick={handleNewDeath} style={{ margin: '5px' }}>
        Count Another Death
      </button>
    </div>
   );
};

export default DeathComponent;