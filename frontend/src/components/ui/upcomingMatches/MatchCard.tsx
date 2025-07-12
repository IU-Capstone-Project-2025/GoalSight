import { Match } from './Matches.types';
import React, { useState } from 'react';
import { useMatchPrediction } from '../match_forecast/useMatchForecast';

type Props = {
  match: Match;
};

export const MatchCard: React.FC<Props> = ({ match }) => {
  const [showPrediction, setShowPrediction] = useState(false);
  const { prediction, loadingPrediction } = useMatchPrediction(
    showPrediction ? match.teamA : null,
    showPrediction ? match.teamB : null
  );

  return (
    <div className="flex flex-col bg-gray-700 rounded-lg p-2 md:p-4 mb-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center min-w-0 justify-center md:justify-start">
            <span className="text-base md:text-lg font-semibold truncate">{match.teamA}</span>
            <span className="text-red-400 font-bold text-xs md:text-base px-2">VS</span>
            <span className="text-base md:text-lg font-semibold truncate">{match.teamB}</span>
          </div>

          {showPrediction && (
            <div className="flex items-center justify-center md:justify-start mt-1 text-xs md:text-sm text-green-400 font-semibold transition-opacity duration-300 opacity-100">
              {loadingPrediction ? (
                <span className="text-gray-300">Loading...</span>
              ) : prediction ? (
                <>
                  <span>{prediction.confidence1}%</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span>{prediction.confidence2}%</span>
                </>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center md:flex-row md:items-center md:ml-4 gap-1 md:gap-2">
          <div className="flex flex-col items-center md:items-end">
            <span className="text-xs md:text-sm text-gray-300">{match.date}</span>
            <span className="text-base md:text-lg font-bold text-red-400">{match.time}</span>
          </div>
          <button
            onClick={() => setShowPrediction((prev) => !prev)}
            className="
              bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-0.5 px-2 rounded transition-colors duration-200 
              md:flex md:flex-col md:items-center md:justify-center md:py-1 md:px-2
              md:w-[90px] md:h-[50px]
            "
          >
            {showPrediction ? (
              <>
                <span className="hidden md:block">Hide</span>
                <span className="hidden md:block">prediction</span>
                <span className="md:hidden">Hide prediction</span>
              </>
            ) : (
              <>
                <span className="hidden md:block">Predict</span>
                <span className="hidden md:block">result</span>
                <span className="md:hidden">Predict result</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};