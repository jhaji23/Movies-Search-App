import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowList from "./components/ShowList";
import ShowDetails from "./components/ShowDetails";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv-shows/:keyword" element={<ShowList />} />
        <Route path="/tv-shows/details/:id" element={<ShowDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
