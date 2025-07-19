import { Match } from './Matches.types';
import React, { useState } from 'react';
import { useMatchPrediction } from '../match_forecast/useMatchForecast';

// Props type for MatchCard component
type Props = {
  match: Match; // Match data object
};

// MatchCard component displays match details and optional prediction
export const MatchCard: React.FC<Props> = ({ match }) => {
  // Local state to toggle prediction visibility
  const [showPrediction, setShowPrediction] = useState(false);

  // Custom hook to fetch match prediction, triggered only if showPrediction is true
  const { prediction, loadingPrediction } = useMatchPrediction(
    showPrediction ? match.teamA : null,
    showPrediction ? match.teamB : null
  );

  return (
    // Main container with background, padding and rounded corners
    <div className="flex flex-col bg-gray-700 rounded-lg p-2 md:p-4 mb-2">

      {/* Top section: teams info and date/time with prediction toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">

        {/* Left side: Teams and prediction */}
        <div className="flex flex-col flex-1 min-w-0">

          {/* Teams names with "VS" separator, truncated if overflow */}
          <div className="flex items-center min-w-0 justify-center md:justify-start">
            <span className="text-base md:text-lg font-semibold truncate" translate="no">{match.teamA}</span>
            <span className="text-red-400 font-bold text-xs md:text-base px-2" translate="no">VS</span>
            <span className="text-base md:text-lg font-semibold truncate" translate="no">{match.teamB}</span>
          </div>

          {/* Conditional prediction display */}
          {showPrediction && (
            <div className="flex items-center justify-center md:justify-start mt-1 text-xs md:text-sm font-semibold transition-opacity duration-300 opacity-100">
              {loadingPrediction ? (
                // Show loading indicator while prediction fetches
                <span className="text-gray-300">Loading...</span>
              ) : prediction ? (
                // Show confidence percentages for both teams
                <>
                  {(() => {
                    const diff = Math.abs(prediction.confidence1 - prediction.confidence2);
                    let color1 = 'text-yellow-400';
                    let color2 = 'text-yellow-400';
                    if (diff >= 20) {
                      if (prediction.confidence1 > prediction.confidence2) {
                        color1 = 'text-green-400';
                        color2 = 'text-red-400';
                      } else {
                        color1 = 'text-red-400';
                        color2 = 'text-green-400';
                      }
                    }
                    return (
                      <>
                        <span className={color1}>{prediction.confidence1}%</span>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className={color2}>{prediction.confidence2}%</span>
                      </>
                    );
                  })()}
                </>
              ) : null}
            </div>
          )}
        </div>

        {/* Right side: Match date/time and toggle button */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:ml-4 gap-1 md:gap-2">

          {/* Date and time display */}
          <div className="flex flex-col items-center md:items-end">
            <span className="text-xs md:text-sm text-gray-300">{match.date}</span>
            <span className="text-base md:text-lg font-bold text-red-400">{match.time}</span>
          </div>

          {/* Button toggles prediction visibility */}
          <button
            onClick={() => setShowPrediction((prev) => !prev)}
            className="
              bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-0.5 px-2 rounded transition-colors duration-200 
              md:flex md:flex-col md:items-center md:justify-center md:py-1 md:px-2
              md:w-[90px] md:h-[50px]
            "
          >
            {showPrediction ? (
              // Button text when prediction is visible
              <>
                <span className="hidden md:block" translate="no">Hide</span>
                <span className="hidden md:block" translate="no">prediction</span>
                <span className="md:hidden" translate="no">Hide prediction</span>
              </>
            ) : (
              // Button text when prediction is hidden
              <>
                <span className="hidden md:block" translate="no">Predict</span>
                <span className="hidden md:block" translate="no">result</span>
                <span className="md:hidden" translate="no">Predict result</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};