import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles.css";

// ----------------- DoctorCard Component -----------------
function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      <img className="doctor-img" src={doctor.img} alt="doctor" />
      <h3 className="doctor-name">{doctor.name}</h3>
      <p className="specialization">{doctor.specialization}</p>
      <div className="patients-box">
        <p className="patients-label">Patients</p>
        <p className="patients-count">{doctor.patients}</p>
      </div>
    </div>
  );
}

// ----------------- TimeSlot Component -----------------
function TimeSlot({ slot, index, selectedSlot, onSelect, bookedSlots, selectedDate }) {
  const isAvailable = slot.status === "available" &&
    !bookedSlots.some(
      b => b.date === selectedDate.toDateString() && b.slot === slot.time
    );

  return (
    <div
      onClick={() => isAvailable && onSelect(slot.time)}
      className={`slot-box
        ${selectedSlot === slot.time ? "selected-slot" : ""}
        ${slot.status === "booked" || !isAvailable ? "booked" : ""}
        ${slot.status === "not-available" ? "not-available" : ""}`}
    >
      <span className="slot-index">{index + 1}.</span> {slot.time}
    </div>
  );
}

// ----------------- Main Component -----------------
function DoctorAvailability() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState(() => {
    return JSON.parse(localStorage.getItem("bookedSlots")) || [];
  });

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

  const handleBookSlot = () => {
    if (!selectedSlot) return;

    const booking = { date: selectedDate.toDateString(), slot: selectedSlot };
    const updated = [...bookedSlots, booking];
    setBookedSlots(updated);
    localStorage.setItem("bookedSlots", JSON.stringify(updated));

    window.location.href = "/manage-availability.html";
  };

  return (
    <div className="doctor-container">
      <div className="availability-content">

        {/* Doctor Card */}
        <DoctorCard
          doctor={{
            img: "/Profilepic.jpeg",
            name: "Dr. Nidhi Musale",
            specialization: "General Medicine",
            patients: 584,
          }}
        />

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
              Available Slots on{" "}
              <span className="date-highlight">{selectedDate.toDateString()}</span>
            </h3>

            <div className="slots-grid">
              {timeSlots.map((slot, index) => (
                <TimeSlot
                  key={slot.time}
                  slot={slot}
                  index={index}
                  selectedSlot={selectedSlot}
                  onSelect={setSelectedSlot}
                  bookedSlots={bookedSlots}
                  selectedDate={selectedDate}
                />
              ))}
            </div>

            {/* Slot Booked Button */}
            {selectedSlot && (
              <button className="slot-booked-btn" onClick={handleBookSlot}>
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
