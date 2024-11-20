'use client'

import React, { useEffect, useState } from 'react';
import './enemycombat.css';
import { Encounter, setUpEncouters } from './enemycombat';
import { readDatabaseRoute } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';

const EnemyCombat: React.FC = () => {
  const [encounters, setEncounters] = useState<Encounter[]>([]); // State to store encounters
  const [selectedEncounter, setSelectedEncounter] = useState<Encounter | null>(null);
  const [openEnemy, setOpenEnemy] = useState<string | null>(null);
  const { roomId } = useLocalStore();
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator

  useEffect(() => {
    // Fetch encounters and update the state
    readDatabaseRoute(`rooms/${roomId}/encounters`).then(
      (result) => {
        const loadedEncounters = setUpEncouters(result);
        setEncounters(loadedEncounters); // Set encounters into state
        setLoading(false); // Hide loading once data is fetched
      }
    );
  }, [roomId]); // Re-run this effect when roomId changes

  const handleEncounterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const encounterName = event.target.value;
    const encounter = encounters.find(enc => enc.name === encounterName) || null;
    setSelectedEncounter(encounter);
  };

  const handleRowClick = (enemyName: string) => {
    if (openEnemy === enemyName) {
      setOpenEnemy(null);
    } else {
      setOpenEnemy(enemyName);
    }
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

      {loading ? (
        <p>Loading encounters...</p> // Show loading message while data is being fetched
      ) : (
        selectedEncounter && (
          <div className="encounter-details">
            <h2>Enemies in {selectedEncounter.name}</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>HP</th>
                  <th>AC</th>
                  <th>CR</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selectedEncounter.enemies.map(enemy => (
                  <React.Fragment key={enemy.name}>
                    <tr onClick={() => handleRowClick(enemy.name)}>
                      <td>{enemy.name}</td>
                      <td>{enemy.type}</td>
                      <td>{enemy.hit_points}</td>
                      <td>{enemy.armor_class[0]["value"]}</td>
                      <td>{enemy.challenge_rating}</td>
                      <td className="expandable">
                        <span className={`arrow ${openEnemy === enemy.name ? 'open' : ''}`}>
                          {openEnemy === enemy.name ? '▲' : '▼'}
                        </span>
                      </td>
                    </tr>
                    <tr className={`details-row ${openEnemy === enemy.name ? 'open' : ''}`}>
                      <td colSpan={6}>
                        <div>
                          <strong>Details:</strong>
                          <p>Full character page with additional information about {enemy.name} coming soon.</p>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default EnemyCombat;
