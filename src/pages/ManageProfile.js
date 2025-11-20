import React, { useState } from "react";
import "./styles.css";

// ---------------------- Reusable Form Field ----------------------
function FormField({ label, value, onChange, type = "text", placeholder }) {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}

// ---------------------- Profile Image Component ----------------------
function ProfileImageSection({ profileImage, onImageSelect }) {
  return (
    <div className="profile-image-section">
      <img src={profileImage} alt="Profile" className="profile-photo" />

      <label className="upload-btn">
        Change Photo
        <input
          type="file"
          accept="image/*"
          onChange={onImageSelect}
          className="hidden-input"
        />
      </label>
    </div>
  );
}

// ---------------------- Main Component ----------------------
export function ManageProfile() {
  const [profileImage, setProfileImage] = useState("/Profilepic.jpeg");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    emergencyName: "",
    emergencyPhone: "",
    relationship: "",
  });

  // Handle image upload preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  // Helper to update any form field
  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="page-container profile-page">
      <div className="profile-wrapper">
        <h2 className="profile-title">Manage Profile</h2>

        {/* Profile Picture */}
        <ProfileImageSection
          profileImage={profileImage}
          onImageSelect={handleImageChange}
        />

        {/* Form */}
        <form className="profile-form">
          <FormField
            label="Full Name"
            value={form.name}
            placeholder="Your Full Name"
            onChange={(v) => updateField("name", v)}
          />

          <FormField
            label="Email"
            type="email"
            value={form.email}
            placeholder="your@email.com"
            onChange={(v) => updateField("email", v)}
          />

          <FormField
            label="Password"
            type="password"
            value={form.password}
            placeholder="********"
            onChange={(v) => updateField("password", v)}
          />

          <FormField
            label="Phone Number"
            value={form.phone}
            placeholder="+1 (123) 456-7890"
            onChange={(v) => updateField("phone", v)}
          />

          <FormField
            label="Emergency Contact Name"
            value={form.emergencyName}
            placeholder="Contact Name"
            onChange={(v) => updateField("emergencyName", v)}
          />

          <FormField
            label="Emergency Contact Phone"
            value={form.emergencyPhone}
            placeholder="+1 (123) 456-7890"
            onChange={(v) => updateField("emergencyPhone", v)}
          />

          <FormField
            label="Relationship"
            value={form.relationship}
            placeholder="Father, Mother, Brother..."
            onChange={(v) => updateField("relationship", v)}
          />

          <div className="buttons">
            <button type="button" className="cancel-btn">Cancel</button>
            <button type="submit" className="update-btn">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManageProfile;
