import React, { useState } from 'react';
import './Login.css';

function Login({ onNavigate, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentPage,setCurrentPage] = useState('login')

  // Test credentials
  const TEST_PATIENT_EMAIL = 'patient@myhealth.com';
  const TEST_DOCTOR_EMAIL = 'doctor@myhealth.com';
  const TEST_PASSWORD = 'password123';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate against test credentials only
    const validEmails = [TEST_PATIENT_EMAIL, TEST_DOCTOR_EMAIL];
    
    if (!validEmails.includes(email)) {
      setError('Invalid email. Use patient@myhealth.com or doctor@myhealth.com');
      return;
    }
    
    if (password !== TEST_PASSWORD) {
      setError('Invalid password. Use password123');
      return;
    }
    
    // Determine role based on email
    let userRole = email === TEST_DOCTOR_EMAIL ? 'doctor' : 'patient';
    
    console.log('Login successful:', { email, role: userRole });
    
    // Successful login
    onLogin(userRole);

    // You can add real validation later
    if (email.trim() && password.trim()) {
      console.log('Login successful:', { email, password });

      // Navigate to Dashboard
      setCurrentPage("dashboard");   // <-- MAIN FIX
    } else {
      alert("Please enter both email and password");
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
