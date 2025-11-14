import React, { useState } from 'react';
import './Login.css';

function Login({ onNavigate, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('patient'); // Default to patient

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, role: userRole });
    
    // Simulate successful login
    if (email && password) {
      onLogin(userRole); // Pass the selected role to App
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>MyHealth ❤️</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">Login as</label>
            <select
              id="role"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="form-control"
              required
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="#register" onClick={(e) => { e.preventDefault(); onNavigate('register'); }}>Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
