import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatchForecastPanel from '../../src/components/ui/match_forecast/MatchForecastPanel';

describe('MatchForecastPanel Component', () => {
    // Default props for most tests
    const defaultProps = {
        team1: 'Manchester United',
        team2: 'Liverpool',
        team1Chance: 65,
        team2Chance: 35,
        logoUrl1: '/logo1.png',
        logoUrl2: '/logo2.png',
    };

    it('renders title (case-insensitive, partial match)', () => {
        // Checks that the title is rendered (case-insensitive)
        render(<MatchForecastPanel {...defaultProps} />);
        expect(screen.getByText(/match forecast/i)).toBeInTheDocument();
    });

    it('renders team names and chances correctly', () => {
        // Ensures both team names and their chances are displayed
        render(<MatchForecastPanel {...defaultProps} />);
        expect(screen.getByText('Manchester United')).toBeInTheDocument();
        expect(screen.getByText('Liverpool')).toBeInTheDocument();
        expect(screen.getByText('65%')).toBeInTheDocument();
        expect(screen.getByText('35%')).toBeInTheDocument();
    });

    it('renders VS text', () => {
        // Checks that the VS text is present
        render(<MatchForecastPanel {...defaultProps} />);
        expect(screen.getByText('VS')).toBeInTheDocument();
    });

    it('renders logo images with correct src and alt', () => {
        // Ensures both team logos are rendered with correct src and alt attributes
        render(<MatchForecastPanel {...defaultProps} />);
        const logo1 = screen.getByAltText('Manchester United');
        const logo2 = screen.getByAltText('Liverpool');
        expect(logo1).toHaveAttribute('src', '/logo1.png');
        expect(logo2).toHaveAttribute('src', '/logo2.png');
    });

    it('renders with decimal chances', () => {
        // Checks that decimal chance values are displayed correctly
        render(<MatchForecastPanel {...defaultProps} team1Chance={67.5} team2Chance={32.5} />);
        expect(screen.getByText('67.5%')).toBeInTheDocument();
        expect(screen.getByText('32.5%')).toBeInTheDocument();
    });

    it('renders with zero and 100 chances', () => {
        // Ensures 0% and 100% are displayed correctly
        render(<MatchForecastPanel {...defaultProps} team1Chance={0} team2Chance={100} />);
        expect(screen.getByText('0%')).toBeInTheDocument();
        expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('renders with equal chances', () => {
        // Checks that equal chances are displayed for both teams
        render(<MatchForecastPanel {...defaultProps} team1Chance={50} team2Chance={50} />);
        const fiftyPercentElements = screen.getAllByText('50%');
        expect(fiftyPercentElements.length).toBeGreaterThanOrEqual(2);
    });

    it('shows modal with ML info on ? click and closes on X', () => {
        // Simulates opening and closing the ML info modal
        render(<MatchForecastPanel {...defaultProps} />);
        const questionBtn = screen.getByRole('button', { name: /show prediction info/i });
        fireEvent.click(questionBtn);
        expect(screen.getByText(/How the ML Match Outcome Prediction Works/i)).toBeInTheDocument();
        // Close modal
        const closeBtn = screen.getByRole('button', { name: /close modal/i });
        fireEvent.click(closeBtn);
        expect(screen.queryByText(/How the ML Match Outcome Prediction Works/i)).not.toBeInTheDocument();
    });

    it('modal contains all key ML info sections', () => {
        // Ensures all key ML info sections are present in the modal
        render(<MatchForecastPanel {...defaultProps} />);
        fireEvent.click(screen.getByRole('button', { name: /show prediction info/i }));
        expect(screen.getByText(/Key Features and Inputs/i)).toBeInTheDocument();
        expect(screen.getByText(/Prediction Process/i)).toBeInTheDocument();
        expect(screen.getByText(/Performance Highlights/i)).toBeInTheDocument();
        expect(screen.getByText(/Test accuracy:/i)).toBeInTheDocument();
        expect(screen.getByText(/71%/)).toBeInTheDocument();
    });

    it('team names and chances have correct classes', () => {
        // Checks that team names and chances use the correct font size classes
        render(<MatchForecastPanel {...defaultProps} />);
        const team1Name = screen.getByText('Manchester United');
        const team2Name = screen.getByText('Liverpool');
        const team1Chance = screen.getByText('65%');
        const team2Chance = screen.getByText('35%');
        expect(team1Name.className).toMatch(/text-lg/);
        expect(team2Name.className).toMatch(/text-lg/);
        expect(team1Chance.className).toMatch(/text-base/);
        expect(team2Chance.className).toMatch(/text-base/);
    });

    it('VS text has correct styling', () => {
        // Ensures the VS text uses the correct color class
        render(<MatchForecastPanel {...defaultProps} />);
        const vsElement = screen.getByText('VS');
        expect(vsElement.className).toMatch(/text-gray-400/);
    });
}); 