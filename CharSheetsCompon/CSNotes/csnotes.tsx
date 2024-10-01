import React from 'react';
import './csnotes.css';

const CSNotes = () => {
  return (
    <div className="section">
       <div className="CSNotesBox">
            <h1>Notes:</h1>
            <textarea 
              className="notes-textarea" 
              rows={10} 
              cols={50} 
              placeholder="Write your notes here..."
            ></textarea>
       </div>
    </div>
  );
};

export default CSNotes;
