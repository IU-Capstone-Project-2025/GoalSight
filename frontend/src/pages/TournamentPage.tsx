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
            goals: 45,
            conceded: 12,
        },
        {
            id: 2,
            name: 'Barcelona',
            country: 'Spain',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
            goals: 42,
            conceded: 15,
        },
        {
            id: 3,
            name: 'Bayern Munich',
            country: 'Germany',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
            goals: 48,
            conceded: 10,
        },
        {
            id: 4,
            name: 'Manchester City',
            country: 'England',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
            goals: 38,
            conceded: 18,
        },
        {
            id: 5,
            name: 'Liverpool',
            country: 'England',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
            goals: 35,
            conceded: 20,
        },
        {
            id: 6,
            name: 'Chelsea',
            country: 'England',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
            goals: 33,
            conceded: 22,
        },
        {
            id: 7,
            name: 'Arsenal',
            country: 'England',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
            goals: 30,
            conceded: 25,
        },
        {
            id: 8,
            name: 'Dortmund',
            country: 'Germany',
            total_points: 10,
            wins: 3,
            draw: 1,
            loss: 0,
            goals: 28,
            conceded: 28,
        },
    ]);

    const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
    const [expandedTeam, setExpandedTeam] = useState<number | null>(null);

    const handleTeamSelection = (teamId: number, isSelected: boolean) => {
        if (isSelected) {
            if (selectedTeams.length < 2) {
                setSelectedTeams([...selectedTeams, teamId]);
            }
        } else {
            setSelectedTeams(selectedTeams.filter(id => id !== teamId));
        }
    };

    const handleTeamExpansion = (teamId: number) => {
        setExpandedTeam(expandedTeam === teamId ? null : teamId);
    };

    const canSelectTeam = (teamId: number) => {
        return selectedTeams.includes(teamId) || selectedTeams.length < 2;
    };

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
                            <TeamItem
                                key={team.id}
                                team={team}
                                isExpanded={expandedTeam === team.id}
                                onToggleExpansion={handleTeamExpansion}
                                isSelected={selectedTeams.includes(team.id)}
                                onSelectionChange={handleTeamSelection}
                                canSelect={canSelectTeam(team.id)}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default TournamentPage;
