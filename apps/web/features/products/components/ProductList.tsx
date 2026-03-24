import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useProducts, ProductFilters } from '../api/useProducts';
import NoResults from './NoResults';

interface ProductListProps {
    filters?: ProductFilters;
    onResetFilters?: () => void;
}

export default function ProductList({ filters, onResetFilters }: ProductListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // 필터가 변경되면 페이지를 1로 초기화
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    const queryFilters = {
        ...filters,
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage
    };

    const { data, isLoading, isError } = useProducts(queryFilters);

    if (isLoading) {
        return (
            <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10 mb-12">
                    {[...Array(itemsPerPage)].map((_, i) => (
                        <div key={i} className="flex flex-col cursor-pointer">
                            <div className="bg-[#F0EEED] rounded-[20px] w-full aspect-square animate-pulse" />
                            <div className="pt-4 pb-2">
                                <div className="h-5 md:h-6 bg-gray-200 animate-pulse rounded max-w-[80%]" />
                            </div>
                            <div className="h-4 bg-gray-200 animate-pulse rounded max-w-[40%]" />
                            <div className="pt-2">
                                <div className="h-6 md:h-7 bg-gray-200 animate-pulse rounded max-w-[30%]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    if (isError) {
        return <div className="flex-1 py-40 text-center font-bold">Something went wrong. Please try again later.</div>
    }

    const products = data?.items || []; 
    
    if (products.length === 0) {
        return <NoResults onReset={onResetFilters} />
    }
    
    const totalItems = data?.total || 0;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const hasMorePages = currentPage < totalPages;
    const hasPrevPages = currentPage > 1;

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button 
                    key={i} 
                    onClick={() => setCurrentPage(i)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-sm md:text-base transition-colors ${
                        currentPage === i ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10 mb-12">
                {products.map((product) => (
                    <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} image={(product.images as any)?.[0] || ''} rating={4.5} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center py-5 border-t border-gray-100">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={!hasPrevPages}
                        className={`flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-lg transition-colors font-medium ${
                            hasPrevPages ? 'hover:bg-gray-50 text-black cursor-pointer' : 'text-gray-300 cursor-not-allowed'
                        }`}
                    >
                        <ArrowLeft size={20} />
                        <span className="hidden sm:inline">Previous</span>
                    </button>
                    
                    <div className="flex gap-1 md:gap-2">
                        {renderPageNumbers()}
                    </div>
                    
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={!hasMorePages}
                        className={`flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-lg transition-colors font-medium ${
                            hasMorePages ? 'hover:bg-gray-50 text-black cursor-pointer' : 'text-gray-300 cursor-not-allowed'
                        }`}
                    >
                        <span className="hidden sm:inline">Next</span>
                        <ArrowRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}

