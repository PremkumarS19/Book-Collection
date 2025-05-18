const { createBook, getAllBooks , deleteBook, updateBook } = require('../models/bookModel');


const addBook = async (req, res) => {
  const { title, author, genre, publishedYear, status } = req.body;

  
  if (!title || !author) {
    return res.status(400).json({ 
      success: false, 
      message: 'Title and Author are required' 
    });
  }

  try {
    await createBook({ title, author, genre, publishedYear, status });
    res.status(201).json({ 
      success: true, 
      message: 'Book added successfully' 
    });
  } catch (err) {
    console.error('Book creation error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add book' 
    });
  }

};


const getBooks = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json({ 
      success: true, 
      books 
    });
  } catch (err) {
    console.error('Book fetch error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch books' 
    });
  }
};

const removeBook = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteBook(id);
    res.json({ 
      success: true, 
      message: 'Book deleted successfully' 
    });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete book' 
    });
  }
};

const updateBooks = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await bookModel.updateBook(id, req.body);
    if (updated) res.status(200).json({ message: 'Book updated successfully' });
    else res.status(404).json({ error: 'Book not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};



module.exports = { 
  addBook, 
  getBooks,
  removeBook,
  updateBooks
};