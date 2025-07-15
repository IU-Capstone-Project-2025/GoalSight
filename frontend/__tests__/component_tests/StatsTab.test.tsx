import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatsTab from '../../src/components/ui/team_stats/StatsTab';

describe('StatsTab Component', () => {
    const stats = [
        { value: 10, label: 'Goals', description: 'Total goals scored' },
        { value: 5, label: 'Assists', description: 'Total assists' },
        { value: 2, label: 'Red Cards', description: 'Number of red cards' },
    ];

    it('renders all StatItem components', () => {
        render(<StatsTab stats={stats} />);
        expect(screen.getByText('Goals')).toBeInTheDocument();
        expect(screen.getByText('Assists')).toBeInTheDocument();
        expect(screen.getByText('Red Cards')).toBeInTheDocument();
    });

    it('renders correct values and descriptions', () => {
        render(<StatsTab stats={stats} />);
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('Total goals scored')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('Total assists')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('Number of red cards')).toBeInTheDocument();
    });

    it('renders nothing if stats array is empty', () => {
        const { container } = render(<StatsTab stats={[]} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('handles duplicate labels gracefully', () => {
        const dupStats = [
            { value: 1, label: 'Goals', description: 'A' },
            { value: 2, label: 'Goals', description: 'B' },
        ];
        render(<StatsTab stats={dupStats} />);
        expect(screen.getAllByText('Goals')).toHaveLength(2);
    });
}); 