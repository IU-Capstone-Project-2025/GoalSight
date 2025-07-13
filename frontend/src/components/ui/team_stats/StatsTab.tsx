import React from 'react';
import StatItem from './StatItem';

type StatConfig = {
    value: string | number;
    label: string;
    description: string;
};

type StatsTabProps = {
    stats: StatConfig[];
};

const StatsTab: React.FC<StatsTabProps> = ({ stats }) => (
    <>
        {stats.map((stat) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} description={stat.description} />
        ))}
    </>
);

export default StatsTab; 