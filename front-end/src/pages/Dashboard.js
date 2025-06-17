
/*import { useNavigate } from 'react-router-dom';*/
import "./DashBoard.css";

const Dashboard = () => {

    return (
        <div className="flex">
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
                    <div className="p-3 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer">
                        Home
                    </div>
                    <div className="p-3 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer">
                        Info
                    </div>
                    <div className="p-3 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer">
                        Add
                    </div>
                    <div className="p-3 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer">
                        Card
                    </div>
                    <div className="p-3 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer">
                        Report
                    </div>
                </div>
            </div>

            {/* Top Navbar */}
            <div className="w-full flex items-center bg-blue-600 text-white p-4 fixed z-10">
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
    )
}

export default Dashboard;