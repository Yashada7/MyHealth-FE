import React from "react";
import "./styles.css";


export function ManageProfile() {
return (
<div className="page-container">



<div className="profile-wrapper">
<h2 className="profile-title">Manage Profile</h2>
<form className="profile-form">
<label>Full Name</label>
<input type="text" placeholder="Rinkiya Gundu" />


<label>Email</label>
<input type="email" placeholder="gundu03@xyz.edu" />


<label>Password</label>
<input type="password" />


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


