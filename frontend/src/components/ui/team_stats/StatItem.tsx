import React from 'react';
import Tooltip from './Tooltip';

type StatItemProps = {
    // Value of the statistic (number or string)
    value: string | number;
    // Label for the statistic
    label: string;
    // Description for the tooltip
    description: string;
};

// Renders a stat value, label, and tooltip
const StatItem: React.FC<StatItemProps> = ({ value, label, description }) => {
    return (
        <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-white">{value}</div>
            <div className="text-xs md:text-sm text-gray-400 flex items-center justify-center">
                {label}
                <Tooltip description={description} />
            </div>
        </div>
    );
};

export default StatItem; 