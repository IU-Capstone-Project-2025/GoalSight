import React from 'react';
import { TeamListItem } from './Team.types';
import TeamStatsPanel from '../team_stats/TeamStatsPanel';

interface TeamItemProps {
    // Team data to display
    team: TeamListItem;
    // Whether this team is expanded to show stats
    isExpanded: boolean;
    // Callback to toggle expansion
    onToggleExpansion: (teamId: number) => void;
    // Whether this team is selected (checkbox)
    isSelected: boolean;
    // Callback for selection change
    onSelectionChange: (teamId: number, isSelected: boolean) => void;
    // Whether the team can be selected (checkbox enabled)
    canSelect: boolean;
}

// Renders a team row with selection and expansion logic
export const TeamItem: React.FC<TeamItemProps> = ({
    team,
    isExpanded,
    onToggleExpansion,
    isSelected,
    onSelectionChange,
    canSelect
}) => {
    // Handle checkbox toggle
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSelectionChange(team.id, !isSelected);
    };

    // Handle click to expand/collapse stats
    const handleTeamClick = () => {
        onToggleExpansion(team.id);
    };

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden" data-cy="team-item">
            <div className="flex items-center p-2 md:p-4 border-b border-gray-700 hover:bg-gray-750 cursor-pointer"
            >
                <div className="flex items-center">
                    {/* Team selection checkbox */}
                    <input
                        id={`checkbox-${team.id}`}
                        data-cy={`team-checkbox-${team.id}`}
                        type="checkbox"
                        className="mr-2 md:mr-4 w-3 h-3 md:w-4 md:h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                        checked={isSelected}
                        onChange={handleCheckboxChange}
                        disabled={!canSelect && !isSelected}
                    />
                </div>
                {/* Team info and expand/collapse arrow */}
                <div className="flex-1" onClick={handleTeamClick}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src={team.logoUrl}
                                alt={team.name}
                                className="w-5 h-5 md:w-7 md:h-7 rounded mr-1 md:mr-2 bg-transparent object-contain"
                            />
                            <span className="font-semibold text-base md:text-lg" translate='no'>{team.name}</span>
                            <span className="ml-1 md:ml-2 text-gray-400 text-xs md:text-sm">{team.country}</span>
                        </div>
                    </div>
                </div>
                <div className="ml-2 md:ml-4" onClick={handleTeamClick}>
                    {/* Arrow icon for expand/collapse */}
                    <svg
                        className={`w-4 h-4 md:w-5 md:h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
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

            {/* Show stats panel if expanded */}
            {isExpanded && (
                <TeamStatsPanel name={team.name} />
            )}
        </div>
    );
};
