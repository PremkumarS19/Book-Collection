require('dotenv').config();
const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors'); 

const app = express();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const dbPath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.join(__dirname, 'db', 'database.db');

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    
    app.locals.db = db;

    await require('./db/schema')(db);

    const bookRoutes = require('./routers/bookRoute');
    
    app.use('/books', bookRoutes);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  } catch (e) {
    console.error(`Startup Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
