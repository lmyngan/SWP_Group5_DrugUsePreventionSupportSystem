import { useEffect, useState } from 'react';
import { eventData } from '../service/api';

const ManageEvent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await eventData();
            if (Array.isArray(data)) setEvents(data);
            else if (Array.isArray(data.events)) setEvents(data.events);
            else setEvents([]);
        };
        fetchEvents();

    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Event Management</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">Event Name</th>
                            <th className="py-2 px-4 border">Description</th>
                            <th className="py-2 px-4 border">Date</th>
                            <th className="py-2 px-4 border">Location</th>
                            <th className="py-2 px-4 border">Type</th>
                            <th className="py-2 px-4 border">Creator</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, idx) => (
                            <tr key={event.eventId || idx}>
                                <td className="py-2 px-4 border">{event.eventId}</td>
                                <td className="py-2 px-4 border">{event.name}</td>
                                <td className="py-2 px-4 border">{event.description}</td>
                                <td className="py-2 px-4 border">{event.date}</td>
                                <td className="py-2 px-4 border">{event.location}</td>
                                <td className="py-2 px-4 border">{event.type}</td>
                                <td className="py-2 px-4 border">{event.creatorFullName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageEvent;