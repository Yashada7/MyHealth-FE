import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>MyHealth Dashboard</h1>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </header>
      
      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Upcoming Appointments</h3>
            <p className="stat-number">3</p>
          </div>
          <div className="stat-card">
            <h3>Health Records</h3>
            <p className="stat-number">12</p>
          </div>
          <div className="stat-card">
            <h3>Prescriptions</h3>
            <p className="stat-number">5</p>
          </div>
          <div className="stat-card">
            <h3>Lab Reports</h3>
            <p className="stat-number">8</p>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">Book Appointment</button>
            <button className="action-btn">View Records</button>
            <button className="action-btn">Upload Report</button>
            <button className="action-btn">Message Doctor</button>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul className="activity-list">
            <li>Appointment with Dr. Smith - Tomorrow at 10:00 AM</li>
            <li>Lab report uploaded - 2 days ago</li>
            <li>Prescription renewed - 1 week ago</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
