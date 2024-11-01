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
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editableStats, setEditableStats] = useState({});

    useEffect(() => {
        const fetchEncounters = async () => {
            const result = await getDnDAPI("/monsters");
            const dummyData = result.results.map(monster => ({
                name: monster.name,
                url: "/monsters/"+monster.name.toLowerCase().replaceAll(" ", "-")
            }));
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

    const addEncounterToTopList = async (encounter) => {
        const result = await getDnDAPI(encounter.url); // Fetch full JSON data
        const newEncounter = { ...result, count: 1 }; // Add count to the full data
        setSelectedEncounters((prevSelected) => {
            const existingEncounter = prevSelected.find(item => item.name === newEncounter.name);
            if (existingEncounter) {
                return prevSelected.map(item =>
                    item.name === newEncounter.name
                        ? { ...item, count: item.count + 1 }
                        : item
                );
            }
            return [...prevSelected, newEncounter];
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
        const result = await getDnDAPI(url);
        let modalStr = `${result.name}\n--------------------------------\n`;
        modalStr += `AC: ${result.armor_class[0].value}\n`;
        modalStr += `Hit Points: ${result.hit_points}\n`;
        modalStr += `Speed: ${result.speed.walk}\n--------------------------------\n`;

        // Add stats and modifiers
        ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].forEach(stat => {
            modalStr += `${stat.toUpperCase()}: ${result[stat]} (${getModifier(result[stat])})\n`;
        });

        // Additional information...
        setModalContent(modalStr);
        setModalOpen(true);
    };

    const handleEditStats = (encounter) => {
        setEditableStats(encounter);
        setEditModalOpen(true);
    };

    const handleStatChange = (e) => {
        const { name, value } = e.target;
        setEditableStats(prev => ({ ...prev, [name]: value }));
    };

    const handleFinish = () => {
        console.log(selectedEncounters)
    }

    const saveStats = () => {
        const updatedStats = {
            ...editableStats,
            strength: Number(editableStats.strength),
            dexterity: Number(editableStats.dexterity),
            constitution: Number(editableStats.constitution),
            intelligence: Number(editableStats.intelligence),
            wisdom: Number(editableStats.wisdom),
            charisma: Number(editableStats.charisma),
        };
    
        setSelectedEncounters(prev =>
            prev.map(item => 
                item.name === updatedStats.name ? updatedStats : item
            )
        );
        setEditModalOpen(false);
    };
    

    const closeModal = () => {
        setModalOpen(false);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
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
                            <button onClick={() => handleEditStats(encounter)}>Edit Stats</button>
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
                        <pre>{modalContent}</pre>
                    </div>
                </div>
            )}

            {editModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeEditModal}>&times;</span>
                        <h2>Edit Stats for {editableStats.name}</h2>
                        {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(stat => (
                            <div key={stat}>
                                <label>{stat.charAt(0).toUpperCase() + stat.slice(1)}:</label>
                                <input
                                    type="number"
                                    name={stat}
                                    value={editableStats[stat] || ''}
                                    onChange={handleStatChange}
                                />
                            </div>
                        ))}
                        <button onClick={saveStats}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EncounterCreation;
