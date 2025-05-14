import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddBook.css";

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowPopup(true);
        setFormData({ title: "", author: "", genre: "", year: "" });

        setTimeout(() => setShowPopup(false), 2000);
      } else {
        alert("Failed to add book");
      }
    } catch (error) {
      alert("Error submitting book");
      console.error(error);
    }
  };

  return (
    <div className="addbook-container">
      <h2>Add New Book</h2>
      <form className="addbook-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <select name="genre" value={formData.genre} onChange={handleChange} required>
          <option value="">Select Genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Mystery">Mystery</option>
          <option value="History">History</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Biography">Biography</option>
        </select>

        <input
          type="number"
          name="year"
          placeholder="Publication Year"
          value={formData.year}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Book</button>
      </form>

      <div className="back-link">
        <Link to="/"> Back to Home</Link>
      </div>

      {showPopup && <div className="popup">Book added successfully!</div>}
    </div>
  );
}
