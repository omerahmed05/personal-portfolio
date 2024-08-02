import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleAuthentication = async () => {
    try {
      const response = await fetch('/.netlify/functions/validatePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (result.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        alert('Incorrect password');
      }
    } catch (error) {
      console.error('Failed to authenticate:', error);
      alert('Failed to authenticate');
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch('/.netlify/functions/getNotes');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Data is not an array');
      }
      setNotes(data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      alert('Failed to fetch notes');
    }
  };

  const handleAddNote = async () => {
    if (isAuthenticated) {
      const note = {
        title: noteTitle,
        text: editorContent,
      };
      try {
        const response = await fetch('/.netlify/functions/saveNote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(note),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNotes([...notes, { ...note, id: data.id }]);
        resetNoteFields();
      } catch (error) {
        alert('Failed to save note');
      }
    } else {
      alert('You need to authenticate first');
    }
  };

  const handleEditNote = (index) => {
    const note = notes[index];
    setNoteTitle(note.title);
    setEditorContent(note.text);
    setSelectedNote(note);
    setIsEditing(true);
  };

  const handleDeleteNote = async (noteId) => {
    if (isAuthenticated) {
      try {
        const response = await fetch(`/.netlify/functions/deleteNote?id=${noteId}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const newNotes = notes.filter(note => note.id !== noteId);
        setNotes(newNotes);
        setSelectedNote(null);
        resetNoteFields();
      } catch (error) {
        alert('Failed to delete note');
      }
    } else {
      alert('You need to authenticate first');
    }
  };

  const handleUpdateNote = async () => {
    if (isAuthenticated && selectedNote) {
      const updatedNote = {
        title: noteTitle,
        text: editorContent,
      };
      try {
        const response = await fetch(`/.netlify/functions/updateNote?id=${selectedNote.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedNote),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updatedNotes = notes.map(note => note.id === selectedNote.id ? { ...note, ...updatedNote } : note);
        setNotes(updatedNotes);
        resetNoteFields();
      } catch (error) {
        alert('Failed to update note');
      }
    } else {
      alert('You need to authenticate first');
    }
  };

  const resetNoteFields = () => {
    setNoteTitle('');
    setEditorContent('');
    setSelectedNote(null);
    setIsEditing(false);
  };

  const handleCloseNote = () => {
    setSelectedNote(null);
    setIsEditing(false);
  };

  return (
    <div className="notes-container">
      <h1>Notes</h1>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '32px', color: '#666' }}>⏳ Loading Notes ⏳</p>
        ) : (
          notes.map((note, index) => (
            <div
              key={index}
              className="note-card"
              onClick={() => setSelectedNote(note)}
            >
              <h3 className="note-title">{note.title}</h3>
            </div>
          ))
        )}
      </div>

      {selectedNote && (
        <div className="note-details">
          <h2>{selectedNote.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: selectedNote.text }} />
          <div className="note-actions">
            {isAuthenticated && (
              <>
                <button className="edit-button" onClick={() => handleEditNote(notes.findIndex(n => n.id === selectedNote.id))}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteNote(selectedNote.id)}>Delete</button>
              </>
            )}
            <button className="close-button" onClick={handleCloseNote}>Close</button>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <div className="note-form">
          <input
            type="text"
            placeholder="Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="note-title-input"
          />
          <ReactQuill
            value={editorContent}
            onChange={setEditorContent}
            theme="snow"
            className="rich-editor"
          />
          <button className="submit-button" onClick={isEditing ? handleUpdateNote : handleAddNote}>
            {isEditing ? 'Update Note' : 'Add Note'}
          </button>
          {isEditing && (
            <button className="cancel-button" onClick={resetNoteFields}>Cancel</button>
          )}
        </div>
      )}

      {!isAuthenticated && (
        <div className="auth-section">
          <input
            type="password"
            placeholder="Enter password to authenticate"
            value={password}
            onChange={handlePasswordChange}
            className="auth-input"
          />
          <button className="auth-button" onClick={handleAuthentication}>Authenticate</button>
        </div>
      )}
    </div>
  );
};

export default Notes;
