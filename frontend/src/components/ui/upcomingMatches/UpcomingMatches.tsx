import { Match } from './Matches.types';
import { MatchCard } from './MatchCard';

type Props = {
  matches: Match[];  // Array of upcoming matches to display
};

// Component that lists upcoming matches or shows a message if none exist
export const UpcomingMatches: React.FC<Props> = ({ matches }) => {
  // Show message if there are no matches
  if (matches.length === 0) {
    return <div className="text-gray-400">No upcoming matches</div>;
  }

  return (
    // Container with background and padding for the matches list
    <div className='bg-gray-800 rounded-lg p-3 md:p-6'>

      {/* Section title */}
      <h2 className='text-lg md:text-2xl font-bold mb-3 md:mb-6 text-red-400'>UPCOMING MATCHES</h2>

      {/* List of MatchCard components, spaced vertically */}
      <div className='space-y-2 md:space-y-4'>
        {matches.map((match, index) => (
          // Render each match using the MatchCard component; key uses index
          <MatchCard key={index} match={match} />
        ))}
      </div>
    </div>
  );
};