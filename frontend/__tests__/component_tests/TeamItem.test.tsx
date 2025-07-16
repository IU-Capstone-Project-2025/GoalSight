import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TeamItem } from '../../src/components/ui/team_item/TeamItem';
import { Team } from '../../src/components/ui/team_item/Team.types';

// Mock the stats API to control data returned to TeamItem
jest.mock('../../src/components/ui/team_stats/statsApi', () => ({
    fetchTeamStats: jest.fn(),
}));
import { fetchTeamStats } from '../../src/components/ui/team_stats/statsApi';

// Mock team data for use in tests
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

// Mock event handler functions for selection and expansion
const mockOnToggleExpansion = jest.fn();
const mockOnSelectionChange = jest.fn();

// Default props for most tests
const defaultProps = {
    team: mockTeam,
    isExpanded: false,
    onToggleExpansion: mockOnToggleExpansion,
    isSelected: false,
    onSelectionChange: mockOnSelectionChange,
    canSelect: true
};

// Main test suite for TeamItem
// Covers rendering, selection, expansion, and async stats loading
describe('TeamItem Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders team information correctly', () => {
        // Checks that team name and country are displayed
        render(<TeamItem {...defaultProps} />);
        expect(screen.getByText('Manchester United')).toBeInTheDocument();
        expect(screen.getByText('England')).toBeInTheDocument();
    });

    it('renders checkbox with correct state', () => {
        // Ensures the checkbox is present, unchecked, and enabled by default
        render(<TeamItem {...defaultProps} />);
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox).toBeInTheDocument();
        expect(checkbox.checked).toBe(false);
        expect(checkbox.disabled).toBe(false);
    });

    it('renders checkbox as checked when isSelected is true', () => {
        // Checks that the checkbox is checked when isSelected is true
        render(<TeamItem {...defaultProps} isSelected={true} />);
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
    });

    it('renders checkbox as disabled when canSelect is false and not selected', () => {
        // Ensures the checkbox is disabled if canSelect is false and not selected
        render(<TeamItem {...defaultProps} canSelect={false} isSelected={false} />);
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.disabled).toBe(true);
    });

    it('renders checkbox as enabled when canSelect is false but is selected', () => {
        // Ensures the checkbox is enabled if selected, even if canSelect is false
        render(<TeamItem {...defaultProps} canSelect={false} isSelected={true} />);
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.disabled).toBe(false);
    });

    it('calls onSelectionChange when checkbox is clicked', () => {
        // Simulates user clicking the checkbox and checks handler call
        render(<TeamItem {...defaultProps} />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(mockOnSelectionChange).toHaveBeenCalledWith(1, true);
    });

    it('calls onToggleExpansion when team area is clicked', () => {
        // Simulates clicking the team name to expand/collapse
        render(<TeamItem {...defaultProps} />);
        // Click on the team name area
        const teamName = screen.getByText('Manchester United');
        fireEvent.click(teamName);
        expect(mockOnToggleExpansion).toHaveBeenCalledWith(1);
    });

    it('shows expand arrow with correct rotation when expanded', () => {
        // Checks that the expand arrow is rotated when expanded
        const { container } = render(<TeamItem {...defaultProps} isExpanded={true} />);
        const arrow = container.querySelector('svg');
        expect(arrow).toHaveClass('rotate-180');
    });

    it('shows expand arrow without rotation when not expanded', () => {
        // Checks that the expand arrow is not rotated when not expanded
        const { container } = render(<TeamItem {...defaultProps} isExpanded={false} />);
        const arrow = container.querySelector('svg');
        expect(arrow).not.toHaveClass('rotate-180');
    });

    it('renders TeamStatsPanel when expanded', async () => {
        // Mocks stats API and checks that TeamStatsPanel is rendered when expanded
        (fetchTeamStats as jest.Mock).mockResolvedValueOnce({
            logoUrl: 'https://example.com/logo.png',
            country: 'England',
            coach: 'Erik ten Hag',
            market_value: 850000000,
            avg_age: 25.2,
            last_5_matches_wdl: { wins: 3, draws: 1, losses: 1 },
            xG: 1.8,
            ball_possession: 65.5,
            shots_on_target: 12.3,
            big_chances_created: 8.7,
        });
        render(<TeamItem {...defaultProps} isExpanded={true} />);
        // Wait for async stats to load
        await waitFor(() => expect(screen.queryByText('Loading statistics...')).not.toBeInTheDocument());
        fireEvent.click(screen.getByRole('button', { name: 'Finances' }));
        expect(screen.getByText('Market Value')).toBeInTheDocument();
        expect(screen.getByText('Average Age')).toBeInTheDocument();
    });

    it('does not render TeamStatsPanel when not expanded', () => {
        // Ensures TeamStatsPanel is not visible when not expanded
        render(<TeamItem {...defaultProps} isExpanded={false} />);
        // TeamStatsPanel should not be visible when not expanded
        expect(screen.queryByText('Market value')).not.toBeInTheDocument();
        expect(screen.queryByText('Average age')).not.toBeInTheDocument();
    });

    it('has correct CSS classes for styling', () => {
        // Checks that the main container uses the expected background and border radius classes
        const { container } = render(<TeamItem {...defaultProps} />);
        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv).toHaveClass('bg-gray-800', 'rounded-lg', 'overflow-hidden');
    });

    it('renders with different team data', () => {
        // Verifies rendering with a different team object
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
    });
}); 