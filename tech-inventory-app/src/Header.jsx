// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h2>MyApp</h2>
      </div>
      <nav className="desktop-nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">List</a></li>
          <li><a href="/">Add</a></li>
          <li><a href="/">Settings</a></li>
        </ul>
      </nav>
    </header>
  )

}

export default Header