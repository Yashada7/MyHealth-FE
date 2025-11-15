import React from 'react';
import './HealthRecords.css';

const HealthRecords = () => {
  const recordCategories = [
    {
      id: 1,
      title: 'X-Rays and MRIs',
      description: 'Link to the DataBase',
      image: 'xray',
      bgColor: '#e3f2fd'
    },
    {
      id: 2,
      title: 'Blood Reports',
      description: 'Link to the DataBase',
      image: 'blood',
      bgColor: '#fff3e0'
    },
    {
      id: 3,
      title: 'Body Scans',
      description: 'Link to the DataBase',
      image: 'scan',
      bgColor: '#e1f5fe'
    }
  ];

  return (
    <div className="medical-records-app">

      {/* Main Content */}
      <main className="main-container">
        {/* Welcome Section */}
        <section className="welcome-section">
          <h1 className="welcome-title">Welcome Yashada!</h1>
          <p className="welcome-subtitle">Access Your Medical Records Here</p>
        </section>

        {/* Medical Records Grid */}
        <section className="records-grid">
          {recordCategories.map((category) => (
            <div key={category.id} className="record-card">
              <div className={`record-image ${category.image}`} style={{ backgroundColor: category.bgColor }}>
                {category.image === 'xray' && (
                  <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="30" r="15" stroke="#2196F3" strokeWidth="2" fill="none" />
                    <circle cx="30" cy="60" r="12" stroke="#2196F3" strokeWidth="2" fill="none" />
                    <circle cx="70" cy="60" r="12" stroke="#2196F3" strokeWidth="2" fill="none" />
                    <circle cx="50" cy="80" r="8" stroke="#2196F3" strokeWidth="2" fill="none" />
                    <rect x="20" y="15" width="60" height="70" stroke="#2196F3" strokeWidth="1.5" fill="none" rx="5" />
                  </svg>
                )}
                {category.image === 'blood' && (
                  <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                    <rect x="25" y="20" width="15" height="50" stroke="#FF9800" strokeWidth="2" fill="none" rx="2" />
                    <rect x="45" y="30" width="15" height="40" stroke="#FF9800" strokeWidth="2" fill="none" rx="2" />
                    <rect x="65" y="25" width="15" height="45" stroke="#FF9800" strokeWidth="2" fill="none" rx="2" />
                    <line x1="20" y1="75" x2="85" y2="75" stroke="#FF9800" strokeWidth="2" />
                    <circle cx="30" cy="15" r="3" fill="#FF9800" />
                    <circle cx="50" cy="25" r="3" fill="#FF9800" />
                    <circle cx="72" cy="18" r="3" fill="#FF9800" />
                  </svg>
                )}
                {category.image === 'scan' && (
                  <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                    <path d="M30 30 L50 50 L30 70 M70 30 L50 50 L70 70" stroke="#03A9F4" strokeWidth="2" fill="none" />
                    <circle cx="50" cy="50" r="25" stroke="#03A9F4" strokeWidth="2" fill="none" />
                    <circle cx="50" cy="50" r="15" stroke="#03A9F4" strokeWidth="2" fill="none" />
                    <line x1="50" y1="20" x2="50" y2="25" stroke="#03A9F4" strokeWidth="2" />
                    <line x1="50" y1="75" x2="50" y2="80" stroke="#03A9F4" strokeWidth="2" />
                    <line x1="20" y1="50" x2="25" y2="50" stroke="#03A9F4" strokeWidth="2" />
                    <line x1="75" y1="50" x2="80" y2="50" stroke="#03A9F4" strokeWidth="2" />
                  </svg>
                )}
              </div>
              <div className="record-content">
                <h3 className="record-title">{category.title}</h3>
                <p className="record-description">{category.description}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="social-icons">
          <a href="#" className="social-link" aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a href="#" className="social-link" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="white" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
            </svg>
          </a>
          <a href="#" className="social-link" aria-label="YouTube">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
            </svg>
          </a>
          <a href="#" className="social-link" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HealthRecords;