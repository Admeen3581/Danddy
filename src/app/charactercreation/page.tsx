"use client";

import { getDnDAPI } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';
import { useEffect, useState } from 'react';

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
            case 'Barbarian':
                return 'Barbarians are fierce warriors who excel in combat, drawing strength from their rage.';
            case 'Bard':
                return 'Bards are charismatic performers who weave magic through music and art.';
            case 'Cleric':
                return 'Clerics are divine spellcasters who harness the power of their gods to heal and protect.';
            case 'Druid':
                return 'Druids are nature’s guardians who wield the magic of the wild.';
            case 'Fighter':
                return 'Fighters are skilled combatants proficient with weapons and armor.';
            case 'Monk':
                return 'Monks are masters of martial arts who channel their ki for extraordinary feats.';
            case 'Paladin':
                return 'Paladins are holy warriors sworn to uphold justice and righteousness.';
            case 'Ranger':
                return 'Rangers are skilled hunters and trackers who thrive in the wilderness.';
            case 'Rogue':
                return 'Rogues are stealthy and cunning, excelling at deception and surprise attacks.';
            case 'Sorcerer':
                return 'Sorcerers are innate spellcasters who wield magic through their bloodline.';
            case 'Warlock':
                return 'Warlocks are magic users who derive their power from a pact with a supernatural entity.';
            case 'Wizard':
                return 'Wizards are masters of arcane magic, using spells to control the battlefield.';
            default:
                return 'An adventurous character ready for battle.';
        }
    };

    const getRaceDescription = (raceName) => {
        switch (raceName) {
            case 'Dwarf':
                return 'Dwarves are stout and hardy, known for their craftsmanship and resilience.';
            case 'Elf':
                return 'Elves are graceful and agile, often possessing keen senses and a deep connection to nature.';
            case 'Halfling':
                return 'Halflings are small and nimble, known for their resourcefulness and luck.';
            case 'Human':
                return 'Humans are versatile and adaptable, with a wide range of skills and abilities.';
            case 'Dragonborn':
                return 'Dragonborn are proud and honorable, with draconic ancestry granting them unique powers.';
            case 'Gnome':
                return 'Gnomes are inventive and curious, often dabbling in magic and technology.';
            case 'Half-Elf':
                return 'Half-elves combine the best traits of humans and elves, making them adaptable and charismatic.';
            case 'Half-Orc':
                return 'Half-orcs are strong and resilient, often overcoming prejudice through their strength.';
            case 'Tiefling':
                return 'Tieflings are descendants of fiends, marked by their infernal heritage and unique abilities.';
            default:
                return 'A unique race with diverse traits and abilities.';
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: 'black' }}>
            <div style={{
                flex: 1,
                backgroundImage: 'url(https://external-preview.redd.it/u0bZOwzMBYZ7vvp8lJ0U_VeonHAIvX87SS_vGDe0Y-M.jpg?width=1080&crop=smart&auto=webp&s=87214f42d64b1a5b87859bfee903080fdd3f9330)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginLeft: '-400px',
            }}>
                <h1 style={{
                    textAlign: 'center',
                    fontFamily: 'Georgia, serif',
                    fontSize: '36px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    margin: 0,
                    position: 'absolute', // Add this
                    top: '50%', // Center vertically
                    left: '50%', // Center horizontally
                    transform: 'translate(-80%, -50%)', // Adjust position to truly center
                }}>
                    Welcome to the Danddy Character Creator!
                </h1>

            </div>

            <div style={{
                width: '400px',
                padding: '20px',
                backgroundColor: '#333333',
                boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                color: 'white',
                flexShrink: 0,
                position: 'relative',
                height: '100vh',
            }}>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', marginBottom: '10px' }}>
                    Select a Race
                </h2>
                <hr style={{ border: '1px solid white', margin: '10px 0' }} />
                <div style={{ position: 'relative', marginTop: '20px' }}>
                    <button
                        onClick={toggleRaceDropdown}
                        style={{
                            fontFamily: 'Georgia, serif',
                            fontSize: '16px',
                            backgroundColor: 'black',
                            color: 'white',
                            padding: '10px',
                            width: '100%',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                        }}
                    >
                        {selectedRace || 'Select a race'}
                    </button>
                    {raceDropdownOpen && (
                        <ul style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            backgroundColor: 'black',
                            color: 'white',
                            padding: '10px',
                            margin: 0,
                            listStyleType: 'none',
                            zIndex: 1,
                            display: loadingRaces ? 'none' : 'block',
                            borderRadius: '5px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            width: '100%',
                        }}>
                            {fetchedRaces.map((race) => (
                                <li key={race['index']}
                                    onClick={() => handleRaceChange(race['name'])}
                                    style={{
                                        padding: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '16px',
                                    }}
                                >
                                    <img src={iconUrl} alt={race.name} style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                                    {race['name']}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', marginBottom: '10px', marginTop: '20px' }}>
                    Select a Class
                </h2>
                <hr style={{ border: '1px solid white', margin: '10px 0' }} />
                <div style={{ position: 'relative', marginTop: '20px' }}>
                    <button
                        onClick={toggleClassDropdown}
                        style={{
                            fontFamily: 'Georgia, serif',
                            fontSize: '16px',
                            backgroundColor: 'black',
                            color: 'white',
                            padding: '10px',
                            width: '100%',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                        }}
                    >
                        {selectedClass || 'Select a class'}
                    </button>
                    {classDropdownOpen && (
                        <ul style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            backgroundColor: 'black',
                            color: 'white',
                            padding: '10px',
                            margin: 0,
                            listStyleType: 'none',
                            zIndex: 1,
                            display: loadingClasses ? 'none' : 'block',
                            borderRadius: '5px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            width: '100%',
                        }}>
                            {fetchedClasses.map((dndClass) => (
                                <li key={dndClass['index']}
                                    onClick={() => handleClassChange(dndClass['name'])}
                                    style={{
                                        padding: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '16px',
                                    }}
                                >
                                    <img src={iconUrl} alt={dndClass.name} style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                                    {dndClass['name']}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {showPopup && (
                    <div style={{
                        position: 'fixed',
                        bottom: '0px',
                        right: '0',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        zIndex: 2,
                        padding: '20px',
                        width: '400px',
                        backgroundColor: 'transparent',
                    }}>
                        <img src="https://png.pngtree.com/png-clipart/20230907/ourmid/pngtree-cute-cartoon-baby-dragon-png-image_10021331.png"
                             alt="Dragon"
                             style={{
                                 width: '70px',
                                 position: 'absolute',
                                 top: '10px',
                                 left: '10px',
                             }} />
                        <div style={{
                            borderRadius: '10px',
                            padding: '20px',
                            textAlign: 'center',
                            width: '100%',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        }}>
                            <h2 style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: '24px' }}>{`${selectedRace} ${selectedClass}`}</h2>
                            <p style={{ margin: '10px 0', fontFamily: 'Georgia, serif', fontSize: '16px' }}>{getRaceDescription(selectedRace)}</p>
                            <p style={{ margin: '10px 0', fontFamily: 'Georgia, serif', fontSize: '16px' }}>{getClassDescription(selectedClass)}</p>
                            <img src={iconUrl} alt="Class Logo" style={{ width: '100px', margin: '10px auto', display: 'block' }} />
                            <button onClick={handleConfirmSelection} style={{
                                backgroundColor: 'blue',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginTop: '10px',
                            }}>
                                Confirm Selection
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                /* Scrollbar styles */
                ul::-webkit-scrollbar {
                    width: 8px;
                }
                ul::-webkit-scrollbar-track {
                    background: black;
                }
                ul::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 4px;
                }
                ul::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.7);
                }
            `}</style>
        </div>
    );
};

export default CharacterCreation;
