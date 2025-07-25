import { useState, useEffect } from 'react';
import { getReportData, getTopEventDetail, getTopUser } from '../service/api';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Report = () => {

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [topEventDetail, setTopEventDetail] = useState(null);
    const [topUser, setTopUser] = useState(null);

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
            setLoading(false);
        };
        const fetchTopEventDetail = async () => {
            const res = await getTopEventDetail();
            if (res && !res.error) setTopEventDetail(res);
        };
        const fetchTopUser = async () => {
            const res = await getTopUser();
            if (res && !res.error) setTopUser(res);
        };
        fetchReport();
        fetchTopEventDetail();
        fetchTopUser();
    }, []);

    const handleExportExcel = () => {
        if (!report) return;
        const rows = [
            ["Report Summary", ""],
            ["", ""],
            ["Total Consulting Revenue:", `$${report.totalConsultingRevenue}`],
            ["Total Event Feedback Count:", `${report.totalEventFeedbackCount}`],
            ["Average Event Rating:", `${Number(report.averageBlogRating).toFixed(2)}`],
            ["Total New Users This Month:", `${report.totalNewUsersThisMonth}`],
            ["Total Appointments Completed:", `${report.totalAppointmentsCompleted}`],
            ["", ""],
        ];

        if (topEventDetail) {
            rows.push(["Users in Most Joined Event", ""]);
            rows.push([`Event: ${topEventDetail.eventName}`, ""]);
            rows.push([`Total Participants: ${topEventDetail.users?.length || 0}`, ""]);
            rows.push(["Full Name", "Joined Times"]);
            if (topEventDetail.users && topEventDetail.users.length > 0) {
                topEventDetail.users.forEach(u => {
                    rows.push([u.fullName, u.participationCount]);
                });
            } else {
                rows.push(["No data", ""]);
            }
            rows.push(["", ""]);
        }

        if (topUser) {
            rows.push(["User Joined Most Events", ""]);
            rows.push(["Full Name", "Joined Events"]);
            rows.push([topUser.fullName, topUser.participationCount]);
            rows.push(["", ""]);
        }
        const maxLength = Math.max(...rows.map(r => (r[0] ? r[0].length : 0)), 10);
        const worksheet = XLSX.utils.aoa_to_sheet(rows);
        worksheet['!cols'] = [{ wch: maxLength + 2 }, { wch: 20 }];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const fileName = `Report_${dd}-${mm}-${yyyy}.xlsx`;
        saveAs(data, fileName);
    };

    if (loading) return <div className="container mx-auto p-6">Loading report...</div>;
    if (error) return <div className="container mx-auto p-6 text-red-600">Error: {error}</div>;

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="bg-blue-500 px-2 py-2 rounded-lg text-white text-2xl font-bold mb-4">Report Management</h2>
                <div className="mb-8">
                    <div className="text-lg font-semibold text-gray-700 mb-2">Total Consulting Revenue:</div>
                    <div className="text-2xl text-green-600 font-bold">${report.totalConsultingRevenue?.toLocaleString() || 0}</div>
                </div>
                <div className="mb-8">
                    <div className="text-lg font-semibold text-gray-700 mb-2">Total Event Feedback Count:</div>
                    <div className="text-2xl text-blue-500 font-bold">{report.totalEventFeedbackCount} Feedbacks</div>
                </div>
                <div className="mb-8">
                    <div className="text-lg font-semibold text-gray-700 mb-2">Average Event Rating:</div>
                    <div className="text-2xl text-blue-500 font-bold">{Number(report.averageBlogRating).toFixed(2)}</div>
                </div>
                <div className="mb-8">
                    <div className="text-lg font-semibold text-gray-700 mb-2">Total New Users This Month:</div>
                    <div className="text-2xl text-blue-500 font-bold">{report.totalNewUsersThisMonth} Users</div>
                </div>
                <div className="mb-8">
                    <div className="text-lg font-semibold text-gray-700 mb-2">Total Appointments Completed:</div>
                    <div className="text-2xl text-blue-500 font-bold">{report.totalAppointmentsCompleted} Appointments</div>
                </div>
                {topEventDetail && (
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl font-semibold text-gray-700">Users in Most Joined Event:</span>
                        </div>
                        <div className="bg-white border rounded-xl shadow p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div className="text-lg font-bold text-gray-700 flex items-center gap-2">
                                    Event: <span className="ml-1">{topEventDetail.eventName}</span>
                                </div>
                                <div className="text-md text-gray-600 mt-2 md:mt-0">Total Participants: <span className="font-bold text-gray-700">{topEventDetail.users?.length || 0}</span></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                                {topEventDetail.users && topEventDetail.users.map(u => (
                                    <div key={u.accountId} className="bg-white border border-blue-200 rounded-lg shadow-md p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-lg">
                                        <div className="font-semibold text-gray-700 text-center mb-1">{u.fullName}</div>
                                        <div className="text-xs text-gray-500 text-center">Joined: <span className="font-bold text-black">{u.participationCount}</span> times</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {topUser && (
                    <div className="mb-10">
                        <div className="flex items-start gap-2 mb-2">
                            <span className="text-xl font-semibold text-gray-700">User Joined Most Events:</span>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-white border rounded-lg shadow-md p-6 flex flex-col items-center w-full max-w-xs transition-transform hover:scale-105 hover:shadow-lg">
                                <div className="font-bold text-gray-700 text-lg text-center mb-1">{topUser.fullName}</div>
                                <div className="text-md text-gray-600 text-center">Joined Events: <span className="font-bold text-black">{topUser.participationCount}</span></div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex justify-end">
                    <button
                        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={handleExportExcel}>
                        Export to Excel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Report;