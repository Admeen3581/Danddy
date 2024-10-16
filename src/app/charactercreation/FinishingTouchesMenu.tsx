import React, { useEffect, useState } from 'react';
import './CharacterCreation.css';
import { getDnDAPI } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';

const FinishingTouchesMenu = () => {
    const { classesJson } = useLocalStore();
    const [hp, setHp] = useState('');
    const [selectedProficiencies, setSelectedProficiencies] = useState([]);
    const [proficiencyChoices, setProficiencyChoices] = useState([]);
    const [spells, setSpells] = useState(['Fireball', 'Heal', 'Lightning Bolt']);
    const [selectedSpell, setSelectedSpell] = useState('');
    const [inventory, setInventory] = useState(['Sword', 'Shield', 'Potion']);
    const [selectedItem, setSelectedItem] = useState('');

    const [dropdownOpen, setDropdownOpen] = useState({
        proficiency: false,
        spell: false,
        inventory: false,
    });

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await getDnDAPI(`classes/${classesJson.class.toLowerCase()}`);
                if (response && response.proficiency_choices) {
                    const choices = response.proficiency_choices.map(choice => ({
                        choose: choice.choose,
                        options: choice.from.options.map(option => option.item.name.replace("Skill: ", ""))
                    }));
                    setProficiencyChoices(choices);
                }
            } catch (error) {
                console.error('Error fetching class data:', error);
            }
        };

        fetchClassData();
    }, [classesJson.class]);

    const handleProficiencySelect = (proficiency) => {
        const newSelections = [...selectedProficiencies];
        const maxSelections = proficiencyChoices[0]?.choose;

        if (newSelections.includes(proficiency)) {
            // Deselect proficiency
            setSelectedProficiencies(newSelections.filter(p => p !== proficiency));
        } else if (newSelections.length < maxSelections) {
            // Select proficiency if under limit
            newSelections.push(proficiency);
            setSelectedProficiencies(newSelections);
        } else {
            alert(`You can only select ${maxSelections} proficiencies.`);
        }
    };

    const handleFinish = () => {
        alert('Character Created!');
    };

    const toggleDropdown = (type) => {
        setDropdownOpen(prev => ({ ...prev, [type]: !prev[type] }));
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
                        min={1}
                        placeholder="Enter HP"
                    />
                </div>
            </div>

            <div className="section">
                <h3>Character Attributes</h3>
                <hr />
                {proficiencyChoices.map((choice, index) => (
                    <div key={index} className="dropdown-container">
                        <h4>Choose {choice.choose}</h4>
                        <button onClick={() => toggleDropdown('proficiency')}>
                            {selectedProficiencies.length > 0 ? 'Proficiencies Selected' : 'Select Proficiencies'}
                        </button>
                        {dropdownOpen.proficiency && (
                            <ul className="dropdown-list">
                                {choice.options.map((option, idx) => (
                                    <li key={idx} onClick={() => handleProficiencySelect(option)}>
                                        {option} {selectedProficiencies.includes(option) && '✓'}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

            <div className="section">
                <h3>Spells</h3>
                <hr />
                <div className="dropdown-container">
                    <button onClick={() => toggleDropdown('spell')}>
                        {selectedSpell || 'Select Spell'}
                    </button>
                    {dropdownOpen.spell && (
                        <ul className="dropdown-list">
                            {spells.map((spell, index) => (
                                <li key={index} onClick={() => setSelectedSpell(spell)}>
                                    {spell}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="section">
                <h3>Inventory</h3>
                <hr />
                <div className="dropdown-container">
                    <button onClick={() => toggleDropdown('inventory')}>
                        {selectedItem || 'Select Item'}
                    </button>
                    {dropdownOpen.inventory && (
                        <ul className="dropdown-list">
                            {inventory.map((item, index) => (
                                <li key={index} onClick={() => setSelectedItem(item)}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
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
