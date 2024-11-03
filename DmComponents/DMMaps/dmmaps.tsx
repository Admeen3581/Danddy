import React from 'react';
import './dmmaps.css';

type DMButtonsProps = {
  maps: { name: string; filePath: string }[];
  onSelectMap: (filePath: string) => void;
};

const DMButtons: React.FC<DMButtonsProps> = ({ maps = [], onSelectMap }) => {
  return (
    <div className="MapsBox">
      <h1>Maps:</h1>
      <div className="scrollable-content">
        {maps.map((map) => (
          <p key={map.name} onClick={() => onSelectMap(map.filePath)} style={{ cursor: 'pointer' }}>
            {map.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DMButtons;
