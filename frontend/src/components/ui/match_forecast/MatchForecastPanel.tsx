import React from 'react';

type MatchForecastPanelProps = {
    team1: string;
    team2: string;
    team1Chance: number;
    team2Chance: number;
};

const MatchForecastPanel: React.FC<MatchForecastPanelProps> = ({
    team1,
    team2,
    team1Chance,
    team2Chance,
}) => (
    <div className="bg-gray-800 text-white rounded-lg p-3 md:p-6 shadow-lg flex flex-1 flex-col items-center justify-center border border-red-600 w-full h-full">
        <div className="flex items-center mb-2 md:mb-4">
            <h3 className="text-lg md:text-2xl font-semibold text-red-400 transition-opacity duration-300 mr-1 md:mr-2">Match forecast</h3>
            <div className="relative group">
                <button
                    type="button"
                    className="w-5 md:w-6 h-5 md:h-6 flex items-center justify-center rounded-full bg-gray-700 text-white text-base md:text-lg font-bold cursor-pointer focus:outline-none"
                    tabIndex={0}
                >
                    ?
                </button>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 md:w-64 max-w-[90vw] md:max-w-md bg-gray-800 text-xs md:text-sm text-white rounded shadow-lg px-2 md:px-4 py-1 md:py-2 border border-gray-400 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10 break-words">
                    Here you will find a description of how the forecast works.
                </div>
            </div>
        </div>
        <div className="flex items-center justify-center w-full">
            <div className="text-center flex-1">
                <div className="text-base md:text-2xl font-semibold mb-1 md:mb-2" data-cy="team1-name">{team1}</div>
                <div className="text-2xl md:text-4xl font-bold text-green-400" data-cy="team1-chance">{team1Chance}%</div>
            </div>
            <div className="text-gray-400 text-lg md:text-2xl mx-4 md:mx-8 font-bold">VS</div>
            <div className="text-center flex-1">
                <div className="text-base md:text-2xl font-semibold mb-1 md:mb-2" data-cy="team2-name">{team2}</div>
                <div className="text-2xl md:text-4xl font-bold text-green-400" data-cy="team2-chance">{team2Chance}%</div>
            </div>
        </div>
    </div>
);

export default MatchForecastPanel;