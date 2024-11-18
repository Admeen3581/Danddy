import React, { useEffect, useState } from 'react';
import './CharacterCreation.css';
import { getDnDAPI, updateDatabaseRoute } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';
import { findSkillInJson, setSkillInJson } from '@/utils/characterJsonFunctions';

const FinishingTouchesMenu = () => {
    const { classesJson, setClassesJson } = useLocalStore();
    const [hp, setHp] = useState('');
    const [selectedProficiencies, setSelectedProficiencies] = useState([]);
    const [proficiencyChoices, setProficiencyChoices] = useState([]);
    const [cantrips, setCantrips] = useState([]);
    const [level1Spells, setLevel1Spells] = useState([]);
    const [selectedCantrips, setSelectedCantrips] = useState([]);
    const [selectedLevel1Spells, setSelectedLevel1Spells] = useState([]);
    const [inventoryOptions, setInventoryOptions] = useState([
        ['Sword', 'Axe'],
        ['Shield', 'Bow'],
        ['Potion', 'Herb']
    ]);
    const [selectedItems, setSelectedItems] = useState([]);

    const [dropdownOpen, setDropdownOpen] = useState({
        proficiency: false,
        cantrip: false,
        level1Spell: false,
        inventory: false,
    });

    const [cantripLimit, setCantripLimit] = useState(0);
    const [level1SpellLimit, setLevel1SpellLimit] = useState(0);

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

                    switch(classesJson.class.toLowerCase()){
                        case "bard":
                            setCantripLimit(2);
                            setLevel1SpellLimit(4);
                            break;
                        case "cleric":
                            setCantripLimit(3);
                            setLevel1SpellLimit(4);
                            break;
                        case "druid":
                            setCantripLimit(2);
                            setLevel1SpellLimit(4);
                            break;
                        case "paladin":
                            setCantripLimit(1);
                            setLevel1SpellLimit(2);
                            break;
                        case "ranger":
                            setCantripLimit(1);
                            setLevel1SpellLimit(2);
                            break;
                        case "sorcerer":
                            setCantripLimit(4);
                            setLevel1SpellLimit(2);
                            break;
                        case "warlock":
                            setCantripLimit(2);
                            setLevel1SpellLimit(2);
                            break;
                        case "wizard":
                            setCantripLimit(3);
                            setLevel1SpellLimit(4);
                            break;
                    }
                }

                if (response && response.starting_equipment_options) {
                    const options = response.starting_equipment_options.map(option => {
                        var description : string = option.desc;
                        if(!description.includes("or")) return [description, "nothing"];
                        description = description.substring(3)
                        const items = description.split(" or (b)").map(item => item.trim()).filter(item => item);
                        return items;
                    });
                    setInventoryOptions(options);
                    console.log(inventoryOptions)
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
        } else if (newSelections.length < cantripLimit) {
            newSelections.push(cantrip);
            setSelectedCantrips(newSelections);
        } else {
            alert(`You can only select ${cantripLimit} cantrip(s).`);
        }
    };

    const handleLevel1SpellSelect = (spell) => {
        const newSelections = [...selectedLevel1Spells];

        if (newSelections.includes(spell)) {
            setSelectedLevel1Spells(newSelections.filter(s => s !== spell));
        } else if (newSelections.length < level1SpellLimit) {
            newSelections.push(spell);
            setSelectedLevel1Spells(newSelections);
        } else {
            alert(`You can only select ${level1SpellLimit} level 1 spell(s).`);
        }
    };

    const handleItemSelect = (item, rowIndex) => {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[rowIndex] = item; // Select item for this row
        setSelectedItems(newSelectedItems);
    };

    const handleFinish = () => {
        //HP
        classesJson.health.current_health = parseInt(hp);
        classesJson.health.max_health = classesJson.health.current_health;
        //Prof
        for(var prof in selectedProficiencies){
            setSkillInJson(selectedProficiencies[prof], classesJson, true)
        }
        //Invetory
        classesJson.inventory = selectedItems
        //Spell
        classesJson.spells = selectedCantrips.concat(selectedLevel1Spells)

        alert('Character Created!');
        setClassesJson(classesJson)
        updateDatabaseRoute("characters/testerCharacterCreation", classesJson);
        console.log(classesJson)
    };

    const toggleDropdown = (type) => {
        setDropdownOpen(prev => ({ ...prev, [type]: !prev[type] }));
    };

    return (
        <div className="sidebar">
            <div className='sidebar-content'>
            <h2>Finishing Touches</h2>
            <hr />
            <p>Bring your Character to Life!</p>

            <div className="section">
                <h3>Basic Information</h3>
                <hr />
                <div className="custom-input-container">
                    <span className="stat-label">Name:</span>
                    <input 
                        type="text" 
                        onChange={(e) => classesJson.name = e.target.value}
                        placeholder="Enter name" />
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
                <div className="dropdown-container">
                    <h4>Choose {proficiencyChoices[0]?.choose}</h4>
                    <button onClick={() => toggleDropdown('proficiency')}>
                        {selectedProficiencies.length > 0 ? `${selectedProficiencies.join(', ')}` : 'Select Proficiencies'}
                    </button>
                    {dropdownOpen.proficiency && (
                        <ul className="dropdown-list">
                            {proficiencyChoices[0]?.options.map((option, idx) => (
                                <li key={idx} onClick={() => handleProficiencySelect(option)}>
                                    {option} {selectedProficiencies.includes(option) && '✓'}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
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
                        {'Select Items'}
                    </button>
                    {dropdownOpen.inventory && (
                        <ul className="dropdown-list">
                            {inventoryOptions.map((pair, rowIndex) => (
                            <li key={rowIndex} className="inventory-row">
                                <span onClick={() => handleItemSelect(pair[0], rowIndex)}>
                                    {pair[0]} {selectedItems[rowIndex] === pair[0] && '✓'}
                                </span>
                                <span onClick={() => handleItemSelect(pair[1], rowIndex)}>
                                    {pair[1]} {selectedItems[rowIndex] === pair[1] && '✓'}
                                </span>
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
        </div>
    );
};

export default FinishingTouchesMenu;
