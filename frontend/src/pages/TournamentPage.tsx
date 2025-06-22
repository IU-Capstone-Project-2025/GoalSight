import React, { useState } from 'react';
import NavigationBar from '../components/navigation/NavigationBar';
import { Team } from '../components/ui/team_item/Team.types';
import { TeamItem } from '../components/ui/team_item/TeamItem';

function TournamentPage() {
    const [teams] = useState<Team[]>([
        {
            id: 1,
            name: 'Real Madrid',
            country: 'Spain',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
        },
        {
            id: 2,
            name: 'Barcelona',
            country: 'Spain',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
        },
        {
            id: 3,
            name: 'Bayern Munich',
            country: 'Germany',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
        },
        {
            id: 1,
            name: 'Real Madrid',
            country: 'Spain',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
        },
        {
            id: 2,
            name: 'Barcelona',
            country: 'Spain',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
        },
        {
            id: 3,
            name: 'Bayern Munich',
            country: 'Germany',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
        },
        {
            id: 1,
            name: 'Real Madrid',
            country: 'Spain',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
        },
        {
            id: 2,
            name: 'Barcelona',
            country: 'Spain',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
        },
        {
            id: 3,
            name: 'Bayern Munich',
            country: 'Germany',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
        },
        {
            id: 1,
            name: 'Real Madrid',
            country: 'Spain',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
        },
        {
            id: 2,
            name: 'Barcelona',
            country: 'Spain',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
        },
        {
            id: 3,
            name: 'Bayern Munich',
            country: 'Germany',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
        },
    ]);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <NavigationBar />
            <main>
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="bg-gradient-to-r from-red-800 to-red-600 rounded-lg p-8 mb-8 text-center">
                        <h2 className="text-4xl font-bold mb-2">
                            2025 CLUB TOURNAMENT
                        </h2>
                        <p className="text-red-100">
                            The ultimate football championship featuring the world's best clubs
                        </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        {teams.map((team) => (
                            <TeamItem key={team.id} team={team} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default TournamentPage;
