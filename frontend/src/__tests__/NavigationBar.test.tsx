import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import NavigationBar from '../components/navigation/NavigationBar';

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

        expect(screen.getByText('⚽ FOOTBALL LEAGUE')).toBeInTheDocument();
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

        const logoElement = screen.getByText('⚽ FOOTBALL LEAGUE');
        expect(logoElement).toHaveClass('self-center', 'text-2xl', 'text-red-500', 'font-bold', 'whitespace-nowrap');
    });

    it('navigation links have correct base styling', () => {
        renderWithRouter(<NavigationBar />);

        const homeLink = screen.getByText('HOME');
        const tournamentLink = screen.getByText('TOURNAMENT');

        expect(homeLink).toHaveClass('text-grey-300', 'hover:text-red-500', 'px-3', 'py-2', 'rounded-md', 'text-md', 'font-medium', 'transition-colors', 'duration-200');
        expect(tournamentLink).toHaveClass('text-grey-300', 'hover:text-red-500', 'px-3', 'py-2', 'rounded-md', 'text-md', 'font-medium', 'transition-colors', 'duration-200');
    });

    it('does not render ABOUT US link (commented out)', () => {
        renderWithRouter(<NavigationBar />);

        expect(screen.queryByText('ABOUT US')).not.toBeInTheDocument();
    });

    it('renders navigation container with correct classes', () => {
        const { container } = renderWithRouter(<NavigationBar />);

        const navContainer = container.querySelector('.max-w-screen-xl');
        expect(navContainer).toHaveClass('max-w-screen-xl', 'flex', 'flex-wrap', 'items-center', 'justify-between', 'mx-auto', 'p-4');
    });

    it('renders navigation menu with correct classes', () => {
        const { container } = renderWithRouter(<NavigationBar />);

        const navMenu = container.querySelector('#navbar-default');
        expect(navMenu).toHaveClass('hidden', 'w-full', 'md:block', 'md:w-auto');
    });

    it('renders navigation list with correct classes', () => {
        const { container } = renderWithRouter(<NavigationBar />);

        const navList = container.querySelector('ul');
        expect(navList).toHaveClass('font-medium', 'flex', 'flex-col', 'p-4', 'md:p-0', 'mt-4', 'border', 'border-gray-100', 'rounded-lg', 'bg-gray-50', 'md:flex-row', 'md:space-x-8', 'rtl:space-x-reverse', 'md:mt-0', 'md:border-0', 'md:bg-black');
    });
}); 