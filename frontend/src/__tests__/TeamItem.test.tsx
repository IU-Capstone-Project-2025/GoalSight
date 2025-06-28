import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TeamItem } from '../components/ui/team_item/TeamItem';
import { Team } from '../components/ui/team_item/Team.types';

// Mock data for testing
const mockTeam: Team = {
    id: 1,
    name: 'Manchester United',
    logoUrl: 'https://example.com/logo.png',
    country: 'England',
    coach: 'Erik ten Hag',
    market_value: 850000000,
    avg_age: 25.2,
    last_5_matches_wdl: {
        wins: 3,
        draws: 1,
        losses: 1
    },
    xG: 1.8,
    ball_possession: 65.5,
    shots_on_target: 12.3,
    big_chances_created: 8.7
};

// Mock functions
const mockOnToggleExpansion = jest.fn();
const mockOnSelectionChange = jest.fn();

const defaultProps = {
    team: mockTeam,
    isExpanded: false,
    onToggleExpansion: mockOnToggleExpansion,
    isSelected: false,
    onSelectionChange: mockOnSelectionChange,
    canSelect: true
};

describe('TeamItem Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders team information correctly', () => {
        render(<TeamItem {...defaultProps} />);

        expect(screen.getByText('Manchester United')).toBeInTheDocument();
        expect(screen.getByText('England')).toBeInTheDocument();
        expect(screen.getByText('W: 3')).toBeInTheDocument();
        expect(screen.getByText('D: 1')).toBeInTheDocument();
        expect(screen.getByText('L: 1')).toBeInTheDocument();
    });

    it('renders checkbox with correct state', () => {
        render(<TeamItem {...defaultProps} />);

        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox).toBeInTheDocument();
        expect(checkbox.checked).toBe(false);
        expect(checkbox.disabled).toBe(false);
    });

    it('renders checkbox as checked when isSelected is true', () => {
        render(<TeamItem {...defaultProps} isSelected={true} />);

        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
    });

    it('renders checkbox as disabled when canSelect is false and not selected', () => {
        render(<TeamItem {...defaultProps} canSelect={false} isSelected={false} />);

        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.disabled).toBe(true);
    });

    it('renders checkbox as enabled when canSelect is false but is selected', () => {
        render(<TeamItem {...defaultProps} canSelect={false} isSelected={true} />);

        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.disabled).toBe(false);
    });

    it('calls onSelectionChange when checkbox is clicked', () => {
        render(<TeamItem {...defaultProps} />);

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(mockOnSelectionChange).toHaveBeenCalledWith(1, true);
    });

    it('calls onToggleExpansion when team area is clicked', () => {
        render(<TeamItem {...defaultProps} />);

        // Click on the team name area
        const teamName = screen.getByText('Manchester United');
        fireEvent.click(teamName);

        expect(mockOnToggleExpansion).toHaveBeenCalledWith(1);
    });

    it('shows expand arrow with correct rotation when expanded', () => {
        const { container } = render(<TeamItem {...defaultProps} isExpanded={true} />);

        const arrow = container.querySelector('svg');
        expect(arrow).toHaveClass('rotate-180');
    });

    it('shows expand arrow without rotation when not expanded', () => {
        const { container } = render(<TeamItem {...defaultProps} isExpanded={false} />);

        const arrow = container.querySelector('svg');
        expect(arrow).not.toHaveClass('rotate-180');
    });

    it('renders TeamStatsPanel when expanded', () => {
        render(<TeamItem {...defaultProps} isExpanded={true} />);

        // TeamStatsPanel should be visible when expanded
        expect(screen.getByText('Market value')).toBeInTheDocument();
        expect(screen.getByText('Average age')).toBeInTheDocument();
    });

    it('does not render TeamStatsPanel when not expanded', () => {
        render(<TeamItem {...defaultProps} isExpanded={false} />);

        // TeamStatsPanel should not be visible when not expanded
        expect(screen.queryByText('Market value')).not.toBeInTheDocument();
        expect(screen.queryByText('Average age')).not.toBeInTheDocument();
    });

    it('has correct CSS classes for styling', () => {
        const { container } = render(<TeamItem {...defaultProps} />);

        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv).toHaveClass('bg-gray-800', 'rounded-lg', 'overflow-hidden');
    });

    it('renders with different team data', () => {
        const differentTeam: Team = {
            ...mockTeam,
            id: 2,
            name: 'Liverpool',
            country: 'England',
            last_5_matches_wdl: {
                wins: 2,
                draws: 2,
                losses: 1
            }
        };

        render(<TeamItem {...defaultProps} team={differentTeam} />);

        expect(screen.getByText('Liverpool')).toBeInTheDocument();
        expect(screen.getByText('W: 2')).toBeInTheDocument();
        expect(screen.getByText('D: 2')).toBeInTheDocument();
        expect(screen.getByText('L: 1')).toBeInTheDocument();
    });
}); 