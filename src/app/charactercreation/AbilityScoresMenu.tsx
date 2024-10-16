import React, { useState } from 'react';

interface AbilityScoresProps {
    onMethodSelect: (method: string) => void;
    selectedMethod: string;
}

const AbilityScoresMenu: React.FC<AbilityScoresProps> = ({ onMethodSelect, selectedMethod }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const methods = ["Array", "Point Buy", "Roll", "Custom"];

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleMethodChange = (method: string) => {
        onMethodSelect(method);
        setDropdownOpen(false);
    };

    return (
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
        </div>
    );
};

export default AbilityScoresMenu;
