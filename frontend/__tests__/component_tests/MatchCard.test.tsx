import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MatchCard } from '../../src/components/ui/upcomingMatches/MatchCard';
import { Match } from '../../src/components/ui/upcomingMatches/Matches.types';
import type { } from '@jest/globals';

// Mock data for testing
const mockMatch: Match = {
    teamA: 'Manchester United',
    teamB: 'Liverpool',
    date: '2025-01-15',
    time: '20:00'
};

describe('MatchCard Component', () => {
    it('renders match information correctly', () => {
        render(<MatchCard match={mockMatch} />);

        // Check if team names are displayed
        expect(screen.getByText('Manchester United')).toBeInTheDocument();
        expect(screen.getByText('Liverpool')).toBeInTheDocument();

        // Check if VS is displayed
        expect(screen.getByText('VS')).toBeInTheDocument();

        // Check if date and time are displayed
        expect(screen.getByText('2025-01-15')).toBeInTheDocument();
        expect(screen.getByText('20:00')).toBeInTheDocument();
    });

    it('renders with different team names', () => {
        const differentMatch: Match = {
            teamA: 'Arsenal',
            teamB: 'Chelsea',
            date: '2025-01-20',
            time: '15:30'
        };

        render(<MatchCard match={differentMatch} />);

        expect(screen.getByText('Arsenal')).toBeInTheDocument();
        expect(screen.getByText('Chelsea')).toBeInTheDocument();
        expect(screen.getByText('2025-01-20')).toBeInTheDocument();
        expect(screen.getByText('15:30')).toBeInTheDocument();
    });

    it('has correct CSS classes for styling', () => {
        const { container } = render(<MatchCard match={mockMatch} />);

        // Check if the main container has the expected classes
        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv).toHaveClass('flex', 'items-center', 'justify-between', 'bg-gray-700', 'rounded-lg', 'p-4');
    });

    it('displays VS text with correct styling', () => {
        render(<MatchCard match={mockMatch} />);

        const vsElement = screen.getByText('VS');
        expect(vsElement).toHaveClass('text-red-400', 'font-bold');
    });

    it('displays time with correct styling', () => {
        render(<MatchCard match={mockMatch} />);

        const timeElement = screen.getByText('20:00');
        expect(timeElement).toHaveClass('text-lg', 'font-bold', 'text-red-400');
    });

    it('displays date with correct styling', () => {
        render(<MatchCard match={mockMatch} />);

        const dateElement = screen.getByText('2025-01-15');
        expect(dateElement).toHaveClass('text-sm', 'text-gray-300');
    });
}); 