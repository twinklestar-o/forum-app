import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../features/auth/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // tunggu login selesai
      await dispatch(login({ email, password })).unwrap();
      // setelah login sukses, redirect
      navigate('/');
    } catch (err) {
      console.log('Login gagal:', err); // error sudah ada di state.auth.error
    }
  };

  return (
    <div className="div-auth">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          id="Email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="auth-button mb-2">
          <button type="submit" disabled={isLoading} className="btn-primary">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>

      <p className="mt-2 text-sm">
        Belum punya akun?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register di sini
        </Link>
      </p>
    </div>
  );
}
