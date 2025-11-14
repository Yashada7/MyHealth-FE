import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HealthRecords from './pages/HealthRecords';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import DoctorAvailability from './pages/DoctorAvailability';
import ManageProfile from './pages/ManageProfile';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />;
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'health-records':
        return <HealthRecords setCurrentPage={setCurrentPage} />;
      case 'appointments':
        return <Appointments setCurrentPage={setCurrentPage} />;
      case 'profile':
        return <Profile />;
        case 'doctor-availability':
          return <DoctorAvailability />;
        case 'manage-profile':
          return <ManageProfile />;
      default:
        return <Login />;
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
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '12px' }}>Navigation (Demo)</p>
        <select 
          value={currentPage} 
          onChange={(e) => setCurrentPage(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            cursor: 'pointer'
          }}
        >
          <option value="login">Login</option>
          <option value="register">Register</option>
          <option value="dashboard">Dashboard</option>
          <option value="health-records">Health Records</option>
          <option value="appointments">Appointments</option>
          <option value="profile">Profile</option>
        </select>
      </div>
    </div>
  );
}

export default App;
