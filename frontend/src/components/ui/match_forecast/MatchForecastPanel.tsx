import React from 'react';
import { Team } from '../team_item/Team.types';

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
    <div
        className="bg-gray-800 rounded-lg p-6 mb-8"
        data-cy="prediction-panel"
    >
        <h3 className="text-xl font-bold mb-4 text-red-400">MATCH FORECAST</h3>
        <div className="flex items-center justify-between">
            <div className="text-center">
                <div className="text-lg font-semibold" data-cy="team1-name">{team1}</div>
                <div className="text-2xl font-bold text-green-400" data-cy="team1-chance">{team1Chance}%</div>
            </div>
            <div className="text-gray-400 text-lg">VS</div>
            <div className="text-center">
                <div className="text-lg font-semibold" data-cy="team2-name">{team2}</div>
                <div className="text-2xl font-bold text-green-400" data-cy="team2-chance">{team2Chance}%</div>
            </div>
        </div>
    </div>
);

export default MatchForecastPanel;