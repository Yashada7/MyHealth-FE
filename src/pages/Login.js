import React, { useState } from 'react';
import './Login.css';

function Login({ onNavigate, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Static credentials (assumption): change as needed
  const VALID_EMAIL = 'test_user@gmail.com';
  const VALID_PASSWORD = 'password123';

  // Test credentials
  const TEST_PATIENT_EMAIL = 'patient@myhealth.com';
  const TEST_DOCTOR_EMAIL = 'doctor@myhealth.com';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Determine role based on email
    let userRole = 'patient'; // Default role
    if (email === TEST_DOCTOR_EMAIL) {
      userRole = 'doctor';
    } else if (email === TEST_PATIENT_EMAIL) {
      userRole = 'patient';
    }
    
    console.log('Login attempt:', { email, password, role: userRole });
    
    // Simulate successful login
    if (email && password) {
      onLogin(userRole); // Pass the determined role to App
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>MyHealth ❤️</h1>
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
          Don't have an account? <a href="#register" onClick={(e) => { e.preventDefault(); onNavigate('register'); }}>Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
