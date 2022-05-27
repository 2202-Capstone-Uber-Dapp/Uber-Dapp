import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>Uber-Dapp</h1>
    <nav>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
    <hr />
  </div>
);
