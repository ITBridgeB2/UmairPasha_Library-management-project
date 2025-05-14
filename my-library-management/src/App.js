import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import AddBook from "./AddBook";
import FictionBooks from "./FictionBooks";
import BooksDetail from "./BooksDetail";
import ScienceBooks from "./ScienceBooks";
import HistoryBooks from "./HistoryBooks"; 
import EditBook from "./EditBook";
import FantasyBooks from "./FantasyBooks";
import BiographyBooks from "./BiographyBooks";
import MysteryBooks from "./MysteryBooks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/addbook" element={<AddBook />} />
      <Route path="/fiction" element={<FictionBooks />} />
      <Route path="/book/:id" element={<BooksDetail />} />
      <Route path="science" element={<ScienceBooks/>}/>
        <Route path="/history" element={<HistoryBooks />}/>
        <Route path="/edit-book/:id" element={<EditBook/>} />
        <Route path="/fantasy" element={<FantasyBooks />}/>
        <Route path="/biography" element={<BiographyBooks/>}/>
        <Route path="/mystery" element={<MysteryBooks/>}/>
    </Routes>
  );
}

export default App;
