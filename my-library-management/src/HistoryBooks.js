import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Bookslists.css";  // Import the global styles here

export default function HistoryBooks() {
  const [books, setBooks] = useState([]);  
  const [searchTerm, setSearchTerm] = useState(""); // 🆕 State for search input
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(""); 

  useEffect(() => {
    fetch("http://localhost:5000/api/books/history")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBooks(data);  
        } else {
          console.error("Error: Data fetched is not an array");
          setError("Failed to load books.");
        }
        setLoading(false);  
      })
      .catch((err) => {
        console.error("Error fetching history books:", err);
        setError("An error occurred while fetching books.");
        setLoading(false);  
      });
  }, []);

  // 🆕 Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading books...</p>;
  }

  return (
    <div className="fiction-container">
      <h2>History Books</h2>
      {error && <p className="error-message">{error}</p>}

      {/* 🆕 Search Bar */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Filtered book list */}
      {filteredBooks.length === 0 ? (
        <p style={{ color: "red" }}>No history books match your search.</p>
      ) : (
        <ul className="fiction-list">
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <Link to={`/book/${book.id}`}>
                <strong>{book.title}</strong> by {book.author}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ Back to Home link at the bottom */}
      <div className="back-link">
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
}
