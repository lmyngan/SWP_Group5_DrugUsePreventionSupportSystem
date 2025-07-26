import { useEffect, useState } from 'react';
import { blogData, addBlog, editBlog as editBlogApi, deleteBlog } from '../service/api';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import * as Yup from 'yup';

const blogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    categories: Yup.number().required('Categories is required').min(0, 'Categories must be a positive number'),
});

const ManageBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newBlog, setNewBlog] = useState({
        authorId: (() => {
            const user = JSON.parse(localStorage.getItem("user"));
            return user?.accountId || 0;
        })(),
        categories: 0,
        title: "",
        content: "",
        rate: 0,
        createdAt: new Date().toISOString(),
    });
    const [editId, setEditId] = useState(null);
    const [editBlog, setEditBlog] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [addError, setAddError] = useState('');
    const [addFieldErrors, setAddFieldErrors] = useState({});

    useEffect(() => {
        const fetchBlogs = async () => {
            const data = await blogData();
            setBlogs(Array.isArray(data) ? data : []);
        };
        fetchBlogs();
    }, []);

    const handleAddBlog = async () => {
        setAddError('');
        setAddFieldErrors({});
        try {
            await blogSchema.validate(newBlog, { abortEarly: false });
            const user = JSON.parse(localStorage.getItem("user"));
            const authorId = user?.accountId || 0;
            const authorFullName = user?.fullName || "";
            await addBlog({
                authorId: newBlog.authorId,
                categories: parseInt(newBlog.categories) || 0,
                title: newBlog.title,
                content: newBlog.content,
                rate: 0,
                createdAt: new Date().toISOString(),
            });
            // Refetch blogs
            const data = await blogData();
            setBlogs(Array.isArray(data) ? data : []);
            setShowAdd(false);
            setNewBlog({
                authorId: (() => {
                    const user = JSON.parse(localStorage.getItem("user"));
                    return user?.accountId || 0;
                })(),
                categories: 0,
                title: "",
                content: "",
                rate: 0,
                createdAt: new Date().toISOString(),
            });
        } catch (err) {
            if (err.inner && err.inner.length > 0) {
                const fieldErrors = {};
                err.inner.forEach(e => {
                    fieldErrors[e.path] = e.message;
                });
                setAddFieldErrors(fieldErrors);
            } else {
                setAddError(err.message);
            }
        }
    };

    // Edit
    const handleEdit = (blog) => {
        setEditId(blog.blogId);
        setEditBlog({ ...blog });
        setShowEditModal(true);
    };
    const handleSaveEdit = async () => {
        const original = blogs.find(b => b.blogId === editId);
        await editBlogApi(editId, {
            authorId: original?.authorId ?? 0,
            categories: parseInt(editBlog.categories) || 0,
            title: editBlog.title,
            content: editBlog.content,
            rate: original?.rate ?? 0,
        });
        // Refetch blogs
        const data = await blogData();
        setBlogs(Array.isArray(data) ? data : []);
        setEditId(null);
        setShowEditModal(false);
    };
    const handleCancelEdit = () => {
        setEditId(null);
        setShowEditModal(false);
    };

    // Delete
    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };
    const confirmDelete = async () => {
        await deleteBlog(deleteId);
        // Refetch blogs
        const data = await blogData();
        setBlogs(Array.isArray(data) ? data : []);
        setShowDeleteModal(false);
        setDeleteId(null);
    };
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    // Format date theo dd/MM/yyyy
    const formatDateVN = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        if (isNaN(d)) return '';
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="bg-blue-500 px-2 py-2 rounded-lg text-white text-2xl font-bold mb-4">Blog Management</h2>
                <div className="flex justify-between items-center mb-4">
                    <button
                        className="mb-4 px-6 py-3 bg-blue-600 text-white rounded"
                        onClick={() => setShowAdd(true)}
                    >
                        <IoMdAddCircle />
                    </button>
                </div>
                {/* Modal Add Blog */}
                {showAdd && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg transition-all duration-300 ease-out transform opacity-100 scale-100 animate-fadeInScale">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Add New Blog</h3>
                                <button
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                    onClick={() => setShowAdd(false)}
                                >
                                    <MdCancel />
                                </button>
                            </div>
                            {/* Hiển thị lỗi validate */}
                            {addError && (
                                <div className="text-red-500 mt-2">{addError}</div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    Title:
                                    <input className="border p-2 w-full" placeholder="Title" value={newBlog.title} onChange={e => setNewBlog(a => ({ ...a, title: e.target.value }))} />
                                    {addFieldErrors.title && <div className="text-red-500 text-xs mt-1">{addFieldErrors.title}</div>}
                                </div>
                                <div>
                                    Content:
                                    <input className="border p-2 w-full" placeholder="Content" value={newBlog.content} onChange={e => setNewBlog(a => ({ ...a, content: e.target.value }))} />
                                    {addFieldErrors.content && <div className="text-red-500 text-xs mt-1">{addFieldErrors.content}</div>}
                                </div>
                                <div>
                                    Rate:
                                    <input className="border p-2 w-full bg-gray-100" placeholder="Rate" value={newBlog.rate} disabled />
                                </div>
                                <div>
                                    Category:
                                    <input className="border p-2 w-full" type="number" placeholder="Categories (number)" value={newBlog.categories} onChange={e => setNewBlog(a => ({ ...a, categories: parseInt(e.target.value) || 0 }))} />
                                    {addFieldErrors.categories && <div className="text-red-500 text-xs mt-1">{addFieldErrors.categories}</div>}
                                </div>
                            </div>
                            <div className="flex justify-end mt-6 gap-2">
                                <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={() => setShowAdd(false)}><MdCancel /></button>
                                <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700" onClick={handleAddBlog}>Add</button>
                            </div>
                        </div>
                    </div>
                )}
                {showEditModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg transition-all duration-300 ease-out transform opacity-100 scale-100 animate-fadeInScale">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Edit Blog</h3>
                                <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={handleCancelEdit}><MdCancel /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input className="border p-2" placeholder="Title" value={editBlog.title || ''} onChange={e => setEditBlog(b => ({ ...b, title: e.target.value }))} />
                                <input className="border p-2" placeholder="Content" value={editBlog.content || ''} onChange={e => setEditBlog(b => ({ ...b, content: e.target.value }))} />
                                <input className="border p-2 bg-gray-100" placeholder="Rate" value={editBlog.rate || ''} disabled />
                                <input className="border p-2" type="number" placeholder="Categories (number)" value={editBlog.categories || 0} onChange={e => setEditBlog(b => ({ ...b, categories: parseInt(e.target.value) || 0 }))} />
                                <input className="border p-2" type="date" value={editBlog.createdAt ? editBlog.createdAt.slice(0, 10) : ''} onChange={e => setEditBlog(b => ({ ...b, createdAt: e.target.value }))} />
                                <input className="border p-2 bg-gray-100" placeholder="Creator" value={editBlog.authorFullName || ''} disabled />
                            </div>
                            <div className="flex justify-end mt-6 gap-2">
                                <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={handleCancelEdit}><MdCancel /></button>
                                <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700" onClick={handleSaveEdit}>Save</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="bg-gray-200 py-2 px-4 border">ID</th>
                                <th className="bg-gray-200 py-2 px-4 border">Title</th>
                                <th className="bg-gray-200 py-2 px-4 border">Content</th>
                                <th className="bg-gray-200 py-2 px-4 border">Rate</th>
                                <th className="bg-gray-200 py-2 px-4 border">Categories</th>
                                <th className="bg-gray-200 py-2 px-4 border">Created At</th>
                                <th className="bg-gray-200 py-2 px-4 border">Creator</th>
                                <th className="bg-gray-200 py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog, idx) => (
                                <tr key={blog.blogId || idx}>
                                    <td className="py-2 px-4 border">{blog.blogId}</td>
                                    <td className="py-2 px-4 border">{blog.title}</td>
                                    <td className="py-2 px-4 border">{blog.content}</td>
                                    <td className="py-2 px-4 border">{blog.rate}</td>
                                    <td className="py-2 px-4 border">{blog.categories}</td>
                                    <td className="py-2 px-4 border">{formatDateVN(blog.createdAt)}</td>
                                    <td className="py-2 px-4 border">{blog.authorFullName}</td>
                                    <td className="py-2 px-4 border">
                                        <div className="flex items-center gap-2">
                                            <button className="bg-yellow-500 text-white px-6 py-3 rounded text-xs" onClick={() => handleEdit(blog)}><FaEdit /></button>
                                            <button className="bg-red-500 text-white px-6 py-3 rounded text-xs" onClick={() => handleDelete(blog.blogId)}><MdDelete /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm transition-all duration-300 ease-out transform opacity-100 scale-100 animate-fadeInScale">
                        <h3 className="text-lg font-semibold mb-4">Delete Blog Confirmation</h3>
                        <p className="mb-6">Are you sure you want to delete this blog?</p>
                        <div className="flex justify-end gap-2">
                            <button className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700" onClick={confirmDelete}><MdDelete /></button>
                            <button className="px-6 py-3 bg-gray-300 text-white rounded hover:bg-gray-400" onClick={cancelDelete}><MdCancel /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBlog;