import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeamStatsPanel from '../components/ui/team_item/TeamStatsPanel';
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

describe('TeamStatsPanel Component', () => {
    it('renders overview tab by default', () => {
        render(<TeamStatsPanel stats={mockTeam} />);

        // Check if overview tab is active
        const overviewTab = screen.getByText('overview');
        expect(overviewTab).toHaveClass('text-red-400', 'border-b-2', 'border-red-400');

        // Check if overview data is displayed
        expect(screen.getByText('850000000')).toBeInTheDocument();
        expect(screen.getByText('25.2')).toBeInTheDocument();
        expect(screen.getByText('Market value')).toBeInTheDocument();
        expect(screen.getByText('Average age')).toBeInTheDocument();
    });

    it('switches to form tab when clicked', () => {
        render(<TeamStatsPanel stats={mockTeam} />);

        const formTab = screen.getByText('form');
        fireEvent.click(formTab);

        expect(formTab).toHaveClass('text-red-400', 'border-b-2', 'border-red-400');

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

    it('switches to match statistic tab when clicked', () => {
        render(<TeamStatsPanel stats={mockTeam} />);

        const matchStatTab = screen.getByText('match statistic');
        fireEvent.click(matchStatTab);

        // Check if match statistic tab is now active
        expect(matchStatTab).toHaveClass('text-red-400', 'border-b-2', 'border-red-400');

        // Check if match statistic data is displayed
        expect(screen.getByText('1.8')).toBeInTheDocument(); // xG
        expect(screen.getByText('65.5')).toBeInTheDocument(); // ball possession
        expect(screen.getByText('12')).toBeInTheDocument(); // shots on target (Math.floor)
        expect(screen.getByText('8')).toBeInTheDocument(); // big chances created (Math.floor)
        expect(screen.getByText('xG')).toBeInTheDocument();
        expect(screen.getByText('Ball Possession')).toBeInTheDocument();
        expect(screen.getByText('Shots on Target')).toBeInTheDocument();
        expect(screen.getByText('Big Chances created')).toBeInTheDocument();
    });

    it('renders all tab buttons', () => {
        render(<TeamStatsPanel stats={mockTeam} />);

        expect(screen.getByText('overview')).toBeInTheDocument();
        expect(screen.getByText('form')).toBeInTheDocument();
        expect(screen.getByText('match statistic')).toBeInTheDocument();
    });

    it('has correct CSS classes for styling', () => {
        const { container } = render(<TeamStatsPanel stats={mockTeam} />);

        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv).toHaveClass('bg-gray-750', 'p-6');
    });

    it('tab buttons have correct styling when active', () => {
        render(<TeamStatsPanel stats={mockTeam} />);

        const overviewTab = screen.getByText('overview');
        expect(overviewTab).toHaveClass('pb-2', 'px-1', 'text-sm', 'font-medium', 'capitalize', 'text-red-400', 'border-b-2', 'border-red-400');
    });

    it('tab buttons have correct styling when inactive', () => {
        render(<TeamStatsPanel stats={mockTeam} />);

        const formTab = screen.getByText('form');
        expect(formTab).toHaveClass('pb-2', 'px-1', 'text-sm', 'font-medium', 'capitalize', 'text-gray-400', 'hover:text-white');
    });

    it('overview values have correct styling', () => {
        render(<TeamStatsPanel stats={mockTeam} />);

        const marketValue = screen.getByText('850000000');
        const avgAge = screen.getByText('25.2');

        expect(marketValue).toHaveClass('text-2xl', 'font-bold', 'text-green-400');
        expect(avgAge).toHaveClass('text-2xl', 'font-bold', 'text-yellow-400');
    });

    it('form values have correct styling', () => {
        render(<TeamStatsPanel stats={mockTeam} />);

        const formTab = screen.getByText('form');
        fireEvent.click(formTab);

        const wins = screen.getByText('3');
        expect(wins).toHaveClass('text-2xl', 'font-bold', 'text-green-400');

        // Check draws and losses styling using more specific selectors
        const drawsElement = screen.getByText('Draws').previousElementSibling;
        const lossesElement = screen.getByText('Losses').previousElementSibling;
        expect(drawsElement).toHaveClass('text-2xl', 'font-bold', 'text-yellow-400');
        expect(lossesElement).toHaveClass('text-2xl', 'font-bold', 'text-red-400');
    });

    it('match statistic values have correct styling', () => {
        render(<TeamStatsPanel stats={mockTeam} />);

        const matchStatTab = screen.getByText('match statistic');
        fireEvent.click(matchStatTab);

        const xG = screen.getByText('1.8');
        const ballPossession = screen.getByText('65.5');
        const shotsOnTarget = screen.getByText('12');
        const bigChances = screen.getByText('8');

        expect(xG).toHaveClass('text-2xl', 'font-bold', 'text-red-400');
        expect(ballPossession).toHaveClass('text-2xl', 'font-bold', 'text-green-400');
        expect(shotsOnTarget).toHaveClass('text-2xl', 'font-bold', 'text-blue-400');
        expect(bigChances).toHaveClass('text-2xl', 'font-bold', 'text-purple-400');
    });

    it('renders with different team data', () => {
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

        render(<TeamStatsPanel stats={differentTeam} />);

        expect(screen.getByText('1200000000')).toBeInTheDocument();
        expect(screen.getByText('23.8')).toBeInTheDocument();
    });

    it('handles zero values correctly', () => {
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

        render(<TeamStatsPanel stats={zeroTeam} />);

        // Check for zero values using more specific selectors
        const marketValueElement = screen.getByText('Market value').previousElementSibling;
        const avgAgeElement = screen.getByText('Average age').previousElementSibling;
        expect(marketValueElement).toHaveTextContent('0');
        expect(avgAgeElement).toHaveTextContent('0');
    });
}); 