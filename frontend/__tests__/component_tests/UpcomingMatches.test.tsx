import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UpcomingMatches } from '../../src/components/ui/upcomingMatches/UpcomingMatches';
import { Match } from '../../src/components/ui/upcomingMatches/Matches.types';

// Mock data for testing different match scenarios
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

// Main test suite for UpcomingMatches
// Covers rendering of matches, empty state, single match, and CSS classes
describe('UpcomingMatches Component', () => {
    it('renders title correctly', () => {
        // Checks that the title is displayed
        render(<UpcomingMatches matches={mockMatches} />);
        expect(screen.getByText('UPCOMING MATCHES')).toBeInTheDocument();
    });

    it('renders all matches when matches array is provided', () => {
        // Ensures all provided matches are rendered
        render(<UpcomingMatches matches={mockMatches} />);
        expect(screen.getByText('Manchester United')).toBeInTheDocument();
        expect(screen.getByText('Liverpool')).toBeInTheDocument();
        expect(screen.getByText('Arsenal')).toBeInTheDocument();
        expect(screen.getByText('Chelsea')).toBeInTheDocument();
        expect(screen.getByText('2025-01-15')).toBeInTheDocument();
        expect(screen.getByText('20:00')).toBeInTheDocument();
        expect(screen.getByText('2025-01-20')).toBeInTheDocument();
        expect(screen.getByText('15:30')).toBeInTheDocument();
    });

    it('renders "No upcoming matches" when matches array is empty', () => {
        // Checks that the empty state message is shown when no matches are provided
        render(<UpcomingMatches matches={[]} />);
        expect(screen.getByText('No upcoming matches')).toBeInTheDocument();
        expect(screen.queryByText('UPCOMING MATCHES')).not.toBeInTheDocument();
    });

    it('renders single match correctly', () => {
        // Ensures a single match is rendered properly
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
        // Checks that the main container uses the expected background and padding classes
        const { container } = render(<UpcomingMatches matches={mockMatches} />);
        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv).toHaveClass('bg-gray-800', 'rounded-lg');
        expect(mainDiv.className).toMatch(/p-3/);
        expect(mainDiv.className).toMatch(/md:p-6/);
    });

    it('title has correct styling', () => {
        // Ensures the title uses the correct font and color classes
        render(<UpcomingMatches matches={mockMatches} />);
        const titleElement = screen.getByText('UPCOMING MATCHES');
        expect(titleElement.className).toMatch(/text-lg|text-2xl/);
        expect(titleElement).toHaveClass('font-bold', 'text-red-400');
        expect(titleElement.className).toMatch(/mb-3|mb-6/);
    });

    it('renders correct number of MatchCard components', () => {
        // Checks that the correct number of match cards are rendered
        const { container } = render(<UpcomingMatches matches={mockMatches} />);
        const matchCards = container.querySelectorAll('.bg-gray-700.rounded-lg');
        expect(matchCards.length).toBeGreaterThanOrEqual(2);
    });
}); 