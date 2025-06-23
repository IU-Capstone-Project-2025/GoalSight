import { Match } from './types';

type Props = {
  match: Match;
};

export const MatchCard: React.FC<Props> = ({ match }) => {
  return (
    <div className='flex items-center justify-between bg-gray-700 rounded-lg p-4'>
      <div className='flex items-center space-x-4'>
        <div className='text-lg font-semibold'>{match.teamA}</div>
        <div className='text-red-400 font-bold'>VS</div>
        <div className='text-lg font-semibold'>{match.teamB}</div>
      </div>
      <div className='text-right'>
        <div className='text-sm text-gray-300'>{match.date}</div>
        <div className='text-lg font-bold text-red-400'>{match.time}</div>
      </div>
    </div>
  );
};