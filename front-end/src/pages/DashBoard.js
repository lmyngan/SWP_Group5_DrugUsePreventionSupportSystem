import { Link } from "react-router-dom";

const DashBoard = () => {
    return (
        <div className="flex min-h-screen">
            {/* Hidden Checkbox for Toggle */}
            <input type="checkbox" id="menu-toggle" className="hidden peer" />
            {/* Sidebar Menu */}
            <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transform -translate-x-full transition-transform duration-300 peer-checked:translate-x-0 z-20">
                {/* Close Button inside Menu */}
                <label
                    htmlFor="menu-toggle"
                    className="absolute top-4 right-4 cursor-pointer text-2xl text-white"
                >
                    ✖
                </label>
                <div className="menu-header text-xl font-bold mb-6">Menu</div>
                <div className="space-y-4">
                    <Link to="/dashboard" className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                        Dashboard Home
                    </Link>
                    <Link to="/manage" className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                        Manage
                    </Link>
                    <Link to="/manage-consultant" className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                        Consultant
                    </Link>
                    <Link to="/manage-bookappointment" className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                        Book Appointment
                    </Link>
                    <Link to="/manage-program" className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                        Program
                    </Link>
                    <Link to="/manage-blog" className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                        Blog
                    </Link>
                    <Link to="/manage-account" className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                        Account
                    </Link>
                    <Link to="/report" className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                        Report
                    </Link>
                </div>
            </div>

            {/* Top Navbar for sidebar toggle (hamburger only) */}
            <div className="w-full flex items-center bg-gray-800 text-white p-4 fixed z-10" style={{ top: 0, left: 0 }}>
                {/* Hamburger Button */}
                <label htmlFor="menu-toggle" className="cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"
                        />
                    </svg>
                </label>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 mt-16 transition-all duration-300 peer-checked:ml-64">
                <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
                <p>This is the main content area. Use the hamburger menu to toggle sidebar.</p>
            </div>
        </div>
    );
};

export default DashBoard;