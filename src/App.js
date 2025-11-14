import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HealthRecords from './pages/HealthRecords';
import DoctorAppointments from './pages/DoctorAppointments';
import BookAppointment from './pages/BookAppointment';
import Profile from './pages/Profile';
import PatientAppointments from './pages/PatientAppointments';
import Header from './components/Header';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [userRole, setUserRole] = useState(null); // 'patient' or 'doctor'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle login with role
  const handleLogin = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
    if (role === 'doctor') {
      setCurrentPage('doctor-appointments');
    } else {
      setCurrentPage('dashboard');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLoginSuccess={() => setCurrentPage('dashboard')} onNavigate={(page) => setCurrentPage(page)} />;
      case 'register':
        return <Register onNavigate={setCurrentPage} />;
      
      // Pages accessible by both patients and doctors
      case 'dashboard':
        if (!isAuthenticated) {
          return <Login onNavigate={setCurrentPage} onLogin={handleLogin} />;
        }
        return <Dashboard onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'health-records':
        if (!isAuthenticated) {
          return <Login onNavigate={setCurrentPage} onLogin={handleLogin} />;
        }
        return <HealthRecords onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'appointments':
        if (!isAuthenticated) {
          return <Login onNavigate={setCurrentPage} onLogin={handleLogin} />;
        }
        return <Appointments onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'doctor-appointments':
        if (!isAuthenticated) {
          return <Login onNavigate={setCurrentPage} onLogin={handleLogin} />;
        }
        return <DoctorAppointments setCurrentPage={setCurrentPage} />;
      case 'book-appointment':
        if (!isAuthenticated) {
          return <Login onNavigate={setCurrentPage} onLogin={handleLogin} />;
        }
        return <BookAppointment setCurrentPage={setCurrentPage} />;
      case 'patient-appointments':
        if (!isAuthenticated) {
          return <Login onNavigate={setCurrentPage} onLogin={handleLogin} />;
        }
        return <PatientAppointments setCurrentPage={setCurrentPage} />;
      case 'profile':
        if (!isAuthenticated) {
          return <Login onNavigate={setCurrentPage} onLogin={handleLogin} />;
        }
        return <Profile onNavigate={setCurrentPage} onLogout={handleLogout} userRole={userRole} />;
      
      // Doctor-only pages
      case 'doctor-appointments':
        if (!isAuthenticated || userRole !== 'doctor') {
          return <Login onNavigate={setCurrentPage} onLogin={handleLogin} />;
        }
        return <DoctorAppointments onNavigate={setCurrentPage} onLogout={handleLogout} />;
      
      default:
        return <Login onNavigate={setCurrentPage} onLogin={handleLogin} />;
    }
  };

  return (
    <div className="App">
      
      {/* Show header on all pages EXCEPT login & register */}
      {currentPage !== "login" && currentPage !== "register" && (
        <Header setCurrentPage={setCurrentPage} />
      )}

      {renderPage()}
      
      {/* Simple Navigation for Demo - Remove in production */}
      {isAuthenticated && (
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
          <select 
            value={currentPage} 
            onChange={(e) => setCurrentPage(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            {userRole === 'patient' && (
              <>
                <option value="dashboard">Dashboard</option>
                <option value="health-records">Health Records</option>
                <option value="doctor-appointments">Doctor Appointments (Patient View)</option>
                <option value="profile">Profile</option>
                <option value="book-appointment">Book Appointment</option>
              </>
            )}
            {userRole === 'doctor' && (
              <>
                <option value="dashboard">Dashboard</option>
                <option value="health-records">Health Records</option>
                <option value="patient-appointments">Patient Appointments (Doctor View)</option>
                <option value="profile">Profile</option>
              </>
            )}
          </select>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '10px',
              padding: '8px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
              fontWeight: '500'
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
