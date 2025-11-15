import React, { useState } from 'react';
import './BookAppointment.css';

function BookAppointment({ setCurrentPage }) {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Smith',
      availability: {
        '2025-11-18': ['09:00 AM', '10:00 AM', '02:00 PM'],
        '2025-11-19': ['11:00 AM', '01:00 PM']
      }
    },
    {
      id: 2,
      name: 'Dr. John Johnson',
      availability: {
        '2025-11-20': ['09:30 AM', '10:30 AM', '03:00 PM'],
        '2025-11-21': ['12:00 PM', '02:30 PM']
      }
    },
    {
      id: 3,
      name: 'Dr. Emily Williams',
      availability: {
        '2025-11-22': ['09:00 AM', '11:00 AM'],
        '2025-11-23': ['10:00 AM', '01:00 PM']
      }
    }
  ];

  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0].id);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const selectedDoctor = doctors.find(d => d.id === Number(selectedDoctorId));
  const availableDates = selectedDoctor ? Object.keys(selectedDoctor.availability) : [];
  const timesForDate = selectedDoctor && selectedDate ? (selectedDoctor.availability[selectedDate] || []) : [];

  const handleDoctorChange = (e) => {
    setSelectedDoctorId(e.target.value);
    setSelectedDate('');
    setSelectedTime('');
    setPatientName('');
    setSuccessMessage('');
    setCurrentMonth(new Date());
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
    setPatientName('');
    setSuccessMessage('');
  };

  // Calendar helpers
  const formatDateToYMD = (dateObj) => {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const getCalendarDays = (monthDate) => {
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    const startWeekday = start.getDay(); // 0 (Sun) - 6 (Sat)

    // number of days from previous month to show
    const prevDays = startWeekday;
    const totalCells = 42; // 6 weeks
    const days = [];

    // first day to show
    const first = new Date(start);
    first.setDate(first.getDate() - prevDays);

    for (let i = 0; i < totalCells; i++) {
      const d = new Date(first);
      d.setDate(first.getDate() + i);
      days.push(d);
    }

    return days;
  };

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setPatientName('');
    setSuccessMessage('');
  };

  const handleBook = () => {
    if (!patientName) {
      setSuccessMessage('Please enter patient name to book.');
      return;
    }

    // In-memory booking success (persistence not implemented)
    setSuccessMessage(`Appointment booked for ${patientName} with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`);
    // Optionally redirect back to patient appointments after a short delay
    setTimeout(() => {
      if (setCurrentPage) setCurrentPage('patient-appointments');
    }, 1200);
  };

  return (
    <div className="doctor-availability-container">

      <div className="availability-content">
        <div className="form-row">
          <label>Select Doctor</label>
          <select value={selectedDoctorId} onChange={handleDoctorChange}>
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>{doc.name}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Available Dates</label>
          <div className="calendar">
            <div className="calendar-header">
              <button className="cal-nav" onClick={prevMonth} aria-label="Previous month">◀</button>
              <div className="month-label">{currentMonth.toLocaleString(undefined, { month: 'long' })} {currentMonth.getFullYear()}</div>
              <button className="cal-nav" onClick={nextMonth} aria-label="Next month">▶</button>
            </div>

            <div className="weekday-row">
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>

            <div className="calendar-grid">
              {getCalendarDays(currentMonth).map((day) => {
                const ymd = formatDateToYMD(day);
                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                const isAvailable = availableDates.includes(ymd);
                const isSelected = selectedDate === ymd;

                const classes = ['calendar-cell'];
                if (!isCurrentMonth) classes.push('out-of-month');
                if (!isAvailable) classes.push('disabled');
                if (isAvailable) classes.push('available');
                if (isSelected) classes.push('selected');

                return (
                  <button
                    type="button"
                    key={ymd}
                    className={classes.join(' ')}
                    onClick={() => isAvailable && handleDateSelect(ymd)}
                    disabled={!isAvailable}
                  >
                    <div className="date-number">{day.getDate()}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {selectedDate && (
          <div className="form-row">
            <label>Available Times on {selectedDate}</label>
            <div className="times-list">
              {timesForDate.map(time => (
                <button key={time} className={`time-btn ${selectedTime === time ? 'active' : ''}`} onClick={() => handleTimeSelect(time)}>{time}</button>
              ))}
            </div>
          </div>
        )}

        {selectedTime && (
          <div className="form-row">
            <label>Patient Name</label>
            <input value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Enter patient name" />
            <div style={{ marginTop: 12 }}>
              <button className="btn-book" onClick={handleBook}>Book Appointment</button>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="success-alert">{successMessage}</div>
        )}
      </div>
    </div>
  );
}

export default BookAppointment;
