const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/connections.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the database.");

    // Create a table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS connections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        ip_address TEXT NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        version TEXT NOT NULL
    )`);
  }
});

module.exports = db;
