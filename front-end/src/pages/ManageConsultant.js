import React, { useState, useEffect } from "react";
import { getConsultantInfo, editConsultant, addNotification } from "../service/api";
import "../styles/Consultant.css";

const Consultant = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [newCert, setNewCert] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageData, setMessageData] = useState({
    accountId: "",
    message: ""
  });
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    const fetchConsultantInfo = async () => {
      try {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));
        const userConsultantId = user.consultantId;

        const response = await getConsultantInfo(userConsultantId);
        if (response.error) {
          if (response.error.includes('403') || response.error.includes('Forbidden') || response.error.includes('400')) {
            setError("You do not have access to view consultant information.");
          } else {
            setError(response.error);
          }
        } else {
          setProfile(response);
        }
      } catch (err) {
        if (err.response?.status === 403 || err.response?.status === 400) {
          setError("You do not have access to view consultant information.");
        } else {
          setError("Failed to fetch consultant information");
        }
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
      const userConsultantId = user.consultantId;
      const response = await editConsultant(userConsultantId, editData);
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

  const handleSendMessage = async () => {
    if (!messageData.accountId || !messageData.message.trim()) {
      alert("Please fill in both Account ID and Message");
      return;
    }

    setMessageLoading(true);
    try {
      const response = await addNotification({
        accountId: parseInt(messageData.accountId),
        message: messageData.message.trim()
      });

      if (response && !response.error) {
        alert("Message sent successfully!");
        setShowMessageModal(false);
        setMessageData({ accountId: "", message: "" });
      } else {
        alert(response.error || "Failed to send message");
      }
    } catch (err) {
      alert("Failed to send message");
    } finally {
      setMessageLoading(false);
    }
  };

  const handleOpenMessageModal = () => {
    setShowMessageModal(true);
    setMessageData({ accountId: "", message: "" });
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
    setMessageData({ accountId: "", message: "" });
  };

  const c = editData;

  return (
    <div className="consultant-container">
      <h2 className="bg-blue-500 px-2 py-2 rounded-lg text-white text-2xl font-bold mb-4">Consultant Information</h2>

      <div className="info-field">
        <span className="info-label">Account Name:</span>
        <span className="info-value">{c.accountname}</span>
      </div>

      <div className="info-field">
        <span className="info-label">Full Name:</span>
        {editMode ? (
          <input type="text" name="fullName" value={c.fullName} onChange={handleChange} className="form-input" />
        ) : (
          <span className="info-value">{c.fullName}</span>
        )}
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
          <>
            <button onClick={handleEdit} className="edit-btn">Edit Profile</button>
            <button onClick={handleOpenMessageModal} className="message-btn">Send Message</button>
          </>
        )}
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Send Message to User</h3>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="accountId" className="form-label">Account ID:</label>
                <input
                  type="number"
                  id="accountId"
                  value={messageData.accountId}
                  onChange={(e) => setMessageData({ ...messageData, accountId: e.target.value })}
                  className="form-input"
                  placeholder="Enter user's Account ID"
                  min="1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message:</label>
                <textarea
                  id="message"
                  value={messageData.message}
                  onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                  className="form-textarea"
                  placeholder="Enter your message here..."
                  rows="4"
                />
              </div>
            </div>
            <div className="modal-actions">
              <button
                onClick={handleSendMessage}
                disabled={messageLoading}
                className="send-message-btn"
              >
                {messageLoading ? "Sending..." : "Send Message"}
              </button>
              <button onClick={handleCloseMessageModal} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultant;