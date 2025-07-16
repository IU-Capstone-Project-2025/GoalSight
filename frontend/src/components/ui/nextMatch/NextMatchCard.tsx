// Props type definition for NextMatchCard component
type NextMatchCardProps = {
  teamA: string;            // Name of the first team
  teamB: string;            // Name of the second team
  date: string;             // Match date (formatted string)
  time: string;             // Match time (formatted string)
  teamAChance?: number;     // Optional winning chance percentage for team A
  teamBChance?: number;     // Optional winning chance percentage for team B
};

// Functional React component displaying the next match info
export const NextMatchCard: React.FC<NextMatchCardProps> = ({
  teamA,
  teamB,
  date,
  time,
  teamAChance,
  teamBChance,
}) => {
  return (
    // Container with semi-transparent black background and padding
    <div className='bg-black/50 rounded-lg p-3 md:p-6 inline-block'>

      {/* Title */}
      <h2 className='text-lg md:text-2xl font-bold text-red-400 mb-1 md:mb-2'>
        NEXT MATCH
      </h2>

      {/* Teams names with "vs" between, disabling translation */}
      <div className='text-xl md:text-3xl font-bold'>
        <span translate="no">{teamA}</span> <span translate="no">vs</span> <span translate="no">{teamB}</span>
      </div>

      {/* Match date and time */}
      <div className='text-sm md:text-lg text-gray-300 mt-1 md:mt-2'>
        {date} - {time}
      </div>

      {/* Conditionally render winning chances if both are provided */}
      {teamAChance !== undefined && teamBChance !== undefined && (
        <div className="flex items-center justify-center gap-2 mt-1 md:mt-2">
          {/* Team A winning chance */}
          <span className="text-lg md:text-2xl font-bold text-green-400">{teamAChance}%</span>

          {/* Separator */}
          <span className="mx-1 text-base md:text-xl text-gray-300 font-semibold">—</span>

          {/* Team B winning chance */}
          <span className="text-lg md:text-2xl font-bold text-green-400">{teamBChance}%</span>
        </div>
      )}
    </div>
  );
};