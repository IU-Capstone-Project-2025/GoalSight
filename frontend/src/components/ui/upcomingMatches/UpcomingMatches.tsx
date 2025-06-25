import { MatchCard } from './MatchCard';
import { useUpcomingMatches } from './useUpcomingMatches';

export const UpcomingMatches = () => {
  const { matches, loading } = useUpcomingMatches();

  if (loading) return <div className="text-gray-400">Loading...</div>;
  if (matches.length === 0) return <div className="text-gray-400">No upcoming matches</div>;

  return (
    <div className='bg-gray-800 rounded-lg p-6'>
      <h2 className='text-2xl font-bold mb-6 text-red-400'>UPCOMING MATCHES</h2>
      <div className='space-y-4'>
        {matches.map((match) => {
          const dateObj = new Date(match.date);
          return (
            <MatchCard
              key={match.id}
              match={{
                teamA: match.home_team,
                teamB: match.away_team,
                date: dateObj.toISOString().split('T')[0],
                time: dateObj.toTimeString().slice(0, 5),
              }}
            />
          );
        })}
      </div>
    </div>
  );
};