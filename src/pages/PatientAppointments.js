import React, { useState } from 'react';
import './PatientAppointments.css';

function PatientAppointments({ setCurrentPage }) {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'Ms. Yashada Ajit Tembe', age: 28, healthIssue: 'Hypertension', date: '2025-11-15', time: '10:00 AM', status: 'Upcoming', diagnosis: '', treatment: '', prescription: '' },
    { id: 2, patient: 'Mr. Bharathwaj Nedoumaran', age: 32, healthIssue: 'Diabetes', date: '2025-11-20', time: '02:30 PM', status: 'Upcoming', diagnosis: '', treatment: '', prescription: '' },
    { id: 3, patient: 'Mr. Ravi Teja Gundu', age: 45, healthIssue: 'Eczema', date: '2025-10-25', time: '11:00 AM', status: 'Completed', diagnosis: 'Mild eczema on arms', treatment: 'Topical steroid cream', prescription: 'Hydrocortisone 1% twice daily' },
    { id: 4, patient: 'Ms. Nidhi Musale', age: 30, healthIssue: 'Migraine', date: '2025-10-20', time: '11:00 AM', status: 'Completed', diagnosis: 'Chronic migraine', treatment: 'Preventive medication', prescription: 'Propranolol 40mg daily' }
  ]);

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [infoPatient, setInfoPatient] = useState(null);

  const [showPatientFiles, setShowPatientFiles] = useState(false);
  const [filesPatient, setFilesPatient] = useState(null);
  const [fileFields, setFileFields] = useState({ diagnosis: '', treatment: '', prescription: '' });

  const [showViewNotes, setShowViewNotes] = useState(false);
  const [notesPatient, setNotesPatient] = useState(null);

  const handleCancelClick = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    console.log('Appointment cancelled:', selectedAppointmentId);
    setSuccessMessage('Patient Appointment Cancelled Successfully!');
    setShowCancelConfirm(false);
    setSelectedAppointmentId(null);
    
    // Auto-hide success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const cancelConfirm = () => {
    setShowCancelConfirm(false);
    setSelectedAppointmentId(null);
  };

  const openPatientInfo = (appointment) => {
    setInfoPatient(appointment);
    setShowPatientInfo(true);
  };

  const closePatientInfo = () => {
    setInfoPatient(null);
    setShowPatientInfo(false);
  };

  const openPatientFiles = (appointment) => {
    setFilesPatient(appointment);
    setFileFields({ diagnosis: appointment.diagnosis, treatment: appointment.treatment, prescription: appointment.prescription });
    setShowPatientFiles(true);
  };

  const closePatientFiles = () => {
    setFilesPatient(null);
    setShowPatientFiles(false);
  };

  const handleFileChange = (e) => {
    const { name, value } = e.target;
    setFileFields(prev => ({ ...prev, [name]: value }));
  };

  const savePatientFiles = () => {
    if (!filesPatient) return;
    setAppointments(prev => prev.map(a => a.id === filesPatient.id ? { ...a, diagnosis: fileFields.diagnosis, treatment: fileFields.treatment, prescription: fileFields.prescription } : a));
    setSuccessMessage('Patient files saved successfully for ' + filesPatient.patient + '!');
    setShowPatientFiles(false);
    setFilesPatient(null);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const openViewNotes = (appointment) => {
    setNotesPatient(appointment);
    setShowViewNotes(true);
  };

  const closeViewNotes = () => {
    setNotesPatient(null);
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

        <div className="appointments-list">
          {appointments.map(appointment => (
            <div key={appointment.id} className={`appointment-card ${appointment.status.toLowerCase()}`}>
              <div className="appointment-main">
                <div className="patient-info">
                  <h3>{appointment.patient}</h3>
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
                    <button className="btn-patient-information" onClick={() => openPatientInfo(appointment)}>Patient Information</button>
                    <button className="btn-patient-files" onClick={() => openPatientFiles(appointment)}>Patient Files</button>
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

      {showPatientInfo && infoPatient && (
        <div className="modal-overlay" onClick={closePatientInfo}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Patient Information</h2>
            <p><strong>Name:</strong> {infoPatient.patient}</p>
            <p><strong>Age:</strong> {infoPatient.age}</p>
            <p><strong>Health Issue:</strong> {infoPatient.healthIssue}</p>
            <p><strong>Appointment Date:</strong> {infoPatient.date}</p>
            <p><strong>Appointment Time:</strong> {infoPatient.time}</p>
            <p><strong>Status:</strong> {infoPatient.status}</p>
            <div className="modal-actions">
              <button className="btn-close" onClick={closePatientInfo}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showPatientFiles && filesPatient && (
        <div className="modal-overlay" onClick={closePatientFiles}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Patient Files — {filesPatient.patient}</h2>
            <div className="form-group">
              <label>Diagnosis</label>
              <textarea name="diagnosis" value={fileFields.diagnosis} onChange={handleFileChange} />
            </div>
            <div className="form-group">
              <label>Treatment</label>
              <textarea name="treatment" value={fileFields.treatment} onChange={handleFileChange} />
            </div>
            <div className="form-group">
              <label>Prescription</label>
              <textarea name="prescription" value={fileFields.prescription} onChange={handleFileChange} />
            </div>
            <div className="modal-actions">
              <button className="btn-save" onClick={savePatientFiles}>Save</button>
              <button className="btn-cancel-modal" onClick={closePatientFiles}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showViewNotes && notesPatient && (
        <div className="modal-overlay" onClick={closeViewNotes}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Patient Notes — {notesPatient.patient}</h2>
            <p><strong>Diagnosis:</strong></p>
            <p className="notes-text">{notesPatient.diagnosis || 'N/A'}</p>
            <p><strong>Treatment:</strong></p>
            <p className="notes-text">{notesPatient.treatment || 'N/A'}</p>
            <p><strong>Prescription:</strong></p>
            <p className="notes-text">{notesPatient.prescription || 'N/A'}</p>
            <div className="modal-actions">
              <button className="btn-close" onClick={closeViewNotes}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientAppointments;
