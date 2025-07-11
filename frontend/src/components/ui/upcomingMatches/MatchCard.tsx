import { Match } from './types';

type Props = {
  match: Match;
};

export const MatchCard: React.FC<Props> = ({ match }) => {
  return (
    <div className='flex items-center bg-gray-700 rounded-lg p-2 md:p-4'>
      <div className='flex items-center min-w-0'>
        <div className='text-base md:text-lg font-semibold text-left truncate'>{match.teamA}</div>
        <div className='text-red-400 font-bold text-sm md:text-base text-center px-2'>VS</div>
        <div className='text-base md:text-lg font-semibold text-left truncate'>{match.teamB}</div>
      </div>
      <div className='flex flex-col items-end ml-auto whitespace-nowrap'>
        <span className='text-xs md:text-sm text-gray-300'>{match.date}</span>
        <span className='text-base md:text-lg font-bold text-red-400'>{match.time}</span>
      </div>
    </div>
  );
};