import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HealthRecords from './pages/HealthRecords';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Header from './components/Header';   // ⬅ ADD THIS

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
        return <Profile setCurrentPage={setCurrentPage} />;
      default:
        return <Login setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      
      {/* Show header on all pages EXCEPT login & register */}
      {currentPage !== "login" && currentPage !== "register" && (
        <Header setCurrentPage={setCurrentPage} />
      )}

      {renderPage()}
    </div>
  );
}

export default App;
