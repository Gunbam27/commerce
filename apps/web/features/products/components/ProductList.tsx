import React from 'react';
import ProductCard from './ProductCard';
import { ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useProducts, ProductFilters } from '../api/useProducts';
import NoResults from './NoResults';

interface ProductListProps {
    filters?: ProductFilters;
    onResetFilters?: () => void;
}

export default function ProductList({ filters, onResetFilters }: ProductListProps) {
    const { data, isLoading, isError } = useProducts(filters);

    if (isLoading) {
        return <div className="flex-1 py-40 text-center animate-pulse text-gray-400 font-medium text-lg italic">Searching for products...</div>
    }
    if (isError) {
        return <div className="flex-1 py-40 text-center text-red-500 font-bold">Something went wrong. Please try again later.</div>
    }

    const products = data?.items || []; 
    
    if (products.length === 0) {
        return <NoResults onReset={onResetFilters} />
    }
    const totalItems = data?.total || 0;
    const totalPages = Math.ceil(totalItems / 12);
    const currentPage = 1;
    const hasMorePages = currentPage < totalPages;      
    return (
        <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10 mb-12">

                {/* Todo: 서버에 rating넣기*/}
                {products.map((product) => (
                    <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} image={(product.images as any)?.[0] || ''} rating={4.5} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center py-5 border-t border-gray-100">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    <ArrowLeft size={20} />
                    <span>Previous</span>
                </button>
                <div className="flex gap-1 md:gap-2">
                    {[1, 2, 3, '...', 8, 9, 10].map((page, i) => (
                        <button key={i} className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-sm md:text-base ${page === 1 ? 'bg-gray-100' : 'text-gray-500 hover:bg-gray-50'}`}>
                            {page}
                        </button>
                    ))}
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    <span>Next</span>
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}
