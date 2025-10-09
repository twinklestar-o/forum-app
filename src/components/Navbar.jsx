import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import '../index.css';

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => dispatch(logout());

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Dicoding Forum
      </Link>

      <div className="navbar-menu">
        {user ? (
          <>
            <Link to="/leaderboard" className="nav-link">
              Leaderboard
            </Link>
            <Link to="/create" className="nav-link">
              Buat Thread
            </Link>
            <span className="nav-user">
              Hi,
              {user.name}
            </span>
            <button type="button" className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
