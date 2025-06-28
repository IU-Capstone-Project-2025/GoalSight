import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NextMatchCard } from '../components/ui/nextMatch/NextMatchCard';

describe('NextMatchCard Component', () => {
    const defaultProps = {
        teamA: 'Manchester United',
        teamB: 'Liverpool',
        date: '2025-01-15',
        time: '20:00'
    };

    it('renders title correctly', () => {
        render(<NextMatchCard {...defaultProps} />);

        expect(screen.getByText('NEXT MATCH')).toBeInTheDocument();
    });

    it('renders team names correctly', () => {
        render(<NextMatchCard {...defaultProps} />);

        expect(screen.getByText('Manchester United vs Liverpool')).toBeInTheDocument();
    });

    it('renders date and time correctly', () => {
        render(<NextMatchCard {...defaultProps} />);

        expect(screen.getByText('2025-01-15 - 20:00')).toBeInTheDocument();
    });

    it('renders with different team names', () => {
        const differentProps = {
            teamA: 'Arsenal',
            teamB: 'Chelsea',
            date: '2025-01-20',
            time: '15:30'
        };

        render(<NextMatchCard {...differentProps} />);

        expect(screen.getByText('Arsenal vs Chelsea')).toBeInTheDocument();
        expect(screen.getByText('2025-01-20 - 15:30')).toBeInTheDocument();
    });

    it('renders with different date format', () => {
        const differentDateProps = {
            teamA: 'Barcelona',
            teamB: 'Real Madrid',
            date: '15/01/2025',
            time: '21:00'
        };

        render(<NextMatchCard {...differentDateProps} />);

        expect(screen.getByText('Barcelona vs Real Madrid')).toBeInTheDocument();
        expect(screen.getByText('15/01/2025 - 21:00')).toBeInTheDocument();
    });

    it('renders with 12-hour time format', () => {
        const time12HourProps = {
            teamA: 'Team A',
            teamB: 'Team B',
            date: '2025-01-25',
            time: '8:30 PM'
        };

        render(<NextMatchCard {...time12HourProps} />);

        expect(screen.getByText('Team A vs Team B')).toBeInTheDocument();
        expect(screen.getByText('2025-01-25 - 8:30 PM')).toBeInTheDocument();
    });

    it('has correct CSS classes for styling', () => {
        const { container } = render(<NextMatchCard {...defaultProps} />);

        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv).toHaveClass('bg-black/50', 'rounded-lg', 'p-6', 'inline-block');
    });

    it('title has correct styling', () => {
        render(<NextMatchCard {...defaultProps} />);

        const titleElement = screen.getByText('NEXT MATCH');
        expect(titleElement).toHaveClass('text-2xl', 'font-bold', 'text-red-400', 'mb-2');
    });

    it('team names have correct styling', () => {
        render(<NextMatchCard {...defaultProps} />);

        const teamNamesElement = screen.getByText('Manchester United vs Liverpool');
        expect(teamNamesElement).toHaveClass('text-3xl', 'font-bold');
    });

    it('date and time have correct styling', () => {
        render(<NextMatchCard {...defaultProps} />);

        const dateTimeElement = screen.getByText('2025-01-15 - 20:00');
        expect(dateTimeElement).toHaveClass('text-lg', 'text-gray-300', 'mt-2');
    });

    it('renders with single word team names', () => {
        const singleWordProps = {
            teamA: 'Arsenal',
            teamB: 'Chelsea',
            date: '2025-01-30',
            time: '19:45'
        };

        render(<NextMatchCard {...singleWordProps} />);

        expect(screen.getByText('Arsenal vs Chelsea')).toBeInTheDocument();
    });

    it('renders with multi-word team names', () => {
        const multiWordProps = {
            teamA: 'Manchester City',
            teamB: 'Tottenham Hotspur',
            date: '2025-02-01',
            time: '16:00'
        };

        render(<NextMatchCard {...multiWordProps} />);

        expect(screen.getByText('Manchester City vs Tottenham Hotspur')).toBeInTheDocument();
    });

    it('renders with special characters in team names', () => {
        const specialCharProps = {
            teamA: 'Atlético Madrid',
            teamB: 'Bayern München',
            date: '2025-02-05',
            time: '20:30'
        };

        render(<NextMatchCard {...specialCharProps} />);

        expect(screen.getByText('Atlético Madrid vs Bayern München')).toBeInTheDocument();
    });
}); 