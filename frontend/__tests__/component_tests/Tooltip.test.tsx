import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tooltip from '../../src/components/ui/team_stats/Tooltip';

// Main test suite for Tooltip
// Covers rendering, popover/modal display, and class checks for both desktop and mobile
describe('Tooltip Component', () => {
    it('renders question mark button', () => {
        // Checks that the question mark button is rendered
        render(<Tooltip description="Test description" />);
        expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('renders description text in desktop popover', () => {
        // Ensures the description is present in the desktop popover
        render(<Tooltip description="Tooltip info" />);
        // The desktop popover is always rendered (hidden on mobile)
        expect(screen.getByText('Tooltip info')).toBeInTheDocument();
    });

    it('has correct classes for button', () => {
        // Checks that the button uses the expected styling classes
        render(<Tooltip description="desc" />);
        const button = screen.getByText('?');
        expect(button).toHaveClass(
            'w-4', 'md:w-5', 'h-4', 'md:h-5', 'flex', 'items-center', 'justify-center',
            'rounded-full', 'bg-gray-600', 'text-white', 'text-xs', 'md:text-sm', 'font-bold',
            'cursor-pointer', 'focus:outline-none', 'ml-1'
        );
    });

    it('has correct classes for desktop popover', () => {
        // Ensures the desktop popover uses the expected classes for positioning and visibility
        render(<Tooltip description="desc" />);
        const desc = screen.getByText('desc');
        // Check for desktop popover classes directly on the element
        expect(desc).toHaveClass(
            'hidden', 'md:block',
            'absolute', 'bottom-full', 'mb-2', 'left-1/2', '-translate-x-1/2', 'w-64', 'max-w-md',
            'bg-gray-800', 'text-sm', 'text-white', 'rounded', 'shadow-lg', 'px-4', 'py-2', 'border', 'border-gray-400',
            'opacity-0', 'group-hover:opacity-100', 'pointer-events-none', 'group-hover:pointer-events-auto',
            'transition-opacity', 'duration-200', 'z-10', 'break-words'
        );
    });

    it('renders with empty description', () => {
        // Checks that rendering with an empty description does not break the component
        render(<Tooltip description="" />);
        const emptyDescs = screen.getAllByText('');
        expect(emptyDescs.length).toBeGreaterThan(0);
    });

    // Group for mobile modal-specific tests
    describe('Mobile modal behavior', () => {
        beforeEach(() => {
            // Simulate mobile viewport by setting window width
            window.innerWidth = 375;
            window.dispatchEvent(new Event('resize'));
        });

        it('shows modal on button click and closes on overlay click', () => {
            // Simulates opening the modal and closing it by clicking the overlay
            const { container } = render(<Tooltip description="Mobile modal info" />);
            const button = screen.getByText('?');
            fireEvent.click(button);
            // Find all elements with the text, filter for modal
            const modals = screen.getAllByText('Mobile modal info');
            const modal = modals.find(el => el.className.includes('w-[90vw]'));
            expect(modal).toBeInTheDocument();
            // Overlay is present
            const overlay = container.querySelector('.bg-black.bg-opacity-30');
            expect(overlay).toBeInTheDocument();
            // Click overlay closes modal
            if (overlay) fireEvent.click(overlay);
            // Modal should be gone
            const modalsAfter = screen.queryAllByText('Mobile modal info').filter(el => el.className.includes('w-[90vw]'));
            expect(modalsAfter.length).toBe(0);
        });

        it('does not close modal when clicking inside modal', () => {
            // Ensures clicking inside the modal does not close it
            render(<Tooltip description="Stay open" />);
            const button = screen.getByText('?');
            fireEvent.click(button);
            // Find all elements with the text, filter for modal
            const modals = screen.getAllByText('Stay open');
            const modal = modals.find(el => el.className.includes('w-[90vw]'));
            expect(modal).toBeInTheDocument();
            if (modal) fireEvent.click(modal);
            // Still open
            const modalsAfter = screen.getAllByText('Stay open').filter(el => el.className.includes('w-[90vw]'));
            expect(modalsAfter.length).toBeGreaterThan(0);
        });
    });
}); 