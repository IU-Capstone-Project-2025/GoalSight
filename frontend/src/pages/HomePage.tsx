import React from 'react';
import NavigationBar from '../components/navigation/NavigationBar';
import { NextMatchCard } from '../components/ui/nextMatch/NextMatchCard';
import { nextMatch } from '../components/ui/nextMatch/nextMatchData';
import { UpcomingMatches } from '../components/ui/upcomingMatches/UpcomingMatches';
import { upcomingMatches } from '../components/ui/upcomingMatches/matchesData';

function MainPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <NavigationBar />
            <main>
                <div className='max-w-7xl mx-auto px-4 py-8'>
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-red-900 to-black rounded-lg p-8 text-center">
                            <h1 className="text-4xl font-bold mb-4">
                                2025 CLUB TOURNAMENT
                            </h1>
                            <p className='text-xl text-gray-300 mb-6'>
                                The ultimate football championship featuring the world's best clubs
                            </p>
                            <div>
                                <NextMatchCard {...nextMatch} />
                            </div>
                        </div>
                        <div>
                            <UpcomingMatches matches={upcomingMatches.slice(0, 4)} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainPage;
