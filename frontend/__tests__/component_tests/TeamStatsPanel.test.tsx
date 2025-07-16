import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeamStatsPanel from '../../src/components/ui/team_stats/TeamStatsPanel';
import { Team } from '../../src/components/ui/team_item/Team.types';
import { useTeamStats } from '../../src/components/ui/team_stats/useTeamStats';

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

// Mock the useTeamStats hook to control stats and loading state
jest.mock('../../src/components/ui/team_stats/useTeamStats', () => ({
    useTeamStats: jest.fn()
}));

// Set up default mock return value before each test
beforeEach(() => {
    (useTeamStats as jest.Mock).mockReturnValue({
        stats: mockTeam,
        loadingStats: false
    });
});

// Main test suite for TeamStatsPanel
// Covers tab switching, data rendering, loading, and no data states
describe('TeamStatsPanel Component', () => {
    it('renders Team Strength tab by default', () => {
        // Checks that the Team Strength tab and its stats are shown by default
        render(<TeamStatsPanel name="Manchester United" />);
        const tabButton = screen.getByRole('button', { name: 'Team Strength' });
        expect(tabButton).toHaveClass('text-red-400');
        expect(screen.getAllByText('Team Strength').length).toBeGreaterThan(1);
        expect(screen.getByText('League Strength')).toBeInTheDocument();
        expect(screen.getByText('Glicko-2 Rating')).toBeInTheDocument();
        expect(screen.getByText('Elo Rating')).toBeInTheDocument();
    });

    it('switches to Team Form tab and shows correct stats', () => {
        // Simulates clicking the Team Form tab and checks for form stats
        render(<TeamStatsPanel name="Manchester United" />);
        fireEvent.click(screen.getByText('Team Form'));
        expect(screen.getByText('Wins (last 5)')).toBeInTheDocument();
        expect(screen.getByText('Draws (last 5)')).toBeInTheDocument();
        expect(screen.getByText('Losses (last 5)')).toBeInTheDocument();
        expect(screen.getByText('Goals Avg (last 5)')).toBeInTheDocument();
        expect(screen.getByText('Avg xG (last 5)')).toBeInTheDocument();
        expect(screen.getByText('Avg xGA (last 5)')).toBeInTheDocument();
    });

    it('switches to Team Freshness tab and shows correct stats', () => {
        // Simulates clicking the Team Freshness tab and checks for freshness stats
        render(<TeamStatsPanel name="Manchester United" />);
        fireEvent.click(screen.getByText('Team Freshness'));
        expect(screen.getByText('Days Since Last Game')).toBeInTheDocument();
        expect(screen.getByText('Matches in Last 14 Days')).toBeInTheDocument();
    });

    it('switches to Finances tab and shows correct stats', () => {
        // Simulates clicking the Finances tab and checks for financial stats
        render(<TeamStatsPanel name="Manchester United" />);
        fireEvent.click(screen.getByText('Finances'));
        expect(screen.getByText('Market Value')).toBeInTheDocument();
        expect(screen.getByText('Average Age')).toBeInTheDocument();
    });

    it('renders all tab buttons', () => {
        // Ensures all tab buttons are present
        render(<TeamStatsPanel name="Manchester United" />);
        expect(screen.getByRole('button', { name: 'Team Strength' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Team Form' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Team Freshness' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Finances' })).toBeInTheDocument();
    });

    it('renders No data when stats is null and loadingStats is false', () => {
        // Simulates no data returned and checks for "No data" message
        (useTeamStats as jest.Mock).mockReturnValue({
            stats: null,
            loadingStats: false
        });
        render(<TeamStatsPanel name="Manchester United" />);
        expect(screen.getByText('No data')).toBeInTheDocument();
    });

    it('renders Loading statistics... when loadingStats is true', () => {
        // Simulates loading state and checks for loading message
        (useTeamStats as jest.Mock).mockReturnValue({
            stats: null,
            loadingStats: true
        });
        render(<TeamStatsPanel name="Manchester United" />);
        expect(screen.getByText('Loading statistics...')).toBeInTheDocument();
    });
}); 