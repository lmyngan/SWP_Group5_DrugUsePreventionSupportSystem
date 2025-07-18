import { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdCancel } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

// Format date dd/MM/yyyy
const formatDateVN = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (isNaN(d)) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

const ManageSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newSchedule, setNewSchedule] = useState({
        title: "",
        description: "",
        date: new Date().toISOString().slice(0, 10),
        time: "",
        location: "",
    });
    const [editId, setEditId] = useState(null);
    const [editSchedule, setEditSchedule] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        // TODO: Fetch schedules from API
        setSchedules([
            { id: 1, title: "Morning Session", description: "Consultation", date: "2024-07-20", time: "08:00-10:00", location: "Room 101" },
            { id: 2, title: "Afternoon Session", description: "Therapy", date: "2024-07-21", time: "14:00-16:00", location: "Room 102" },
        ]);
    }, []);

    // Add
    const handleAddSchedule = async () => {
        // TODO: Call API to add schedule
        setSchedules(prev => [
            ...prev,
            { ...newSchedule, id: Date.now() }
        ]);
        setShowAdd(false);
        setNewSchedule({
            title: "",
            description: "",
            date: new Date().toISOString().slice(0, 10),
            time: "",
            location: "",
        });
    };

    // Edit
    const handleEdit = (schedule) => {
        setEditId(schedule.id);
        setEditSchedule({ ...schedule });
        setShowEditModal(true);
    };
    const handleSaveEdit = async () => {
        // TODO: Call API to update schedule
        setSchedules(prev => prev.map(s => s.id === editId ? { ...editSchedule, id: editId } : s));
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
        // TODO: Call API to delete schedule
        setSchedules(prev => prev.filter(s => s.id !== deleteId));
        setShowDeleteModal(false);
        setDeleteId(null);
    };
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="bg-blue-500 px-2 py-2 rounded-lg text-white text-2xl font-bold mb-4">Schedule Management</h2>
                <button
                    className="mb-4 px-6 py-3 bg-blue-600 text-white rounded"
                    onClick={() => setShowAdd(true)}
                >
                    <IoMdAddCircle />
                </button>
                {/* Modal Add Schedule */}
                {showAdd && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg transition-all duration-300 ease-out transform opacity-100 scale-100 animate-fadeInScale">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Add New Schedule</h3>
                                <button
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                    onClick={() => setShowAdd(false)}
                                >
                                    <MdCancel />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input className="border p-2" placeholder="Title" value={newSchedule.title} onChange={e => setNewSchedule(a => ({ ...a, title: e.target.value }))} />
                                <input className="border p-2" placeholder="Description" value={newSchedule.description} onChange={e => setNewSchedule(a => ({ ...a, description: e.target.value }))} />
                                <input className="border p-2" type="date" value={newSchedule.date} onChange={e => setNewSchedule(a => ({ ...a, date: e.target.value }))} />
                                <input className="border p-2" placeholder="Time" value={newSchedule.time} onChange={e => setNewSchedule(a => ({ ...a, time: e.target.value }))} />
                                <input className="border p-2" placeholder="Location" value={newSchedule.location} onChange={e => setNewSchedule(a => ({ ...a, location: e.target.value }))} />
                            </div>
                            <div className="flex justify-end mt-6 gap-2">
                                <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={() => setShowAdd(false)}><MdCancel /></button>
                                <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700" onClick={handleAddSchedule}>Add</button>
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
                                <th className="bg-gray-200 py-2 px-4 border">Description</th>
                                <th className="bg-gray-200 py-2 px-4 border">Date</th>
                                <th className="bg-gray-200 py-2 px-4 border">Time</th>
                                <th className="bg-gray-200 py-2 px-4 border">Location</th>
                                <th className="bg-gray-200 py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map((schedule, idx) => (
                                <tr key={schedule.id || idx}>
                                    <td className="py-2 px-4 border">{schedule.id}</td>
                                    <td className="py-2 px-4 border">{schedule.title}</td>
                                    <td className="py-2 px-4 border">{schedule.description}</td>
                                    <td className="py-2 px-4 border">{formatDateVN(schedule.date)}</td>
                                    <td className="py-2 px-4 border">{schedule.time}</td>
                                    <td className="py-2 px-4 border">{schedule.location}</td>
                                    <td className="py-2 px-4 border">
                                        <div className="flex items-center gap-2">
                                            <button className="bg-yellow-500 text-white px-6 py-3 rounded text-xs" onClick={() => handleEdit(schedule)}><FaEdit /></button>
                                            <button className="bg-red-500 text-white px-6 py-3 rounded text-xs" onClick={() => handleDelete(schedule.id)}><MdDelete /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg transition-all duration-300 ease-out transform opacity-100 scale-100 animate-fadeInScale">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Edit Schedule</h3>
                            <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={handleCancelEdit}><MdCancel /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input className="border p-2" placeholder="Title" value={editSchedule.title || ''} onChange={e => setEditSchedule(ev => ({ ...ev, title: e.target.value }))} />
                            <input className="border p-2" placeholder="Description" value={editSchedule.description || ''} onChange={e => setEditSchedule(ev => ({ ...ev, description: e.target.value }))} />
                            <input className="border p-2" type="date" value={editSchedule.date ? editSchedule.date.slice(0, 10) : ''} onChange={e => setEditSchedule(ev => ({ ...ev, date: e.target.value }))} />
                            <input className="border p-2" placeholder="Time" value={editSchedule.time || ''} onChange={e => setEditSchedule(ev => ({ ...ev, time: e.target.value }))} />
                            <input className="border p-2" placeholder="Location" value={editSchedule.location || ''} onChange={e => setEditSchedule(ev => ({ ...ev, location: e.target.value }))} />
                        </div>
                        <div className="flex justify-end mt-6 gap-2">
                            <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={handleCancelEdit}><MdCancel /></button>
                            <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700" onClick={handleSaveEdit}>Save</button>
                        </div>
                    </div>
                </div>
            )}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm transition-all duration-300 ease-out transform opacity-100 scale-100 animate-fadeInScale">
                        <h3 className="text-lg font-semibold mb-4">Delete Schedule Confirmation</h3>
                        <p className="mb-6">Are you sure you want to delete this schedule?</p>
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

export default ManageSchedule;