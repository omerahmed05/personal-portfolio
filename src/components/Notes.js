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
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetchNotes();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const response = await fetch('/.netlify/functions/getCategories');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Data is not an array');
      }
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      alert('Failed to fetch categories');
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

  const handleEditNote = async () => {
    if (isAuthenticated && selectedNote) {
      const note = {
        title: noteTitle,
        text: editorContent,
        category: selectedCategory,
      };
      try {
        const response = await fetch(`/.netlify/functions/updateNote?id=${selectedNote.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(note),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updatedNote = await response.json();
        const newNotes = notes.map((n) => (n.id === updatedNote.id ? updatedNote : n));
        setNotes(newNotes);
        resetNoteFields();
      } catch (error) {
        alert('Failed to update note');
      }
    } else {
      alert('You need to authenticate first');
    }
  };

  const handleDeleteNote = async (index) => {
    if (isAuthenticated) {
      const noteId = notes[index].id;
      try {
        const response = await fetch(`/.netlify/functions/deleteNote?id=${noteId}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
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

  const handleAddCategory = async () => {
    if (categoryName && !categories.includes(categoryName)) {
      try {
        const response = await fetch('/.netlify/functions/addCategory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: categoryName }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setCategories([...categories, categoryName]);
          setCategoryName('');
        } else {
          alert('Failed to add category');
        }
      } catch (error) {
        console.error('Failed to add category:', error);
        alert('Failed to add category');
      }
    }
  };

  const handleEditCategory = async () => {
    if (categoryToEdit && categoryName) {
      try {
        const response = await fetch(`/.netlify/functions/updateCategory?id=${categoryToEdit.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: categoryName }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updatedCategory = await response.json();
        const newCategories = categories.map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        );
        setCategories(newCategories);
        setCategoryToEdit(null);
        setCategoryName('');
      } catch (error) {
        console.error('Failed to update category:', error);
        alert('Failed to update category');
      }
    }
  };

  const handleDeleteCategory = async (index) => {
    if (isAuthenticated) {
      const categoryId = categories[index].id;
      try {
        const response = await fetch(`/.netlify/functions/deleteCategory?id=${categoryId}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const newCategories = categories.filter((_, i) => i !== index);
        setCategories(newCategories);
        setSelectedCategory('');
      } catch (error) {
        console.error('Failed to delete category:', error);
        alert('Failed to delete category');
      }
    } else {
      alert('You need to authenticate first');
    }
  };

  const resetNoteFields = () => {
    setNoteTitle('');
    setEditorContent('');
    setSelectedCategory('');
    setSelectedNote(null);
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
            onClick={() => handleCategoryFilter(cat.name)}
            className={selectedCategory === cat.name ? 'selected' : ''}
          >
            {cat.name}
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
              <button onClick={() => {
                setNoteTitle(selectedNote.title);
                setEditorContent(selectedNote.text);
                setSelectedCategory(selectedNote.category);
              }} className="edit-button">Edit</button>
              <button onClick={() => handleDeleteNote(notes.indexOf(selectedNote))} className="delete-button">Delete</button>
            </div>
          )}
        </div>
      )}

      <div className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <ReactQuill
          value={editorContent}
          onChange={setEditorContent}
          theme="snow"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        {selectedNote ? (
          <button onClick={handleEditNote} className="submit-button">Update Note</button>
        ) : (
          <button onClick={handleAddNote} className="submit-button">Add Note</button>
        )}
      </div>

      <div className="category-form">
        <h2>Manage Categories</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        {categoryToEdit ? (
          <button onClick={handleEditCategory} className="submit-button">Update Category</button>
        ) : (
          <button onClick={handleAddCategory} className="submit-button">Add Category</button>
        )}
        {categories.map((cat, index) => (
          <div key={index} className="category-item">
            <span>{cat.name}</span>
            {isAuthenticated && (
              <div className="category-actions">
                <button onClick={() => setCategoryToEdit(cat)} className="edit-button">Edit</button>
                <button onClick={() => handleDeleteCategory(index)} className="delete-button">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="authentication-section">
        <h2>Authenticate</h2>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={handleAuthentication} className="auth-button">Authenticate</button>
      </div>
    </div>
  );
};

export default Notes;
