import React, { useState } from 'react';
import './CharacterCreation.css'; // Ensure your CSS file is imported

interface AbilityScoresProps {
    onMethodSelect: (method: string) => void;
}

const AbilityScoresMenu: React.FC<AbilityScoresProps> = ({ onMethodSelect }) => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [stats, setStats] = useState<number[]>([10, 12, 14, 16, 18, 8]); // Example initial values
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const methods = ["Array", "Point Buy", "Roll", "Custom"];

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleMethodChange = (method: string) => {
        setSelectedMethod(method);
        setStats([10, 12, 14, 16, 18, 8]); // Reset stats or adjust as needed
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
        setDraggedIndex(null); // Reset dragged index after drop
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
                            <h3>Your Stats (Array)</h3>
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
                                        {stat}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="confirm-button-container">
                        <button onClick={() => onMethodSelect(selectedMethod!)} disabled={!selectedMethod}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AbilityScoresMenu;
