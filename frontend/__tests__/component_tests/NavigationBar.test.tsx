import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import NavigationBar from '../../src/components/navigation/NavigationBar';

// Wrapper component to provide router context
const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('NavigationBar Component', () => {
    it('renders logo text correctly', () => {
        renderWithRouter(<NavigationBar />);
        expect(screen.getByText('GOALSIGHT')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        renderWithRouter(<NavigationBar />);
        expect(screen.getByText('HOME')).toBeInTheDocument();
        expect(screen.getByText('TOURNAMENT')).toBeInTheDocument();
    });

    it('renders HOME link with correct href', () => {
        renderWithRouter(<NavigationBar />);
        const homeLink = screen.getByText('HOME').closest('a');
        expect(homeLink).toHaveAttribute('href', '/');
    });

    it('renders TOURNAMENT link with correct href', () => {
        renderWithRouter(<NavigationBar />);
        const tournamentLink = screen.getByText('TOURNAMENT').closest('a');
        expect(tournamentLink).toHaveAttribute('href', '/tournaments');
    });

    it('has correct CSS classes for main navigation', () => {
        const { container } = renderWithRouter(<NavigationBar />);
        const navElement = container.querySelector('nav');
        expect(navElement).toHaveClass('bg-black', 'border-b', 'border-red-600');
    });

    it('logo has correct styling', () => {
        renderWithRouter(<NavigationBar />);
        const logoElement = screen.getByText('GOALSIGHT');
        expect(logoElement).toHaveClass('self-center', 'font-bold', 'whitespace-nowrap');
        expect(logoElement.className).toMatch(/text-xl|text-2xl/);
        expect(logoElement.className).toMatch(/text-red-500/);
    });

    it('navigation links have correct base styling', () => {
        renderWithRouter(<NavigationBar />);
        const homeLink = screen.getByText('HOME');
        const tournamentLink = screen.getByText('TOURNAMENT');
        expect(homeLink).toBeInTheDocument();
        expect(tournamentLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
        expect(tournamentLink.closest('a')).toHaveAttribute('href', '/tournaments');
    });

    it('renders navigation container with correct classes', () => {
        const { container } = renderWithRouter(<NavigationBar />);
        const navContainer = container.querySelector('.max-w-screen-xl');
        expect(navContainer).toHaveClass('max-w-screen-xl', 'flex', 'items-center', 'justify-between', 'mx-auto');
    });

    it('renders navigation list with correct classes', () => {
        const { container } = renderWithRouter(<NavigationBar />);
        const navList = container.querySelector('ul');
        expect(navList).toHaveClass('font-medium', 'flex', 'bg-black');
    });

    it('renders HOME as active and TOURNAMENT as inactive on home route', () => {
        window.history.pushState({}, '', '/');
        renderWithRouter(<NavigationBar />);
        const homeLink = screen.getByText('HOME');
        const tournamentLink = screen.getByText('TOURNAMENT');
        expect(homeLink).toBeInTheDocument();
        expect(tournamentLink).toBeInTheDocument();
    });

    it('renders TOURNAMENT as active and HOME as inactive on tournament route', () => {
        window.history.pushState({}, '', '/tournament');
        renderWithRouter(<NavigationBar />);
        const homeLink = screen.getByText('HOME');
        const tournamentLink = screen.getByText('TOURNAMENT');
        expect(homeLink).toBeInTheDocument();
        expect(tournamentLink).toBeInTheDocument();
    });
}); 