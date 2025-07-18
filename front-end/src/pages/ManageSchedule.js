import { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdCancel } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { getScheduleData, addSchedule, deleteSchedule } from '../service/api';

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
        accountName: '',
        availableDate: new Date().toISOString().slice(0, 10),
        startTime: '',
        endTime: '',
        slot: 1,
        status: '',
    });
    const [editId, setEditId] = useState(null);
    const [editSchedule, setEditSchedule] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        const fetchSchedules = async () => {
            const res = await getScheduleData();
            if (Array.isArray(res)) setSchedules(res);
            else if (Array.isArray(res.data)) setSchedules(res.data);
            else setSchedules([]);
        };
        fetchSchedules();
    }, []);

    // Add
    const handleAddSchedule = async () => {
        const res = await addSchedule(newSchedule);
        if (!res.error) {
            const data = await getScheduleData();
            if (Array.isArray(data)) setSchedules(data);
            else if (Array.isArray(data.data)) setSchedules(data.data);
            else setSchedules([]);
            setShowAdd(false);
            setNewSchedule({
                accountName: '',
                availableDate: new Date().toISOString().slice(0, 10),
                startTime: '',
                endTime: '',
                slot: 1,
                status: '',
            });
        } else {
            alert(res.error || 'Failed to add schedule');
        }
    };

    // Edit (giữ nguyên logic, chỉ cập nhật trường nếu cần)
    const handleEdit = (schedule) => {
        setEditId(schedule.scheduleId);
        setEditSchedule({ ...schedule });
        setShowEditModal(true);
    };
    const handleSaveEdit = async () => {
        // TODO: Call API to update schedule nếu có
        setSchedules(prev => prev.map(s => s.scheduleId === editId ? { ...editSchedule, scheduleId: editId } : s));
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
        const res = await deleteSchedule(deleteId);
        if (!res.error) {
            const data = await getScheduleData();
            if (Array.isArray(data)) setSchedules(data);
            else if (Array.isArray(data.data)) setSchedules(data.data);
            else setSchedules([]);
            setShowDeleteModal(false);
            setDeleteId(null);
        } else {
            alert(res.error || 'Failed to delete schedule');
        }
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
                                <input className="border p-2" placeholder="Account Name" value={newSchedule.accountName} onChange={e => setNewSchedule(a => ({ ...a, accountName: e.target.value }))} />
                                <input className="border p-2" type="date" value={newSchedule.availableDate} onChange={e => setNewSchedule(a => ({ ...a, availableDate: e.target.value }))} />
                                <input className="border p-2" placeholder="Start Time (hh:mm:ss)" value={newSchedule.startTime} onChange={e => setNewSchedule(a => ({ ...a, startTime: e.target.value }))} />
                                <input className="border p-2" placeholder="End Time (hh:mm:ss)" value={newSchedule.endTime} onChange={e => setNewSchedule(a => ({ ...a, endTime: e.target.value }))} />
                                <input className="border p-2" type="number" min={1} placeholder="Slot" value={newSchedule.slot} onChange={e => setNewSchedule(a => ({ ...a, slot: e.target.value }))} />
                                <input className="border p-2" placeholder="Status" value={newSchedule.status} onChange={e => setNewSchedule(a => ({ ...a, status: e.target.value }))} />
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
                                <th className="bg-gray-200 py-2 px-4 border">Account Name</th>
                                <th className="bg-gray-200 py-2 px-4 border">Available Date</th>
                                <th className="bg-gray-200 py-2 px-4 border">Time</th>
                                <th className="bg-gray-200 py-2 px-4 border">Slot</th>
                                <th className="bg-gray-200 py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map((schedule, idx) => (
                                <tr key={schedule.scheduleId || idx}>
                                    <td className="py-2 px-4 border">{schedule.scheduleId}</td>
                                    <td className="py-2 px-4 border">{schedule.accountName}</td>
                                    <td className="py-2 px-4 border">{formatDateVN(schedule.availableDate)}</td>
                                    <td className="py-2 px-4 border">{`${schedule.startTime} - ${schedule.endTime}`}</td>
                                    <td className="py-2 px-4 border">{schedule.slot}</td>
                                    <td className="py-2 px-4 border">
                                        <div className="flex items-center gap-2">
                                            <button className="bg-yellow-500 text-white px-6 py-3 rounded text-xs" onClick={() => handleEdit(schedule)}><FaEdit /></button>
                                            <button className="bg-red-500 text-white px-6 py-3 rounded text-xs" onClick={() => handleDelete(schedule.scheduleId)}><MdDelete /></button>
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
                            <input className="border p-2" placeholder="Account Name" value={editSchedule.accountName || ''} onChange={e => setEditSchedule(ev => ({ ...ev, accountName: e.target.value }))} />
                            <input className="border p-2" type="date" value={editSchedule.availableDate ? editSchedule.availableDate.slice(0, 10) : ''} onChange={e => setEditSchedule(ev => ({ ...ev, availableDate: e.target.value }))} />
                            <input className="border p-2" placeholder="Start Time (hh:mm:ss)" value={editSchedule.startTime || ''} onChange={e => setEditSchedule(ev => ({ ...ev, startTime: e.target.value }))} />
                            <input className="border p-2" placeholder="End Time (hh:mm:ss)" value={editSchedule.endTime || ''} onChange={e => setEditSchedule(ev => ({ ...ev, endTime: e.target.value }))} />
                            <input className="border p-2" type="number" min={1} placeholder="Slot" value={editSchedule.slot || 1} onChange={e => setEditSchedule(ev => ({ ...ev, slot: e.target.value }))} />
                            <input className="border p-2" placeholder="Status" value={editSchedule.status || ''} onChange={e => setEditSchedule(ev => ({ ...ev, status: e.target.value }))} />
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