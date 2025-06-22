import React from 'react';
import NavigationBar from '../components/navigation/NavigationBar';

function MainPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <NavigationBar />
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <h3>Home Page</h3>
                </div>
            </main>
        </div>
    );
}

export default MainPage;
