import React from 'react';
import NavigationBar from '../components/navigation/NavigationBar';
import { NextMatchCard } from '../components/ui/nextMatch/NextMatchCard';
import { UpcomingMatches } from '../components/ui/upcomingMatches/UpcomingMatches';
import { useMatchesSeparated } from '../components/ui/upcomingMatches/useUpcomingMatches';

function HomePage() {
  const { nextMatch, upcomingMatches, loading } = useMatchesSeparated();

  if (loading) {
    return <div className="text-center text-gray-300 pt-12">Loading matches...</div>;
  }

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
              {nextMatch && (
                <NextMatchCard
                  teamA={nextMatch.home_team}
                  teamB={nextMatch.away_team}
                  date={new Date(nextMatch.date).toISOString().split('T')[0]}
                  time={new Date(nextMatch.date).toTimeString().slice(0, 5)}
                />
              )}
            </div>
            <div>
              <UpcomingMatches matches={upcomingMatches.map((match) => {
                const dateObj = new Date(match.date);
                return {
                  teamA: match.home_team,
                  teamB: match.away_team,
                  date: dateObj.toISOString().split('T')[0],
                  time: dateObj.toTimeString().slice(0, 5),
                };
              })} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;