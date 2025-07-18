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

    // Stats for each tab
    const teamStrengthStats = [
        {
            value: stats.team_strength,
            label: 'Team Strength',
            description: 'A key indicator of overall team power, calculated from a combination of advanced metrics and expert assessments.'
        },
        {
            value: stats.league_strength,
            label: 'League Strength',
            description: 'Reflects the overall competitiveness of the league in which the team plays.'
        },
        {
            value: stats.glicko2_rating,
            label: 'Glicko-2 Rating',
            description: 'A rating system that measures team strength and reliability, accounting for both performance and uncertainty.'
        },
        {
            value: stats.elo_rating,
            label: 'Elo Rating',
            description: 'A classic rating system used to rank teams based on match results and opponent strength.'
        }
    ];

    const formStats = [
        {
            value: stats.wins_last_5,
            label: 'Wins (last 5)',
            description: 'Number of matches won in the last 5 games.'
        },
        {
            value: stats.drawns_last_5,
            label: 'Draws (last 5)',
            description: 'Number of matches drawn in the last 5 games.'
        },
        {
            value: stats.losses_last_5,
            label: 'Losses (last 5)',
            description: 'Number of matches lost in the last 5 games.'
        },
        {
            value: stats.goal_avg_last_5,
            label: 'Goals Avg (last 5)',
            description: 'Average number of goals scored per match in the last 5 games.'
        },
        {
            value: stats.avg_xG_last_5,
            label: 'Avg xG (last 5)',
            description: 'Expected goals per match in the last 5 games, showing attacking quality.'
        },
        {
            value: stats.avg_xGA_last_5,
            label: 'Avg xGA (last 5)',
            description: 'Expected goals against per match in the last 5 games, showing defensive quality.'
        }
    ];

    const freshnessStats = [
        {
            value: stats.days_since_last_game,
            label: 'Days Since Last Game',
            description: 'Number of days since the team played their last match. Indicates freshness and rest.'
        },
        {
            value: stats.matches_14_days,
            label: 'Matches in Last 14 Days',
            description: 'Number of matches played in the last 2 weeks. Higher values may indicate fatigue.'
        }
    ];

    const financeStats = [
        {
            value: stats.market_value,
            label: 'Market Value',
            description: 'Total market value of the team, usually in million euros.'
        },
        {
            value: stats.avg_age,
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