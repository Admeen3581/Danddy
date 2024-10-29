import { useState } from 'react';

interface DeathComponentProps {
  onReset: () => void;
}

const DeathComponent: React.FC<DeathComponentProps> = ({ onReset }) => {
  const [deathCount, setDeathCount] = useState(1);
  const [saveCount, setSaveCount] = useState(0);

  const handleSave = () => {
    setSaveCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 3) {
        onReset();
      }
      return newCount;
    });
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