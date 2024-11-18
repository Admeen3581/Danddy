"use client"

import React, { useState } from 'react';
import './enemycombat.css';
import { Encounter, encounters } from './enemycombat';

const App: React.FC = () => {
  const [selectedEncounter, setSelectedEncounter] = useState<Encounter | null>(null);

  const handleEncounterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const encounterName = event.target.value;
    const encounter = encounters.find(enc => enc.name === encounterName) || null;
    setSelectedEncounter(encounter);
  };

  return (
    <div className="app-container">
      <h1>D&D Encounter Viewer</h1>
      <div className="dropdown-container">
        <label htmlFor="encounter">Select Encounter:</label>
        <select id="encounter" onChange={handleEncounterChange}>
          <option value="">-- Select --</option>
          {encounters.map(enc => (
            <option key={enc.name} value={enc.name}>
              {enc.name}
            </option>
          ))}
        </select>
      </div>

      {selectedEncounter && (
        <div className="encounter-details">
          <h2>Enemies in {selectedEncounter.name}</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>HP</th>
                <th>AC</th>
                <th>Attack</th>
              </tr>
            </thead>
            <tbody>
              {selectedEncounter.enemies.map(enemy => (
                <tr key={enemy.name}>
                  <td>{enemy.name}</td>
                  <td>{enemy.type}</td>
                  <td>{enemy.hp}</td>
                  <td>{enemy.ac}</td>
                  <td>{enemy.attack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
