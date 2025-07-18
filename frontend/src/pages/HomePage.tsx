// Import the navigation bar component
import NavigationBar from '../components/navigation/NavigationBar';

// Import the card component for displaying the next match
import { NextMatchCard } from '../components/ui/nextMatch/NextMatchCard';

// Import the component for listing upcoming matches
import { UpcomingMatches } from '../components/ui/upcomingMatches/UpcomingMatches';

// Custom hook for fetching and separating next match and other upcoming matches
import { useMatchesSeparated } from '../components/ui/upcomingMatches/useUpcomingMatches';

// Custom hook for fetching the prediction for the next match
import { useMatchPrediction } from '../components/ui/match_forecast/useMatchForecast';

function HomePage() {
  // Destructure loading state, next match and upcoming matches from the custom hook
  const { nextMatch, upcomingMatches, loading } = useMatchesSeparated();

  // Fetch match prediction for the next match if available
  const { prediction, loadingPrediction } = useMatchPrediction(
    nextMatch?.home_team ?? null,
    nextMatch?.away_team ?? null
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top navigation bar */}
      <NavigationBar />

      <main>
        <div className="max-w-7xl mx-auto px-2 py-4 md:px-4 md:py-8">
          <div className="space-y-4 md:space-y-8">

            {/* Header and Next Match Section */}
            <div className="bg-gradient-to-r from-red-900 to-black rounded-lg p-4 md:p-8 text-center">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
                FIFA CLUB WORLD CUP 2025
              </h1>
              <p className="text-base md:text-xl text-gray-300 mb-3 md:mb-6">
                The ultimate football championship featuring the world's best clubs
              </p>

              {/* Show loading skeleton if matches are loading */}
              {loading ? (
                <div className="mx-auto w-40 md:w-64 h-4 md:h-6 bg-gray-600 rounded animate-pulse" />
              ) : nextMatch ? (
                // Display next match card with prediction data
                <>
                  <NextMatchCard
                    teamA={nextMatch.home_team}
                    teamB={nextMatch.away_team}
                    date={new Date(nextMatch.date).toISOString().split('T')[0]}
                    time={new Date(nextMatch.date).toTimeString().slice(0, 5)}
                    teamAChance={prediction && !loadingPrediction ? prediction.confidence1 : undefined}
                    teamBChance={prediction && !loadingPrediction ? prediction.confidence2 : undefined}
                  />
                </>
              ) : (
                // Fallback if no match is found
                <p className="text-gray-400 text-sm md:text-base">No next match found</p>
              )}
            </div>

            {/* Upcoming Matches Section */}
            <div>
              {loading ? (
                // Loading skeletons for upcoming matches
                <div className="space-y-2 md:space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 md:h-24 w-full bg-gray-700 animate-pulse rounded-lg"
                    />
                  ))}
                </div>
              ) : (
                // Render upcoming matches
                <UpcomingMatches
                  matches={upcomingMatches.map((match) => {
                    const dateObj = new Date(match.date);
                    return {
                      teamA: match.home_team,
                      teamB: match.away_team,
                      date: dateObj.toISOString().split('T')[0],
                      time: dateObj.toTimeString().slice(0, 5),
                    };
                  })}
                />
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;