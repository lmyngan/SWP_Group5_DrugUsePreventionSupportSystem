import { useState } from "react";
import { useNavigate } from "react-router-dom";


const DashBoardSidebar = ({ navigateTo, currentPage }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigateTo("dashboard");
        setOpen(false);
    };

    const handleConsultant = () => {
        navigateTo("manage-consultant");
        setOpen(false);
    };

    const handleBookAppointment = () => {
        navigateTo("manage-bookappointment");
        setOpen(false);
    };

    const handleEvent = () => {
        navigateTo("manage-event");
        setOpen(false);
    };

    const handleBlog = () => {
        navigateTo("manage-blog");
        setOpen(false);
    };

    const handleAccount = () => {
        navigateTo("manage-account");
        setOpen(false);
    };

    const handleReport = () => {
        navigateTo("report");
        setOpen(false);
    };

    const handleSidebarHome = () => {
        navigateTo("");
        setOpen(false);
    };

    const handleSidebarLogout = () => {
        localStorage.removeItem("user");
        navigateTo("");
        setOpen(false);
    };

    return (
        <>
            {/* Nút mở sidebar khi đang thu gọn */}
            {!open && (
                <button
                    className="fixed top-4 left-4 z-30 bg-gray-800 text-white p-2 rounded shadow"
                    onClick={() => setOpen(true)}
                    aria-label="Open sidebar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 z-20 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
                style={{ minWidth: "16rem" }}
            >
                {/* Nút thu gọn sidebar luôn hiển thị khi sidebar mở */}
                {open && (
                    <button
                        className="absolute top-4 right-4 cursor-pointer text-2xl text-white"
                        onClick={() => setOpen(false)}
                        aria-label="Close sidebar"
                    >
                        ✖
                    </button>
                )}
                <div className="menu-header text-xl font-bold mb-6">Menu</div>
                <div className="space-y-4 mt-8">
                    <button
                        className={`block w-full text-left p-3 rounded ${currentPage === "dashboard" ? "bg-gray-600" : "bg-gray-700"} hover:bg-gray-600`}
                        onClick={handleGoHome}>
                        Home
                    </button>
                    <button
                        className={`block w-full text-left p-3 rounded ${currentPage === "manage-consultant" ? "bg-gray-600" : "bg-gray-700"} hover:bg-gray-600`}
                        onClick={handleConsultant}>
                        Consultant
                    </button>
                    <button
                        className={`block w-full text-left p-3 rounded ${currentPage === "manage-bookappointment" ? "bg-gray-600" : "bg-gray-700"} hover:bg-gray-600`}
                        onClick={handleBookAppointment}>
                        Book Appointment
                    </button>
                    <button
                        className={`block w-full text-left p-3 rounded ${currentPage === "manage-event" ? "bg-gray-600" : "bg-gray-700"} hover:bg-gray-600`}
                        onClick={handleEvent}>
                        Event
                    </button>
                    <button
                        className={`block w-full text-left p-3 rounded ${currentPage === "manage-blog" ? "bg-gray-600" : "bg-gray-700"} hover:bg-gray-600`}
                        onClick={handleBlog}>
                        Blog
                    </button>
                    <button
                        className={`block w-full text-left p-3 rounded ${currentPage === "manage-account" ? "bg-gray-600" : "bg-gray-700"} hover:bg-gray-600`}
                        onClick={handleAccount}>
                        Account
                    </button>
                    <button
                        className={`block w-full text-left p-3 rounded ${currentPage === "report" ? "bg-gray-600" : "bg-gray-700"} hover:bg-gray-600`}
                        onClick={handleReport}>
                        Report
                    </button>
                </div>
                {/* Navbar dưới cùng */}
                <div className="absolute bottom-6 left-0 w-full flex flex-col items-center gap-2 px-4">
                    <button
                        className={`block w-full text-center p-3 rounded ${currentPage === "" ? "bg-gray-600" : "bg-gray-700"} hover:bg-gray-600`}
                        onClick={handleSidebarHome}>
                        Home
                    </button>
                    <button
                        className="w-full py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
                        onClick={handleSidebarLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default DashBoardSidebar;