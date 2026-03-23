import React, { useEffect, useState } from 'react';
import { ChevronRight, SlidersHorizontal, ChevronUp, X, Check } from 'lucide-react';
import { useProductsMetadata, ProductFilters } from '../api/useProducts';

interface FilterSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    onApplyFilters?: (filters: ProductFilters) => void;
    currentFilters?: ProductFilters;
}

const COLOR_MAP: Record<string, string> = {
    Black: "#000000",
    White: "#FFFFFF",
    Blue: "#0000FF",
    Skyblue: "#87CEEB",
    Pink: "#FFC0CB",
    Yellow: "#FFFF00",
    Navy: "#000080",
};

export default function FilterSidebar({ isOpen, onClose, onApplyFilters, currentFilters }: FilterSidebarProps) {
    const { data: metadata } = useProductsMetadata();
    
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(currentFilters?.categoryId);
    const [selectedColors, setSelectedColors] = useState<string[]>(currentFilters?.colors || []);
    const [selectedSizes, setSelectedSizes] = useState<string[]>(currentFilters?.sizes || []);
    const [priceRange, setPriceRange] = useState<[number, number]>([
        currentFilters?.minPrice || 0,
        currentFilters?.maxPrice || 500
    ]);

    // 필터 초기화 또는 현재 필터 동기화
    useEffect(() => {
        setSelectedCategoryId(currentFilters?.categoryId);
        setSelectedColors(currentFilters?.colors || []);
        setSelectedSizes(currentFilters?.sizes || []);
        setPriceRange([currentFilters?.minPrice || 0, currentFilters?.maxPrice || 500]);
    }, [currentFilters]);

    // 바디 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleApply = () => {
        if (onApplyFilters) {
            onApplyFilters({
                categoryId: selectedCategoryId,
                colors: selectedColors,
                sizes: selectedSizes,
                minPrice: priceRange[0],
                maxPrice: priceRange[1]
            });
        }
    };

    const toggleColor = (color: string) => {
        setSelectedColors(prev => 
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        );
    };

    const toggleSize = (size: string) => {
        setSelectedSizes(prev => 
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const categories = metadata?.categories || [];
    const colors = metadata?.colors || [];
    const sizes = metadata?.sizes || [];

    const sidebarClasses = `
        fixed inset-y-0 bottom-0 left-0 w-full max-h-[85vh] mt-auto z-[100] bg-white p-6 rounded-t-2xl overflow-y-auto transition-all duration-300 transform
        lg:sticky lg:top-28 lg:bottom-auto lg:mt-0 lg:translate-transform-none lg:flex lg:flex-col lg:max-w-[295px] lg:shrink-0 lg:border lg:border-gray-100 lg:rounded-[20px] lg:h-fit lg:max-h-none lg:self-start lg:translate-y-0
        ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full lg:translate-y-0 lg:opacity-100 opacity-0'}
    `;

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-[90] lg:hidden transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}
            
            <aside className={sidebarClasses}>
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
                    <h2 className="font-bold text-xl uppercase font-integral">Filters</h2>
                    <button onClick={onClose} className="lg:hidden">
                        <X size={24} />
                    </button>
                    <SlidersHorizontal size={20} className="hidden lg:block text-gray-400" />
                </div>

                {/* Categories */}
                <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-gray-100">
                    {categories.map((cat) => (
                        <div 
                            key={cat.id} 
                            onClick={() => setSelectedCategoryId(selectedCategoryId === cat.id ? undefined : cat.id)}
                            className={`flex justify-between items-center cursor-pointer transition-colors ${
                                selectedCategoryId === cat.id ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
                            }`}
                        >
                            <span>{cat.name}</span>
                            <ChevronRight size={16} className={selectedCategoryId === cat.id ? 'text-black' : 'text-gray-300'} />
                        </div>
                    ))}
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold text-lg">Price</h3>
                        <ChevronUp size={20} />
                    </div>
                    <div className="px-2 mb-6">
                        <input 
                            type="range" 
                            min="0" 
                            max="500" 
                            step="10"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                        />
                        <div className="flex justify-between text-sm font-medium mt-3">
                            <span>$0</span>
                            <span className="text-black font-bold underline">${priceRange[1]}</span>
                            <span>$500</span>
                        </div>
                    </div>
                </div>

                {/* Colors */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold text-lg">Colors</h3>
                        <ChevronUp size={20} />
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {colors.map((colorName) => (
                            <button 
                                key={colorName} 
                                onClick={() => toggleColor(colorName)}
                                title={colorName}
                                className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                                    selectedColors.includes(colorName) ? 'border-black ring-2 ring-gray-200 scale-110' : 'border-gray-100'
                                }`}
                                style={{ backgroundColor: COLOR_MAP[colorName] || "#CCCCCC" }}
                            >
                                {selectedColors.includes(colorName) && (
                                    <Check size={14} className={colorName === 'White' || colorName === 'Yellow' ? 'text-black' : 'text-white'} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Size */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold text-lg">Size</h3>
                        <ChevronUp size={20} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                            <button 
                                key={size} 
                                onClick={() => toggleSize(size)}
                                className={`px-5 py-2.5 rounded-full transition-all text-sm font-medium border ${
                                    selectedSizes.includes(size) 
                                    ? 'bg-black text-white border-black shadow-md' 
                                    : 'bg-[#F0EEED] text-gray-500 border-transparent hover:bg-gray-200'
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleApply}
                    className="w-full bg-black text-white rounded-full py-4 font-bold text-lg hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                >
                    Apply Filter
                </button>
                
                <button 
                    onClick={() => onApplyFilters?.({})}
                    className="w-full mt-3 text-gray-400 text-sm hover:text-black transition-colors"
                >
                    Reset All
                </button>
            </aside>
        </>
    );
}
