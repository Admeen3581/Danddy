'use client'

import React, { useState } from 'react';
import './conditions.css'

enum Condition {
    Blinded = 'Blinded',
    Charmed = 'Charmed',
    Deafened = 'Deafened',
    Frightened = 'Frightened',
    Grappled = 'Grappled',
    Incapacitated = 'Incapacitated',
    Invisible = 'Invisible',
    Paralyzed = 'Paralyzed',
    Petrified = 'Petrified',
    Poisoned = 'Poisoned',
    Prone = 'Prone',
    Restrained = 'Restrained',
    Stunned = 'Stunned',
    Unconscious = 'Unconscious',
    Exhaustion = 'Exhaustion',
}

// React component to manage player conditions
const PlayerConditions: React.FC = () => {
    const [conditions, setConditions] = useState<Condition[]>([]);
    const [newCondition, setNewCondition] = useState<Condition | ''>('');

    // Add a new condition
    const addCondition = () => {
        if (newCondition && !conditions.includes(newCondition)) {
            setConditions([...conditions, newCondition]);
        }
        setNewCondition(''); // Reset the input
    };

    // Remove a condition
    const removeCondition = (conditionToRemove: Condition) => {
        setConditions(conditions.filter(condition => condition !== conditionToRemove));
    };

    return (
        <div className="conditions-container">
            <h2>Player Conditions</h2>

            {/* Display current conditions */}
            <ul>
                {conditions.length > 0 ? (
                    conditions.map(condition => (
                        <li key={condition}>
                            {condition}
                            <button onClick={() => removeCondition(condition)}>Remove</button>
                        </li>
                    ))
                ) : (
                    <li>No conditions</li>
                )}
            </ul>

            {/* Dropdown to add new conditions */}
            <div>
                <select
                    id="conditionSelect"
                    value={newCondition}
                    onChange={e => setNewCondition(e.target.value as Condition)}
                >
                    <option value="">Select a condition</option>
                    {Object.values(Condition).map(condition => (
                        <option key={condition} value={condition}>
                            {condition}
                        </option>
                    ))}
                </select>
                <button onClick={addCondition} disabled={!newCondition}>
                    Add Condition
                </button>
            </div>
        </div>
    );
};

export default PlayerConditions;
