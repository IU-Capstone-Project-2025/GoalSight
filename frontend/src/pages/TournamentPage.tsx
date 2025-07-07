import { useState } from 'react';
import NavigationBar from '../components/navigation/NavigationBar';
import { TeamItem } from '../components/ui/team_item/TeamItem';
import MatchForecastPanel from '../components/ui/match_forecast/MatchForecastPanel';
import { useTeams } from '../components/ui/team_item/useTeams';
import { useMatchPrediction } from '../components/ui/team_item/useMatchForecast';
import InstructionPanel from '../components/ui/tournament/InstructionPanel';

function TournamentPage() {
  const { teams, loadingTeams } = useTeams();

  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [expandedTeams, setExpandedTeams] = useState<number[]>([]);

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
    setExpandedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavigationBar />
      <main>
        <div className="max-w-7xl mx-auto px-4 py-8">
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
              <div className="w-full max-w-xl mx-auto bg-gray-800 p-6 rounded-lg animate-pulse text-center">
                <div className="h-6 bg-gray-700 rounded w-1/3 mx-auto mb-4" />
                <div className="h-8 bg-gray-600 rounded w-2/3 mx-auto mb-2" />
                <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto" />
              </div>
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
            {loadingTeams ? (
              <div className="space-y-2">
                {[...Array(6)].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 rounded-lg overflow-hidden animate-pulse"
                  >
                    <div className="flex items-center p-4 border-b border-gray-700">
                      <div className="w-4 h-4 bg-gray-600 rounded mr-4" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-600 rounded w-1/2 mb-1"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                      </div>
                      <div className="ml-4 w-5 h-5 bg-gray-700 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              teams.map((team) => (
                <TeamItem
                  key={team.id}
                  team={team}
                  isExpanded={expandedTeams.includes(team.id)}
                  onToggleExpansion={handleTeamExpansion}
                  isSelected={selectedTeams.includes(team.id)}
                  onSelectionChange={handleTeamSelection}
                  canSelect={canSelectTeam(team.id)}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TournamentPage;