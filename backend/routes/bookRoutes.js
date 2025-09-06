const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Add new book
router.post('/', async (req, res) => {
  try {
    const { title, author, isbn } = req.body;
    if (!title || !author || !isbn) {
      return res.status(400).json({ error: 'title, author and isbn are required' });
    }
    const existing = await Book.findOne({ isbn });
    if (existing) return res.status(400).json({ error: 'Book with this ISBN already exists' });

    const book = new Book({ title, author, isbn });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch only available books
router.get('/available', async (req, res) => {
  try {
    const books = await Book.find({ available: true }).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Borrow book
router.patch('/borrow/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (!book.available) return res.status(400).json({ error: 'Book already borrowed' });
    book.available = false;
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Return book
router.patch('/return/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (book.available) return res.status(400).json({ error: 'Book already available' });
    book.available = true;
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
