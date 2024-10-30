"use client";

import { useEffect, useState } from 'react';
import './EncounterCreation.css';

const EncounterCreation = () => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [encounters, setEncounters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEncounters = async () => {
            const dummyData = Array.from({ length: 20 }, (_, i) => `Encounter ${i + 1}: Details about encounter ${i + 1}`);
            setEncounters(dummyData);
            setLoading(false);
        };

        fetchEncounters();
    }, []);

    const totalPages = Math.ceil(encounters.length / itemsPerPage);
    const currentEncounters = encounters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="encounter-creation-container">
            <h1>Create Your Encounter</h1>

            <div className="scrollable-section">
                <h2>Section 1</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    currentEncounters.map((encounter, index) => (
                        <div key={index} className="encounter-block">
                            <p>{encounter}</p>
                        </div>
                    ))
                )}
            </div>

            <div className="scrollable-section">
                <h2>Section 2</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    currentEncounters.map((encounter, index) => (
                        <div key={index} className="encounter-block">
                            <p>{encounter}</p>
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
        </div>
    );
};

export default EncounterCreation;
