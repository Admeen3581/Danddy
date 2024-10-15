"use client";

import { getDnDAPI } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';
import { useEffect, useState } from 'react';
import './CharacterCreation.css'; // Import the CSS file

const CharacterCreation = () => {
    const { classesJson, setClassesJson } = useLocalStore();
    const [fetchedClasses, setFetchedClasses] = useState<JSON[]>([]);
    const [fetchedRaces, setFetchedRaces] = useState<JSON[]>([]);
    const [loadingClasses, setLoadingClasses] = useState(true);
    const [loadingRaces, setLoadingRaces] = useState(true);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedRace, setSelectedRace] = useState('');
    const [classDropdownOpen, setClassDropdownOpen] = useState(false);
    const [raceDropdownOpen, setRaceDropdownOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const results = await getDnDAPI("classes");
                setFetchedClasses(results.results || []);
                setLoadingClasses(false);
            } catch (error) {
                console.error("Error fetching classes:", error);
                setLoadingClasses(false);
            }
        };

        const fetchRaces = async () => {
            try {
                const results = await getDnDAPI("races");
                setFetchedRaces(results.results || []);
                setLoadingRaces(false);
            } catch (error) {
                console.error("Error fetching races:", error);
                setLoadingRaces(false);
            }
        };

        fetchClasses();
        fetchRaces();
    }, []);

    const handleClassChange = (className) => {
        setSelectedClass(className);
        setClassDropdownOpen(false);
        if (selectedRace) {
            setShowPopup(true);
        }
    };

    const handleRaceChange = (raceName) => {
        setSelectedRace(raceName);
        setRaceDropdownOpen(false);
        if (selectedClass) {
            setShowPopup(true);
        }
    };

    const toggleClassDropdown = () => {
        setClassDropdownOpen(prev => !prev);
    };

    const toggleRaceDropdown = () => {
        setRaceDropdownOpen(prev => !prev);
    };

    const handleConfirmSelection = () => {
        console.log('Selected Race:', selectedRace);
        console.log('Selected Class:', selectedClass);
    };

    const iconUrl = 'https://img.icons8.com/?size=512&id=104704&format=png';

    const getClassDescription = (className) => {
        switch (className) {
            case 'Barbarian': return 'Barbarians are fierce warriors who excel in combat, drawing strength from their rage.';
            case 'Bard': return 'Bards are charismatic performers who weave magic through music and art.';
            case 'Cleric': return 'Clerics are divine spellcasters who harness the power of their gods to heal and protect.';
            case 'Druid': return 'Druids are nature’s guardians who wield the magic of the wild.';
            case 'Fighter': return 'Fighters are skilled combatants proficient with weapons and armor.';
            case 'Monk': return 'Monks are masters of martial arts who channel their ki for extraordinary feats.';
            case 'Paladin': return 'Paladins are holy warriors sworn to uphold justice and righteousness.';
            case 'Ranger': return 'Rangers are skilled hunters and trackers who thrive in the wilderness.';
            case 'Rogue': return 'Rogues are stealthy and cunning, excelling at deception and surprise attacks.';
            case 'Sorcerer': return 'Sorcerers are innate spellcasters who wield magic through their bloodline.';
            case 'Warlock': return 'Warlocks are magic users who derive their power from a pact with a supernatural entity.';
            case 'Wizard': return 'Wizards are masters of arcane magic, using spells to control the battlefield.';
            default: return 'An adventurous character ready for battle.';
        }
    };

    const getRaceDescription = (raceName) => {
        switch (raceName) {
            case 'Dwarf': return 'Dwarves are stout and hardy, known for their craftsmanship and resilience.';
            case 'Elf': return 'Elves are graceful and agile, often possessing keen senses and a deep connection to nature.';
            case 'Halfling': return 'Halflings are small and nimble, known for their resourcefulness and luck.';
            case 'Human': return 'Humans are versatile and adaptable, with a wide range of skills and abilities.';
            case 'Dragonborn': return 'Dragonborn are proud and honorable, with draconic ancestry granting them unique powers.';
            case 'Gnome': return 'Gnomes are inventive and curious, often dabbling in magic and technology.';
            case 'Half-Elf': return 'Half-elves combine the best traits of humans and elves, making them adaptable and charismatic.';
            case 'Half-Orc': return 'Half-orcs are strong and resilient, often overcoming prejudice through their strength.';
            case 'Tiefling': return 'Tieflings are descendants of fiends, marked by their infernal heritage and unique abilities.';
            default: return 'A unique race with diverse traits and abilities.';
        }
    };

    return (
        <div className="character-creation-container">
            <div className="background-image">
                <h1 className="welcome-text">Welcome to the Danddy Character Creator!</h1>
            </div>

            <div className="sidebar">
                <h2>Select a Race</h2>
                <hr />
                <div className="dropdown-container">
                    <button onClick={toggleRaceDropdown}>
                        {selectedRace || 'Select a race'}
                    </button>
                    {raceDropdownOpen && (
                        <ul className="dropdown-list" style={{ display: loadingRaces ? 'none' : 'block' }}>
                            {fetchedRaces.map((race) => (
                                <li key={race['index']} onClick={() => handleRaceChange(race['name'])}>
                                    <img src={iconUrl} alt={race.name} />
                                    {race['name']}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <h2>Select a Class</h2>
                <hr />
                <div className="dropdown-container">
                    <button onClick={toggleClassDropdown}>
                        {selectedClass || 'Select a class'}
                    </button>
                    {classDropdownOpen && (
                        <ul className="dropdown-list" style={{ display: loadingClasses ? 'none' : 'block' }}>
                            {fetchedClasses.map((dndClass) => (
                                <li key={dndClass['index']} onClick={() => handleClassChange(dndClass['name'])}>
                                    <img src={iconUrl} alt={dndClass.name} />
                                    {dndClass['name']}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {showPopup && (
                    <div className="popup">
                        <img className="dragon-image" src="https://png.pngtree.com/png-clipart/20230907/ourmid/pngtree-cute-cartoon-baby-dragon-png-image_10021331.png" alt="Dragon" />
                        <div className="popup-content">
                            <h2>{`${selectedRace} ${selectedClass}`}</h2>
                            <p>{getRaceDescription(selectedRace)}</p>
                            <p>{getClassDescription(selectedClass)}</p>
                            <img src={iconUrl} alt="Class Logo" />
                            <button onClick={handleConfirmSelection}>Confirm Selection</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CharacterCreation;
