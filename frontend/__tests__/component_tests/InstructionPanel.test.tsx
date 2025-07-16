import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InstructionPanel from '../../src/components/ui/match_forecast/InstructionPanel';


describe('InstructionPanel Component', () => {
    it('renders title and instructions', () => {
        // Checks that the title and instruction list are displayed
        render(<InstructionPanel selectedCount={0} />);
        expect(screen.getByText('How does the predictor work?')).toBeInTheDocument();
        const listItems = screen.getAllByRole('listitem');
        expect(listItems[0]).toHaveTextContent(/select.*two teams.*from the list below/i);
        expect(listItems[1]).toHaveTextContent(/get a match prediction powered by ai/i);
    });

    it('shows prompt for first team when selectedCount is 0', () => {
        // Ensures the prompt for selecting the first team is shown
        render(<InstructionPanel selectedCount={0} />);
        expect(screen.getByText('Start by selecting the first team!')).toBeInTheDocument();
        expect(screen.queryByText('Now select the second team to see the prediction!')).not.toBeInTheDocument();
    });

    it('shows prompt for second team when selectedCount is 1', () => {
        // Ensures the prompt for selecting the second team is shown
        render(<InstructionPanel selectedCount={1} />);
        expect(screen.getByText('Now select the second team to see the prediction!')).toBeInTheDocument();
        expect(screen.queryByText('Start by selecting the first team!')).not.toBeInTheDocument();
    });

    it('shows no prompt when selectedCount is 2', () => {
        // Ensures no prompt is shown when both teams are selected
        render(<InstructionPanel selectedCount={2} />);
        expect(screen.queryByText('Start by selecting the first team!')).not.toBeInTheDocument();
        expect(screen.queryByText('Now select the second team to see the prediction!')).not.toBeInTheDocument();
    });

    it('has correct CSS classes for main container', () => {
        // Checks that the main container uses the expected background, border, and layout classes
        const { container } = render(<InstructionPanel selectedCount={0} />);
        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv).toHaveClass('bg-gray-800', 'text-white', 'rounded-lg', 'p-3', 'md:p-6', 'shadow-lg', 'flex', 'flex-1', 'flex-col', 'items-center', 'justify-center', 'border', 'border-red-600', 'w-full', 'h-full');
    });

    it('title has correct styling', () => {
        // Ensures the title uses the correct font and color classes
        render(<InstructionPanel selectedCount={0} />);
        const title = screen.getByText('How does the predictor work?');
        expect(title).toHaveClass('text-lg', 'md:text-2xl', 'font-semibold', 'mb-1', 'md:mb-2', 'text-red-400');
    });

    it('instructions list has correct styling', () => {
        // Checks that the instructions list uses the expected classes
        render(<InstructionPanel selectedCount={0} />);
        const list = screen.getByRole('list');
        expect(list).toHaveClass('list-decimal', 'list-inside', 'text-base', 'md:text-lg', 'mb-1', 'md:mb-2', 'text-gray-200');
    });

    it('edge case: negative selectedCount', () => {
        // Ensures no prompt is shown for negative selectedCount (edge case)
        render(<InstructionPanel selectedCount={-1} />);
        expect(screen.queryByText('Start by selecting the first team!')).not.toBeInTheDocument();
        expect(screen.queryByText('Now select the second team to see the prediction!')).not.toBeInTheDocument();
    });
}); 