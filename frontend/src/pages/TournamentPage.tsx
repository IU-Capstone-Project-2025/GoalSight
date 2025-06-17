import React from 'react';
import Navigation from '../components/Navigation';

function TournamentPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="bg-black border-b border-red-600">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-red-500">
                            ⚽ FOOTBALL LEAGUE
                        </h1>
                        <Navigation />
                    </div>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <h3>Tournaments Page</h3>
                </div>
            </main>
        </div>
    );
}

export default TournamentPage;
