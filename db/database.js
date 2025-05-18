const sqlite3 = require('sqlite3');
const {open} = require('sqlite');
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');

let dbInstance = null;

async function getDB() {
  if (!dbInstance) {
    dbInstance = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  }
  return dbInstance;
}

module.exports = getDB;