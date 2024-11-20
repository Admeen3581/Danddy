import React, { useState } from 'react';  
import MapDis from './DMMapDisplay/mapdis';   
import './DMMaps/dmmaps.css'; 
import './DMMapDisplay/mapdis.css'; 
import DMButtons from './DMMaps/dmmaps';

type MapItem = {
  name: string;
  filePath: string;
};

const MapViewer: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState<string | null>(null);

  const maps: MapItem[] = [
    { name: 'Map 1: World', filePath: '/maps/map1.png' },
    { name: 'Map 2: Manor', filePath: '/maps/map2.png' },
  ];

  const handleSelectMap = (filePath: string) => {
    console.log('Selected map:', filePath);
    setSelectedMap(filePath);
  };

  return (
    <div>
      <DMButtons maps={maps} onSelectMap={handleSelectMap} />
      <MapDis selectedMap={selectedMap} />
    </div>
  );
};

export default MapViewer;
