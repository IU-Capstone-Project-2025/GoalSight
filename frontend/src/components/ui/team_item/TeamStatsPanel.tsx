import React, { useState } from 'react';
import { useTeamStats } from './useTeamStats';

type TeamStatsPanelProps = {
    name: string;
};

const TeamStatsPanel: React.FC<TeamStatsPanelProps> = ({ name }) => {
    const { stats, loadingStats } = useTeamStats(name);
    const [activeTab, setActiveTab] = useState('overview');

    if (loadingStats) return <div className="p-3 md:p-6">Loading statistics...</div>;
    if (!stats) return <div className="p-3 md:p-6">No data</div>;

    return (
        <div className="bg-gray-750 p-3 md:p-6">
            <div className="flex space-x-2 md:space-x-4 mb-3 md:mb-6 border-b border-gray-600">
                {['overview', 'form', 'match statistic'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-1 md:pb-2 px-1 text-xs md:text-sm font-medium capitalize ${activeTab === tab
                            ? 'text-red-400 border-b-2 border-red-400'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {activeTab === 'overview' && (
                    <>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-green-400">{stats.market_value}</div>
                            <div className="text-xs md:text-sm text-gray-400">Market value</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-yellow-400">{stats.avg_age}</div>
                            <div className="text-xs md:text-sm text-gray-400">Average age</div>
                        </div>
                    </>
                )}
                {activeTab === 'form' && (
                    <>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-green-400">{stats.last_5_matches_wdl.wins}</div>
                            <div className="text-xs md:text-sm text-gray-400">Wins</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-yellow-400">{stats.last_5_matches_wdl.draws}</div>
                            <div className="text-xs md:text-sm text-gray-400">Draws</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-red-400">{stats.last_5_matches_wdl.losses}</div>
                            <div className="text-xs md:text-sm text-gray-400">Losses</div>
                        </div>
                    </>
                )}
                {activeTab === 'match statistic' && (
                    <>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-red-400">{stats.xG}</div>
                            <div className="text-xs md:text-sm text-gray-400">xG</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-green-400">
                                {stats.ball_possession}
                            </div>
                            <div className="text-xs md:text-sm text-gray-400">Ball Possession</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-blue-400">
                                {Math.floor(stats.shots_on_target)}
                            </div>
                            <div className="text-xs md:text-sm text-gray-400">Shots on Target</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-purple-400">
                                {Math.floor(stats.big_chances_created)}
                            </div>
                            <div className="text-xs md:text-sm text-gray-400">Big Chances created</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TeamStatsPanel;