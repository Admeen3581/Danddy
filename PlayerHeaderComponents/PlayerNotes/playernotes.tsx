import React, { useState } from 'react';
import './playernotes.css';

const PlayerNotes = () => {
  const [notes, setNotes] = useState('');

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  return (
    <div className="PAHome-section">
      <div className="PANotesBox">
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

export default PlayerNotes;
