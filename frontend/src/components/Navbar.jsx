import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      {/* Fixed Vertical Side Navigation (hides under 880px) */}
      <div className="side-nav select-none">
        <span>MENU</span>
        <span>EN · SEARCH</span>
      </div>

      {/* Sticky Top Navigation */}
      <nav className="top-nav">
        <div className="wrap">
          <Link to="/" className="logo">
            Crestmont University
            <small>
              Crestmont University
            </small>
          </Link>
          
          <div className="nav-links">
            <Link to="/#about">About</Link>
            <Link to="/#departments">Departments</Link>
            <Link to="/#events">Events</Link>
            <Link to="/#voices">Voices</Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
