import React from 'react';

interface InstructionPanelProps {
    selectedCount: number;
}

const InstructionPanel: React.FC<InstructionPanelProps> = ({ selectedCount }) => {
    return (
        <div className="bg-gray-800 text-white rounded-lg p-6 shadow-lg flex flex-1 flex-col items-center justify-center border border-red-600 w-full h-full">
            <h3 className="text-2xl font-semibold mb-2 text-red-400">How does it work?</h3>
            <ol className="list-decimal list-inside text-lg mb-2 text-gray-200">
                <li>Select <span className="font-bold text-red-400">two teams</span> from the list below</li>
                <li>Get a match prediction powered by AI</li>
            </ol>
            {selectedCount === 0 && (
                <p className="text-base text-gray-300 mt-2">Start by selecting the first team!</p>
            )}
            {selectedCount === 1 && (
                <p className="text-base text-gray-300 mt-2">Now select the second team to see the prediction!</p>
            )}
        </div>
    );
};

export default InstructionPanel; 