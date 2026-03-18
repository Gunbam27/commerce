import React, { useEffect } from 'react';
import { ChevronRight, SlidersHorizontal, ChevronUp, X } from 'lucide-react';

interface FilterSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
    const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
    const colors = [
        'bg-[#00C12B]', 'bg-[#F50606]', 'bg-[#F5DD06]', 'bg-[#F57906]', 'bg-[#06CAF5]',
        'bg-[#063AF5]', 'bg-[#7D06F5]', 'bg-[#F506A4]', 'bg-white border', 'bg-black'
    ];
    const sizes = ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
    const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

    // 바디 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const sidebarClasses = `
        fixed inset-y-0 bottom-0 left-0 w-full max-h-[85vh] mt-auto z-[100] bg-white p-6 rounded-t-2xl overflow-y-auto transition-transform duration-300 transform
        lg:static lg:z-0 lg:translate-transform-none lg:flex lg:flex-col lg:max-w-[295px] lg:shrink-0 lg:border lg:border-gray-100 lg:rounded-[20px] lg:h-fit lg:max-h-none lg:sticky lg:top-24
        ${isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}
    `;

    return (
        <>
            {/* Dimmed Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-[90] lg:hidden transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}
            
            <aside className={sidebarClasses}>
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
                <h2 className="font-bold text-xl">Filters</h2>
                <button onClick={onClose} className="lg:hidden">
                    <X size={24} />
                </button>
                <SlidersHorizontal size={20} className="hidden lg:block text-gray-400" />
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-gray-100">
                {categories.map((category) => (
                    <div key={category} className="flex justify-between items-center text-gray-500 hover:text-black cursor-pointer group">
                        <span>{category}</span>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-black" />
                    </div>
                ))}
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-lg">Price</h3>
                    <ChevronUp size={20} />
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full mb-4">
                    <div className="absolute left-[20%] right-[30%] h-full bg-black rounded-full" />
                    <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full border-2 border-white cursor-pointer" />
                    <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full border-2 border-white cursor-pointer" />
                </div>
                <div className="flex justify-between text-sm font-medium">
                    <span>$50</span>
                    <span>$200</span>
                </div>
            </div>

            {/* Colors */}
            <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-lg">Colors</h3>
                    <ChevronUp size={20} />
                </div>
                <div className="flex flex-wrap gap-4">
                    {colors.map((color, index) => (
                        <button key={index} className={`w-9 h-9 rounded-full ${color} cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all`} />
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
                        <button key={size} className="px-5 py-2.5 rounded-full bg-[#F0EEED] text-gray-500 hover:bg-black hover:text-white transition-colors text-sm">
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dress Style */}
            <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-lg">Dress Style</h3>
                    <ChevronUp size={20} />
                </div>
                <div className="flex flex-col gap-4">
                    {dressStyles.map((style) => (
                        <div key={style} className="flex justify-between items-center text-gray-500 hover:text-black cursor-pointer group">
                            <span>{style}</span>
                            <ChevronRight size={16} className="text-gray-400 group-hover:text-black" />
                        </div>
                    ))}
                </div>
            </div>

            <button className="w-full bg-black text-white rounded-full py-4 font-medium hover:bg-gray-800 transition-colors">
                Apply Filter
            </button>
        </aside>
        </>
    );
}
