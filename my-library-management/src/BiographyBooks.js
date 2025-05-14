import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Bookslists.css";  // Shared styles for all book list pages

export default function BiographyBooks() {
  const [books, setBooks] = useState([]);         // Store fetched books
  const [searchTerm, setSearchTerm] = useState(""); // 🆕 Search input
  const [loading, setLoading] = useState(true);   // Track loading state
  const [error, setError] = useState("");         // Store error message if any

  useEffect(() => {
    // Fetch biography books from backend
    fetch("http://localhost:5000/api/books/biography")
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
        console.error("Error fetching biography books:", err);
        setError("An error occurred while fetching books.");
        setLoading(false);
      });
  }, []);

  // 🆕 Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading biography books...</p>;
  }

  return (
    <div className="fiction-container"> {/* Reuse same container class */}
      <h2>Biography Books</h2>
      {error && <p className="error-message">{error}</p>}

      {/* 🆕 Centered Search Bar */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Filtered List */}
      {filteredBooks.length === 0 ? (
        <p style={{ color: "red" }}>No biography books match your search.</p>
      ) : (
        <ul className="fiction-list"> {/* Reuse same list class */}
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <Link to={`/book/${book.id}`}>
                <strong>{book.title}</strong> by {book.author}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ Back to Home link */}
      <div className="back-link">
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
}
