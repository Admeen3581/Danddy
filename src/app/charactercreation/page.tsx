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
        console.log('Selected class:', className);
        setSelectedClass(className);
        setClassDropdownOpen(false); // Close dropdown after selection
    };

    const handleRaceChange = (raceName) => {
        console.log('Selected race:', raceName);
        setSelectedRace(raceName);
        setRaceDropdownOpen(false); // Close dropdown after selection
    };

    const toggleClassDropdown = () => {
        setClassDropdownOpen(prev => !prev);
    };

    const toggleRaceDropdown = () => {
        setRaceDropdownOpen(prev => !prev);
    };

    const iconUrl = 'https://img.icons8.com/?size=512&id=104704&format=png';

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
                }}>
                    Welcome to the D&D Character Creator!
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
