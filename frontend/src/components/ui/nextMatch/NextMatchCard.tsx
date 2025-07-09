type NextMatchCardProps = {
  teamA: string;
  teamB: string;
  date: string;
  time: string;
};

export const NextMatchCard: React.FC<NextMatchCardProps> = ({ teamA, teamB, date, time }) => {
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
    </div>
  );
};