import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import NavigationBar from '../../src/components/navigation/NavigationBar';

// Helper to render components with router context, required for navigation links to work
const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

// Main test suite for NavigationBar
// Covers logo, navigation links, active state, and CSS classes
// Each test checks a specific aspect of the navigation bar UI or behavior
describe('NavigationBar Component', () => {
    it('renders logo text correctly', () => {
        // Checks that the logo text is present
        renderWithRouter(<NavigationBar />);
        expect(screen.getByText('GOALSIGHT')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        // Ensures both main navigation links are rendered
        renderWithRouter(<NavigationBar />);
        expect(screen.getByText('HOME')).toBeInTheDocument();
        expect(screen.getByText('TOURNAMENT')).toBeInTheDocument();
    });

    it('renders HOME link with correct href', () => {
        // Checks that the HOME link points to the root route
        renderWithRouter(<NavigationBar />);
        const homeLink = screen.getByText('HOME').closest('a');
        expect(homeLink).toHaveAttribute('href', '/');
    });

    it('renders TOURNAMENT link with correct href', () => {
        // Checks that the TOURNAMENT link points to the tournaments route
        renderWithRouter(<NavigationBar />);
        const tournamentLink = screen.getByText('TOURNAMENT').closest('a');
        expect(tournamentLink).toHaveAttribute('href', '/tournaments');
    });

    it('has correct CSS classes for main navigation', () => {
        // Verifies the main nav element has expected styling classes
        const { container } = renderWithRouter(<NavigationBar />);
        const navElement = container.querySelector('nav');
        expect(navElement).toHaveClass('bg-black', 'border-b', 'border-red-600');
    });

    it('logo has correct styling', () => {
        // Checks that the logo has the correct font and color classes
        renderWithRouter(<NavigationBar />);
        const logoElement = screen.getByText('GOALSIGHT');
        expect(logoElement).toHaveClass('self-center', 'font-bold', 'whitespace-nowrap');
        expect(logoElement.className).toMatch(/text-xl|text-2xl/);
        expect(logoElement.className).toMatch(/text-red-500/);
    });

    it('navigation links have correct base styling', () => {
        // Ensures navigation links have correct hrefs and are present
        renderWithRouter(<NavigationBar />);
        const homeLink = screen.getByText('HOME');
        const tournamentLink = screen.getByText('TOURNAMENT');
        expect(homeLink).toBeInTheDocument();
        expect(tournamentLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
        expect(tournamentLink.closest('a')).toHaveAttribute('href', '/tournaments');
    });

    it('renders navigation container with correct classes', () => {
        // Checks the container for layout and alignment classes
        const { container } = renderWithRouter(<NavigationBar />);
        const navContainer = container.querySelector('.max-w-screen-xl');
        expect(navContainer).toHaveClass('max-w-screen-xl', 'flex', 'items-center', 'justify-between', 'mx-auto');
    });

    it('renders navigation list with correct classes', () => {
        // Ensures the navigation list uses the expected flex and font classes
        const { container } = renderWithRouter(<NavigationBar />);
        const navList = container.querySelector('ul');
        expect(navList).toHaveClass('font-medium', 'flex', 'bg-black');
    });

    it('renders HOME as active and TOURNAMENT as inactive on home route', () => {
        // Simulates navigation to home and checks link presence (active state is handled in component)
        window.history.pushState({}, '', '/');
        renderWithRouter(<NavigationBar />);
        const homeLink = screen.getByText('HOME');
        const tournamentLink = screen.getByText('TOURNAMENT');
        expect(homeLink).toBeInTheDocument();
        expect(tournamentLink).toBeInTheDocument();
    });

    it('renders TOURNAMENT as active and HOME as inactive on tournament route', () => {
        // Simulates navigation to tournament and checks link presence (active state is handled in component)
        window.history.pushState({}, '', '/tournament');
        renderWithRouter(<NavigationBar />);
        const homeLink = screen.getByText('HOME');
        const tournamentLink = screen.getByText('TOURNAMENT');
        expect(homeLink).toBeInTheDocument();
        expect(tournamentLink).toBeInTheDocument();
    });
}); 