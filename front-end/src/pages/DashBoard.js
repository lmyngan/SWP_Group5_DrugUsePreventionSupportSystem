//import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState, useEffect } from "react";
import { getReportData, getTopUser, getTopEventDetail } from '../service/api';


const DashBoard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [topUsers, setTopUsers] = useState([]);
    const [topEvent, setTopEvent] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    useEffect(() => {
        const msg = localStorage.getItem('loginMessage');
        if (msg) {
            setModalMessage(msg);
            setModalOpen(true);
            localStorage.removeItem('loginMessage');
        }
    }, []);
    useEffect(() => {
        if (modalOpen) {
            const timer = setTimeout(() => setModalOpen(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [modalOpen]);

    // Dữ liệu mẫu cho Consultant Review Chart
    const consultantReviewData = [
        { name: '5 Stars', value: 12 },
        { name: '4 Stars', value: 8 },
        { name: '3 Stars', value: 3 },
        { name: '2 Stars', value: 1 },
        { name: '1 Star', value: 1 },
    ];
    const COLORS = ['#22c55e', '#2563eb', '#eab308', '#f97316', '#ef4444'];

    // Tính trung bình rating consultant
    const totalReviews = consultantReviewData.reduce((sum, d) => sum + d.value, 0);

    useEffect(() => {
        const fetchReport = async () => {
            setLoading(true);
            setError(null);
            const res = await getReportData();
            if (res && !res.error) {
                setReport(res);
            } else {
                setError(res.error || 'Failed to fetch report data');
            }

            const topUserRes = await getTopUser();
            if (topUserRes && !topUserRes.error) {
                setTopUsers(Array.isArray(topUserRes) ? topUserRes : [topUserRes]);
            }
            // Fetch top event detail
            const topEventRes = await getTopEventDetail();
            if (topEventRes && !topEventRes.error) {
                setTopEvent(topEventRes);
            }
            setLoading(false);
        };
        fetchReport();
    }, []);

    const stats = report ? [
        {
            value: `$${report.totalConsultingRevenue?.toLocaleString() || 0}`,
            icon: '',
            color: "bg-orange-100 text-orange-800 text-center",
            footer: `All Earnings`,
            footerColor: "bg-orange-500 text-white",
        },
        {
            value: `${report.averageBlogRating ? Number(report.averageBlogRating).toFixed(2) : '0.00'}`,
            icon: '',
            color: "bg-yellow-100 text-yellow-800",
            footer: `Blog Rating`,
            footerColor: "bg-yellow-500 text-white",
        },
        {
            value: `${report.totalEventFeedbackCount ?? 0}`,
            icon: '',
            color: "bg-green-100 text-green-800",
            footer: `Event Feedbacks`,
            footerColor: "bg-green-500 text-white",
        },
        {
            value: `${report.totalAppointmentsCompleted ?? 0}`,
            icon: '',
            color: "bg-blue-100 text-blue-800",
            footer: `Total Appointments Completed`,
            footerColor: "bg-blue-500 text-white",
        },
    ] : [];

    if (loading) return <div className="flex min-h-screen items-center justify-center">Loading report...</div>;
    if (error) return <div className="flex min-h-screen items-center justify-center text-red-600">Error: {error}</div>;
    return (
        <div className="flex min-h-screen">
            <div
                className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"} flex-1`}
                style={{ minHeight: "100vh" }}>
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 animate-fade-in">
                        <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xs flex flex-col items-center border border-blue-200 animate-fade-in">
                            <div className="mb-4 text-center text-green-500">{modalMessage}</div>
                        </div>
                    </div>
                )}
                <div className="flex-1 p-8 transition-all duration-300 peer-checked:ml-64">
                    {user && (
                        <h1 className="text-2xl font-bold mb-4 text-right">
                            Welcome, {user.fullName || user.accountname}!
                        </h1>
                    )}
                    <div className="flex-1 p-8 transition-all duration-300 peer-checked:ml-64">

                        <div className="flex flex-nowrap gap-6 justify-center mt-8 overflow-x-auto pb-2">
                            {stats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className={`rounded-xl shadow w-72 min-w-[260px] ${stat.color} flex flex-col justify-between`}
                                    style={{ minHeight: 140 }}
                                >
                                    <div className="flex flex-col items-center justify-center p-6 pb-2 min-h-[100px]">
                                        <div className="text-3xl font-bold text-center">{stat.value}</div>
                                        <div className="opacity-80 mt-2">{stat.icon}</div>
                                    </div>
                                    <div className={`rounded-b-xl px-6 py-2 text-sm flex items-center ${stat.footerColor}`}>
                                        {stat.footer}
                                        <span className="ml-auto">{idx % 2 === 0 ? <span>&#8599;</span> : <span>&#8600;</span>}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Charts Section: User Visits + 2 PieCharts ngang hàng */}
                        <div className="mt-8 flex flex-wrap gap-8 justify-center">
                            {/* Most Popular Event Participants BarChart */}
                            <div className="bg-white rounded shadow p-6 flex-1 min-w-[320px] max-w-[480px]">
                                <h2 className="text-xl font-semibold mb-4 text-center">Most Popular Event Participants</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={topEvent?.users || []}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="fullName" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="participationCount" fill="#2563eb" />
                                    </BarChart>
                                </ResponsiveContainer>
                                {topEvent && <div className="text-center mt-2 font-semibold">Event: {topEvent.eventName} (Total: {topEvent.totalParticipants})</div>}
                            </div>

                            <div className="bg-white rounded shadow p-6 flex-1 min-w-[320px] max-w-[480px]">
                                <h2 className="text-xl font-semibold mb-4 text-center">Consultant Interview Ratings</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={consultantReviewData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            label
                                        >
                                            {consultantReviewData.map((entry, index) => (
                                                <Cell key={`cell-review-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;