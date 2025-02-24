import React from 'react';


interface SidebarMenuProps {
    fetchedRaces: JSON[];
    fetchedClasses: JSON[];
    loadingRaces: boolean;
    loadingClasses: boolean;
    selectedRace: string;
    selectedClass: string;
    toggleRaceDropdown: () => void;
    toggleClassDropdown: () => void;
    handleRaceChange: (raceName: string) => void;
    handleClassChange: (className: string) => void;
    raceDropdownOpen: boolean;
    classDropdownOpen: boolean;
}

const iconUrl = 'https://img.icons8.com/?size=512&id=104704&format=png';

const SidebarMenu: React.FC<SidebarMenuProps> = ({
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
                        {fetchedRaces.map((race: any) => (
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
                        {fetchedClasses.map((dndClass: any) => (
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
