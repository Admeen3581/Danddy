"use client"
import React, { useState, useEffect } from 'react';
import './playernotes.css';
import { readDatabaseRoute, patchDatabaseRoute } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';

const PlayerNotes = () => {
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { userId } = useLocalStore();

  useEffect(() => {
    const loadNotes = async () => {
      if (userId) {
        try {
          const data = await readDatabaseRoute(`users/${userId}/notes`);
          if (data) {
            setNotes(data.content || '');
          }
        } catch (error) {
          console.error('Error loading notes:', error);
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
        await patchDatabaseRoute(`users/${userId}/notes`, {
          content: notes,
          lastUpdated: Date.now()
        });
      } catch (error) {
        console.error('Error saving notes:', error);
      } finally {
        setIsSaving(false);
      }
    }
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
        <button 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default PlayerNotes;
