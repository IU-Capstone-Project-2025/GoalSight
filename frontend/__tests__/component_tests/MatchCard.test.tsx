import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MatchCard } from '../../src/components/ui/upcomingMatches/MatchCard';
import { Match } from '../../src/components/ui/upcomingMatches/Matches.types';
import type { } from '@jest/globals';

// Mock the useMatchPrediction hook to control prediction state
jest.mock('../../src/components/ui/match_forecast/useMatchForecast', () => ({
    useMatchPrediction: jest.fn()
}));
import { useMatchPrediction } from '../../src/components/ui/match_forecast/useMatchForecast';

// Mock data for testing different match scenarios
const mockMatch: Match = {
    teamA: 'Manchester United',
    teamB: 'Liverpool',
    date: '2025-01-15',
    time: '20:00'
};

describe('MatchCard Component', () => {
    beforeEach(() => {
        // Set up default mock return value for prediction
        (useMatchPrediction as jest.Mock).mockReturnValue({
            prediction: null,
            loadingPrediction: false
        });
    });

    it('renders match information correctly', () => {
        // Checks that all match info is displayed
        render(<MatchCard match={mockMatch} />);
        expect(screen.getByText('Manchester United')).toBeInTheDocument();
        expect(screen.getByText('Liverpool')).toBeInTheDocument();
        expect(screen.getByText('VS')).toBeInTheDocument();
        expect(screen.getByText('2025-01-15')).toBeInTheDocument();
        expect(screen.getByText('20:00')).toBeInTheDocument();
    });

    it('renders with different team names', () => {
        // Ensures rendering works for different teams and times
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
        // Checks that the main container uses the expected background and padding classes
        const { container } = render(<MatchCard match={mockMatch} />);
        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv).toHaveClass('flex', 'flex-col', 'bg-gray-700', 'rounded-lg');
        expect(mainDiv.className).toMatch(/p-2/);
        expect(mainDiv.className).toMatch(/md:p-4/);
        expect(mainDiv.className).toMatch(/mb-2/);
    });

    it('displays VS text with correct styling', () => {
        // Ensures the VS text uses the correct color and font classes
        render(<MatchCard match={mockMatch} />);
        const vsElement = screen.getByText('VS');
        expect(vsElement).toHaveClass('text-red-400', 'font-bold');
    });

    it('displays time with correct styling', () => {
        // Checks that the time uses the correct font and color classes
        render(<MatchCard match={mockMatch} />);
        const timeElement = screen.getByText('20:00');
        expect(timeElement.className).toMatch(/text-base|md:text-lg/);
        expect(timeElement).toHaveClass('font-bold', 'text-red-400');
    });

    it('displays date with correct styling', () => {
        // Checks that the date uses the correct color and size classes
        render(<MatchCard match={mockMatch} />);
        const dateElement = screen.getByText('2025-01-15');
        expect(dateElement.className).toMatch(/text-xs|md:text-sm/);
        expect(dateElement).toHaveClass('text-gray-300');
    });

    it('renders nothing for prediction if prediction is null and loadingPrediction is false', () => {
        // Ensures no prediction or loading text is shown if prediction is null
        render(<MatchCard match={mockMatch} />);
        const button = screen.getByRole('button');
        button.click();
        expect(screen.queryByText(/%/)).not.toBeInTheDocument();
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
}); 