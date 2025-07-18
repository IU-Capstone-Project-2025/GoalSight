import React, { useState, useRef, useEffect } from 'react';

type TooltipProps = {
    // Description text to show in the tooltip
    description: string;
};

// Renders a tooltip with popover/modal logic for mobile and desktop
const Tooltip: React.FC<TooltipProps> = ({ description }) => {
    const [show, setShow] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!show) return;
        // Close tooltip if clicking outside (mobile modal)
        const handleClick = (e: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(e.target as Node)
            ) {
                setShow(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [show]);

    return (
        <div className="relative group inline-block">
            {/* Button to show/hide tooltip */}
            <button
                type="button"
                className="w-4 md:w-5 h-4 md:h-5 flex items-center justify-center rounded-full bg-gray-600 text-white text-xs md:text-sm font-bold cursor-pointer focus:outline-none ml-1"
                tabIndex={0}
                onClick={() => setShow((s) => !s)}
            >
                ?
            </button>
            {/* Mobile modal tooltip */}
            {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center md:hidden" style={{ pointerEvents: 'auto' }}>
                    <div
                        className="absolute inset-0 bg-black bg-opacity-30"
                        onClick={() => setShow(false)}
                    />
                    <div
                        ref={popoverRef}
                        className="relative z-10 w-[90vw] max-w-xs bg-gray-800 text-xs text-white rounded shadow-lg px-4 py-2 border border-gray-400"
                        style={{ pointerEvents: 'auto' }}
                    >
                        {description}
                    </div>
                </div>
            )}
            {/* Desktop popover tooltip */}
            <div
                className={`
                    hidden md:block
                    absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 max-w-md
                    bg-gray-800 text-sm text-white rounded shadow-lg px-4 py-2 border border-gray-400
                    opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
                    transition-opacity duration-200 z-10 break-words
                `}
            >
                {description}
            </div>
        </div>
    );
};

export default Tooltip; 