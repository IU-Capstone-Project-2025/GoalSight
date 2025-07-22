// React and hook imports
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// UI components
import NavigationBar from '../components/navigation/NavigationBar';
import { TeamItem } from '../components/ui/team_item/TeamItem';
import MatchForecastPanel from '../components/ui/match_forecast/MatchForecastPanel';
import { useTeams } from '../components/ui/team_item/useTeams';
import { useMatchPrediction } from '../components/ui/match_forecast/useMatchForecast';
import InstructionPanel from '../components/ui/match_forecast/InstructionPanel';

function TournamentPage() {
  // Fetch the list of teams and loading state
  const { teams, loadingTeams } = useTeams();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const title = searchParams.get('title');
    const year = searchParams.get('year');

    if (!title || !year) {
      setSearchParams({ title: 'FIFA Club World Cup', year: '2025' });
    }
  }, [searchParams, setSearchParams]);

  // Manage selected and expanded teams in state
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [expandedTeams, setExpandedTeams] = useState<number[]>([]);

  // Handle team selection toggle (only allow two selections at a time)
  const handleTeamSelection = (teamId: number, isSelected: boolean) => {
    if (isSelected) {
      if (selectedTeams.length < 2) {
        setSelectedTeams([...selectedTeams, teamId]);
      }
    } else {
      setSelectedTeams(selectedTeams.filter(id => id !== teamId));
    }
  };

  // Expand/collapse team details
  const handleTeamExpansion = (teamId: number) => {
    setExpandedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  // Determine if a team can be selected (max 2)
  const canSelectTeam = (teamId: number) => {
    return selectedTeams.includes(teamId) || selectedTeams.length < 2;
  };

  // Get the full team objects from selected IDs
  const team1 = teams.find((t) => t.id === selectedTeams[0]) || null;
  const team2 = teams.find((t) => t.id === selectedTeams[1]) || null;

  // Fetch prediction only when both teams are selected
  const { prediction, loadingPrediction } = useMatchPrediction(
    team1?.name ?? null,
    team2?.name ?? null
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation bar at the top */}
      <NavigationBar />

      <main>
        <div className="max-w-7xl mx-auto px-2 md:px-4 py-4 md:py-8">

          {/* Tournament title and subtitle */}
          <div className="bg-gradient-to-r from-red-900 to-black rounded-lg p-4 md:p-8 mb-2 md:mb-4 text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
              FIFA CLUB WORLD CUP 2025
            </h1>
            <p className='text-base md:text-xl text-gray-300'>
              The ultimate football championship featuring the world's best clubs
            </p>
          </div>

          {/* Sticky prediction/instruction panel */}
          <div className="sticky top-0 z-10 bg-gray-900 py-2 md:py-4">
            {/* Show instructions if not enough teams selected */}
            {selectedTeams.length < 2 && (
              <InstructionPanel selectedCount={selectedTeams.length} />
            )}

            {/* Show loading state while prediction is being calculated */}
            {(selectedTeams.length === 2 && loadingPrediction) && (
              <div className="w-full max-w-xl mx-auto bg-gray-800 p-3 md:p-6 rounded-lg animate-pulse text-center">
                <div className="h-4 md:h-6 bg-gray-700 rounded w-1/3 mx-auto mb-2 md:mb-4" />
                <div className="h-6 md:h-8 bg-gray-600 rounded w-2/3 mx-auto mb-1 md:mb-2" />
                <div className="h-4 md:h-6 bg-gray-700 rounded w-1/2 mx-auto" />
              </div>
            )}

            {/* Show prediction panel when data is available */}
            {prediction && selectedTeams.length === 2 && (
              <div className="w-full" data-cy="prediction-panel">
                <MatchForecastPanel
                  team1={prediction.name1}
                  team2={prediction.name2}
                  team1Chance={prediction.confidence1}
                  team2Chance={prediction.confidence2}
                  logoUrl1={prediction.logoUrl1}
                  logoUrl2={prediction.logoUrl2}
                />
              </div>
            )}
          </div>

          {/* Team list */}
          <div className="bg-gray-800 rounded-lg overflow-hidden mt-2 md:mt-4">
            {/* Show loading skeletons if teams are still being fetched */}
            {loadingTeams ? (
              <div className="space-y-1 md:space-y-2">
                {[...Array(6)].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 rounded-lg overflow-hidden animate-pulse"
                  >
                    <div className="flex items-center p-2 md:p-4 border-b border-gray-700">
                      <div className="w-4 h-4 bg-gray-600 rounded mr-2 md:mr-4" />
                      <div className="flex-1">
                        <div className="h-3 md:h-4 bg-gray-600 rounded w-1/2 mb-1"></div>
                        <div className="h-2 md:h-3 bg-gray-700 rounded w-1/3"></div>
                      </div>
                      <div className="ml-2 md:ml-4 w-5 h-5 bg-gray-700 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Render all teams as interactive items
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