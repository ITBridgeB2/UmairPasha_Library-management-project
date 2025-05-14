// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // or your MySQL password
  database: "librarydb",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
    return;
  }
  console.log("✅ Connected to MySQL database: librarydb");
});

// ✅ Add a new book
app.post("/api/books", (req, res) => {
  const { title, author, genre, publication_year } = req.body;
  const sql = `INSERT INTO books (title, author, genre, publication_year) VALUES (?, ?, ?, ?)`;

  db.query(sql, [title, author, genre, publication_year], (err, result) => {
    if (err) {
      console.error("❌ Error adding book:", err);
      return res.status(500).send("Server error while adding book");
    }
    res.status(200).json({ message: "Book added successfully" });
  });
});

// ✅ Get books by genre
const genres = ["fiction", "science", "history", "fantasy", "biography", "mystery"];
genres.forEach((genre) => {
  app.get(`/api/books/${genre}`, (req, res) => {
    const query = "SELECT * FROM books WHERE genre = ?";
    db.query(query, [genre.charAt(0).toUpperCase() + genre.slice(1)], (err, results) => {
      if (err) {
        console.error(`❌ Error fetching ${genre} books:`, err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    });
  });
});

// ✅ Get book by ID
app.get("/api/books/:id", (req, res) => {
  const bookId = req.params.id;
  const query = "SELECT * FROM books WHERE id = ?";
  db.query(query, [bookId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching book by ID:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(results[0]);
  });
});

// ✅ Update book by ID
app.put("/api/books/:id", (req, res) => {
  const bookId = req.params.id;
  const { title, author, genre, publication_year } = req.body;

  const query = `UPDATE books SET title = ?, author = ?, genre = ?, publication_year = ? WHERE id = ?`;
  db.query(query, [title, author, genre, publication_year, bookId], (err, result) => {
    if (err) {
      console.error("❌ Error updating book:", err);
      return res.status(500).json({ error: "Error updating book" });
    }
    res.json({ message: "Book updated successfully" });
  });
});

// ✅ Delete book by ID
app.delete("/api/books/:id", (req, res) => {
  const bookId = req.params.id;
  const query = "DELETE FROM books WHERE id = ?";
  db.query(query, [bookId], (err, result) => {
    if (err) {
      console.error("❌ Error deleting book:", err);
      return res.status(500).json({ error: "Failed to delete book" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  });
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
