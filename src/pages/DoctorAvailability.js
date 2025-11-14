import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles.css";

function DoctorAvailability() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Example time slots
  const timeSlots = [
    { time: "09:00 AM", status: "available" },
    { time: "09:30 AM", status: "booked" },
    { time: "10:00 AM", status: "not-available" },
    { time: "10:30 AM", status: "available" },
    { time: "11:00 AM", status: "booked" },
    { time: "11:30 AM", status: "available" },
    { time: "02:00 PM", status: "available" },
    { time: "02:30 PM", status: "not-available" },
    { time: "03:00 PM", status: "available" },
    { time: "04:00 PM", status: "booked" },
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  // BOOKING HANDLER — This is the new code you wanted
  const handleBookSlot = () => {
    if (!selectedSlot) return;

    // Save the booked slot
    const booking = {
      date: selectedDate.toDateString(),
      slot: selectedSlot,
    };

    localStorage.setItem("bookedSlot", JSON.stringify(booking));

    // Navigate WITHOUT React Router
    window.location.href = "/manage-availability.html"; 
  };

  return (
    <div className="doctor-container">
      <div className="availability-content">

        {/* Doctor Card */}
        <div className="doctor-card">
          <img
            className="doctor-img"
            src="/Profilepic.jpeg"
            alt="doctor"
          />
          <h3 className="doctor-name">Dr. Nidhi Musale</h3>
          <p className="specialization">General Medicine</p>

          <div className="patients-box">
            <p className="patients-label">Patients</p>
            <p className="patients-count">584</p>
          </div>
        </div>

        {/* Calendar + Slots */}
        <div className="calendar-section">
          <div className="calendar-header">
            <h3>Select a Date</h3>
          </div>

          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="custom-calendar"
          />

          {/* Time Slots */}
          <div className="slots-section">
            <h3 className="slot-title">
              Available Slots on 
              <span className="date-highlight"> {selectedDate.toDateString()}</span>
            </h3>

            <div className="slots-grid">
              {timeSlots.map((slot, index) => (
                <div
                  key={slot.time}
                  onClick={() =>
                    slot.status === "available" && setSelectedSlot(slot.time)
                  }
                  className={`slot-box 
                    ${selectedSlot === slot.time ? "selected-slot" : ""} 
                    ${slot.status === "booked" ? "booked" : ""} 
                    ${slot.status === "not-available" ? "not-available" : ""}`}
                >
                  <span className="slot-index">{index + 1}.</span> {slot.time}
                </div>
              ))}
            </div>

            {/* SLOT BOOKED BUTTON — only shows when a valid slot is picked */}
            {selectedSlot && (
              <button
                onClick={handleBookSlot}
                style={{
                  marginTop: "20px",
                  padding: "12px 20px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  width: "200px"
                }}
              >
                Slot Booked
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorAvailability;
