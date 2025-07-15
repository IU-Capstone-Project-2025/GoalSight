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

    it('renders title (case-insensitive, partial match)', () => {
        render(<MatchForecastPanel {...defaultProps} />);
        expect(screen.getByText((content) => /match forecast/i.test(content))).toBeInTheDocument();
    });

    it('renders team names correctly', () => {
        render(<MatchForecastPanel {...defaultProps} />);
        expect(screen.getByText('Manchester United')).toBeInTheDocument();
        expect(screen.getByText('Liverpool')).toBeInTheDocument();
    });

    it('renders team chances correctly', () => {
        render(<MatchForecastPanel {...defaultProps} />);
        expect(screen.getByText(/65/)).toBeInTheDocument();
        expect(screen.getByText(/35/)).toBeInTheDocument();
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
        expect(screen.getByText(/45/)).toBeInTheDocument();
        expect(screen.getByText(/55/)).toBeInTheDocument();
    });

    it('renders with decimal chances', () => {
        const decimalProps = {
            team1: 'Barcelona',
            team2: 'Real Madrid',
            team1Chance: 67.5,
            team2Chance: 32.5
        };
        render(<MatchForecastPanel {...decimalProps} />);
        expect(screen.getByText(/67.5/)).toBeInTheDocument();
        expect(screen.getByText(/32.5/)).toBeInTheDocument();
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

    it('renders Tooltip with question mark', () => {
        render(<MatchForecastPanel {...defaultProps} />);
        expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('renders Tooltip description', () => {
        render(<MatchForecastPanel {...defaultProps} />);
        expect(screen.getByText(/description of how the forecast works/i)).toBeInTheDocument();
    });

    it('team names have correct styling', () => {
        render(<MatchForecastPanel {...defaultProps} />);
        const team1Name = screen.getByText('Manchester United');
        const team2Name = screen.getByText('Liverpool');
        expect(team1Name).toHaveClass('text-base', 'md:text-2xl', 'font-semibold');
        expect(team2Name).toHaveClass('text-base', 'md:text-2xl', 'font-semibold');
    });

    it('team chances have correct styling', () => {
        render(<MatchForecastPanel {...defaultProps} />);
        const team1Chance = screen.getByText(/65/);
        const team2Chance = screen.getByText(/35/);
        expect(team1Chance).toHaveClass('text-2xl', 'md:text-4xl', 'font-bold', 'text-green-400');
        expect(team2Chance).toHaveClass('text-2xl', 'md:text-4xl', 'font-bold', 'text-green-400');
    });

    it('VS text has correct styling', () => {
        render(<MatchForecastPanel {...defaultProps} />);
        const vsElement = screen.getByText('VS');
        expect(vsElement).toHaveClass('text-gray-400', 'text-lg', 'md:text-2xl', 'mx-4', 'md:mx-8', 'font-bold');
    });

    it('renders with equal chances', () => {
        const equalProps = {
            team1: 'Team X',
            team2: 'Team Y',
            team1Chance: 50,
            team2Chance: 50
        };
        render(<MatchForecastPanel {...equalProps} />);
        const fiftyPercentElements = screen.getAllByText(/50/);
        expect(fiftyPercentElements.length).toBeGreaterThanOrEqual(2);
    });
}); 