const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, '..', 'db', 'database.db');

const getDB = async () => {
  return open({ filename: dbPath, driver: sqlite3.Database });
};

const createBook = async ({ title, author, genre, publishedYear, status, }) => {
  const db = await getDB();
  await db.run(
    `INSERT INTO books (id, title, author, genre, publishedYear, status) VALUES (?, ?, ?, ?, ?, ?)`,
    [uuidv4(), title, author, genre, publishedYear, status]
  );
};
  
const getAllBooks = async () => {
  const db = await getDB();
  return await db.all(`SELECT * FROM books`);
};

const deleteBook = async (id) => {
  const db = await getDB();
  await db.run(
    `DELETE FROM books WHERE id = ?`,
    [id]
  );
};

const updateBook = async (id, { title, author, genre, publishedYear, status }) => {
  const db = await getDB();
  const result = await db.run(
    `UPDATE books SET title = ?, author = ?, genre = ?, publishedYear = ?, status = ?
     WHERE id = ?`,
    [id, title, author, genre, publishedYear, status]
  );
  return result.changes > 0;
};


module.exports = { createBook, getAllBooks, deleteBook, updateBook };