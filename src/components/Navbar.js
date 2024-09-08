import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

function Navbar() {
  const [click, setClick] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className={`navbar`}>
      <div className="navbar-container">
        <span className="logo-and-name">
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

          {user ? (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-links" onClick={closeMobileMenu}>
                  {user.email.split("@")[0].charAt(0).toUpperCase() + user.email.split("@")[0].slice(1)}
                </Link>
              </li>

              <li>
                <Link to="/join">
                  <button className="nav-item login-button" onClick={() => { handleLogout(); closeMobileMenu(); }}>
                    Log Out
                  </button>
                </Link>
              </li>
            </>
           ) : (
            <li>
              <Link to="/join">
                <button className="nav-item login-button" onClick={closeMobileMenu}>
                  Join
                </button>
              </Link>
            </li>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
