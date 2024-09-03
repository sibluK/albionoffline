import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import GoldTracker from './components/GoldTracker.js';
import LuckyLoadout from './components/LuckyLoadout.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import Footer from './components/Footer.js'; 
import './App.css';

const basename = '/albionoffline'

function App() {
  return (
    <Router basename={basename}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loadout" element={<LuckyLoadout />} />
          <Route path="/gold" element={<GoldTracker />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        {/*<Footer />*/}
      </div>
    </Router>
  );
}

export default App;