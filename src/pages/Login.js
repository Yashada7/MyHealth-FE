import React, { useState } from 'react';
import './Login.css';

function Login({ onLoginSuccess, onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Static credentials (assumption): change as needed
  const VALID_EMAIL = 'test_user@gmail.com';
  const VALID_PASSWORD = 'password123';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setError('');
      console.log('Login successful:', { email });
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setError('Invalid email or password.');
      console.log('Login failed:', { email });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>MyHealth</h1>
        <h2>Login</h2>

        {error && (
          <div className="login-error" role="alert" aria-live="assertive" style={{ color: '#b00020', marginBottom: '12px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="#register" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('register'); }}>Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
