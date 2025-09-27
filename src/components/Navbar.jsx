import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import '../../src/index.css'

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Dicoding Forum
      </Link>

      <div className="navbar-links">
        {user ? (
          <div className="navbar-user">
            <span>Hi, {user.name}</span>
            <button type="button" className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}