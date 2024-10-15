import React from 'react';

const SidebarMenu = ({
    fetchedRaces,
    fetchedClasses,
    loadingRaces,
    loadingClasses,
    selectedRace,
    selectedClass,
    toggleRaceDropdown,
    toggleClassDropdown,
    handleRaceChange,
    handleClassChange,
    raceDropdownOpen,
    classDropdownOpen
}) => {
    const iconUrl = 'https://img.icons8.com/?size=512&id=104704&format=png';

    return (
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
        </div>
    );
};

export default SidebarMenu;
