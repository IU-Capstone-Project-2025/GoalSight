import React from 'react';
import { TeamListItem } from './Team.types';
import TeamStatsPanel from './TeamStatsPanel';

interface TeamItemProps {
    team: TeamListItem;
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
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSelectionChange(team.id, !isSelected);
    };

    const handleTeamClick = () => {
        onToggleExpansion(team.id);
    };

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden" data-cy="team-item">
            <div className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-750 cursor-pointer"
            >
                <div className="flex items-center">
                    <input
                        id={`checkbox-${team.id}`}
                        data-cy={`team-checkbox-${team.id}`}
                        type="checkbox"
                        className="mr-4 w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                        checked={isSelected}
                        onChange={handleCheckboxChange}
                        disabled={!canSelect && !isSelected}
                    />
                </div>
                <div className="flex-1" onClick={handleTeamClick}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src={team.logoUrl}
                                alt={team.name}
                                className="w-7 h-7 rounded mr-2 bg-transparent object-contain"
                            />
                            <span className="font-semibold text-lg">{team.name}</span>
                            <span className="ml-2 text-gray-400 text-sm">{team.country}</span>
                        </div>
                    </div>
                </div>
                <div className="ml-4" onClick={handleTeamClick}>
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

            {isExpanded && (
                <TeamStatsPanel name={team.name} />
            )}
        </div>
    );
};
