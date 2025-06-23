import { MatchCard } from './MatchCard';
import { Match } from './types';

type Props = {
  matches: Match[];
};

export const UpcomingMatches: React.FC<Props> = ({ matches }) => {
  if (matches.length === 0) return null;

  return (
    <div className='bg-gray-800 rounded-lg p-6'>
      <h2 className='text-2xl font-bold mb-6 text-red-400'>
        UPCOMING MATCHES
      </h2>
      <div className='space-y-4'>
        {matches.map((match, index) => (
          <MatchCard key={index} match={match} />
        ))}
      </div>
    </div>
  );
};