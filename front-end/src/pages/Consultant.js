import React, { useState, useEffect } from "react"
import { getConsultantInfo } from "../service/api"

const Consultant = () => {
  const [profile, setProfile] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState(null)
  const [newCert, setNewCert] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Lấy dữ liệu profile từ API
  useEffect(() => {
    const fetchConsultantInfo = async () => {
      try {
        setLoading(true)
        // Lấy consultantId từ localStorage hoặc từ user data
        const user = JSON.parse(localStorage.getItem("user"))
        const consultantId = user?.consultantId || 1 // Default to 1 if not found

        const response = await getConsultantInfo(consultantId)
        if (response.error) {
          setError(response.error)
        } else {
          setProfile(response)
        }
      } catch (err) {
        setError("Failed to fetch consultant information")
      } finally {
        setLoading(false)
      }
    }

    fetchConsultantInfo()
  }, [])

  useEffect(() => {
    if (profile) {
      setEditData(profile)
    }
  }, [profile])

  if (loading) {
    return <div className="max-w-xl mx-auto bg-white shadow rounded p-8 mt-8">Đang tải thông tin...</div>
  }

  if (error) {
    return <div className="max-w-xl mx-auto bg-white shadow rounded p-8 mt-8 text-red-600">Lỗi: {error}</div>
  }

  if (!profile || !editData) {
    return <div className="max-w-xl mx-auto bg-white shadow rounded p-8 mt-8">Không tìm thấy thông tin tư vấn viên</div>
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditData({ ...editData, [name]: value })
  }

  const handleCertChange = (idx, value) => {
    const updated = [...editData.certificateNames]
    updated[idx] = value
    setEditData({ ...editData, certificateNames: updated })
  }

  const handleAddCert = () => {
    if (newCert.trim()) {
      setEditData({ ...editData, certificateNames: [...editData.certificateNames, newCert.trim()] })
      setNewCert("")
    }
  }

  const handleRemoveCert = (idx) => {
    const updated = editData.certificateNames.filter((_, i) => i !== idx)
    setEditData({ ...editData, certificateNames: updated })
  }

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleCancel = () => {
    setEditData(profile)
    setEditMode(false)
    setNewCert("")
  }

  const handleSave = () => {
    setProfile(editData)
    setEditMode(false)
    setNewCert("")
    // TODO: Gọi API cập nhật thông tin ở đây
  }

  const c = editData

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Thông tin tư vấn viên</h2>
      <div className="mb-4">
        <span className="font-semibold">Họ tên: </span>
        {editMode ? (
          <input
            type="text"
            name="fullName"
            value={c.fullName}
            onChange={handleChange}
            className="border rounded px-2 py-1 ml-2"
          />
        ) : c.fullName}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Tên tài khoản: </span>{c.accountname}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Ngày sinh: </span>
        {editMode ? (
          <input
            type="date"
            name="dateOfBirth"
            value={c.dateOfBirth}
            onChange={handleChange}
            className="border rounded px-2 py-1 ml-2"
          />
        ) : c.dateOfBirth}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Giới tính: </span>
        {editMode ? (
          <select
            name="gender"
            value={c.gender}
            onChange={handleChange}
            className="border rounded px-2 py-1 ml-2"
          >
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
            <option value="Other">Khác</option>
          </select>
        ) : c.gender}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Địa chỉ: </span>
        {editMode ? (
          <input
            type="text"
            name="address"
            value={c.address}
            onChange={handleChange}
            className="border rounded px-2 py-1 ml-2"
          />
        ) : c.address}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Chứng chỉ chính: </span>
        {editMode ? (
          <input
            type="text"
            name="certificate"
            value={c.certificate}
            onChange={handleChange}
            className="border rounded px-2 py-1 ml-2"
          />
        ) : c.certificate}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Các chứng chỉ khác:</span>
        <ul className="list-disc ml-6">
          {c.certificateNames.map((cert, idx) =>
            editMode ? (
              <li key={idx} className="flex items-center mb-1">
                <input
                  type="text"
                  value={cert}
                  onChange={e => handleCertChange(idx, e.target.value)}
                  className="border rounded px-2 py-1 mr-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCert(idx)}
                  className="text-red-500 ml-1"
                  title="Xóa chứng chỉ"
                >
                  X
                </button>
              </li>
            ) : (
              <li key={idx}>{cert}</li>
            )
          )}
        </ul>
        {editMode && (
          <div className="flex mt-2">
            <input
              type="text"
              value={newCert}
              onChange={e => setNewCert(e.target.value)}
              placeholder="Thêm chứng chỉ mới"
              className="border rounded px-2 py-1 mr-2"
            />
            <button
              type="button"
              onClick={handleAddCert}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Thêm
            </button>
          </div>
        )}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Giá tư vấn: </span>
        {editMode ? (
          <input
            type="number"
            name="price"
            value={c.price}
            onChange={handleChange}
            className="border rounded px-2 py-1 ml-2"
            min={0}
          />
        ) : (
          <span className="text-green-700 font-bold">{c.price} USD / buổi</span>
        )}
      </div>
      <div className="flex gap-3 mt-6">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Lưu
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Hủy
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Chỉnh sửa
          </button>
        )}
      </div>
    </div>
  )
}

export default Consultant