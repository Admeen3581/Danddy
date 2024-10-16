import React, { useState } from 'react';
import './CharacterCreation.css';
import useLocalStore from '@/utils/store';

interface AbilityScoresProps {
    onMethodSelect: (method: string) => void;
}

const AbilityScoresMenu: React.FC<AbilityScoresProps> = ({ onMethodSelect }) => {
    const { classesJson, setClassesJson } = useLocalStore();
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [stats, setStats] = useState<string[]>(['', '', '', '', '', '']); // Start with empty strings for custom input
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const methods = ["Array", "Custom"];
    const statLabels: string[] = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleMethodChange = (method: string) => {
        setSelectedMethod(method);
        if (method === "Array") {
            setStats([10, 12, 14, 16, 18, 8]);
        } else {
            setStats(['', '', '', '', '', '']); // Start with empty strings for custom method
        }
        setDropdownOpen(false);
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDrop = (index: number) => {
        if (draggedIndex !== null && draggedIndex !== index) {
            const newStats = [...stats];
            const [removed] = newStats.splice(draggedIndex, 1);
            newStats.splice(index, 0, removed);
            setStats(newStats);
        }
        setDraggedIndex(null);
    };

    const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value; // Keep it as a string
        const newStats = [...stats];
        newStats[index] = value; // Set to the input value (which can be empty)
        setStats(newStats);
    };

    const handleConfirm = () => {
        const finalStats = stats.map(stat => (stat ? parseInt(stat, 10) : 0)); // Convert to numbers, defaulting to 0 if empty
        classesJson.stats.strength.value = finalStats[0];
        classesJson.stats.dexterity.value = finalStats[1];
        classesJson.stats.constitution.value = finalStats[2];
        classesJson.stats.intelligence.value = finalStats[3];
        classesJson.stats.wisdom.value = finalStats[4];
        classesJson.stats.charisma.value = finalStats[5];

        console.log(classesJson);
        onMethodSelect(selectedMethod!);
    };

    return (
        <div className="character-creation-container">
            <div className="background-image">
                <div className="sidebar">
                    <h2>Select an Ability Score Method</h2>
                    <hr />
                    <div className="dropdown-container">
                        <button onClick={toggleDropdown}>
                            {selectedMethod || 'Select Method'}
                        </button>
                        {dropdownOpen && (
                            <ul className="dropdown-list">
                                {methods.map((method) => (
                                    <li key={method} onClick={() => handleMethodChange(method)}>
                                        {method}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {selectedMethod === "Array" && (
                        <div>
                            <h3>Array Selection</h3>
                            <div className="stats-container">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className={`draggable-item ${draggedIndex === index ? 'dragging' : ''}`}
                                        draggable
                                        onDragStart={() => handleDragStart(index)}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={() => handleDrop(index)}
                                    >
                                        <span className="stat-label">{statLabels[index]}: </span>
                                        {stat}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedMethod === "Custom" && (
                        <div>
                            <h3>Custom Input</h3>
                            <div className="stats-container">
                                {stats.map((stat, index) => (
                                    <div key={index} className="custom-input-container">
                                        <span className="stat-label">{statLabels[index]}:</span>
                                        <input
                                            type="number"
                                            value={stat}
                                            onChange={(e) => handleCustomInputChange(e, index)}
                                            min={1} // Optional: Set a minimum value for ability scores
                                            placeholder="" // Ensure it starts empty
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="content button">
                        <button onClick={handleConfirm} disabled={!selectedMethod}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AbilityScoresMenu;
