import React, { useState, useEffect } from "react";
import { getConsultantInfo, editConsultant } from "../service/api";
import "../styles/Consultant.css";

const Consultant = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [newCert, setNewCert] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultantInfo = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const consultantId = user?.consultantId || 1;

        const response = await getConsultantInfo(consultantId);
        if (response.error) {
          setError(response.error);
        } else {
          setProfile(response);
        }
      } catch (err) {
        setError("Failed to fetch consultant information");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultantInfo();
  }, []);

  useEffect(() => {
    if (profile) {
      setEditData(profile);
    }
  }, [profile]);

  if (loading) {
    return <div className="consultant-container status-message">Loading information...</div>;
  }

  if (error) {
    return <div className="consultant-container status-message error">Error: {error}</div>;
  }

  if (!profile || !editData) {
    return <div className="consultant-container status-message">Consultant information not found</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleCertChange = (idx, value) => {
    const updated = [...editData.certificateNames];
    updated[idx] = value;
    setEditData({ ...editData, certificateNames: updated });
  };

  const handleAddCert = () => {
    if (newCert.trim()) {
      setEditData({ ...editData, certificateNames: [...editData.certificateNames, newCert.trim()] });
      setNewCert("");
    }
  };

  const handleRemoveCert = (idx) => {
    const updated = editData.certificateNames.filter((_, i) => i !== idx);
    setEditData({ ...editData, certificateNames: updated });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditData(profile);
    setEditMode(false);
    setNewCert("");
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const consultantId = user?.consultantId || 1;
      const response = await editConsultant(consultantId, editData);
      if (response && !response.error) {
        setProfile(editData);
        setEditMode(false);
        setNewCert("");
        alert("Consultant information updated successfully!");
      } else {
        setError(response.error || "Failed to update consultant information");
      }
    } catch (err) {
      setError("Failed to update consultant information");
    } finally {
      setLoading(false);
    }
  };

  const c = editData;

  return (
    <div className="consultant-container">
      <h2 className="bg-blue-500 px-2 py-2 rounded-lg text-white text-2xl font-bold mb-4">Consultant Information</h2>
      <div className="info-field">
        <span className="info-label">Full Name:</span>
        {editMode ? (
          <input type="text" name="fullName" value={c.fullName} onChange={handleChange} className="form-input" />
        ) : (
          <span className="info-value">{c.fullName}</span>
        )}
      </div>

      <div className="info-field">
        <span className="info-label">Account Name:</span>
        <span className="info-value">{c.accountname}</span>
      </div>

      <div className="info-field">
        <span className="info-label">Date of Birth:</span>
        {editMode ? (
          <input type="date" name="dateOfBirth" value={c.dateOfBirth} onChange={handleChange} className="form-input" />
        ) : (
          <span className="info-value">{c.dateOfBirth}</span>
        )}
      </div>

      <div className="info-field">
        <span className="info-label">Gender:</span>
        {editMode ? (
          <select name="gender" value={c.gender} onChange={handleChange} className="form-input">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <span className="info-value">{c.gender}</span>
        )}
      </div>

      <div className="info-field">
        <span className="info-label">Address:</span>
        {editMode ? (
          <input type="text" name="address" value={c.address} onChange={handleChange} className="form-input" />
        ) : (
          <span className="info-value">{c.address}</span>
        )}
      </div>

      <div className="info-field">
        <span className="info-label">Main Certificate:</span>
        {editMode ? (
          <input type="text" name="certificate" value={c.certificate} onChange={handleChange} className="form-input" />
        ) : (
          <span className="info-value">{c.certificate}</span>
        )}
      </div>

      <div className="info-field">
        <span className="info-label">Other Certificates:</span>
        <div className="info-value-group">
          <ul className="certificate-list">
            {c.certificateNames.map((cert, idx) => (
              <li key={idx} className="certificate-item">
                {editMode ? (
                  <>
                    <input type="text" value={cert} onChange={(e) => handleCertChange(idx, e.target.value)} className="form-input" />
                    <button type="button" onClick={() => handleRemoveCert(idx)} className="remove-cert-btn" title="Remove certificate">
                      &times;
                    </button>
                  </>
                ) : (
                  cert
                )}
              </li>
            ))}
          </ul>
          {editMode && (
            <div className="add-cert-field">
              <input type="text" value={newCert} onChange={(e) => setNewCert(e.target.value)} placeholder="Add new certificate" className="form-input" />
              <button type="button" onClick={handleAddCert} className="add-cert-btn">
                Add
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="info-field">
        <span className="info-label">Consultation Price:</span>
        {editMode ? (
          <input type="number" name="price" value={c.price} onChange={handleChange} className="form-input" min={0} />
        ) : (
          <span className="info-value price-display">{c.price} USD / session</span>
        )}
      </div>

      <div className="action-buttons">
        {editMode ? (
          <>
            <button onClick={handleSave} className="save-btn">Save Changes</button>
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
          </>
        ) : (
          <button onClick={handleEdit} className="edit-btn">Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default Consultant;