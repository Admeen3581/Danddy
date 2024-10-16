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
            <p>Customize your character further!</p>
            
            <div className="custom-input-container">
                <label>Name:</label>
                <input type="text" placeholder="Enter character name" />
            </div>

            <div className="custom-input-container">
                <label>HP:</label>
                <input 
                    type="number" 
                    value={hp} 
                    onChange={(e) => setHp(e.target.value)} 
                    placeholder="Enter HP" 
                />
            </div>

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

            <div className="content button">
                <button onClick={handleFinish}>
                    Finish Character
                </button>
            </div>
        </div>
    );
};

export default FinishingTouchesMenu;
