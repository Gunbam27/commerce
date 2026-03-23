'use client';

import { useEffect, useState } from "react";
import FilterSidebar from "../../features/products/components/FilterSidebar";
import ProductList from "../../features/products/components/ProductList";
import { ChevronRight, SlidersHorizontal, ChevronDown } from "lucide-react";
import { ProductFilters } from "../../features/products/api/useProducts";
import { useSearchParams } from "next/navigation";

export default function ShopPage() {
    const searchParams = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<ProductFilters>({
        search: searchParams.get('search') || undefined
    });

    // URL의 search 파라미터가 변경되면 필터 상태 업데이트
    useEffect(() => {
        const search = searchParams.get('search');
        setFilters(prev => ({
            ...prev,
            search: search || undefined
        }));
    }, [searchParams]);

    const handleApplyFilters = (newFilters: ProductFilters) => {
        setFilters(prev => ({
            ...newFilters,
            search: prev.search // 검색어는 별도로 유지하거나 필요에 따라 초기화
        }));
        setIsFilterOpen(false);
    };

    return (
        <main className="container py-6 md:py-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-3 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
                <span>Home</span>
                <ChevronRight size={14} />
                <span className="text-black font-medium">Shop</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Header for Mobile */}
                <div className="lg:hidden flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold font-integral">SHOP</h1>
                    <button 
                        onClick={() => setIsFilterOpen(true)}
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm"
                    >
                        <SlidersHorizontal size={20} />
                    </button>
                </div>

                {/* Sidebar */}
                <FilterSidebar 
                    isOpen={isFilterOpen} 
                    onClose={() => setIsFilterOpen(false)} 
                    onApplyFilters={handleApplyFilters}
                    currentFilters={filters}
                />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Desktop Header */}
                    <div className="hidden lg:flex justify-between items-end mb-8 border-b pb-6">
                        <h1 className="text-4xl font-bold font-integral uppercase">Shop</h1>
                        <div className="flex items-center gap-6 text-sm">
                            <span className="text-gray-500">Showing all items</span>
                            <div className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
                                <span className="text-gray-500">Sort by:</span>
                                <span className="text-black font-bold">Newest</span>
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>

                    <ProductList 
                        filters={filters} 
                        onResetFilters={() => handleApplyFilters({})}
                    />
                </div>
            </div>
        </main>
    );
}
