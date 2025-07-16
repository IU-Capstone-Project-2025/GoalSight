import React from 'react';
import StatItem from './StatItem';

type StatConfig = {
    // Value of the statistic (number or string)
    value: string | number;
    // Label for the statistic
    label: string;
    // Description for the tooltip
    description: string;
};

type StatsTabProps = {
    // Array of stats to display
    stats: StatConfig[];
};

// Renders a list of StatItem components for each stat
const StatsTab: React.FC<StatsTabProps> = ({ stats }) => (
    <>
        {stats.map((stat) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} description={stat.description} />
        ))}
    </>
);

export default StatsTab; 