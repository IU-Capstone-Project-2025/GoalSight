import React, { useState } from 'react';

type MatchForecastPanelProps = {
    // Name of the first (home) team
    team1: string;
    // Name of the second (away) team
    team2: string;
    // Win probability for team1 (in percent)
    team1Chance: number;
    // Win probability for team2 (in percent)
    team2Chance: number;
    // Logo URL for team1
    logoUrl1: string;
    // Logo URL for team2
    logoUrl2: string;
};

// Renders the forecast panel with team info, chances, and ML info modal
const MatchForecastPanel: React.FC<MatchForecastPanelProps> = ({
    team1,
    team2,
    team1Chance,
    team2Chance,
    logoUrl1,
    logoUrl2,
}) => {
    // State for showing/hiding the ML info modal
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="bg-gray-800 text-white rounded-lg p-3 md:p-6 shadow-lg flex flex-1 flex-col items-center justify-center border border-red-600 w-full h-full">
            <div className="flex items-center mb-2 md:mb-4">
                <h3 className="text-lg md:text-2xl font-semibold text-red-400 transition-opacity duration-300 mr-1 md:mr-2">Match forecast</h3>
                <div className="relative group">
                    {/* Button to open ML info modal */}
                    <button
                        type="button"
                        className="w-5 md:w-6 h-5 md:h-6 flex items-center justify-center rounded-full bg-gray-700 text-white text-base md:text-lg font-bold cursor-pointer focus:outline-none"
                        tabIndex={0}
                        onClick={() => setShowModal(true)}
                        aria-label="Show prediction info"
                    >
                        ?
                    </button>
                </div>
            </div>
            {/* ML info modal, shown when showModal is true */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-2 md:px-0" onClick={() => setShowModal(false)}>
                    <div
                        className="relative bg-gray-900 text-white rounded-lg shadow-2xl border border-gray-400 max-w-full w-[98vw] md:w-[600px] max-h-[90vh] overflow-y-auto p-4 md:p-6 text-[10px] md:text-sm"
                        style={{ boxSizing: 'border-box' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-2xl font-bold focus:outline-none"
                            onClick={() => setShowModal(false)}
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                        <div className="prose prose-invert prose-xs md:prose-base max-w-none">
                            <h2 className="text-base md:text-xl font-bold text-red-400 mb-2">How the ML Match Outcome Prediction Works</h2>
                            <p>Our <b>Logistic Regression</b> model analyzes a rich set of match-related data to estimate the probability of a home-team victory. Here’s what you need to know:</p>
                            <h3 className="text-xs md:text-lg font-semibold mt-3 mb-1">Key Features and Inputs</h3>
                            <ul className="list-disc ml-5">
                                <li>Tactical team attributes (8 per side) – build-up speed, passing, chance-creation passing, crossing, shooting, defensive pressure, aggression, team width</li>
                                <li>Pre-match betting odds from Bet365 (home/draw/away)</li>
                                <li>Season and stage information</li>
                            </ul>
                            <p className="mt-1">Altogether, the model uses <b>20 features</b> to capture both in-game style and external signals (betting markets).</p>
                            <h3 className="text-xs md:text-lg font-semibold mt-3 mb-1">Prediction Process</h3>
                            <ol className="list-decimal ml-5">
                                <li><b>Data Collection</b><br />
                                    – We pull the latest team tactical ratings closest to the match date.<br />
                                    – We retrieve current betting odds for additional market insights.
                                </li>
                                <li><b>Feature Scaling & PCA</b><br />
                                    – Features are standardized (zero mean, unit variance).<br />
                                    – We apply Principal Component Analysis to reduce dimensionality to 10 orthogonal components, retaining 78% of variance.
                                </li>
                                <li><b>Logistic Regression Scoring</b><br />
                                    1) The model computes a weighted sum of features<br />
                                    2) Converts to a probability via the logistic function
                                </li>
                                <li><b>Output</b><br />
                                    – A single probability score between 0 and 1. Values above 0.5 indicate a predicted home-team win; below 0.5 favor an away-team win.
                                </li>
                            </ol>
                            <h3 className="text-xs md:text-lg font-semibold mt-3 mb-1">Performance Highlights</h3>
                            <ul className="list-disc ml-5">
                                <li>Test accuracy: <b>71%</b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {/* Main forecast display: team names, logos, and chances */}
            <div className="flex items-center justify-center w-full gap-8 md:gap-16">
                <div className="flex flex-col items-center min-w-[120px] md:min-w-[160px]">
                    <div className="flex items-center justify-center w-full mb-1 md:mb-2">
                        <img src={logoUrl1} alt={team1} className="w-12 h-12 object-contain mr-2" />
                        <div className="flex flex-col items-center">
                            <div className="text-lg md:text-2xl font-semibold text-left" data-cy="team1-name">{team1}</div>
                            <div className="text-base md:text-xl font-bold text-green-400 text-center w-full mt-1" data-cy="team1-chance">{team1Chance}%</div>
                        </div>
                    </div>
                </div>
                <div className="text-gray-400 text-lg md:text-2xl mx-2 md:mx-4 font-bold">VS</div>
                <div className="flex flex-col items-center min-w-[120px] md:min-w-[160px]">
                    <div className="flex items-center justify-center w-full mb-1 md:mb-2">
                        <div className="flex flex-col items-center">
                            <div className="text-lg md:text-2xl font-semibold text-right" data-cy="team2-name">{team2}</div>
                            <div className="text-base md:text-xl font-bold text-green-400 text-center w-full mt-1" data-cy="team2-chance">{team2Chance}%</div>
                        </div>
                        <img src={logoUrl2} alt={team2} className="w-12 h-12 object-contain ml-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchForecastPanel;