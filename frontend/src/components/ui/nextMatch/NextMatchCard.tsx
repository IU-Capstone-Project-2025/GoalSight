type NextMatchCardProps = {
  teamA: string;
  teamB: string;
  date: string;
  time: string;
};

export const NextMatchCard: React.FC<NextMatchCardProps> = ({ teamA, teamB, date, time }) => {
  return (
    <div className='bg-black/50 rounded-lg p-6 inline-block'>
      <h2 className='text-2xl font-bold text-red-400 mb-2'>
        NEXT MATCH
      </h2>
      <div className='text-3xl font-bold'>
        {teamA} vs {teamB}
      </div>
      <div className='text-lg text-gray-300 mt-2'>
        {date} - {time}
      </div>
    </div>
  );
};