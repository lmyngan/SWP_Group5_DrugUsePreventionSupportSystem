"use client"

import "../styles/AddPost.css"
import { useState } from "react"
import Footer from "../components/Footer"

const AddPost = () => {
  // State để lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    title: "",
    author: "Joe Smith", // Mặc định
    moderator: "",
    publishDate: new Date().toISOString().split("T")[0], // Ngày hiện tại
    allowComments: true,
    content: "",
  })

  // State để lưu trữ file đã upload
  const [uploadedFile, setUploadedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  // Hàm xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // Hàm xử lý upload file
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(file)

      // Tạo URL preview cho hình ảnh
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } else if (file.type.startsWith("video/")) {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      }
    }
  }

  // Hàm xử lý khi click vào vùng upload
  const handleUploadClick = () => {
    document.getElementById("fileInput").click()
  }

  // Hàm xử lý lưu bài viết
  const handleSave = () => {
    console.log("Saving post:", formData)
    console.log("Uploaded file:", uploadedFile)

    // Hiển thị thông báo thành công
    alert("Post saved successfully!")

    // Chuyển về trang blog
    window.location.href = "/blog"
  }

  // Hàm xử lý hủy
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All changes will be lost.")) {
      window.location.href = "/blog"
    }
  }

  return (
    <div className="add-post-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <button className="add-post-btn">ADD BLOG POST</button>
        </div>

        {/* Main Content */}
        <div className="add-post-content">
          {/* Left Side - File Upload */}
          <div className="upload-section">
            <div className="upload-area" onClick={handleUploadClick}>
              {previewUrl ? (
                <div className="preview-container">
                  {uploadedFile?.type.startsWith("image/") ? (
                    <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="preview-image" />
                  ) : uploadedFile?.type.startsWith("video/") ? (
                    <video src={previewUrl} className="preview-video" controls />
                  ) : null}
                  <div className="change-file-overlay">
                    <span>Click to change file</span>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📷</div>
                  <p>Click to upload image or video</p>
                  <small>Supports: JPG, PNG, MP4, MOV</small>
                </div>
              )}
            </div>

            {/* Hidden file input */}
            <input
              id="fileInput"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>

          {/* Right Side - Form */}
          <div className="form-section">
            {/* Blog Title */}
            <div className="form-group">
              <label htmlFor="title">Blog Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter blog title"
                className="form-input"
              />
            </div>

            {/* Author and Moderator Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="moderator">Blog Moderator</label>
                <input
                  type="text"
                  id="moderator"
                  name="moderator"
                  value={formData.moderator}
                  onChange={handleInputChange}
                  placeholder="Moderator name"
                  className="form-input"
                />
              </div>
            </div>

            {/* Publish Date */}
            <div className="form-group">
              <label htmlFor="publishDate">Publish Date</label>
              <input
                type="date"
                id="publishDate"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Allow Comments */}
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="allowComments"
                  checked={formData.allowComments}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Allow Comments
              </label>
              <small className="help-text">Blog comments will be sent to the moderator</small>
            </div>

            {/* Content Editor */}
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <div className="editor-toolbar">
                <button type="button" className="toolbar-btn" title="Bold">
                  B
                </button>
                <button type="button" className="toolbar-btn" title="Italic">
                  I
                </button>
                <button type="button" className="toolbar-btn" title="Underline">
                  U
                </button>
                <span className="toolbar-separator">|</span>
                <button type="button" className="toolbar-btn" title="Align Left">
                  ⬅
                </button>
                <button type="button" className="toolbar-btn" title="Align Center">
                  ⬌
                </button>
                <button type="button" className="toolbar-btn" title="Align Right">
                  ➡
                </button>
                <span className="toolbar-separator">|</span>
                <button type="button" className="toolbar-btn" title="Bullet List">
                  •
                </button>
                <button type="button" className="toolbar-btn" title="Number List">
                  1.
                </button>
                <span className="toolbar-separator">|</span>
                <button type="button" className="toolbar-btn" title="Link">
                  🔗
                </button>
                <button type="button" className="toolbar-btn" title="Image">
                  🖼
                </button>
              </div>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Type something..."
                className="content-editor"
                rows="8"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-section">
          <div className="social-media-section">
            <div className="social-icon">➕</div>
            <span>CREATE POST SCHEDULE FOR SOCIAL MEDIA</span>
          </div>

          <div className="action-buttons">
            <button className="cancel-btn" onClick={handleCancel}>
              CANCEL
            </button>
            <button className="save-btn" onClick={handleSave}>
              SAVE
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AddPost
