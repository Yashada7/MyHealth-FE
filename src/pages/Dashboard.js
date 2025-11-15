import React from 'react';
import './Dashboard.css';

const Dashboard = ({ setCurrentPage }) => {
  return (
    <div className="app">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">HealthCare Appointment Care</h1>
          <p className="hero-subtitle">Connecting Healthy Environment</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <h2 className="section-title">A little about us -</h2>

        <p className="description">
          No more phone tag with the clinic — our app lets you book, reschedule, and track your health
          in just a few taps. From appointment reminders to secure access to your medical records,
          everything you need is right at your fingertips.
        </p>

        <h3 className="features-title">Explore our features</h3>

        {/* Feature Cards */}
        <div className="features-grid">

          {/* Appointment Card */}
          <div
            className="feature-card"
            onClick={() => setCurrentPage("book-appointment")}
            style={{ cursor: "pointer" }}
          >
            <h4>Book an Appointment</h4>
          </div>

          {/* Notifications */}
          <div className="feature-card">
            <h4>Check Notifications</h4>
          </div>

          {/* Health Records */}
          <div
            className="feature-card"
            onClick={() => setCurrentPage("health-records")}
            style={{ cursor: "pointer" }}
          >
            <h4>Access Medical Record</h4>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 MyHealth</p>
      </footer>
    </div>
  );
};

export default Dashboard;
