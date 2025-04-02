import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
const location = useLocation();

const isActive = (path) => location.pathname === path;

return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Social Media Analytics</h1>
        <nav className="flex space-x-4">
        <Link
            to="/"
            className={`px-3 py-2 rounded-md ${isActive('/') ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
        >
            Feed
        </Link>
        <Link
            to="/top-users"
            className={`px-3 py-2 rounded-md ${isActive('/top-users') ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
        >
            Top Users
        </Link>
        <Link
            to="/trending"
            className={`px-3 py-2 rounded-md ${isActive('/trending') ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
        >
            Trending Posts
        </Link>
        </nav>
    </div>
    </header>
);
};

export default Header;
