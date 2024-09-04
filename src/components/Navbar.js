import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className='logo-and-name'>
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Albion Offline
          </Link>
        </span>

        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/loadout" className="nav-links" onClick={closeMobileMenu}>
              Lucky Loadout
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/gold" className="nav-links" onClick={closeMobileMenu}>
              Gold Tracker
            </Link>
          </li>

          <span className="login-signup">
            <li>
              <Link to="/join">
                <button className="nav-item login-button" onClick={closeMobileMenu}>Join</button>
              </Link>
            </li>
            {/* 
                        <li>
              <Link to="/signup">
                <button className="nav-item signup-button" onClick={closeMobileMenu}>Sign Up</button>
              </Link>
            </li>
            */}

          </span>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;