type NextMatchCardProps = {
  teamA: string;
  teamB: string;
  date: string;
  time: string;
  teamAChance?: number;
  teamBChance?: number;
};

export const NextMatchCard: React.FC<NextMatchCardProps> = ({ teamA, teamB, date, time, teamAChance, teamBChance }) => {
  return (
    <div className='bg-black/50 rounded-lg p-3 md:p-6 inline-block'>
      <h2 className='text-lg md:text-2xl font-bold text-red-400 mb-1 md:mb-2'>
        NEXT MATCH
      </h2>
      <div className='text-xl md:text-3xl font-bold'>
        {teamA} vs {teamB}
      </div>
      <div className='text-sm md:text-lg text-gray-300 mt-1 md:mt-2'>
        {date} - {time}
      </div>
      {teamAChance !== undefined && teamBChance !== undefined && (
        <div className="flex items-center justify-center gap-2 mt-1 md:mt-2">
          <span className="text-lg md:text-2xl font-bold text-green-400">{teamAChance}%</span>
          <span className="mx-1 text-base md:text-xl text-gray-300 font-semibold">—</span>
          <span className="text-lg md:text-2xl font-bold text-green-400">{teamBChance}%</span>
        </div>
      )}
    </div>
  );
};