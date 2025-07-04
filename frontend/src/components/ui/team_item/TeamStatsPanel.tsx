import React, { useState } from 'react';
import { Team } from './Team.types';

type TeamStatsPanelProps = {
    stats: Team;
};

const TeamStatsPanel: React.FC<TeamStatsPanelProps> = ({ stats }) => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="bg-gray-750 p-6">
            <div className="flex space-x-4 mb-6 border-b border-gray-600">
                {['overview', 'form', 'match statistic'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 px-1 text-sm font-medium capitalize ${activeTab === tab
                            ? 'text-red-400 border-b-2 border-red-400'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {activeTab === 'overview' && (
                    <>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{stats.market_value}</div>
                            <div className="text-sm text-gray-400">Market value</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-400">{stats.avg_age}</div>
                            <div className="text-sm text-gray-400">Average age</div>
                        </div>
                    </>
                )}
                {activeTab === 'form' && (
                    <>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{stats.last_5_matches_wdl.wins}</div>
                            <div className="text-sm text-gray-400">Wins</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-400">{stats.last_5_matches_wdl.draws}</div>
                            <div className="text-sm text-gray-400">Draws</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-400">{stats.last_5_matches_wdl.losses}</div>
                            <div className="text-sm text-gray-400">Losses</div>
                        </div>
                    </>
                )}
                {activeTab === 'match statistic' && (
                    <>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-400">{stats.xG}</div>
                            <div className="text-sm text-gray-400">xG</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">
                                {stats.ball_possession}
                            </div>
                            <div className="text-sm text-gray-400">Ball Possession</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">
                                {Math.floor(stats.shots_on_target)}
                            </div>
                            <div className="text-sm text-gray-400">Shots on Target</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">
                                {Math.floor(stats.big_chances_created)}
                            </div>
                            <div className="text-sm text-gray-400">Big Chances created</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TeamStatsPanel;