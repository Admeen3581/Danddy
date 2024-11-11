import React from 'react';
import './mapdis.css';

type MapDisProps = {
  selectedMap: string | null;
};

const MapDis: React.FC<MapDisProps> = ({ selectedMap }) => {
  return (
    <div className="MapsDis">
      <h1>Maps Display:</h1>
      {selectedMap ? (
        <img src={selectedMap} alt="Selected map" style={{ width: '100%', height: 'auto' }} />
      ) : (
        <p>Select a map to view</p>
      )}
    </div>
  );
};

export default MapDis;
