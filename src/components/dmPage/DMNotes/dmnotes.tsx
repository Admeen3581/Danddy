"use client"
import React, { useState, useEffect } from 'react';
import './dmnotes.css';
import { readDatabaseRoute, patchDatabaseRoute } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';

const DMNotes = () => {
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { userId } = useLocalStore();

  useEffect(() => {
    const loadNotes = async () => {
      if (userId) {
        try {
          const data = await readDatabaseRoute(`users/${userId}/dmNotes`);
          if (data) {
            setNotes(data.content || '');
          }
        } catch (error) {
          console.error('Error loading DM notes:', error);
        }
      }
    };
    loadNotes();
  }, [userId]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSave = async () => {
    if (userId) {
      setIsSaving(true);
      try {
        await patchDatabaseRoute(`users/${userId}/dmNotes`, {
          content: notes,
          lastUpdated: Date.now()
        });
      } catch (error) {
        console.error('Error saving DM notes:', error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="DMNotesBox">
      <h1>DM Notes:</h1>
      <textarea 
        className="textarea-notes"
        value={notes}
        onChange={handleNotesChange}
        placeholder="Type your DM notes here..."
      />
      <button 
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default DMNotes;
