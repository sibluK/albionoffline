import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Gold from './components/Gold.js';
import Loadout from './components/Loadout.js';
import Home from './components/Home.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Loadout" element={<Loadout />} />
          <Route path="/Gold" element={<Gold />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;