const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to save connection details
app.post("/api/connections", (req, res) => {
  const { name, ip_address, username, password, version } = req.body;

  const sql = `INSERT INTO connections (name, ip_address, username, password, version) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [name, ip_address, username, password, version], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Endpoint to get all connections
app.get("/api/connections", (req, res) => {
  db.all(`SELECT * FROM connections`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Endpoint to delete a connection by ID
app.delete('/api/connections/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM connections WHERE id = ?`;

    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Connection not found' });
        }
        res.status(204).send(); // No content to send back
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
