import React, { useState } from 'react';
import { useTeamStats } from './useTeamStats';
import StatsTab from './StatsTab';

type TeamStatsPanelProps = {
    // Name of the team to fetch and display stats for
    name: string;
};

// Renders a tabbed stats panel for the given team
const TeamStatsPanel: React.FC<TeamStatsPanelProps> = ({ name }) => {
    const { stats, loadingStats } = useTeamStats(name);
    const [activeTab, setActiveTab] = useState('team strength');

    // Show loading or no data messages
    if (loadingStats) return <div className="p-3 md:p-6">Loading statistics...</div>;
    if (!stats) return <div className="p-3 md:p-6">No data</div>;

    function roundStatValue(val: any) {
        return typeof val === 'number' ? Number(val.toFixed(1)) : val;
    }

    // Stats for each tab
    const teamStrengthStats = [
        {
            value: roundStatValue(stats.team_strength) + '%',
            label: 'Team Strength',
            description: 'The normalized score assigned to a team according to the Opta’s Power Rankings. A team\'s strength indicator consisting of several inputs.'
        },
        {
            value: roundStatValue(stats.league_strength) + '%',
            label: 'League Strength',
            description: 'The normalized score assigned to the league in accordance with the Opta\'s Power Rankings. A league strength indicator consisting of several inputs, including the strength indicators of the teams in this league.'
        },
        {
            value: roundStatValue(stats.glicko2_rating),
            label: 'Glicko-2 Rating',
            description: 'A rating that evaluates the strength of a team based on the results of past matches. It takes into account such indicators as: wins, losses, form stability and accuracy of rating fame.'
        },
        {
            value: roundStatValue(stats.elo_rating),
            label: 'Elo Rating',
            description: 'A system for evaluating the strength of a team based on the results of matches. Defeating a strong opponent gives you more points than defeating a weak one. Defeat from the weak - reduces the rating more.'
        }
    ];

    const formStats = [
        {
            value: roundStatValue(stats.wins_last_5),
            label: 'Wins (last 5)',
            description: 'Number of matches won in the last 5 games.'
        },
        {
            value: roundStatValue(stats.draws_last_5),
            label: 'Draws (last 5)',
            description: 'Number of matches drawn in the last 5 games.'
        },
        {
            value: roundStatValue(stats.losses_last_5),
            label: 'Losses (last 5)',
            description: 'Number of matches lost in the last 5 games.'
        },
        {
            value: roundStatValue(stats.goal_avg_last_5),
            label: 'Goals Avg (last 5)',
            description: 'Average number of goals scored per match in the last 5 games.'
        },
        {
            value: roundStatValue(stats.avg_xG_last_5),
            label: 'Avg xG (last 5)',
            description: 'Expected goals per match in the last 5 games, showing attacking quality.'
        },
        {
            value: roundStatValue(stats.avg_xGA_last_5),
            label: 'Avg xGA (last 5)',
            description: 'Expected goals against per match in the last 5 games, showing defensive quality.'
        }
    ];

    const freshnessStats = [
        {
            value: roundStatValue(stats.days_since_last_game),
            label: 'Days Since Last Game',
            description: 'Number of days since the team played their last match. Indicates freshness and rest.'
        },
        {
            value: roundStatValue(stats.matches_14_days),
            label: 'Matches in Last 14 Days',
            description: 'Number of matches played in the last 2 weeks. Higher values may indicate fatigue.'
        }
    ];

    const financeStats = [
        {
            value: '€' + roundStatValue(stats.market_value) + 'M',
            label: 'Market Value',
            description: 'Total market value of the team in million euros.'
        },
        {
            value: roundStatValue(stats.avg_age),
            label: 'Average Age',
            description: 'Average age of the team squad.'
        }
    ];

    // Determine which stats to show based on the active tab
    let currentStats = teamStrengthStats;
    if (activeTab === 'team form') currentStats = formStats;
    if (activeTab === 'team freshness') currentStats = freshnessStats;
    if (activeTab === 'finances') currentStats = financeStats;

    // Tab definitions
    const tabs = [
        { key: 'team strength', label: 'Team Strength' },
        { key: 'team form', label: 'Team Form' },
        { key: 'team freshness', label: 'Team Freshness' },
        { key: 'finances', label: 'Finances' },
    ];

    return (
        <div className="bg-gray-750 p-3 md:p-6">
            {/* Tab buttons */}
            <div className="flex space-x-2 md:space-x-4 mb-3 md:mb-6 border-b border-gray-600">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`pb-1 md:pb-2 px-1 text-xs md:text-sm font-medium capitalize ${activeTab === tab.key
                            ? 'text-red-400 border-b-2 border-red-400'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {/* Stats for the active tab */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                <StatsTab stats={currentStats} />
            </div>
        </div>
    );
};

export default TeamStatsPanel;