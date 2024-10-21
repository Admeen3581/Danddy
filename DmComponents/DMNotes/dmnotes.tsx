import React, { useState } from 'react';
import './dmnotes.css';

const DMNotes = () => {
  const [notes, setNotes] = useState('');

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  return (
    <div className="dmhome-section">
       <div className="NotesBox">
        <h1>Notes:</h1>
        <textarea 
          className="textarea-notes"
          value={notes}
          onChange={handleNotesChange}
          placeholder="Type your notes here..."
        />
       </div>
    </div>
  );
};

export default DMNotes;
