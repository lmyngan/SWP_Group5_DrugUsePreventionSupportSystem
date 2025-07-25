import { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdCancel } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { getScheduleData, addSchedule, deleteSchedule, editSchedule } from '../service/api';
import * as Yup from 'yup';

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

const scheduleSchema = Yup.object().shape({
    consultantId: Yup.number().min(1, 'Consultant ID is required').required('Consultant ID is required'),
    availableDate: Yup.string().required('Available date is required'),
    startTime: Yup.string().required('Start time is required'),
    endTime: Yup.string().required('End time is required'),
    slot: Yup.number().min(1, 'Slot must be at least 1').required('Slot is required'),
});

const ManageSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newSchedule, setNewSchedule] = useState({
        consultantId: 0,
        scheduleId: 0,
        availableDate: new Date().toISOString().slice(0, 10),
        startTime: '',
        endTime: '',
        slot: 1,
    });
    const [editId, setEditId] = useState(null);
    const [editScheduleData, setEditScheduleData] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [addError, setAddError] = useState('');
    const [addFieldErrors, setAddFieldErrors] = useState({});
    const [editError, setEditError] = useState('');

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
        setAddError('');
        setAddFieldErrors({});
        try {
            await scheduleSchema.validate(newSchedule, { abortEarly: false });
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
            return;
        }
        console.log('Adding schedule with data:', newSchedule);

        // Validate required fields
        if (!newSchedule.consultantId || newSchedule.consultantId === 0) {
            alert('Please enter a valid Consultant ID');
            return;
        }

        if (!newSchedule.startTime || !newSchedule.endTime) {
            alert('Please enter both start time and end time');
            return;
        }

        const res = await addSchedule(newSchedule);
        if (!res.error) {
            const data = await getScheduleData();
            if (Array.isArray(data)) setSchedules(data);
            else if (Array.isArray(data.data)) setSchedules(data.data);
            else setSchedules([]);
            setShowAdd(false);
            setNewSchedule({
                consultantId: 0,
                scheduleId: 0,
                availableDate: new Date().toISOString().slice(0, 10),
                startTime: '',
                endTime: '',
                slot: 1,
            });
        } else {
            console.error('Add schedule failed:', res.error);
            alert(`Failed to add schedule: ${res.error}`);
        }
    };

    // Edit (giữ nguyên logic, chỉ cập nhật trường nếu cần)
    const handleEdit = (schedule) => {
        setEditId(schedule.scheduleId);
        setEditScheduleData({ ...schedule });
        setShowEditModal(true);
    };
    const handleSaveEdit = async () => {
        setEditError('');
        try {
            await scheduleSchema.validate(editScheduleData, { abortEarly: false });
        } catch (err) {
            if (err.inner && err.inner.length > 0) {
                setEditError(err.inner.map(e => e.message).join(', '));
            } else {
                setEditError(err.message);
            }
            return;
        }
        const res = await editSchedule(editId, editScheduleData);
        if (!res.error) {
            const data = await getScheduleData();
            if (Array.isArray(data)) setSchedules(data);
            else if (Array.isArray(data.data)) setSchedules(data.data);
            else setSchedules([]);
            setEditId(null);
            setShowEditModal(false);
        } else {
            alert(res.error || 'Failed to update schedule');
        }
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
        console.log('Confirming delete for schedule ID:', deleteId);

        if (!deleteId) {
            alert('No schedule ID provided for deletion');
            return;
        }

        const res = await deleteSchedule(deleteId);
        if (!res.error) {
            const data = await getScheduleData();
            if (Array.isArray(data)) setSchedules(data);
            else if (Array.isArray(data.data)) setSchedules(data.data);
            else setSchedules([]);
            setShowDeleteModal(false);
            setDeleteId(null);
        } else {
            console.error('Delete schedule failed:', res.error);
            alert(`Failed to delete schedule: ${res.error}`);
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
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">Consultant ID</label>
                                    <input className="border p-2" type="number" placeholder="Consultant ID" value={newSchedule.consultantId} onChange={e => setNewSchedule(a => ({ ...a, consultantId: parseInt(e.target.value) || 0 }))} />
                                    {addFieldErrors.consultantId && <div className="text-red-500 text-xs mt-1">{addFieldErrors.consultantId}</div>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">Available Date</label>
                                    <input className="border p-2" type="date" value={newSchedule.availableDate} onChange={e => setNewSchedule(a => ({ ...a, availableDate: e.target.value }))} />
                                    {addFieldErrors.availableDate && <div className="text-red-500 text-xs mt-1">{addFieldErrors.availableDate}</div>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">Start Time</label>
                                    <input className="border p-2" placeholder="Start Time (hh:mm:ss)" value={newSchedule.startTime} onChange={e => setNewSchedule(a => ({ ...a, startTime: e.target.value }))} />
                                    {addFieldErrors.startTime && <div className="text-red-500 text-xs mt-1">{addFieldErrors.startTime}</div>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">End Time</label>
                                    <input className="border p-2" placeholder="End Time (hh:mm:ss)" value={newSchedule.endTime} onChange={e => setNewSchedule(a => ({ ...a, endTime: e.target.value }))} />
                                    {addFieldErrors.endTime && <div className="text-red-500 text-xs mt-1">{addFieldErrors.endTime}</div>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">Slot</label>
                                    <input className="border p-2" type="number" min={1} placeholder="Slot" value={newSchedule.slot} onChange={e => setNewSchedule(a => ({ ...a, slot: parseInt(e.target.value) || 0 }))} />
                                    {addFieldErrors.slot && <div className="text-red-500 text-xs mt-1">{addFieldErrors.slot}</div>}
                                </div>
                            </div>
                            {addError && <div className="text-red-500 mt-2 text-sm">{addError}</div>}
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
                                <th className="bg-gray-200 py-2 border">Consultant ID</th>
                                <th className="bg-gray-200 py-2 border">Available Date</th>
                                <th className="bg-gray-200 py-2 border">Time</th>
                                <th className="bg-gray-200 py-2 px-4 border">Slot</th>
                                <th className="bg-gray-200 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map((schedule, idx) => (
                                <tr key={schedule.scheduleId || idx}>
                                    <td className="py-2 px-4 border text-center">{schedule.scheduleId}</td>
                                    <td className="py-2 border text-center">{schedule.consultantId}</td>
                                    <td className="py-2 border text-center">{formatDateVN(schedule.availableDate)}</td>
                                    <td className="py-2 border text-center">{`${schedule.startTime} - ${schedule.endTime}`}</td>
                                    <td className="py-2 px-4 border text-center">{schedule.slot}</td>
                                    <td className="py-2 border text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="bg-yellow-500 text-white px-6 py-3 rounded text-xs hover:bg-yellow-600 transition-colors" onClick={() => handleEdit(schedule)}><FaEdit /></button>
                                            <button className="bg-red-500 text-white px-6 py-3 rounded text-xs hover:bg-red-600 transition-colors" onClick={() => handleDelete(schedule.scheduleId)}><MdDelete /></button>
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
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium">Consultant ID</label>
                                <input className="border p-2" type="number" placeholder="Consultant ID" value={editScheduleData.consultantId || 0} onChange={e => setEditScheduleData(ev => ({ ...ev, consultantId: parseInt(e.target.value) || 0 }))} />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium">Account ID</label>
                                <input className="border p-2" type="number" placeholder="Account ID" value={editScheduleData.accountId || 0} onChange={e => setEditScheduleData(ev => ({ ...ev, accountId: parseInt(e.target.value) || 0 }))} />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium">Available Date</label>
                                <input className="border p-2" type="date" value={editScheduleData.availableDate ? editScheduleData.availableDate.slice(0, 10) : ''} onChange={e => setEditScheduleData(ev => ({ ...ev, availableDate: e.target.value }))} />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium">Start Time</label>
                                <input className="border p-2" placeholder="Start Time (hh:mm:ss)" value={editScheduleData.startTime || ''} onChange={e => setEditScheduleData(ev => ({ ...ev, startTime: e.target.value }))} />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium">End Time</label>
                                <input className="border p-2" placeholder="End Time (hh:mm:ss)" value={editScheduleData.endTime || ''} onChange={e => setEditScheduleData(ev => ({ ...ev, endTime: e.target.value }))} />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium">Slot</label>
                                <input className="border p-2" type="number" min={1} placeholder="Slot" value={editScheduleData.slot || 1} onChange={e => setEditScheduleData(ev => ({ ...ev, slot: parseInt(e.target.value) || 0 }))} />
                            </div>
                        </div>
                        {editError && <div className="text-red-500 mt-2 text-sm">{editError}</div>}
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