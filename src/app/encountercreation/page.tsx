"use client"

import { useEffect, useState } from 'react';
import './EncounterCreation.css';
import { getDnDAPI } from '@/utils/httpRequester';
import { getModifier } from '@/utils/characterJsonFunctions';

const EncounterCreation = () => {
    const itemsPerPage = 25;
    const [currentPage, setCurrentPage] = useState(1);
    const [encounters, setEncounters] = useState([]);
    const [selectedEncounters, setSelectedEncounters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        const fetchEncounters = async () => {
            const result = await getDnDAPI("/monsters");
            const dummyData = result.results.map(monster => ({ name: monster.name, url: "/monsters/"+monster.name.toLowerCase().replaceAll(" ", "-")}));
            setEncounters(dummyData);
            setLoading(false);
        };

        fetchEncounters();
    }, []);

    const totalPages = Math.ceil(encounters.length / itemsPerPage);
    const currentEncounters = encounters
        .filter(encounter => encounter.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const addEncounterToTopList = (encounter) => {
        setSelectedEncounters((prevSelected) => {
            const existingEncounter = prevSelected.find(item => item.name === encounter.name);
            if (existingEncounter) {
                return prevSelected.map(item =>
                    item.name === encounter.name
                        ? { ...item, count: item.count + 1 }
                        : item
                );
            }
            return [...prevSelected, { ...encounter, count: 1 }];
        });
    };

    const removeEncounterFromTopList = (encounterName) => {
        setSelectedEncounters((prevSelected) => {
            return prevSelected
                .map(item => {
                    if (item.name === encounterName) {
                        if (item.count > 1) {
                            return { ...item, count: item.count - 1 };
                        }
                        return null;
                    }
                    return item;
                })
                .filter(item => item !== null);
        });
    };

    const fetchAndLogMonsterStats = async (url) => {
        await getDnDAPI(url)
        .then((result) => {
            console.log(result)
            var modalStr : String = result["name"]+"\n"
            modalStr += "--------------------------------\n"

            modalStr += "AC: "+result["armor_class"][0]["value"]+"\n"
            modalStr += "Hit Points: "+result["hit_points"]+"\n"
            modalStr += "Speed: "+result["speed"]["walk"]+"\n"
            modalStr += "--------------------------------\n"

            modalStr += "STR: "+result["strength"]+" ("+getModifier(result["strength"])+")\n"
            modalStr += "DEX: "+result["dexterity"]+" ("+getModifier(result["dexterity"])+")\n"
            modalStr += "CON: "+result["constitution"]+" ("+getModifier(result["constitution"])+")\n"
            modalStr += "INT: "+result["intelligence"]+" ("+getModifier(result["intelligence"])+")\n"
            modalStr += "WIS: "+result["wisdom"]+" ("+getModifier(result["wisdom"])+")\n"
            modalStr += "CHA: "+result["charisma"]+" ("+getModifier(result["charisma"])+")\n"
            modalStr += "--------------------------------\n"


            setModalContent(modalStr); // Format the JSON for readability
            setModalOpen(true);
        });
    };

    const handleFinish = () => {
        console.log("Selected Encounters:", selectedEncounters);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="encounter-creation-container">
            <h1>Create Your Encounter</h1>

            <div className="scrollable-section">
                <h2>Selected Encounters</h2>
                {selectedEncounters.length === 0 ? (
                    <p>No encounters selected.</p>
                ) : (
                    selectedEncounters.map((encounter, index) => (
                        <div key={index} className="encounter-block">
                            <p>{encounter.name} x{encounter.count}</p>
                            <button onClick={() => removeEncounterFromTopList(encounter.name)}>Remove</button>
                        </div>
                    ))
                )}
            </div>

            <div className="scrollable-section">
                <h2>Available Encounters</h2>
                <input
                    type="text"
                    placeholder="Search encounters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    currentEncounters.map((encounter, index) => (
                        <div key={index} className="encounter-block">
                            <p>{encounter.name}</p>
                            <button onClick={() => addEncounterToTopList(encounter)}>Add</button>
                            <button onClick={() => fetchAndLogMonsterStats(encounter.url)}>View Stats</button>
                        </div>
                    ))
                )}
            </div>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <button onClick={handleFinish} className="finish-button">
                Finish
            </button>

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Monster Stats</h2>
                        <pre>{modalContent}</pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EncounterCreation;
