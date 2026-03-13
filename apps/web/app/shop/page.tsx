'use client';

import { useState } from "react";
import FilterSidebar from "../../features/products/components/FilterSidebar";
import ProductList from "../../features/products/components/ProductList";
import { ChevronRight, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function ShopPage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <main className="container py-6 md:py-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-3 text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
                <span>Home</span>
                <ChevronRight size={14} />
                <span className="text-black">Casual</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Header for Mobile */}
                <div className="lg:hidden flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Casual</h1>
                    <button 
                        onClick={() => setIsFilterOpen(true)}
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                        <SlidersHorizontal size={20} />
                    </button>
                </div>

                {/* Sidebar */}
                <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Desktop Header */}
                    <div className="hidden lg:flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Casual</h1>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>Showing 1-10 of 100 Products</span>
                            <div className="flex items-center gap-1 cursor-pointer hover:text-black">
                                <span>Sort by: <span className="text-black font-medium">Most Popular</span></span>
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Product Count & Sort placeholder if needed */}
                    <div className="lg:hidden flex justify-between items-center mb-4">
                        <p className="text-gray-500 text-sm">Showing 1-10 of 100 Products</p>
                    </div>
                    
                    <ProductList />
                </div>
            </div>
        </main>
    );
}
