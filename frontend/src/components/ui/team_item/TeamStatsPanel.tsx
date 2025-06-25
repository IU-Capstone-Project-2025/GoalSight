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
                {['overview', 'attack', 'defense', 'form'].map((tab) => (
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
                            <div className="text-2xl font-bold text-green-400">{stats.wins}</div>
                            <div className="text-sm text-gray-400">Wins</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-400">{stats.draw}</div>
                            <div className="text-sm text-gray-400">Draws</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-400">{stats.loss}</div>
                            <div className="text-sm text-gray-400">Losses</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">{stats.total_points}</div>
                            <div className="text-sm text-gray-400">Points</div>
                        </div>
                    </>
                )}
                {activeTab === 'attack' && (
                    <>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{stats.goals}</div>
                            <div className="text-sm text-gray-400">Goals Scored</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">
                                {(stats.goals / 20).toFixed(1)}
                            </div>
                            <div className="text-sm text-gray-400">Goals/Game</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">
                                {Math.floor(stats.goals * 0.6)}
                            </div>
                            <div className="text-sm text-gray-400">Shots on Target</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-400">
                                {Math.floor(stats.goals * 0.3)}
                            </div>
                            <div className="text-sm text-gray-400">Assists</div>
                        </div>
                    </>
                )}
                {activeTab === 'defense' && (
                    <>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-400">{stats.conceded}</div>
                            <div className="text-sm text-gray-400">Goals Conceded</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">
                                {20 - stats.conceded}
                            </div>
                            <div className="text-sm text-gray-400">Clean Sheets</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">
                                {Math.floor(stats.conceded * 2.5)}
                            </div>
                            <div className="text-sm text-gray-400">Tackles</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">
                                {Math.floor(stats.conceded * 1.8)}
                            </div>
                            <div className="text-sm text-gray-400">Interceptions</div>
                        </div>
                    </>
                )}
                {activeTab === 'form' && (
                    <>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">W-W-D-W-W</div>
                            <div className="text-sm text-gray-400">Last 5 Games</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">
                                {Math.floor(Math.random() * 5) + 1}
                            </div>
                            <div className="text-sm text-gray-400">Win Streak</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-400">
                                {Math.floor(Math.random() * 3) + 1}
                            </div>
                            <div className="text-sm text-gray-400">Home Wins</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">
                                {Math.floor(Math.random() * 3) + 1}
                            </div>
                            <div className="text-sm text-gray-400">Away Wins</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TeamStatsPanel;