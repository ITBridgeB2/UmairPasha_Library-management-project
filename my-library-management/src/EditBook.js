import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./EditBook.css";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publication_year: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update book");
        }
        return res.json();
      })
      .then(() => {
        alert("✅ Book updated successfully!");
        navigate(`/book/${id}`);
      })
      .catch((err) => {
        console.error("Error updating book:", err);
        alert("❌ Failed to update the book. Please try again.");
      });
  };

  return (
    <div className="edit-book">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Publication Year:</label>
          <input
            type="number"
            name="publication_year"
            value={book.publication_year}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-actions">
          <button type="submit">Save Changes</button>
        </div>
      </form>

      {/* Back Link at the bottom */}
      <div className="back-link">
        <Link to="/">
          <button>Back to Main Page</button>
        </Link>
      </div>
    </div>
  );
}
