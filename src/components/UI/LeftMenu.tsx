
const LeftMenu = () => {
    return (
        <div className="bg-blue-500 h-screen text-white w-1/4 p-4">
            <div className="mb-4">
            <h2 className="text-xl font-semibold">User Information</h2>
            {/* Display user information here */}
            </div>
            <nav className="space-y-2">
            <a href="/" className="block hover:text-yellow-400">Dashboard</a>
            <a href="/profile" className="block hover:text-yellow-400">Profile</a>
            </nav>
            <div className="mt-auto">
            <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600">Logout</button>
            </div>
        </div>
        );
};

export default LeftMenu;