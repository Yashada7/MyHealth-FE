import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HealthRecords.css';

function HealthRecords({ onLogout }) {
  const navigate = useNavigate();
  const [records] = useState([
    { id: 1, type: 'Lab Report', date: '2025-11-10', doctor: 'Dr. Smith', title: 'Blood Test Results' },
    { id: 2, type: 'Prescription', date: '2025-11-05', doctor: 'Dr. Johnson', title: 'Antibiotic Course' },
    { id: 3, type: 'Scan', date: '2025-10-28', doctor: 'Dr. Williams', title: 'X-Ray Report' },
    { id: 4, type: 'Lab Report', date: '2025-10-15', doctor: 'Dr. Smith', title: 'Cholesterol Check' }
  ]);

  return (
    <div className="health-records-container">
      <header className="records-header">
        <h1>Health Records</h1>
        <button className="btn-back" onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
      </header>

      <div className="records-content">
        <div className="records-actions">
          <button className="btn-upload">+ Upload New Record</button>
          <input type="text" placeholder="Search records..." className="search-input" />
        </div>

        <div className="records-grid">
          {records.map(record => (
            <div key={record.id} className="record-card">
              <div className="record-type">{record.type}</div>
              <h3>{record.title}</h3>
              <p className="record-info">
                <span>Date: {record.date}</span>
                <span>Doctor: {record.doctor}</span>
              </p>
              <div className="record-actions">
                <button className="btn-view">View</button>
                <button className="btn-download">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HealthRecords;
