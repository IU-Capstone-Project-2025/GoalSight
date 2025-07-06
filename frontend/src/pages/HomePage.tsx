import React from 'react';
import NavigationBar from '../components/navigation/NavigationBar';
import { NextMatchCard } from '../components/ui/nextMatch/NextMatchCard';
import { UpcomingMatches } from '../components/ui/upcomingMatches/UpcomingMatches';
import { useMatchesSeparated } from '../components/ui/upcomingMatches/useUpcomingMatches';

function HomePage() {
  const { nextMatch, upcomingMatches, loading } = useMatchesSeparated();

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

              {loading ? (
                <div className="h-32 bg-gray-700 animate-pulse rounded-lg" />
              ) : nextMatch ? (
                <NextMatchCard
                  teamA={nextMatch.home_team}
                  teamB={nextMatch.away_team}
                  date={new Date(nextMatch.date).toISOString().split('T')[0]}
                  time={new Date(nextMatch.date).toTimeString().slice(0, 5)}
                />
              ) : (
                <p className="text-gray-400">No upcoming match found.</p>
              )}
            </div>

            <div>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-700 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : (
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