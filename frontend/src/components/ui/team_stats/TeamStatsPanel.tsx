import React, { useState } from 'react';
import { useTeamStats } from './useTeamStats';
import StatsTab from './StatsTab';

type TeamStatsPanelProps = {
    name: string;
};

const TeamStatsPanel: React.FC<TeamStatsPanelProps> = ({ name }) => {
    const { stats, loadingStats } = useTeamStats(name);
    const [activeTab, setActiveTab] = useState('overview');

    if (loadingStats) return <div className="p-3 md:p-6">Loading statistics...</div>;
    if (!stats) return <div className="p-3 md:p-6">No data</div>;

    const overviewStats = [
        {
            value: stats.market_value,
            label: 'Market value',
            description: 'The total market value of all players in the team squad, calculated based on current transfer market valuations.'
        },
        {
            value: stats.avg_age,
            label: 'Average age',
            description: 'The average age of all players in the team squad, calculated by summing all player ages and dividing by the number of players.'
        }
    ];
    const formStats = [
        {
            value: stats.last_5_matches_wdl.wins,
            label: 'Wins',
            description: "Number of matches won in the last 5 games. Shows the team's recent winning performance."
        },
        {
            value: stats.last_5_matches_wdl.draws,
            label: 'Draws',
            description: 'Number of matches drawn in the last 5 games. Shows how often the team has tied recently.'
        },
        {
            value: stats.last_5_matches_wdl.losses,
            label: 'Losses',
            description: 'Number of matches lost in the last 5 games. Indicates recent poor performance or difficult opponents.'
        }
    ];
    const matchStats = [
        {
            value: stats.xG,
            label: 'xG',
            description: 'Expected Goals (xG) is a statistical measure that quantifies the quality of goal-scoring chances. Higher xG indicates better attacking opportunities created.'
        },
        {
            value: `${stats.ball_possession}%`,
            label: 'Ball Possession',
            description: 'The percentage of time the team controls the ball during matches. Higher possession often indicates better ball control and attacking style.'
        },
        {
            value: Math.floor(stats.shots_on_target),
            label: 'Shots on Target',
            description: 'The average number of shots that hit the target (goal frame) per match. Indicates attacking efficiency and accuracy.'
        },
        {
            value: Math.floor(stats.big_chances_created),
            label: 'Big Chances Created',
            description: "The average number of high-quality scoring opportunities created per match. Shows the team's ability to create clear goal-scoring chances."
        }
    ];

    let currentStats: { value: string | number; label: string; description: string }[] = overviewStats;
    if (activeTab === 'form') currentStats = formStats;
    if (activeTab === 'match statistic') currentStats = matchStats;

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
                <StatsTab stats={currentStats} />
            </div>
        </div>
    );
};

export default TeamStatsPanel;