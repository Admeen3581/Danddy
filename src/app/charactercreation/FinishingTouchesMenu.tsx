import React, { useEffect, useState } from 'react';
import './CharacterCreation.css';
import { getDnDAPI } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';

const FinishingTouchesMenu = () => {
    const { classesJson } = useLocalStore();
    const [hp, setHp] = useState('');
    const [selectedProficiencies, setSelectedProficiencies] = useState([]);
    const [proficiencyChoices, setProficiencyChoices] = useState([]);
    const [cantrips, setCantrips] = useState([]);
    const [level1Spells, setLevel1Spells] = useState([]);
    const [selectedCantrips, setSelectedCantrips] = useState([]);
    const [selectedLevel1Spells, setSelectedLevel1Spells] = useState([]);
    const [inventory, setInventory] = useState(['Sword', 'Shield', 'Potion']);
    const [selectedItem, setSelectedItem] = useState('');

    const [dropdownOpen, setDropdownOpen] = useState({
        proficiency: false,
        cantrip: false,
        level1Spell: false,
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

                // Fetch spells for the class
                if (response && response.spellcasting) {
                    const spellsResponse = await getDnDAPI(`classes/${classesJson.class.toLowerCase()}/spells`);
                    if (spellsResponse && spellsResponse.results) {
                        const cantrips = spellsResponse.results.filter(spell => spell.level === 0);
                        const level1 = spellsResponse.results.filter(spell => spell.level === 1);
                        setCantrips(cantrips.map(spell => spell.name));
                        setLevel1Spells(level1.map(spell => spell.name));
                    }
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
            setSelectedProficiencies(newSelections.filter(p => p !== proficiency));
        } else if (newSelections.length < maxSelections) {
            newSelections.push(proficiency);
            setSelectedProficiencies(newSelections);
        } else {
            alert(`You can only select ${maxSelections} proficiencies.`);
        }
    };

    const handleCantripSelect = (cantrip) => {
        const newSelections = [...selectedCantrips];

        if (newSelections.includes(cantrip)) {
            setSelectedCantrips(newSelections.filter(c => c !== cantrip));
        } else {
            newSelections.push(cantrip);
            setSelectedCantrips(newSelections);
        }
    };

    const handleLevel1SpellSelect = (spell) => {
        const newSelections = [...selectedLevel1Spells];

        if (newSelections.includes(spell)) {
            setSelectedLevel1Spells(newSelections.filter(s => s !== spell));
        } else {
            newSelections.push(spell);
            setSelectedLevel1Spells(newSelections);
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
                            {selectedProficiencies.length > 0 ? `${selectedProficiencies.join(', ')}` : 'Select Proficiencies'}
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

            {/* Cantrips section */}
            {cantrips.length > 0 && (
                <div className="section">
                    <h3>Cantrips</h3>
                    <hr />
                    <div className="dropdown-container">
                        <button onClick={() => toggleDropdown('cantrip')}>
                            {selectedCantrips.length > 0 ? `${selectedCantrips.join(', ')}` : 'Select Cantrips'}
                        </button>
                        {dropdownOpen.cantrip && (
                            <ul className="dropdown-list">
                                {cantrips.map((cantrip, index) => (
                                    <li key={index} onClick={() => handleCantripSelect(cantrip)}>
                                        {cantrip} {selectedCantrips.includes(cantrip) && '✓'}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}

            {/* Level 1 Spells section */}
            {level1Spells.length > 0 && (
                <div className="section">
                    <h3>Level 1 Spells</h3>
                    <hr />
                    <div className="dropdown-container">
                        <button onClick={() => toggleDropdown('level1Spell')}>
                            {selectedLevel1Spells.length > 0 ? `${selectedLevel1Spells.join(', ')}` : 'Select Level 1 Spells'}
                        </button>
                        {dropdownOpen.level1Spell && (
                            <ul className="dropdown-list">
                                {level1Spells.map((spell, index) => (
                                    <li key={index} onClick={() => handleLevel1SpellSelect(spell)}>
                                        {spell} {selectedLevel1Spells.includes(spell) && '✓'}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}

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
