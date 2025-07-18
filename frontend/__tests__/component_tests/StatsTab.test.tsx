import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatsTab from '../../src/components/ui/team_stats/StatsTab';

describe('StatsTab Component', () => {
    // Example stats array for most tests
    const stats = [
        { value: 10, label: 'Goals', description: 'Total goals scored' },
        { value: 5, label: 'Assists', description: 'Total assists' },
        { value: 2, label: 'Red Cards', description: 'Number of red cards' },
    ];

    it('renders all StatItem components', () => {
        // Checks that all StatItem components are rendered for each stat
        render(<StatsTab stats={stats} />);
        expect(screen.getByText('Goals')).toBeInTheDocument();
        expect(screen.getByText('Assists')).toBeInTheDocument();
        expect(screen.getByText('Red Cards')).toBeInTheDocument();
    });

    it('renders correct values and descriptions', () => {
        // Ensures values and descriptions are displayed for each stat
        render(<StatsTab stats={stats} />);
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('Total goals scored')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('Total assists')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('Number of red cards')).toBeInTheDocument();
    });

    it('renders nothing if stats array is empty', () => {
        // Ensures nothing is rendered if the stats array is empty
        const { container } = render(<StatsTab stats={[]} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('handles duplicate labels gracefully', () => {
        // Checks that duplicate labels are rendered for each stat
        const dupStats = [
            { value: 1, label: 'Goals', description: 'A' },
            { value: 2, label: 'Goals', description: 'B' },
        ];
        render(<StatsTab stats={dupStats} />);
        expect(screen.getAllByText('Goals')).toHaveLength(2);
    });
}); 