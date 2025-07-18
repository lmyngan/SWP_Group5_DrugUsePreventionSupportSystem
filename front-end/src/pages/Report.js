import { useState, useEffect } from 'react';
import { getReportData } from '../service/api';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Report = () => {

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        fetchReport();
    }, []);

    const handleExportExcel = () => {
        if (!report) return;
        const rows = [
            ["Report Summary", ""],
            ["", ""],
            ["Total Consulting Revenue:", `$${report.totalConsultingRevenue}`],
            ["Total Event Feedback Count:", `${report.totalEventFeedbackCount}`],
            ["Average Event Rating:", `${report.averageEventRating}`],
            ["Total New Users This Month:", `${report.totalNewUsersThisMonth}`],
            ["Total Appointments Completed:", `${report.totalAppointmentsCompleted}`],
        ];

        const maxLength = Math.max(...rows.map(r => (r[0] ? r[0].length : 0)), 10);
        const worksheet = XLSX.utils.aoa_to_sheet(rows);
        worksheet['!cols'] = [{ wch: maxLength + 2 }, { wch: 10 }];
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
                    <div className="text-2xl text-blue-500 font-bold">{report.averageBlogRating}</div>
                </div>
                <div className="mb-8">
                    <div className="text-lg font-semibold text-gray-700 mb-2">Total New Users This Month:</div>
                    <div className="text-2xl text-blue-500 font-bold">{report.totalNewUsersThisMonth} Users</div>
                </div>
                <div className="mb-8">
                    <div className="text-lg font-semibold text-gray-700 mb-2">Total Appointments Completed:</div>
                    <div className="text-2xl text-blue-500 font-bold">{report.totalAppointmentsCompleted} Appointments</div>
                </div>
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