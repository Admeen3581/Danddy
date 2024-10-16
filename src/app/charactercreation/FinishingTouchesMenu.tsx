import React from 'react';
import './CharacterCreation.css';

const FinishingTouchesMenu = () => {
    return (
        <div className="sidebar">
            <h2>Finishing Touches</h2>
            <hr />
            <p>Customize your character further!</p>
            <div className="custom-input-container">
                <label>Name:</label>
                <input type="text" placeholder="Enter character name" />
            </div>
            {/* Additional fields can be added here */}
            <div className="content button">
                <button onClick={() => alert('Character Created!')}>
                    Finish Character
                </button>
            </div>
        </div>
    );
};

export default FinishingTouchesMenu;
