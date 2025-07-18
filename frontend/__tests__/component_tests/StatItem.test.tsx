import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatItem from '../../src/components/ui/team_stats/StatItem';

describe('StatItem Component', () => {
    it('renders value, label, and tooltip', () => {
        // Checks that value, label, and tooltip are displayed
        render(<StatItem value={42} label="Goals" description="Total goals scored" />);
        expect(screen.getByText('42')).toBeInTheDocument();
        expect(screen.getByText('Goals')).toBeInTheDocument();
        expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('renders string value', () => {
        // Ensures string values are rendered correctly
        render(<StatItem value="N/A" label="Assists" description="No data" />);
        expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    it('has correct classes for value', () => {
        // Checks that the value uses the correct font and color classes
        render(<StatItem value={10} label="Shots" description="Shots on target" />);
        const value = screen.getByText('10');
        expect(value).toHaveClass('text-xl', 'md:text-2xl', 'font-bold', 'text-white');
    });

    it('renders different description in tooltip', () => {
        // Ensures the tooltip displays the correct description
        render(<StatItem value={1} label="Red Cards" description="Number of red cards" />);
        expect(screen.getByText('Number of red cards')).toBeInTheDocument();
    });
}); 