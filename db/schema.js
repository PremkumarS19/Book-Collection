const getDB = require('./database');

const schemas = async () => {
  const db = await getDB();

  await db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL ,
      author TEXT NOT NULL,
      genre TEXT,
      publishedYear INT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

module.exports = schemas;