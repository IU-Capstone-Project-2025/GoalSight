import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatchForecastPanel from '../../src/components/ui/match_forecast/MatchForecastPanel';

describe('MatchForecastPanel Component', () => {
    const defaultProps = {
        team1: 'Manchester United',
        team2: 'Liverpool',
        team1Chance: 65,
        team2Chance: 35
    };

    it('renders title correctly', () => {
        render(<MatchForecastPanel {...defaultProps} />);

        expect(screen.getByText('MATCH FORECAST')).toBeInTheDocument();
    });

    it('renders team names correctly', () => {
        render(<MatchForecastPanel {...defaultProps} />);

        expect(screen.getByText('Manchester United')).toBeInTheDocument();
        expect(screen.getByText('Liverpool')).toBeInTheDocument();
    });

    it('renders team chances correctly', () => {
        render(<MatchForecastPanel {...defaultProps} />);

        expect(screen.getByText('65%')).toBeInTheDocument();
        expect(screen.getByText('35%')).toBeInTheDocument();
    });

    it('renders VS text correctly', () => {
        render(<MatchForecastPanel {...defaultProps} />);

        expect(screen.getByText('VS')).toBeInTheDocument();
    });

    it('renders with different team names', () => {
        const differentProps = {
            team1: 'Arsenal',
            team2: 'Chelsea',
            team1Chance: 45,
            team2Chance: 55
        };

        render(<MatchForecastPanel {...differentProps} />);

        expect(screen.getByText('Arsenal')).toBeInTheDocument();
        expect(screen.getByText('Chelsea')).toBeInTheDocument();
        expect(screen.getByText('45%')).toBeInTheDocument();
        expect(screen.getByText('55%')).toBeInTheDocument();
    });

    it('renders with decimal chances', () => {
        const decimalProps = {
            team1: 'Barcelona',
            team2: 'Real Madrid',
            team1Chance: 67.5,
            team2Chance: 32.5
        };

        render(<MatchForecastPanel {...decimalProps} />);

        expect(screen.getByText('67.5%')).toBeInTheDocument();
        expect(screen.getByText('32.5%')).toBeInTheDocument();
    });

    it('renders with zero chances', () => {
        const zeroProps = {
            team1: 'Team A',
            team2: 'Team B',
            team1Chance: 0,
            team2Chance: 100
        };

        render(<MatchForecastPanel {...zeroProps} />);

        expect(screen.getByText('0%')).toBeInTheDocument();
        expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('has correct CSS classes for styling', () => {
        const { container } = render(<MatchForecastPanel {...defaultProps} />);

        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv).toHaveClass('bg-gray-800', 'rounded-lg', 'p-6', 'mb-8');
    });

    it('title has correct styling', () => {
        render(<MatchForecastPanel {...defaultProps} />);

        const titleElement = screen.getByText('MATCH FORECAST');
        expect(titleElement).toHaveClass('text-xl', 'font-bold', 'mb-4', 'text-red-400');
    });

    it('team chances have correct styling', () => {
        render(<MatchForecastPanel {...defaultProps} />);

        const team1Chance = screen.getByText('65%');
        const team2Chance = screen.getByText('35%');

        expect(team1Chance).toHaveClass('text-2xl', 'font-bold', 'text-green-400');
        expect(team2Chance).toHaveClass('text-2xl', 'font-bold', 'text-green-400');
    });

    it('VS text has correct styling', () => {
        render(<MatchForecastPanel {...defaultProps} />);

        const vsElement = screen.getByText('VS');
        expect(vsElement).toHaveClass('text-gray-400', 'text-lg');
    });

    it('team names have correct styling', () => {
        render(<MatchForecastPanel {...defaultProps} />);

        const team1Name = screen.getByText('Manchester United');
        const team2Name = screen.getByText('Liverpool');

        expect(team1Name).toHaveClass('text-lg', 'font-semibold');
        expect(team2Name).toHaveClass('text-lg', 'font-semibold');
    });

    it('renders with equal chances', () => {
        const equalProps = {
            team1: 'Team X',
            team2: 'Team Y',
            team1Chance: 50,
            team2Chance: 50
        };

        render(<MatchForecastPanel {...equalProps} />);

        // Should appear twice for both teams
        const fiftyPercentElements = screen.getAllByText('50%');
        expect(fiftyPercentElements).toHaveLength(2);
    });
}); 