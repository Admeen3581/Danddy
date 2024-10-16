import React, { useState } from 'react';
import './CharacterCreation.css'; // Ensure your CSS file is imported

interface AbilityScoresProps {
    onMethodSelect: (method: string) => void;
}

const AbilityScoresMenu: React.FC<AbilityScoresProps> = ({ onMethodSelect }) => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [stats, setStats] = useState<number[]>([0, 0, 0, 0, 0, 0]);
    const [points, setPoints] = useState(27);
    const [customStats, setCustomStats] = useState<number[]>([0, 0, 0, 0, 0, 0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const methods = ["Array", "Point Buy", "Roll", "Custom"];

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleMethodChange = (method: string) => {
        setSelectedMethod(method);
        setStats([0, 0, 0, 0, 0, 0]);
        setCustomStats([0, 0, 0, 0, 0, 0]);
        setPoints(27);
        setDropdownOpen(false);
    };

    const handleArrayInput = (index: number, value: number) => {
        const newStats = [...stats];
        newStats[index] = value;
        setStats(newStats);
    };

    const handlePointBuyChange = (index: number, value: number) => {
        if (value < 1 || value > 20) return;
        const cost = calculatePointBuyCost(value);
        const currentStat = stats[index];
        const currentCost = calculatePointBuyCost(currentStat);
        if (points + currentCost >= cost) {
            const newStats = [...stats];
            newStats[index] = value;
            setStats(newStats);
            setPoints(points + currentCost - cost);
        }
    };

    const calculatePointBuyCost = (score: number) => {
        if (score <= 13) return score - 8;
        if (score <= 15) return score - 9;
        return 13;
    };

    const handleRoll = () => {
        const rolledStats = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6) + 1);
        setStats(rolledStats);
    };

    const handleCustomInput = (index: number, value: number) => {
        const newCustomStats = [...customStats];
        newCustomStats[index] = value;
        setCustomStats(newCustomStats);
    };

    const handleConfirm = () => {
        console.log(`Selected Method: ${selectedMethod}`);
        if (selectedMethod === "Point Buy") {
            console.log(`Ability Scores: ${stats.join(', ')} (Points Left: ${points})`);
        } else {
            console.log(`Ability Scores: ${selectedMethod === "Custom" ? customStats.join(', ') : stats.join(', ')}`);
        }
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
                            <h3>Enter Your Stats (Array)</h3>
                            {stats.map((stat, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    value={stat}
                                    onChange={(e) => handleArrayInput(index, Number(e.target.value))}
                                    min="1"
                                    max="20"
                                />
                            ))}
                        </div>
                    )}

                    {selectedMethod === "Point Buy" && (
                        <div>
                            <h3>Point Buy (27 Points)</h3>
                            <p>Points left: {points}</p>
                            {stats.map((stat, index) => (
                                <div key={index}>
                                    <input
                                        type="number"
                                        value={stat}
                                        onChange={(e) => handlePointBuyChange(index, Number(e.target.value))}
                                        min="8"
                                        max="15"
                                    />
                                    <span> (Cost: {calculatePointBuyCost(stat)})</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedMethod === "Roll" && (
                        <div>
                            <h3>Roll Your Stats</h3>
                            <button onClick={handleRoll}>Roll for Stats</button>
                            <p>Rolled Stats: {stats.join(', ')}</p>
                        </div>
                    )}

                    {selectedMethod === "Custom" && (
                        <div>
                            <h3>Custom Stats</h3>
                            {customStats.map((stat, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    value={stat}
                                    onChange={(e) => handleCustomInput(index, Number(e.target.value))}
                                    min="1"
                                    max="20"
                                />
                            ))}
                        </div>
                    )}

                    <div className="confirm-button-container">
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
