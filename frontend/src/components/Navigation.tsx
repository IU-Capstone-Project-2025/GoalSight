import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="flex space-x-4">
            <Link
                to="/"
                className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
            >
                Home
            </Link>
            <Link
                to="/tournaments"
                className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
            >
                Tournaments
            </Link>
        </nav>
    );
}

export default Navigation; 