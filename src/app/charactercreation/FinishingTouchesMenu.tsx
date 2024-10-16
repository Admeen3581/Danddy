import React, { useState } from 'react';
import './CharacterCreation.css';

const FinishingTouchesMenu = () => {
    const [hp, setHp] = useState('');
    const [proficiency, setProficiency] = useState('');
    const [spells, setSpells] = useState(['Fireball', 'Heal', 'Lightning Bolt']);
    const [selectedSpell, setSelectedSpell] = useState('');
    const [inventory, setInventory] = useState(['Sword', 'Shield', 'Potion']);
    const [selectedItem, setSelectedItem] = useState('');

    const handleFinish = () => {
        alert('Character Created!');
    };

    return (
        <div className="sidebar">
            <h2>Finishing Touches</h2>
            <hr />
            <p>Bring your Character to Life!</p>

            <div className="section">
                <h3>Basic Information</h3>
                <hr />
                <div className="custom-input-container">
                    <span className="stat-label">Name:</span>
                    <input type="text" placeholder="Enter name" />
                </div>

                <div className="custom-input-container">
                    <span className="stat-label">HP:</span>
                    <input 
                        type="number" 
                        value={hp} 
                        onChange={(e) => setHp(e.target.value)} 
                        min={1} // Optional: Set a minimum value
                        placeholder="Enter HP" 
                    />
                </div>
            </div>

            <div className="section">
                <h3>Character Attributes</h3>
                <hr />
                <div className="custom-input-container">
                    <label>Proficiency:</label>
                    <select 
                        value={proficiency} 
                        onChange={(e) => setProficiency(e.target.value)} 
                    >
                        <option value="">Select Proficiency</option>
                        <option value="+2">+2</option>
                        <option value="+3">+3</option>
                        <option value="+4">+4</option>
                    </select>
                </div>
            </div>

            <div className="section">
                <h3>Spells</h3>
                <hr />
                <div className="custom-input-container">
                    <label>Spell:</label>
                    <select 
                        value={selectedSpell} 
                        onChange={(e) => setSelectedSpell(e.target.value)} 
                    >
                        <option value="">Select Spell</option>
                        {spells.map((spell, index) => (
                            <option key={index} value={spell}>{spell}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="section">
                <h3>Inventory</h3>
                <hr />
                <div className="custom-input-container">
                    <label>Inventory:</label>
                    <select 
                        value={selectedItem} 
                        onChange={(e) => setSelectedItem(e.target.value)} 
                    >
                        <option value="">Select Item</option>
                        {inventory.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="content button">
                <button onClick={handleFinish}>
                    Finish Character
                </button>
            </div>
        </div>
    );
};

export default FinishingTouchesMenu;
