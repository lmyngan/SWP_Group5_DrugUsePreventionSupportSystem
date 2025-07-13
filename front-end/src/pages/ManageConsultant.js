import React, { useState, useEffect } from "react"

// Dữ liệu mẫu, sau này thay bằng API
const mockProfile = {
  consultant_id: 1,
  account_id: 3,
  fullName: "Jane Smith",
  dateOfBirth: "1985-08-22",
  gender: "Female",
  address: "789 Oak St",
  certificate: "Certified Substance Abuse Counselor",
  price: 100.0,
  certificates: [
    "Masters in Psychology"
  ],
  accountname: "jane_smith",
  email: "jane.smith@example.com"
}

const Consultant = () => {
  // Sau này thay mockProfile bằng dữ liệu từ API
  const [profile, setProfile] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState(null)
  const [newCert, setNewCert] = useState("")

  // Lấy dữ liệu profile (sau này thay bằng API call)
  useEffect(() => {
    setProfile(mockProfile)
  }, [])

 
  useEffect(() => {
    setEditData(profile)
  }, [profile])

  if (!profile || !editData) {
    return <div>Đang tải thông tin...</div>
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditData({ ...editData, [name]: value })
  }

  const handleCertChange = (idx, value) => {
    const updated = [...editData.certificates]
    updated[idx] = value
    setEditData({ ...editData, certificates: updated })
  }

  const handleAddCert = () => {
    if (newCert.trim()) {
      setEditData({ ...editData, certificates: [...editData.certificates, newCert.trim()] })
      setNewCert("")
    }
  }

  const handleRemoveCert = (idx) => {
    const updated = editData.certificates.filter((_, i) => i !== idx)
    setEditData({ ...editData, certificates: updated })
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
    // TODO: Gọi API cập nhật thông tin ở đây, 
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
        <span className="font-semibold">Email: </span>
        {editMode ? (
          <input
            type="email"
            name="email"
            value={c.email}
            onChange={handleChange}
            className="border rounded px-2 py-1 ml-2"
          />
        ) : c.email}
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
          {c.certificates.map((cert, idx) =>
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