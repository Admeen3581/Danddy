import React from 'react';
import './dmhome.css';

const DMHome = () => {
  return (
    <div className="dmhome-section">
       <div className="headerBox">
          <h1>DM HOME PAGE</h1>
       </div>
       <div className="ButtonsBox">
          <h1>Buttons:</h1>
          <button className='button'>Character Sheets</button>
          <button className='button'>NPC</button>
          <button className='button'>Enemy</button>
       </div>
       <div className="NotesBox">
          <h1>Notes:</h1>
       </div>
    </div>
  );
};

export default DMHome;
