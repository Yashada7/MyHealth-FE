import React, { useState } from 'react';
import './DoctorAppointments.css';

function DoctorAppointments({ setCurrentPage }) {
  const [appointments] = useState([
    { id: 1, doctor: 'Dr. Sarah Smith', specialty: 'Cardiologist', date: '2025-11-15', time: '10:00 AM', status: 'Upcoming', diagnosis: '', treatment: '', prescription: '' },
    { id: 2, doctor: 'Dr. John Johnson', specialty: 'General Physician', date: '2025-11-20', time: '02:30 PM', status: 'Upcoming', diagnosis: '', treatment: '', prescription: '' },
    { id: 3, doctor: 'Dr. Emily Williams', specialty: 'Dermatologist', date: '2025-10-25', time: '11:00 AM', status: 'Completed', diagnosis: 'Mild dermatitis', treatment: 'Topical ointment', prescription: 'Apply cream twice daily' }
  ]);

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [showViewNotes, setShowViewNotes] = useState(false);
  const [notesAppointment, setNotesAppointment] = useState(null);

  const handleBookNewAppointment = () => {
    if (setCurrentPage) setCurrentPage('doctor-availability');
  };

  const handleCancelClick = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    console.log('Appointment cancelled:', selectedAppointmentId);
    setSuccessMessage('Appointment cancelled successfully!');
    setShowCancelConfirm(false);
    setSelectedAppointmentId(null);
    
    // Auto-hide success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const cancelConfirm = () => {
    setShowCancelConfirm(false);
    setSelectedAppointmentId(null);
  };

  const handleReschedule = () => {
    if (setCurrentPage) setCurrentPage('dashboard');
  };

  const openViewNotes = (appointment) => {
    setNotesAppointment(appointment);
    setShowViewNotes(true);
  };

  const closeViewNotes = () => {
    setNotesAppointment(null);
    setShowViewNotes(false);
  };

  return (
    <div className="appointments-container">

      {successMessage && (
        <div className="success-alert">
          <span className="success-icon">✓</span>
          {successMessage}
        </div>
      )}

      <div className="appointments-content">
        <button className="btn-new-appointment" onClick={handleBookNewAppointment}>+ Book New Appointment</button>

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
                    <button className="btn-reschedule" onClick={handleReschedule}>Reschedule</button>
                    <button className="btn-cancel" onClick={() => handleCancelClick(appointment.id)}>Cancel</button>
                  </>
                )}
                {appointment.status === 'Completed' && (
                  <button className="btn-view-notes" onClick={() => openViewNotes(appointment)}>View Notes</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCancelConfirm && (
        <div className="modal-overlay" onClick={cancelConfirm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Cancel Appointment</h2>
            <p>Are you sure you want to cancel this appointment?</p>
            <div className="modal-actions">
              <button className="btn-confirm" onClick={confirmCancel}>Yes, Cancel Appointment</button>
              <button className="btn-cancel-modal" onClick={cancelConfirm}>No, Keep Appointment</button>
            </div>
          </div>
        </div>
      )}

      {showViewNotes && notesAppointment && (
        <div className="modal-overlay" onClick={closeViewNotes}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Appointment Notes — {notesAppointment.doctor}</h2>
            <p><strong>Diagnosis:</strong></p>
            <p className="notes-text">{notesAppointment.diagnosis || 'N/A'}</p>
            <p><strong>Treatment:</strong></p>
            <p className="notes-text">{notesAppointment.treatment || 'N/A'}</p>
            <p><strong>Prescription:</strong></p>
            <p className="notes-text">{notesAppointment.prescription || 'N/A'}</p>
            <div className="modal-actions">
              <button className="btn-close" onClick={closeViewNotes}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorAppointments;
