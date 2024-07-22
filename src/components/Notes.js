import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleAuthentication = () => {
    if (password === 'yourpassword') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch('/.netlify/functions/getNotes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      alert('Failed to fetch notes');
    }
  };

  const handleAddNote = async () => {
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }
    if (isAuthenticated) {
      const note = {
        title: noteTitle,
        text: editorContent,
        category: selectedCategory,
      };
      try {
        const response = await fetch('/.netlify/functions/saveNote', {
          method: 'POST',
          body: JSON.stringify(note),
        });
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
    setSelectedCategory(note.category);
    setSelectedNote(note);
    setEditIndex(index);
  };

  const handleDeleteNote = async (index) => {
    if (isAuthenticated) {
      const noteId = notes[index].id;
      try {
        await fetch(`/.netlify/functions/deleteNote?id=${noteId}`, { method: 'DELETE' });
        const newNotes = notes.filter((_, i) => i !== index);
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

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleAddCategory = () => {
    if (categoryName && !categories.includes(categoryName)) {
      setCategories([...categories, categoryName]);
      setCategoryName('');
    }
  };

  const resetNoteFields = () => {
    setNoteTitle('');
    setEditorContent('');
    setSelectedCategory('');
    setSelectedNote(null);
    setEditIndex(null);
  };

  const filteredNotes = selectedCategory
    ? notes.filter(note => note.category === selectedCategory)
    : notes;

  return (
    <div className="notes-container">
      <h1>Notes</h1>

      <div className="filter-section">
        <button
          onClick={() => handleCategoryFilter('')}
          className={selectedCategory === '' ? 'selected' : ''}
        >
          All Categories
        </button>
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryFilter(cat)}
            className={selectedCategory === cat ? 'selected' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="notes-list">
        {filteredNotes.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '16px', color: '#666' }}>No notes available</p>
        ) : (
          filteredNotes.map((note, index) => (
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
          {isAuthenticated && (
            <div className="note-actions">
              <button onClick={() => handleEditNote(notes.findIndex(note => note === selectedNote))} className="edit-button">Edit</button>
              <button onClick={() => handleDeleteNote(notes.findIndex(note => note === selectedNote))} className="delete-button">Delete</button>
            </div>
          )}
          <button onClick={() => setSelectedNote(null)} className="close-button">Close</button>
        </div>
      )}

      <div className="auth-section">
        {!isAuthenticated ? (
          <>
            <h2>Authenticate to Add, Edit, or Delete Notes</h2>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button onClick={handleAuthentication}>Authenticate</button>
          </>
        ) : (
          <div className="editor-section">
            <div className="add-note">
              <h2>{editIndex !== null ? 'Edit Note' : 'Add Note'}</h2>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Note title"
              />
              <ReactQuill
                value={editorContent}
                onChange={setEditorContent}
                modules={{
                  toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', 'image'],
                    ['clean']
                  ],
                }}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
              <button onClick={handleAddNote}>{editIndex !== null ? 'Update Note' : 'Add Note'}</button>
            </div>
            <div className="add-category">
              <h2>Add Category</h2>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category name"
              />
              <button onClick={handleAddCategory}>Add Category</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
