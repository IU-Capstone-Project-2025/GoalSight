import React from 'react';

type TooltipProps = {
    description: string;
};

const Tooltip: React.FC<TooltipProps> = ({ description }) => {
    return (
        <div className="relative group">
            <button
                type="button"
                className="w-4 md:w-5 h-4 md:h-5 flex items-center justify-center rounded-full bg-gray-600 text-white text-xs md:text-sm font-bold cursor-pointer focus:outline-none ml-1"
                tabIndex={0}
            >
                ?
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-32 md:w-64 max-w-[90vw] md:max-w-md bg-gray-800 text-xs md:text-sm text-white rounded shadow-lg px-2 md:px-4 py-1 md:py-2 border border-gray-400 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10 break-words">
                {description}
            </div>
        </div>
    );
};

export default Tooltip; 