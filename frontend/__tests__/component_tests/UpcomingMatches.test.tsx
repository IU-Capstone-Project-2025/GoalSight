import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UpcomingMatches } from '../../src/components/ui/upcomingMatches/UpcomingMatches';
import { Match } from '../../src/components/ui/upcomingMatches/Matches.types';

// Mock data for testing
const mockMatches: Match[] = [
    {
        teamA: 'Manchester United',
        teamB: 'Liverpool',
        date: '2025-01-15',
        time: '20:00'
    },
    {
        teamA: 'Arsenal',
        teamB: 'Chelsea',
        date: '2025-01-20',
        time: '15:30'
    }
];

describe('UpcomingMatches Component', () => {
    it('renders title correctly', () => {
        render(<UpcomingMatches matches={mockMatches} />);

        expect(screen.getByText('UPCOMING MATCHES')).toBeInTheDocument();
    });

    it('renders all matches when matches array is provided', () => {
        render(<UpcomingMatches matches={mockMatches} />);

        // Check if all team names are displayed
        expect(screen.getByText('Manchester United')).toBeInTheDocument();
        expect(screen.getByText('Liverpool')).toBeInTheDocument();
        expect(screen.getByText('Arsenal')).toBeInTheDocument();
        expect(screen.getByText('Chelsea')).toBeInTheDocument();

        // Check if all dates and times are displayed
        expect(screen.getByText('2025-01-15')).toBeInTheDocument();
        expect(screen.getByText('20:00')).toBeInTheDocument();
        expect(screen.getByText('2025-01-20')).toBeInTheDocument();
        expect(screen.getByText('15:30')).toBeInTheDocument();
    });

    it('renders "No upcoming matches" when matches array is empty', () => {
        render(<UpcomingMatches matches={[]} />);

        expect(screen.getByText('No upcoming matches')).toBeInTheDocument();
        expect(screen.queryByText('UPCOMING MATCHES')).not.toBeInTheDocument();
    });

    it('renders single match correctly', () => {
        const singleMatch: Match[] = [
            {
                teamA: 'Barcelona',
                teamB: 'Real Madrid',
                date: '2025-01-25',
                time: '21:00'
            }
        ];

        render(<UpcomingMatches matches={singleMatch} />);

        expect(screen.getByText('Barcelona')).toBeInTheDocument();
        expect(screen.getByText('Real Madrid')).toBeInTheDocument();
        expect(screen.getByText('2025-01-25')).toBeInTheDocument();
        expect(screen.getByText('21:00')).toBeInTheDocument();
    });

    it('has correct CSS classes for styling', () => {
        const { container } = render(<UpcomingMatches matches={mockMatches} />);

        // Check if the main container has the expected classes
        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv).toHaveClass('bg-gray-800', 'rounded-lg', 'p-6');
    });

    it('title has correct styling', () => {
        render(<UpcomingMatches matches={mockMatches} />);

        const titleElement = screen.getByText('UPCOMING MATCHES');
        expect(titleElement).toHaveClass('text-2xl', 'font-bold', 'mb-6', 'text-red-400');
    });

    it('renders correct number of MatchCard components', () => {
        const { container } = render(<UpcomingMatches matches={mockMatches} />);

        // Each MatchCard has a div with specific classes
        const matchCards = container.querySelectorAll('.flex.items-center.justify-between.bg-gray-700.rounded-lg.p-4');
        expect(matchCards).toHaveLength(2);
    });
}); 