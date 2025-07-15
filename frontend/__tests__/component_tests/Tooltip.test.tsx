import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tooltip from '../../src/components/ui/team_stats/Tooltip';

describe('Tooltip Component', () => {
    it('renders question mark button', () => {
        render(<Tooltip description="Test description" />);
        expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('renders description text', () => {
        render(<Tooltip description="Tooltip info" />);
        expect(screen.getByText('Tooltip info')).toBeInTheDocument();
    });

    it('has correct classes for button', () => {
        render(<Tooltip description="desc" />);
        const button = screen.getByText('?');
        expect(button).toHaveClass('w-4', 'md:w-5', 'h-4', 'md:h-5', 'flex', 'items-center', 'justify-center', 'rounded-full', 'bg-gray-600', 'text-white', 'text-xs', 'md:text-sm', 'font-bold', 'cursor-pointer', 'focus:outline-none', 'ml-1');
    });

    it('has correct classes for tooltip description', () => {
        render(<Tooltip description="desc" />);
        const desc = screen.getByText('desc');
        expect(desc).toHaveClass('absolute', 'bottom-full', 'mb-2', 'left-1/2', '-translate-x-1/2', 'w-32', 'md:w-64', 'max-w-[90vw]', 'md:max-w-md', 'bg-gray-800', 'text-xs', 'md:text-sm', 'text-white', 'rounded', 'shadow-lg', 'px-2', 'md:px-4', 'py-1', 'md:py-2', 'border', 'border-gray-400', 'opacity-0', 'group-hover:opacity-100', 'pointer-events-none', 'transition-opacity', 'duration-200', 'z-10', 'break-words');
    });

    it('renders with empty description', () => {
        render(<Tooltip description="" />);
        const emptyDescs = screen.getAllByText('');
        expect(emptyDescs.length).toBeGreaterThan(0);
    });
}); 