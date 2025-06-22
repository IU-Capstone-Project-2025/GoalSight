import React, { useState } from 'react';
import { Team } from './Team.types';

interface TeamItemProps {
    team: Team;
    isExpanded: boolean;
    onToggleExpansion: (teamId: number) => void;
    isSelected: boolean;
    onSelectionChange: (teamId: number, isSelected: boolean) => void;
    canSelect: boolean;
}

export const TeamItem: React.FC<TeamItemProps> = ({
    team,
    isExpanded,
    onToggleExpansion,
    isSelected,
    onSelectionChange,
    canSelect
}) => {
    const [activeTab, setActiveTab] = useState('overview');

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // e.stopPropagation();
        onSelectionChange(team.id, !isSelected);
    };

    const handleTeamClick = () => {
        onToggleExpansion(team.id);
    };

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-750 cursor-pointer"
                onClick={handleTeamClick}>
                <div className="flex items-center">
                    <input
                        id={`checkbox-${team.id}`}
                        type="checkbox"
                        className="mr-4 w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                        checked={isSelected}
                        onChange={handleCheckboxChange}
                        disabled={!canSelect && !isSelected}
                    />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="font-semibold text-lg">{team.name}</span>
                            <span className="ml-2 text-gray-400 text-sm">{team.country}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                            <span>W: {team.wins}</span>
                            <span>D: {team.draw}</span>
                            <span>L: {team.loss}</span>
                            <span className="text-red-400">Pts: {team.total_points}</span>
                        </div>
                    </div>
                </div>
                <div className="ml-4">
                    <svg
                        className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>

            {/* Expanded Statistics Panel */}
            {isExpanded && (
                <div className="bg-gray-750 p-6">
                    {/* Tabs */}
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

                    {/* Tab Content */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {activeTab === 'overview' && (
                            <>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-400">
                                        {team.wins}
                                    </div>
                                    <div className="text-sm text-gray-400">Wins</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">
                                        {team.draw}
                                    </div>
                                    <div className="text-sm text-gray-400">Draws</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-400">
                                        {team.loss}
                                    </div>
                                    <div className="text-sm text-gray-400">Losses</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-400">
                                        {team.total_points}
                                    </div>
                                    <div className="text-sm text-gray-400">Points</div>
                                </div>
                            </>
                        )}
                        {activeTab === 'attack' && (
                            <>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-400">
                                        {team.goals}
                                    </div>
                                    <div className="text-sm text-gray-400">Goals Scored</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-400">
                                        {(team.goals / 20).toFixed(1)}
                                    </div>
                                    <div className="text-sm text-gray-400">Goals/Game</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-400">
                                        {Math.floor(team.goals * 0.6)}
                                    </div>
                                    <div className="text-sm text-gray-400">Shots on Target</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">
                                        {Math.floor(team.goals * 0.3)}
                                    </div>
                                    <div className="text-sm text-gray-400">Assists</div>
                                </div>
                            </>
                        )}
                        {activeTab === 'defense' && (
                            <>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-400">
                                        {team.conceded}
                                    </div>
                                    <div className="text-sm text-gray-400">Goals Conceded</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-400">
                                        {20 - team.conceded}
                                    </div>
                                    <div className="text-sm text-gray-400">Clean Sheets</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-400">
                                        {Math.floor(team.conceded * 2.5)}
                                    </div>
                                    <div className="text-sm text-gray-400">Tackles</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-400">
                                        {Math.floor(team.conceded * 1.8)}
                                    </div>
                                    <div className="text-sm text-gray-400">Interceptions</div>
                                </div>
                            </>
                        )}
                        {activeTab === 'form' && (
                            <>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-400">
                                        W-W-D-W-W
                                    </div>
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
            )}
        </div>
    );
};
