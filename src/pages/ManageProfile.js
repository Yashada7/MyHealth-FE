import React, { useState } from "react";
import "./styles.css";

export function ManageProfile() {
  const [profileImage, setProfileImage] = useState("/default-profile.jpg");

  // When user uploads an image → preview it instantly
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="page-container profile-page">
      <div className="profile-wrapper">

        <h2 className="profile-title">Manage Profile</h2>

        {/* Profile Image Section */}
        <div className="profile-image-section">
          <img src="/Profilepic.jpeg" alt="Profile" className="profile-photo" />

          <label className="upload-btn">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {/* Form */}
        <form className="profile-form">
          <label>Full Name</label>
          <input type="text" placeholder="Rinkiya Gundu" />

          <label>Email</label>
          <input type="email" placeholder="gundu03@xyz.edu" />

          <label>Password</label>
          <input type="password" placeholder="************" />

          <label>Phone Number</label>
          <input type="text" placeholder="+1 (123) 456-7890" />

          <label>Emergency Contact Name</label>
          <input type="text" placeholder="Bharathwaj N" />

          <label>Emergency Contact Phone</label>
          <input type="text" placeholder="+1 (123) 456-7890" />

          <label>Relationship</label>
          <input type="text" placeholder="Brother" />

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
