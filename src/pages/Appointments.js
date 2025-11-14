import React, { useState } from 'react';
import './Appointments.css';
import './DoctorAvailability.js';

function Appointments() {
  const [currentPage, setCurrentPage] = useState("appointments");

  const [appointments] = useState([
    { id: 1, doctor: 'Dr. Sarah Smith', specialty: 'Cardiologist', date: '2025-11-15', time: '10:00 AM', status: 'Upcoming' },
    { id: 2, doctor: 'Dr. John Johnson', specialty: 'General Physician', date: '2025-11-20', time: '02:30 PM', status: 'Upcoming' },
    { id: 3, doctor: 'Dr. Emily Williams', specialty: 'Dermatologist', date: '2025-10-25', time: '11:00 AM', status: 'Completed' }
  ]);

  return (
    <div className="appointments-container">

      <div className="appointments-content">
        <div>
          <button
            className="btn-new-appointment"
            onClick={() => setCurrentPage("doctor-availability")}
          >
            + Book New Appointment
          </button>
        </div>

        <div className="appointments-list">
          {appointments.map(appointment => (
            <div key={appointment.id} className={`appointment-card ${appointment.status.toLowerCase()}`}>
              <div className="appointment-main">
                <div className="doctor-info">
                  <h3>{appointment.doctor}</h3>
                  <p className="specialty">{appointment.specialty}</p>
                </div>

                <div className="appointment-details">
                  <p className="date-time">
                    📅 {appointment.date} at {appointment.time}
                  </p>
                  <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>

              <div className="appointment-actions">
                {appointment.status === 'Upcoming' && (
                  <>
                    <button className="btn-reschedule">Reschedule</button>
                    <button className="btn-cancel">Cancel</button>
                  </>
                )}

                {appointment.status === 'Completed' && (
                  <button className="btn-view-notes">View Notes</button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Appointments;
