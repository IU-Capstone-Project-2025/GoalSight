import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeamStatsPanel from '../../src/components/ui/team_stats/TeamStatsPanel';
import { Team } from '../../src/components/ui/team_item/Team.types';
import { useTeamStats } from '../../src/components/ui/team_stats/useTeamStats';

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

jest.mock('../../src/components/ui/team_stats/useTeamStats', () => ({
    useTeamStats: jest.fn()
}));

beforeEach(() => {
    (useTeamStats as jest.Mock).mockReturnValue({
        stats: mockTeam,
        loadingStats: false
    });
});

describe('TeamStatsPanel Component', () => {
    it('renders overview tab by default', () => {
        render(<TeamStatsPanel name="Manchester United" />);
        const overviewTab = screen.getByText('overview');
        expect(overviewTab).toHaveClass('text-red-400');
        expect(screen.getByText('850000000')).toBeInTheDocument();
        expect(screen.getByText('25.2')).toBeInTheDocument();
    });

    it('switches to form tab when clicked', async () => {
        render(<TeamStatsPanel name="Manchester United" />);
        const formTab = screen.getByText('form');
        fireEvent.click(formTab);
        expect(formTab).toHaveClass('text-red-400');
        expect(screen.getByText('Wins')).toBeInTheDocument();
        expect(screen.getByText('Draws')).toBeInTheDocument();
        expect(screen.getByText('Losses')).toBeInTheDocument();
        const winsValue = screen.getByText('Wins').previousElementSibling;
        const drawsValue = screen.getByText('Draws').previousElementSibling;
        const lossesValue = screen.getByText('Losses').previousElementSibling;
        expect(winsValue).toHaveTextContent('3');
        expect(drawsValue).toHaveTextContent('1');
        expect(lossesValue).toHaveTextContent('1');
    });

    it('switches to match statistic tab when clicked', async () => {
        render(<TeamStatsPanel name="Manchester United" />);
        const matchStatTab = screen.getByText('match statistic');
        fireEvent.click(matchStatTab);
        expect(matchStatTab).toHaveClass('text-red-400');
        expect(screen.getByText('1.8')).toBeInTheDocument();
        expect(screen.getByText((content) => content.replace(/\s/g, '').includes('65.5%'))).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
        expect(screen.getByText('8')).toBeInTheDocument();
        expect(screen.getByText('xG')).toBeInTheDocument();
        expect(screen.getByText('Ball Possession')).toBeInTheDocument();
        expect(screen.getByText('Shots on Target')).toBeInTheDocument();
        expect(screen.getByText('Big Chances Created')).toBeInTheDocument();
    });

    it('renders all tab buttons', async () => {
        render(<TeamStatsPanel name="Manchester United" />);
        expect(screen.getByText('overview')).toBeInTheDocument();
        expect(screen.getByText('form')).toBeInTheDocument();
        expect(screen.getByText('match statistic')).toBeInTheDocument();
    });

    it('has correct CSS classes for styling', async () => {
        const { container } = render(<TeamStatsPanel name="Manchester United" />);
        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv.className).toMatch(/p-3/);
        expect(mainDiv.className).toMatch(/md:p-6/);
    });

    it('tab buttons have correct styling when active', async () => {
        render(<TeamStatsPanel name="Manchester United" />);
        const overviewTab = screen.getByText('overview');
        expect(overviewTab.className).toMatch(/text-red-400/);
    });

    it('tab buttons have correct styling when inactive', async () => {
        render(<TeamStatsPanel name="Manchester United" />);
        const formTab = screen.getByText('form');
        expect(formTab.className).toMatch(/text-gray-400/);
    });

    it('overview values have correct styling', async () => {
        render(<TeamStatsPanel name="Manchester United" />);
        const marketValue = screen.getByText('850000000');
        const avgAge = screen.getByText('25.2');
        expect(marketValue.className).toMatch(/text-xl|md:text-2xl/);
        expect(marketValue).toHaveClass('font-bold');
        expect(avgAge.className).toMatch(/text-xl|md:text-2xl/);
        expect(avgAge).toHaveClass('font-bold');
    });

    it('renders with different team data', async () => {
        const differentTeam: Team = {
            ...mockTeam,
            market_value: 1200000000,
            avg_age: 23.8,
            last_5_matches_wdl: {
                wins: 4,
                draws: 0,
                losses: 1
            },
            xG: 2.1,
            ball_possession: 72.3,
            shots_on_target: 15.7,
            big_chances_created: 10.2
        };
        (useTeamStats as jest.Mock).mockReturnValue({
            stats: differentTeam,
            loadingStats: false
        });
        render(<TeamStatsPanel name="Manchester United" />);
        expect(screen.getByText('1200000000')).toBeInTheDocument();
        expect(screen.getByText('23.8')).toBeInTheDocument();
    });

    it('handles zero values correctly', async () => {
        const zeroTeam: Team = {
            ...mockTeam,
            market_value: 0,
            avg_age: 0,
            last_5_matches_wdl: {
                wins: 0,
                draws: 0,
                losses: 0
            },
            xG: 0,
            ball_possession: 0,
            shots_on_target: 0,
            big_chances_created: 0
        };
        (useTeamStats as jest.Mock).mockReturnValue({
            stats: zeroTeam,
            loadingStats: false
        });
        render(<TeamStatsPanel name="Manchester United" />);
        const zeroElements = screen.getAllByText('0');
        expect(zeroElements.length).toBeGreaterThanOrEqual(2);
    });

    it('renders No data when stats is null and loadingStats is false', () => {
        (useTeamStats as jest.Mock).mockReturnValue({
            stats: null,
            loadingStats: false
        });
        render(<TeamStatsPanel name="Manchester United" />);
        expect(screen.getByText('No data')).toBeInTheDocument();
    });
}); 