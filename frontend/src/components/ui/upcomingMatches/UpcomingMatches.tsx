import { Match } from './Matches.types';
import { MatchCard } from './MatchCard';

type Props = {
  matches: Match[];
};

export const UpcomingMatches: React.FC<Props> = ({ matches }) => {
  if (matches.length === 0) {
    return <div className="text-gray-400">No upcoming matches</div>;
  }

  return (
    <div className='bg-gray-800 rounded-lg p-3 md:p-6'>
      <h2 className='text-lg md:text-2xl font-bold mb-3 md:mb-6 text-red-400'>UPCOMING MATCHES</h2>
      <div className='space-y-2 md:space-y-4'>
        {matches.map((match, index) => (
          <MatchCard key={index} match={match} />
        ))}
      </div>
    </div>
  );
};