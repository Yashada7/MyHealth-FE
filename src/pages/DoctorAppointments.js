import React, { useState } from 'react';
import './DoctorAppointments.css';
import { appointmentsData } from '../data/appointmentsData';

function DoctorAppointments({ onNavigate, onLogout }) {
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' or 'availability'
  const [appointments, setAppointments] = useState(appointmentsData);
  const [selectedDate, setSelectedDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Availability management states
  const getInitialBlockedSlots = () => {
    const today = new Date();
    const day2 = new Date(today);
    day2.setDate(today.getDate() + 2);
    const day4 = new Date(today);
    day4.setDate(today.getDate() + 4);
    
    return [
      { 
        date: `${day2.getFullYear()}-${String(day2.getMonth() + 1).padStart(2, '0')}-${String(day2.getDate()).padStart(2, '0')}`, 
        time: '11:30 AM', 
        reason: 'Personal Meeting' 
      },
      { 
        date: `${day4.getFullYear()}-${String(day4.getMonth() + 1).padStart(2, '0')}-${String(day4.getDate()).padStart(2, '0')}`, 
        time: '03:00 PM', 
        reason: 'Conference Call' 
      },
    ];
  };

  const [availabilityDate, setAvailabilityDate] = useState('');
  const [blockedSlots, setBlockedSlots] = useState(getInitialBlockedSlots());
  const [blockReason, setBlockReason] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [showBlockModal, setShowBlockModal] = useState(false);

  // Available time slots (9 AM to 5 PM, 30-minute intervals)
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Set current date when switching to availability tab for the first time
    if (tab === 'availability' && !availabilityDate) {
      setAvailabilityDate(getTodayDate());
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const handleDeleteAppointment = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments.filter(apt => apt.id !== id));
    }
  };

  // Block time slot
  const handleBlockTimeSlot = () => {
    if (!availabilityDate || !selectedTimeSlot || !blockReason) {
      alert('Please select a date, time slot, and provide a reason.');
      return;
    }

    const newBlock = {
      date: availabilityDate,
      time: selectedTimeSlot,
      reason: blockReason
    };

    setBlockedSlots([...blockedSlots, newBlock]);
    setSelectedTimeSlot('');
    setBlockReason('');
    setShowBlockModal(false);
    alert('Time slot blocked successfully!');
  };

  // Unblock time slot
  const handleUnblockTimeSlot = (date, time) => {
    if (window.confirm('Are you sure you want to unblock this time slot?')) {
      setBlockedSlots(blockedSlots.filter(slot => !(slot.date === date && slot.time === time)));
    }
  };

  // Open block modal
  const handleOpenBlockModal = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setBlockReason('');
    setShowBlockModal(true);
  };

  // Close block modal
  const handleCloseBlockModal = () => {
    setShowBlockModal(false);
    setSelectedTimeSlot('');
    setBlockReason('');
  };

  // Check if a time slot is blocked
  const isSlotBlocked = (time) => {
    return blockedSlots.some(slot => slot.date === availabilityDate && slot.time === time);
  };

  // Check if a time slot has an appointment
  const isSlotBooked = (time) => {
    return appointments.some(apt => apt.date === availabilityDate && apt.time === time);
  };

  // Get slot status
  const getSlotStatus = (time) => {
    if (isSlotBlocked(time)) return 'blocked';
    if (isSlotBooked(time)) return 'booked';
    return 'available';
  };

  // Filter appointments based on selected date and status
  const filteredAppointments = appointments.filter(apt => {
    const matchesDate = !selectedDate || apt.date === selectedDate;
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    return matchesDate && matchesStatus;
  });

  // Get unique dates for quick filter buttons
  const uniqueDates = [...new Set(appointments.map(apt => apt.date))].sort();

  // Get counts for stats
  const todayAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length;
  const pendingCount = appointments.filter(apt => apt.status === 'Pending').length;
  const confirmedCount = appointments.filter(apt => apt.status === 'Confirmed').length;
  const completedCount = appointments.filter(apt => apt.status === 'Completed').length;

  return (
    <div className="doctor-appointments-page">
      {/* Header */}
      <header className="page-header">
        <div className="header-content">
          <div className="logo-section">
            <h2 className="app-logo">MyHealth ❤️</h2>
          </div>
          <h1>Doctor Dashboard</h1>
          <div className="header-right">
            <span className="doctor-name">Dr. Sarah Smith</span>
            <button className="btn-logout" onClick={() => onLogout ? onLogout() : onNavigate('login')}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => handleTabChange('appointments')}
          >
            Manage Appointments
          </button>
          <button 
            className={`tab ${activeTab === 'availability' ? 'active' : ''}`}
            onClick={() => handleTabChange('availability')}
          >
            Manage Availability
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-content">
        {activeTab === 'appointments' ? (
          // Appointments Tab Content
          <>
            {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-row">
            <div className="date-filter">
              <label htmlFor="date-picker">Filter by Date:</label>
              <input
                type="date"
                id="date-picker"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
              />
              {selectedDate && (
                <button 
                  className="btn-clear-date"
                  onClick={() => setSelectedDate('')}
                >
                  Clear Date
                </button>
              )}
            </div>
            
            <div className="status-filter">
              <label htmlFor="status-filter">Status:</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="status-select"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Quick Date Filters */}
          <div className="quick-date-filters">
            <span className="filter-label">Quick filters:</span>
            <button 
              className={`quick-filter-btn ${!selectedDate ? 'active' : ''}`}
              onClick={() => setSelectedDate('')}
            >
              All Dates
            </button>
            {uniqueDates.map(date => {
              const dateObj = new Date(date + 'T00:00:00');
              const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              const count = appointments.filter(apt => apt.date === date).length;
              
              return (
                <button
                  key={date}
                  className={`quick-filter-btn ${selectedDate === date ? 'active' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  {formattedDate} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-label">Total</span>
            <span className="stat-value">{appointments.length}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Pending</span>
            <span className="stat-value pending">{pendingCount}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Confirmed</span>
            <span className="stat-value confirmed">{confirmedCount}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Completed</span>
            <span className="stat-value completed">{completedCount}</span>
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p>
            Showing <strong>{filteredAppointments.length}</strong> of <strong>{appointments.length}</strong> appointments
            {selectedDate && <span> for <strong>{new Date(selectedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></span>}
            {statusFilter !== 'All' && <span> with status: <strong>{statusFilter}</strong></span>}
          </p>
        </div>

        {/* Appointments List */}
        <div className="appointments-list">
          {filteredAppointments.length === 0 ? (
            <div className="no-appointments">
              <p>No appointments found for the selected filters.</p>
              <button 
                className="btn-reset-filters"
                onClick={() => {
                  setSelectedDate('');
                  setStatusFilter('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredAppointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="card-header">
                <div className="patient-info">
                  <div className="patient-avatar">
                    {appointment.patientName.charAt(0)}
                  </div>
                  <div className="patient-details">
                    <h3>{appointment.patientName}</h3>
                    <p className="patient-meta">Age: {appointment.age} | {appointment.phone}</p>
                  </div>
                </div>
                <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </span>
              </div>

              <div className="card-body">
                <div className="info-row">
                  <span className="info-label">Date & Time:</span>
                  <span className="info-value">{appointment.date} at {appointment.time}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Reason:</span>
                  <span className="info-value">{appointment.reason}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{appointment.email}</span>
                </div>
              </div>

              <div className="card-actions">
                {appointment.status === 'Pending' && (
                  <>
                    <button 
                      className="btn-action btn-confirm"
                      onClick={() => handleStatusChange(appointment.id, 'Confirmed')}
                    >
                      Confirm
                    </button>
                    <button 
                      className="btn-action btn-reject"
                      onClick={() => handleStatusChange(appointment.id, 'Cancelled')}
                    >
                      Reject
                    </button>
                  </>
                )}
                {appointment.status === 'Confirmed' && (
                  <button 
                    className="btn-action btn-complete"
                    onClick={() => handleStatusChange(appointment.id, 'Completed')}
                  >
                    Mark as Completed
                  </button>
                )}
                {(appointment.status === 'Completed' || appointment.status === 'Cancelled') && (
                  <button 
                    className="btn-action btn-delete"
                    onClick={() => handleDeleteAppointment(appointment.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
          )}
        </div>
          </>
        ) : (
          // Availability Tab Content
          <div className="availability-content">
            <div className="availability-header">
              <h2>Manage Your Availability</h2>
              <p>Select a date to view and manage your availability for that day</p>
            </div>

            <div className="date-selector">
              <label htmlFor="availability-date">Select Date:</label>
              <input
                type="date"
                id="availability-date"
                value={availabilityDate}
                onChange={(e) => setAvailabilityDate(e.target.value)}
                className="date-input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {availabilityDate && (
              <>
                <div className="availability-info">
                  <h3>Schedule for {new Date(availabilityDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                </div>

                <div className="time-slots-grid">
                  {timeSlots.map(time => {
                    const status = getSlotStatus(time);
                    const appointment = appointments.find(apt => apt.date === availabilityDate && apt.time === time);
                    const blockedSlot = blockedSlots.find(slot => slot.date === availabilityDate && slot.time === time);

                    return (
                      <div key={time} className={`time-slot ${status}`}>
                        <div className="time-slot-header">
                          <span className="time">{time}</span>
                          <span className={`status-indicator ${status}`}>
                            {status === 'available' && '✓ Available'}
                            {status === 'booked' && '📅 Booked'}
                            {status === 'blocked' && '🚫 Blocked'}
                          </span>
                        </div>

                        {status === 'booked' && appointment && (
                          <div className="slot-details">
                            <p><strong>{appointment.patientName}</strong></p>
                            <p className="reason">{appointment.reason}</p>
                          </div>
                        )}

                        {status === 'blocked' && blockedSlot && (
                          <div className="slot-details">
                            <p className="reason">{blockedSlot.reason}</p>
                            <button 
                              className="btn-unblock"
                              onClick={() => handleUnblockTimeSlot(availabilityDate, time)}
                            >
                              Unblock
                            </button>
                          </div>
                        )}

                        {status === 'available' && (
                          <button 
                            className="btn-block-slot"
                            onClick={() => handleOpenBlockModal(time)}
                          >
                            Block This Slot
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Blocked Slots Summary */}
                {blockedSlots.filter(slot => slot.date === availabilityDate).length > 0 && (
                  <div className="blocked-summary">
                    <h3>Blocked Slots for this day:</h3>
                    <ul>
                      {blockedSlots
                        .filter(slot => slot.date === availabilityDate)
                        .map((slot, index) => (
                          <li key={index}>
                            <strong>{slot.time}</strong> - {slot.reason}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {!availabilityDate && (
              <div className="no-date-selected">
                <p>Please select a date to view and manage your availability</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Block Time Slot Modal */}
      {showBlockModal && (
        <div className="modal-overlay" onClick={handleCloseBlockModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Block Time Slot</h3>
              <button className="modal-close" onClick={handleCloseBlockModal}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="selected-slot-info">
                <p><strong>Selected Time:</strong> {selectedTimeSlot}</p>
                <p><strong>Date:</strong> {new Date(availabilityDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="form-group">
                <label htmlFor="block-reason">Reason for blocking:</label>
                <select
                  id="block-reason"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  className="reason-select"
                >
                  <option value="">Select a reason</option>
                  <option value="Personal Meeting">Personal Meeting</option>
                  <option value="Conference Call">Conference Call</option>
                  <option value="Lunch Break">Lunch Break</option>
                  <option value="Training Session">Training Session</option>
                  <option value="Emergency Leave">Emergency Leave</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-confirm-block" onClick={handleBlockTimeSlot}>
                Confirm Block
              </button>
              <button className="btn-cancel-block" onClick={handleCloseBlockModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorAppointments;
