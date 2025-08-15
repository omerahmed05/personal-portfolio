import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Typography, Box } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import './Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = (content) => {
    if (content && content !== editorContent) {
      setEditorContent(content);
    } else {
      setEditorContent(content);
    }
  };
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

  const sanitizeContent = (content) => {
    if (!content) return '';
    
    let sanitized = content.replace(/\n\n\n+/g, '\n\n');
    
    sanitized = sanitized.trim();
    
    sanitized = sanitized.replace(/<ol><li>/g, '<ol><li>');
    sanitized = sanitized.replace(/<\/li><\/ol>/g, '</li></ol>');
    
    sanitized = sanitized.replace(/<li><ol>/g, '<li><ol style="margin-left: 20px; margin-top: 0.5em; margin-bottom: 0.5em;">');
    sanitized = sanitized.replace(/<li><ul>/g, '<li><ul style="margin-left: 20px; margin-top: 0.5em; margin-bottom: 0.5em;">');
    
    sanitized = sanitized.replace(/<\/p><p>/g, '</p>\n<p>');
    
    sanitized = sanitized.replace(/<li>\s*<\/li>/g, '');
    
    return sanitized;
  };

  const handleAddNote = async () => {
    if (isAuthenticated) {
      const sanitizedContent = sanitizeContent(editorContent);
      const note = {
        title: noteTitle,
        text: sanitizedContent,
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
    setEditorContent(sanitizeContent(note.text));
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
        setNotes(notes.filter(note => note.id !== noteId));
      } catch (error) {
        alert('Failed to delete note');
      }
    } else {
      alert('You need to authenticate first');
    }
  };

  const handleUpdateNote = async () => {
    if (isAuthenticated && selectedNote) {
      const sanitizedContent = sanitizeContent(editorContent);
      const updatedNote = {
        ...selectedNote,
        title: noteTitle,
        text: sanitizedContent,
      };
      try {
        const response = await fetch('/.netlify/functions/updateNote', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedNote),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setNotes(notes.map(note => note.id === selectedNote.id ? updatedNote : note));
        resetNoteFields();
        setSelectedNote(null);
        setIsEditing(false);
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
  };

  const handleCancelEdit = () => {
    resetNoteFields();
    setSelectedNote(null);
    setIsEditing(false);
  };
  
      const quillModules = {
      toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
      ],
      clipboard: {
        matchVisual: false,
      },
      keyboard: {
        bindings: {
          list: {
            key: 'enter',
            handler: function(range, context) {
              return true;
            }
          }
        }
      },
      list: {
        listItemIndent: '1em',
        listItemType: 'ordered'
      }
    };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'indent',
    'link', 'image'
  ];

  const customStyles = `
    .ql-editor ol {
      counter-reset: list-counter;
      list-style-type: none;
    }
    
    .ql-editor ol > li {
      counter-increment: list-counter;
      position: relative;
    }
    
    .ql-editor ol > li::before {
      content: counter(list-counter) ". ";
      position: absolute;
      left: -1.5em;
    }
    
    .ql-editor ol ol {
      counter-reset: sub-counter;
    }
    
    .ql-editor ol ol > li {
      counter-increment: sub-counter;
    }
    
    .ql-editor ol ol > li::before {
      content: counter(list-counter) "." counter(sub-counter) ". ";
    }
    
    .ql-editor ol ol ol {
      counter-reset: sub-sub-counter;
    }
    
    .ql-editor ol ol ol > li {
      counter-increment: sub-sub-counter;
    }
    
    .ql-editor ol ol ol > li::before {
      content: counter(list-counter) "." counter(sub-counter) "." counter(sub-sub-counter) ". ";
    }
    
    .ql-editor ul {
      list-style-type: disc;
    }
    
    .ql-editor ul ul {
      list-style-type: circle;
    }
    
    .ql-editor ul ul ul {
      list-style-type: square;
    }
    
    .ql-editor li {
      margin-bottom: 0.5em;
    }
    
    .ql-editor p {
      margin-bottom: 1em;
    }
  `;

  return (
    <Box sx={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <style>{customStyles}</style>
      <Typography variant="h3" sx={{ 
        textAlign: 'center', 
        fontWeight: 'bold', 
        mb: 4
      }}>
        Notes
      </Typography>
      
      {!isAuthenticated ? (
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Authentication Required</h3>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            style={{
              padding: '12px 16px',
              fontSize: '1.1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              marginRight: '1rem',
              width: '250px'
            }}
          />
          <button
            onClick={handleAuthentication}
            style={{
              padding: '12px 24px',
              fontSize: '1.1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Authenticate
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
              {isEditing ? 'Edit Note' : 'Add New Note'}
            </h3>
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Note title"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '1.1rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginBottom: '1rem'
              }}
            />
            <div style={{ marginBottom: '1rem' }}>
              <ReactQuill
                value={editorContent}
                onChange={handleEditorChange}
                modules={quillModules}
                formats={quillFormats}
                style={{ fontSize: '1.1rem' }}
                placeholder="Start writing your note..."
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={isEditing ? handleUpdateNote : handleAddNote}
                style={{
                  padding: '12px 24px',
                  fontSize: '1.1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                {isEditing ? 'Update Note' : 'Add Note'}
              </button>
              {isEditing && (
                <button
                  onClick={handleCancelEdit}
                  style={{
                    padding: '12px 24px',
                    fontSize: '1.1rem',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Your Notes</h3>
            {notes.map((note, index) => (
              <div
                key={note.id || index}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <h4 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  {note.title}
                </h4>
                <div 
                  className="note-content"
                  style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: 1.6,
                    marginBottom: '1rem'
                  }}
                  dangerouslySetInnerHTML={{ __html: sanitizeContent(note.text) }}
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => handleEditNote(index)}
                    style={{
                      padding: '8px 16px',
                      fontSize: '1rem',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    style={{
                      padding: '8px 16px',
                      fontSize: '1rem',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Box>
  );
};

export default Notes;
