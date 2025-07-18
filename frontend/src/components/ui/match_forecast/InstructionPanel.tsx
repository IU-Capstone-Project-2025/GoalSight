import React from 'react';

interface InstructionPanelProps {
    // Number of teams currently selected by the user
    selectedCount: number;
}

// Renders instructional text and dynamic prompts based on selection state
const InstructionPanel: React.FC<InstructionPanelProps> = ({ selectedCount }) => {
    return (
        <div className="bg-gray-800 text-white rounded-lg p-3 md:p-6 shadow-lg flex flex-1 flex-col items-center justify-center border border-red-600 w-full h-full">
            <h3 className="text-lg md:text-2xl font-semibold mb-1 md:mb-2 text-red-400">How does the predictor work?</h3>
            <ol className="list-decimal list-inside text-base md:text-lg mb-1 md:mb-2 text-gray-200">
                <li>Select <span className="font-bold text-red-400">two teams</span> from the list below</li>
                <li>Get a match prediction powered by AI</li>
            </ol>
            {/* Show prompt depending on how many teams are selected */}
            {selectedCount === 0 && (
                <p className="text-sm md:text-base text-gray-300 mt-1 md:mt-2">Start by selecting the first team!</p>
            )}
            {selectedCount === 1 && (
                <p className="text-sm md:text-base text-gray-300 mt-1 md:mt-2">Now select the second team to see the prediction!</p>
            )}
        </div>
    );
};

export default InstructionPanel; 