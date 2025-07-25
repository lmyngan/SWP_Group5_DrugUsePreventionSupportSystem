import { useEffect, useState } from 'react';
import { eventData, addEvent, editEvent as editEventApi, deleteEvent } from '../service/api';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import * as Yup from 'yup';

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

// Thêm hàm formatType để chuyển type về dạng in hoa chữ cái đầu
const formatType = (type) => {
    if (!type) return '';
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
};

const eventSchema = Yup.object().shape({
  eventName: Yup.string().required('Event name is required'),
  description: Yup.string().required('Description is required'),
  location: Yup.string().required('Location is required'),
  startDate: Yup.string().required('Start date is required'),
  endDate: Yup.string().required('End date is required'),
});

const ManageEvent = () => {
    const [events, setEvents] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: "",
        description: "",
        date: new Date().toISOString().slice(0, 10),
        location: "",
        type: "",
        creatorFullName: "",
    });
    const [editId, setEditId] = useState(null);
    const [editEvent, setEditEvent] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [addError, setAddError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await eventData();
            if (Array.isArray(data)) setEvents(data);
            else if (Array.isArray(data.events)) setEvents(data.events);
            else setEvents([]);
        };
        fetchEvents();
    }, []);

    // Add
    const handleAddEvent = async () => {
        setAddError('');
        try {
            await eventSchema.validate(newEvent, { abortEarly: false });
            // Nếu hợp lệ, gọi API thêm event
            await addEvent({
                ...newEvent,
                startDate: new Date(newEvent.startDate).toISOString(),
                endDate: new Date(newEvent.endDate).toISOString(),
            });
            // Refetch events
            const data = await eventData();
            setEvents(Array.isArray(data) ? data : []);
            setShowAdd(false);
            setNewEvent({
                eventName: '',
                description: '',
                location: '',
                startDate: '',
                endDate: '',
            });
        } catch (err) {
            if (err.inner && err.inner.length > 0) {
                setAddError(err.inner.map(e => e.message).join(', '));
            } else {
                setAddError(err.message);
            }
        }
    };

    // Edit
    const handleEdit = (event) => {
        setEditId(event.eventId);
        setEditEvent({ ...event });
        setShowEditModal(true);
    };
    const handleSaveEdit = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const createdBy = user?.accountId || 0;
        const body = {
            name: editEvent.name,
            description: editEvent.description,
            date: new Date(editEvent.date).toISOString(),
            location: editEvent.location,
            createdBy,
            type: editEvent.type,
            eventId: editId
        };
        await editEventApi(editId, body);
        // Refetch events
        const data = await eventData();
        if (Array.isArray(data)) setEvents(data);
        else if (Array.isArray(data.events)) setEvents(data.events);
        else setEvents([]);
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
        await deleteEvent(deleteId);
        // Refetch events
        const data = await eventData();
        if (Array.isArray(data)) setEvents(data);
        else if (Array.isArray(data.events)) setEvents(data.events);
        else setEvents([]);
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
                <h2 className="bg-blue-500 px-2 py-2 rounded-lg text-white text-2xl font-bold mb-4">Event Management</h2>
                <button
                    className="mb-4 px-6 py-3 bg-blue-600 text-white rounded"
                    onClick={() => setShowAdd(true)}
                >
                    <IoMdAddCircle />
                </button>
                {/* Modal Add Event */}
                {showAdd && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg transition-all duration-300 ease-out transform opacity-100 scale-100 animate-fadeInScale">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Add New Event</h3>
                                <button
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                    onClick={() => setShowAdd(false)}
                                >
                                    <MdCancel />
                                </button>
                            </div>
                            {/* Hiển thị lỗi validate */}
                            {addError && (
                                <div className="text-red-500 mb-2">{addError}</div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <input className="border p-2" placeholder="Event Name" value={newEvent.name} onChange={e => setNewEvent(a => ({ ...a, name: e.target.value }))} />
                                <input className="border p-2" placeholder="Description" value={newEvent.description} onChange={e => setNewEvent(a => ({ ...a, description: e.target.value }))} />
                                <input className="border p-2" type="date" value={newEvent.date} onChange={e => setNewEvent(a => ({ ...a, date: e.target.value }))} />
                                <input className="border p-2" placeholder="Location" value={newEvent.location} onChange={e => setNewEvent(a => ({ ...a, location: e.target.value }))} />
                                <select className="border p-2" value={newEvent.type} onChange={e => setNewEvent(a => ({ ...a, type: e.target.value }))}>
                                    <option value="Awareness">Awareness</option>
                                    <option value="Education">Education</option>
                                    <option value="Support">Support</option>
                                </select>
                            </div>
                            <div className="flex justify-end mt-6 gap-2">
                                <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={() => setShowAdd(false)}><MdCancel /></button>
                                <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700" onClick={handleAddEvent}>Add</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="bg-gray-200 py-2 px-4 border">ID</th>
                                <th className="bg-gray-200 py-2 px-4 border">Event Name</th>
                                <th className="bg-gray-200 py-2 px-4 border">Description</th>
                                <th className="bg-gray-200 py-2 px-4 border">Date</th>
                                <th className="bg-gray-200 py-2 px-4 border">Location</th>
                                <th className="bg-gray-200 py-2 px-4 border">Type</th>
                                <th className="bg-gray-200 py-2 px-4 border">Creator</th>
                                <th className="bg-gray-200 py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, idx) => (
                                <tr key={event.eventId || idx}>
                                    <td className="py-2 px-4 border">{event.eventId}</td>
                                    <td className="py-2 px-4 border">{event.name}</td>
                                    <td className="py-2 px-4 border">{event.description}</td>
                                    <td className="py-2 px-4 border">{formatDateVN(event.date)}</td>
                                    <td className="py-2 px-4 border">{event.location}</td>
                                    <td className="py-2 px-4 border">{formatType(event.type)}</td>
                                    <td className="py-2 px-4 border">{event.creatorFullName}</td>
                                    <td className="py-2 px-4 border">
                                        <div className="flex items-center gap-2">
                                            <button className="bg-yellow-500 text-white px-6 py-3 rounded text-xs" onClick={() => handleEdit(event)}><FaEdit /></button>
                                            <button className="bg-red-500 text-white px-6 py-3 rounded text-xs" onClick={() => handleDelete(event.eventId)}><MdDelete /></button>
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
                            <h3 className="text-lg font-semibold">Edit Event</h3>
                            <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={handleCancelEdit}><MdCancel /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input className="border p-2" placeholder="Event Name" value={editEvent.name || ''} onChange={e => setEditEvent(ev => ({ ...ev, name: e.target.value }))} />
                            <input className="border p-2" placeholder="Description" value={editEvent.description || ''} onChange={e => setEditEvent(ev => ({ ...ev, description: e.target.value }))} />
                            <input className="border p-2" type="date" value={editEvent.date ? editEvent.date.slice(0, 10) : ''} onChange={e => setEditEvent(ev => ({ ...ev, date: e.target.value }))} />
                            <input className="border p-2" placeholder="Location" value={editEvent.location || ''} onChange={e => setEditEvent(ev => ({ ...ev, location: e.target.value }))} />
                            <select className="border p-2" value={editEvent.type || ''} onChange={e => setEditEvent(ev => ({ ...ev, type: e.target.value }))}>
                                <option value="Awareness">Awareness</option>
                                <option value="Education">Education</option>
                                <option value="Support">Support</option>
                            </select>
                            <input className="border p-2 bg-gray-100" placeholder="Creator" value={editEvent.creatorFullName || ''} disabled />
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
                        <h3 className="text-lg font-semibold mb-4">Delete Event Confirmation</h3>
                        <p className="mb-6">Are you sure you want to delete this event?</p>
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

export default ManageEvent;