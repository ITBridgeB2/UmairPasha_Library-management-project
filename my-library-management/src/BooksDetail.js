import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./FictionBookDetail.css";

export default function FictionBookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();  // Use navigate hook for redirection

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]);

  // Function to delete the book
  const handleDelete = () => {
    fetch(`http://localhost:5000/api/books/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        alert("Book deleted successfully!");
        navigate('/');  // Redirect to main/home page
      })
      .catch((err) => console.error("Error deleting book:", err));
  };

  // If no book is found, show loading
  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Publication Year:</strong> {book.publication_year}</p>

      {/* Edit and Delete buttons */}
      <div className="book-actions">
        <button onClick={() => navigate(`/edit-book/${id}`)}>Edit</button>
        <button onClick={() => setShowDeleteConfirm(true)}>Delete</button>
      </div>

      {showDeleteConfirm && (
        <>
          <div className="confirm-overlay" onClick={() => setShowDeleteConfirm(false)}></div>
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this book?</p>
            <button onClick={handleDelete}>Yes, delete it</button>
            <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
          </div>
        </>
      )}

      {/* Back to Main Page link at the bottom */}
      <div className="back-link">
        <button onClick={() => navigate("/")}>← Back to Main Page</button>
      </div>
    </div>
  );
}
