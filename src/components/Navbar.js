import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Albion Offline</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/loadout" className="nav-links">Lucky Loadout</Link>
          </li>
          <li className="nav-item">
            <Link to="/gold" className="nav-links">Gold Tracker</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
