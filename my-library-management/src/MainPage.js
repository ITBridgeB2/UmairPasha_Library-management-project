import React, { useState } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";

export default function MainPage() {
  const bookCategories = [
    { src: "/fiction.jpg", url: "./fiction", label: "Fiction Books" },
    { src: "/science.jpg", url: "./science", label: "Science Books" },
    { src: "/history.jpg", url: "./history", label: "History Books" },
    { src: "/fantasy.jpg", url: "./fantasy", label: "Fantasy Books" },
    { src: "/biography.jpg", url: "./biography", label: "Biography Books" },
    { src: "/mystery.jpg", url: "./mystery", label: "Mystery Books" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Filter categories based on search input
  const filteredCategories = bookCategories.filter((category) =>
    category.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="header">
        <h1 style={{ color: "whitesmoke" }}>Library Books Manager</h1>
        <Link to="/addbook">
          <button className="add-button">Add New Books</button>
        </Link>
      </div>


      {/* 📚 Category Cards */}
      <div className="category-grid">
        {filteredCategories.length === 0 ? (
          <p style={{ color: "red", textAlign: "center" }}>No categories match your search.</p>
        ) : (
          filteredCategories.map((item, index) => (
            <Link to={item.url} key={index} className="category-card">
              <img src={item.src} alt={item.label} />
              <p className="category-label">{item.label}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
