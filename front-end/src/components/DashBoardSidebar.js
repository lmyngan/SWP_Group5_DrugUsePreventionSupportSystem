import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const DashBoardSidebar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const handleGoHome = () => {
        navigate("/");
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
                    <Link to="/dashboard" className="block p-3 bg-gray-700 rounded hover:bg-gray-600" onClick={() => setOpen(false)}>
                        Home
                    </Link>

                     

                    <Link to="/manage-consultant" className="block p-3 bg-gray-700 rounded hover:bg-gray-600" onClick={() => setOpen(false)}>
                        Consultant
                    </Link>
                    <Link to="/manage-bookappointment" className="block p-3 bg-gray-700 rounded hover:bg-gray-600" onClick={() => setOpen(false)}>

                        Book Appointment
                    </Link>
                    <Link to="/manage-event" className="block p-3 bg-gray-700 rounded hover:bg-gray-600" onClick={() => setOpen(false)}>
                        Event
                    </Link>
                    <Link to="/manage-blog" className="block p-3 bg-gray-700 rounded hover:bg-gray-600" onClick={() => setOpen(false)}>
                        Blog
                    </Link>
                    <Link to="/manage-account" className="block p-3 bg-gray-700 rounded hover:bg-gray-600" onClick={() => setOpen(false)}>
                        Account
                    </Link>
                    <Link to="/report" className="block p-3 bg-gray-700 rounded hover:bg-gray-600" onClick={() => setOpen(false)}>
                        Report
                    </Link>
                </div>
                {/* Navbar dưới cùng */}
                <div className="absolute bottom-6 left-0 w-full flex flex-col items-center gap-2 px-4">
                    <button onClick={handleGoHome} className="w-full text-center py-2 rounded bg-gray-700 hover:bg-gray-600 mb-1">Trang chủ</button>
                    <button onClick={handleLogout} className="w-full py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold">Logout</button>
                </div>
            </div>
        </>
    );
};

export default DashBoardSidebar;