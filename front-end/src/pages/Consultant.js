import React, { useState, useEffect } from "react";
import "../styles/Consultant.css";

const Consultant = () => {
  const mockProfile = {
    consultant_id: 1,
    account_id: 3,
    fullName: "Jane Smith",
    dateOfBirth: "1985-08-22",
    gender: "Female",
    address: "789 Oak St, Springfield, IL 62704",
    certificate: "Certified Substance Abuse Counselor",
    price: 100.0,
    certificates: [
      "Masters in Psychology",
      "Licensed Professional Counselor (LPC)",
      "Cognitive Behavioral Therapy Certification"
    ],
    accountname: "jane_smith",
    email: "jane.smith@example.com"
  };

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [newCert, setNewCert] = useState("");

  useEffect(() => {
    setProfile(mockProfile);
  }, []);

  useEffect(() => {
    setEditData(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleCertChange = (idx, value) => {
    const updated = [...editData.certificates];
    updated[idx] = value;
    setEditData({ ...editData, certificates: updated });
  };

  const handleAddCert = () => {
    if (newCert.trim()) {
      setEditData({ 
        ...editData, 
        certificates: [...editData.certificates, newCert.trim()] 
      });
      setNewCert("");
    }
  };

  const handleRemoveCert = (idx) => {
    const updated = editData.certificates.filter((_, i) => i !== idx);
    setEditData({ ...editData, certificates: updated });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditData(profile);
    setEditMode(false);
    setNewCert("");
  };

  const handleSave = () => {
    setProfile(editData);
    setEditMode(false);
    setNewCert("");
  };

  if (!profile || !editData) {
    return <div className="loading-spinner"></div>;
  }

  const c = editData;

  return (
    <div className="consultant-container">
      <div className="profile-header">
        <h2>Consultant Profile</h2>
      </div>
      
      <div className="profile-content">
        {/* Personal Information Column */}
        <div className="personal-info">
          <div className="info-card">
            <h3>Personal Information</h3>
            
            <div className="info-section">
              <div className="info-field">
                <label>Full Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="fullName"
                    value={c.fullName}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{c.fullName}</p>
                )}
              </div>

              <div className="info-field">
                <label>Username</label>
                <p>{c.accountname}</p>
              </div>

              <div className="info-field">
                <label>Email</label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={c.email}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{c.email}</p>
                )}
              </div>

              <div className="info-field">
                <label>Date of Birth</label>
                {editMode ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={c.dateOfBirth}
                    onChange={handleChange}
                  />
                ) : (
                  <p>
                    {new Date(c.dateOfBirth).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>

              <div className="info-field">
                <label>Gender</label>
                {editMode ? (
                  <select
                    name="gender"
                    value={c.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p>{c.gender}</p>
                )}
              </div>

              <div className="info-field">
                <label>Address</label>
                {editMode ? (
                  <textarea
                    name="address"
                    value={c.address}
                    onChange={handleChange}
                    rows={3}
                  />
                ) : (
                  <p>{c.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Information Column */}
        <div className="professional-info">
          <div className="info-card">
            <h3>Professional Information</h3>
            
            <div className="info-section">
              <div className="info-field">
                <label>Main Certificate</label>
                {editMode ? (
                  <input
                    type="text"
                    name="certificate"
                    value={c.certificate}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{c.certificate}</p>
                )}
              </div>

              <div className="info-field">
                <label>Consultation Price</label>
                {editMode ? (
                  <div className="price-input">
                    <span>$</span>
                    <input
                      type="number"
                      name="price"
                      value={c.price}
                      onChange={handleChange}
                      min={0}
                      step="0.01"
                    />
                    <span>/ session</span>
                  </div>
                ) : (
                  <p className="price-display">
                    <span>${c.price.toFixed(2)}</span> per session
                  </p>
                )}
              </div>

              <div className="info-field">
                <label>Certifications & Qualifications</label>
                <ul className="certificates-list">
                  {c.certificates.map((cert, idx) =>
                    editMode ? (
                      <li key={idx} className="certificate-edit">
                        <input
                          type="text"
                          value={cert}
                          onChange={(e) => handleCertChange(idx, e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveCert(idx)}
                          title="Remove certificate"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </li>
                    ) : (
                      <li key={idx} className="certificate-view">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{cert}</span>
                      </li>
                    )
                  )}
                </ul>
                
                {editMode && (
                  <div className="add-certificate">
                    <input
                      type="text"
                      value={newCert}
                      onChange={(e) => setNewCert(e.target.value)}
                      placeholder="Add new certification"
                    />
                    <button
                      type="button"
                      onClick={handleAddCert}
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        {editMode ? (
          <>
            <button onClick={handleSave} className="save-btn">
              Save Changes
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleEdit} className="edit-btn">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Consultant;