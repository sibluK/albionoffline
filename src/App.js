import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navbar from './components/Navbar.js';
import GoldTracker from './components/GoldTracker.js';
import LuckyLoadout from './components/LuckyLoadout.js';
import Home from './components/Home.js';
import Join from './components/Join.js';
import Profile from './components/Profile.js';
import Footer from './components/Footer.js'; 
import './App.css';

const basename = '/albionoffline';

function AnimatedRoutes() {
  const location = useLocation();

  const homeRef = useRef(null);
  const loadoutRef = useRef(null);
  const goldRef = useRef(null);
  const joinRef = useRef(null);
  const profileRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        nodeRef={
          location.pathname === '/' ? homeRef :
          location.pathname === '/loadout' ? loadoutRef :
          location.pathname === '/gold' ? goldRef :
          location.pathname === '/join' ? joinRef :
          location.pathname === '/profile' ? profileRef : null
        }
        classNames="fade"
        timeout={400}
      >
        <div className="route-container">
          <Routes location={location}>
            <Route path="/" element={<div ref={homeRef}><Home /></div>} />
            <Route path="/loadout" element={<div ref={loadoutRef}><LuckyLoadout /></div>} />
            <Route path="/gold" element={<div ref={goldRef}><GoldTracker /></div>} />
            <Route path="/join" element={<div ref={joinRef}><Join /></div>} />
            <Route path="/profile" element={<div ref={profileRef}><Profile /></div>} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <Router basename={basename}>
      <div className="App">
        <Navbar />
        <div className="navbar-spacer"></div>
        <AnimatedRoutes />
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
