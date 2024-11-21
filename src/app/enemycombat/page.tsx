"use client"

import React, { useEffect, useState } from 'react';
import './enemycombat.css';
import { Encounter, setUpEncouters } from './enemycombat';
import { readDatabaseRoute } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';
import { getModifier } from '@/utils/characterJsonFunctions';

const EnemyCombat: React.FC = () => {
  const [encounters, setEncounters] = useState<Encounter[]>([]); // State to store encounters
  const [selectedEncounter, setSelectedEncounter] = useState<Encounter | null>(null);
  const [openEnemy, setOpenEnemy] = useState<string | null>(null);
  const { roomId } = useLocalStore();
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
  const [showNames, setShowNames] = useState<boolean>(false); // State to control name list visibility
  const [initiativeNames, setInitiativeNames] = useState<string[]>([]); // State for names list

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

  const handleRollInitiative = () => {
    // Example names for initiative
    const names = [
      "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah", "Ivy", "Jack"
    ];
    setInitiativeNames(names); // Set the names to the state
    setShowNames(true); // Make the names list visible
  };

  return (
    <div className="enemy-combat-container">
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
        <p>Loading encounters...</p>
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
                          <p>
                            <strong><u> Enemy Details </u></strong><br />
                            <strong> Name: </strong>{enemy.name}<br />
                            <strong> Count: </strong>x{enemy.count}<br />
                            <strong> AC: </strong>{enemy.armor_class[0]["value"]} <br />
                            <strong> Hit Points: </strong>{enemy.hit_points} <br />
                            <strong> Speed: </strong>{enemy.speed["walk"]} <br />
                            <strong> ---------------------------------------------------- </strong><br />
                            <strong><u> Stats </u></strong><br />
                            <strong> Strength: </strong>{getModifier(enemy.strength) > -1 ? "+" : ""}{getModifier(enemy.strength)} ({enemy.strength})<br />
                            <strong> Dexterity: </strong>{getModifier(enemy.dexterity) > -1 ? "+" : ""}{getModifier(enemy.dexterity)} ({enemy.dexterity})<br />
                            <strong> Constitution: </strong>{getModifier(enemy.constitution) > -1 ? "+" : ""}{getModifier(enemy.constitution)} ({enemy.constitution})<br />
                            <strong> Intelligence: </strong>{getModifier(enemy.intelligence) > -1 ? "+" : ""}{getModifier(enemy.intelligence)} ({enemy.intelligence})<br />
                            <strong> Wisdom: </strong>{getModifier(enemy.wisdowm) > -1 ? "+" : ""}{getModifier(enemy.wisdowm)} ({enemy.wisdowm})<br />
                            <strong> Charisma: </strong>{getModifier(enemy.charisma) > -1 ? "+" : ""}{getModifier(enemy.charisma)} ({enemy.charisma})<br />
                            <strong> ---------------------------------------------------- </strong><br />
                            <strong><u> Proficiencies </u></strong><br />
                            {enemy.proficiencies && enemy.proficiencies.length > 0 ? (
                              <ul>
                                {enemy.proficiencies.map((proficiency, index) => (
                                  <li key={index}>
                                    <strong>{proficiency["proficiency"].name}:</strong> {proficiency.value}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>No proficiencies available.</p>
                            )}
                            <strong> ---------------------------------------------------- </strong><br />
                            <strong><u> Senses </u></strong><br />
                            {enemy.senses ? (
                              <ul>
                                {Object.entries(enemy.senses).map(([sense, value], index) => (
                                  <li key={index}>
                                    <strong>{sense.charAt(0).toUpperCase() + sense.slice(1).replace("_", " ")}:</strong> {value}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>No senses available.</p>
                            )}
                            <strong> ---------------------------------------------------- </strong><br />
                            <strong><u> Special Abilities </u></strong><br />---<br />
                            {enemy.special_abilities && enemy.special_abilities.length > 0 ? (
                              <ul>
                                {enemy.special_abilities.map((ability, index) => (
                                  <li key={index}>
                                    <strong>{ability["name"]}:</strong> {ability["desc"]}
                                    <br />---
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>No actions available.</p>
                            )}
                            <strong> ---------------------------------------------------- </strong><br />
                            <strong><u> Actions </u></strong><br />---<br />
                            {enemy.actions && enemy.actions.length > 0 ? (
                              <ul>
                                {enemy.actions.map((action, index) => (
                                  <li key={index}>
                                    <strong>{action["name"]}:</strong> {action["desc"]}
                                    <br />---
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>No actions available.</p>
                            )}
                          </p>
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

      {/* Sidebar Section */}
      <div className="sidebar">
        <button className="roll-initiative" onClick={handleRollInitiative}>
          Roll Initiative
        </button>

        {/* Show the list of names after initiative roll */}
        {showNames && (
          <div className="initiative-list">
            <h3>Initiative Order:</h3>
            <ul>
              {initiativeNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnemyCombat;
