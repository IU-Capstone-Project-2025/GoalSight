import React, { useState } from 'react';
import { Team } from './Team.types';

interface TeamItemProps {
    team: Team;
}

export const TeamItem: React.FC<TeamItemProps> = ({ team }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [expandedTeam, setExpandedTeam] = useState(null);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="">
                <div className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-750 cursor-pointer">
                    <div className="flex items-center">
                        <input
                            id={`checkbox-${team.id}`}
                            type="checkbox"
                            className="mr-4 w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="font-semibold text-lg">{team.name}</span>
                                <span className="ml-2 text-gray-400 text-sm">{team.country}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-300">
                                <span className="">W: {team.wins}</span>
                                <span className="">D: {team.draw}</span>
                                <span className="">L: {team.loss}</span>
                                <span className="text-red-400">Pts: {team.total_points}</span>
                            </div>
                        </div>

                    </div>
                    <div className="ml-4">
                        <svg
                            className={`w-5 h-5 transform transition-transform ${expandedTeam === team.id ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            data-oid="8uh8.r8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                                data-oid="moof61h"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
