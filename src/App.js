import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HealthRecords from './pages/HealthRecords';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import DoctorAppointments from './pages/DoctorAppointments';

function App() {
  const [userRole, setUserRole] = useState(null); // 'patient' or 'doctor'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle login with role
  const handleLogin = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
  };

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/register" 
            element={<Register />} 
          />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard onLogout={handleLogout} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/health-records" 
            element={
              <ProtectedRoute>
                <HealthRecords onLogout={handleLogout} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/appointments" 
            element={
              <ProtectedRoute>
                <Appointments onLogout={handleLogout} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile onLogout={handleLogout} userRole={userRole} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/doctor-appointments" 
            element={
              <ProtectedRoute>
                <DoctorAppointments onLogout={handleLogout} />
              </ProtectedRoute>
            } 
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

        {/* Simple Navigation for Demo */}
        {isAuthenticated && <NavigationDemo userRole={userRole} onLogout={handleLogout} />}
      </div>
    </Router>
  );
}

// Navigation Demo Component
function NavigationDemo({ userRole, onLogout }) {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'white',
      padding: '15px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000
    }}>
      <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '12px' }}>
        Navigation (Demo) - {userRole === 'doctor' ? 'Doctor' : 'Patient'}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {userRole === 'doctor' && (
          <button onClick={() => navigate('/doctor-appointments')} style={buttonStyle}>
            Doctor Dashboard
          </button>
        )}
        <button onClick={() => navigate('/dashboard')} style={buttonStyle}>
          Dashboard
        </button>
        <button onClick={() => navigate('/health-records')} style={buttonStyle}>
          Health Records
        </button>
        <button onClick={() => navigate('/appointments')} style={buttonStyle}>
          Appointments
        </button>
        <button onClick={() => navigate('/profile')} style={buttonStyle}>
          Profile
        </button>
        <button
          onClick={() => {
            onLogout();
            navigate('/login');
          }}
          style={{...buttonStyle, background: '#dc3545'}}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '8px 12px',
  background: '#667eea',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: '500',
  fontSize: '13px',
  textAlign: 'left'
};

export default App;
