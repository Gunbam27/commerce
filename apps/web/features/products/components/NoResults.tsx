import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface NoResultsProps {
    onReset?: () => void;
}

export default function NoResults({ onReset }: NoResultsProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-24 h-24 bg-[#F0EEED] rounded-full flex items-center justify-center mb-6 animate-pulse">
                <SearchX size={48} className="text-gray-400" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold font-integral uppercase mb-3">
                No matching results
            </h3>
            
            <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
                We couldn't find any products matching your current filters. <br className="hidden md:block" />
                Try adjusting your criteria or resetting filters to see more.
            </p>
            
            {onReset && (
                <button 
                    onClick={onReset}
                    className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
                >
                    <RotateCcw size={20} />
                    Reset All Filters
                </button>
            )}
        </div>
    );
}
