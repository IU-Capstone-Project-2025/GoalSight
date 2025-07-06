import { useState } from 'react';
import NavigationBar from '../components/navigation/NavigationBar';
import { TeamItem } from '../components/ui/team_item/TeamItem';
import MatchForecastPanel from '../components/ui/match_forecast/MatchForecastPanel';
import { useAllTeamInfo } from '../components/ui/team_item/useAllTeamInfo';
import { useMatchPrediction } from '../components/ui/team_item/useMatchForecast';
import InstructionPanel from '../components/ui/tournament/InstructionPanel';

function TournamentPage() {
    const { teams, loadingTeams } = useAllTeamInfo();

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

    const team1 = teams.find((t) => t.id === selectedTeams[0]) || null;
    const team2 = teams.find((t) => t.id === selectedTeams[1]) || null;

    const { prediction, loadingPrediction } = useMatchPrediction(
        team1?.name ?? null,
        team2?.name ?? null
    );

    if (loadingTeams) {
        return <div className="text-center text-gray-300 pt-12">Loading teams...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <NavigationBar />
            <main>
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="bg-gradient-to-r from-red-900 to-black rounded-lg p-8 mb-4 text-center">
                        <h1 className="text-4xl font-bold mb-4">
                            2025 CLUB TOURNAMENT
                        </h1>
                        <p className='text-xl text-gray-300'>
                            The ultimate football championship featuring the world's best clubs
                        </p>
                    </div>

                    <div className="sticky top-0 z-10 bg-gray-900 py-4">
                        {selectedTeams.length < 2 && (
                            <InstructionPanel selectedCount={selectedTeams.length} />
                        )}
                        {(selectedTeams.length === 2 && loadingPrediction) && (
                            <div className="text-center text-gray-300 text-xl w-full">Loading Prediction...</div>
                        )}
                        {prediction && selectedTeams.length === 2 && (
                            <div className="w-full" data-cy="prediction-panel">
                                <MatchForecastPanel
                                    team1={prediction.name1}
                                    team2={prediction.name2}
                                    team1Chance={prediction.confidence1}
                                    team2Chance={prediction.confidence2}
                                />
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-800 rounded-lg overflow-hidden mt-4">
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
