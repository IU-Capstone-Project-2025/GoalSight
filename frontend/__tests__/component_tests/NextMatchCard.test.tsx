import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NextMatchCard } from '../../src/components/ui/nextMatch/NextMatchCard';

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
        expect(screen.getByText('Manchester United')).toBeInTheDocument();
        expect(screen.getByText('vs')).toBeInTheDocument();
        expect(screen.getByText('Liverpool')).toBeInTheDocument();
        const container = screen.getByText('Manchester United').parentElement;
        expect(container).toHaveTextContent(/Manchester United\s*vs\s*Liverpool/);
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
        expect(screen.getByText('Arsenal')).toBeInTheDocument();
        expect(screen.getByText('vs')).toBeInTheDocument();
        expect(screen.getByText('Chelsea')).toBeInTheDocument();
        const container = screen.getByText('Arsenal').parentElement;
        expect(container).toHaveTextContent(/Arsenal\s*vs\s*Chelsea/);
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
        expect(screen.getByText('Barcelona')).toBeInTheDocument();
        expect(screen.getByText('vs')).toBeInTheDocument();
        expect(screen.getByText('Real Madrid')).toBeInTheDocument();
        const container = screen.getByText('Barcelona').parentElement;
        expect(container).toHaveTextContent(/Barcelona\s*vs\s*Real Madrid/);
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
        expect(screen.getByText('Team A')).toBeInTheDocument();
        expect(screen.getByText('vs')).toBeInTheDocument();
        expect(screen.getByText('Team B')).toBeInTheDocument();
        const container = screen.getByText('Team A').parentElement;
        expect(container).toHaveTextContent(/Team A\s*vs\s*Team B/);
        expect(screen.getByText('2025-01-25 - 8:30 PM')).toBeInTheDocument();
    });

    it('has correct CSS classes for styling', () => {
        const { container } = render(<NextMatchCard {...defaultProps} />);
        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv).toHaveClass('bg-black/50', 'rounded-lg', 'inline-block');
        expect(mainDiv.className).toMatch(/p-3/);
        expect(mainDiv.className).toMatch(/md:p-6/);
    });

    it('title has correct styling', () => {
        render(<NextMatchCard {...defaultProps} />);
        const titleElement = screen.getByText('NEXT MATCH');
        expect(titleElement.className).toMatch(/text-lg|text-2xl/);
        expect(titleElement).toHaveClass('font-bold', 'text-red-400');
        expect(titleElement.className).toMatch(/mb-1|mb-2/);
    });

    it('team names have correct styling', () => {
        render(<NextMatchCard {...defaultProps} />);
        const container = screen.getByText('Manchester United').parentElement;
        expect(container).toHaveClass('text-xl');
        expect(container).toHaveClass('font-bold');
    });

    it('date and time have correct styling', () => {
        render(<NextMatchCard {...defaultProps} />);
        const dateTimeElement = screen.getByText('2025-01-15 - 20:00');
        expect(dateTimeElement.className).toMatch(/text-sm|md:text-lg/);
        expect(dateTimeElement).toHaveClass('text-gray-300');
        expect(dateTimeElement.className).toMatch(/mt-1|mt-2/);
    });

    it('renders with single word team names', () => {
        const singleWordProps = {
            teamA: 'Arsenal',
            teamB: 'Chelsea',
            date: '2025-01-30',
            time: '19:45'
        };
        render(<NextMatchCard {...singleWordProps} />);
        expect(screen.getByText('Arsenal')).toBeInTheDocument();
        expect(screen.getByText('vs')).toBeInTheDocument();
        expect(screen.getByText('Chelsea')).toBeInTheDocument();
        const container = screen.getByText('Arsenal').parentElement;
        expect(container).toHaveTextContent(/Arsenal\s*vs\s*Chelsea/);
    });

    it('renders with multi-word team names', () => {
        const multiWordProps = {
            teamA: 'Manchester City',
            teamB: 'Tottenham Hotspur',
            date: '2025-02-01',
            time: '16:00'
        };
        render(<NextMatchCard {...multiWordProps} />);
        expect(screen.getByText('Manchester City')).toBeInTheDocument();
        expect(screen.getByText('vs')).toBeInTheDocument();
        expect(screen.getByText('Tottenham Hotspur')).toBeInTheDocument();
        const container = screen.getByText('Manchester City').parentElement;
        expect(container).toHaveTextContent(/Manchester City\s*vs\s*Tottenham Hotspur/);
    });

    it('renders with special characters in team names', () => {
        const specialCharProps = {
            teamA: 'Atlético Madrid',
            teamB: 'Bayern München',
            date: '2025-02-05',
            time: '20:30'
        };
        render(<NextMatchCard {...specialCharProps} />);
        expect(screen.getByText('Atlético Madrid')).toBeInTheDocument();
        expect(screen.getByText('vs')).toBeInTheDocument();
        expect(screen.getByText('Bayern München')).toBeInTheDocument();
        const container = screen.getByText('Atlético Madrid').parentElement;
        expect(container).toHaveTextContent(/Atlético Madrid\s*vs\s*Bayern München/);
    });

    it('renders prediction percentages if provided', () => {
        render(
            <NextMatchCard
                teamA="Manchester United"
                teamB="Liverpool"
                date="2025-01-15"
                time="20:00"
                teamAChance={65}
                teamBChance={35}
            />
        );
        expect(screen.getByText('65%')).toBeInTheDocument();
        expect(screen.getByText('35%')).toBeInTheDocument();
        expect(screen.getByText('—')).toBeInTheDocument();
    });

    it('does not render prediction percentages if not provided', () => {
        render(<NextMatchCard teamA="MU" teamB="LIV" date="2025-01-15" time="20:00" />);
        expect(screen.queryByText('65%')).not.toBeInTheDocument();
        expect(screen.queryByText('35%')).not.toBeInTheDocument();
    });

    it('percentages have correct styling', () => {
        render(
            <NextMatchCard
                teamA="MU"
                teamB="LIV"
                date="2025-01-15"
                time="20:00"
                teamAChance={65}
                teamBChance={35}
            />
        );
        const percent1 = screen.getByText('65%');
        const percent2 = screen.getByText('35%');
        expect(percent1.className).toMatch(/text-lg/);
        expect(percent1.className).toMatch(/text-green-400/);
        expect(percent1.className).toMatch(/font-bold/);
        expect(percent2.className).toMatch(/text-lg/);
        expect(percent2.className).toMatch(/text-green-400/);
        expect(percent2.className).toMatch(/font-bold/);
    });
}); 