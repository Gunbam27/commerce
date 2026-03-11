import React from 'react';
import ProductCard from './ProductCard';
import { ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';

export default function ProductList() {
    // Mock data based on the screenshot
    const products = [
        { id: 1, name: "Gradient Graphic T-shirt", price: 145, rating: 3.5, image: "/assets/clothes.png" },
        { id: 2, name: "Polo with Tipping Details", price: 180, rating: 4.5, image: "/assets/clothes.png" },
        { id: 3, name: "Black Striped T-shirt", price: 120, rating: 5.0, image: "/assets/clothes.png" },
        { id: 4, name: "Skinny Fit Jeans", price: 240, rating: 3.5, image: "/assets/clothes.png" },
        { id: 5, name: "Checkered Shirt", price: 180, rating: 4.5, image: "/assets/clothes.png" },
        { id: 6, name: "Sleeve Striped T-shirt", price: 130, rating: 4.5, image: "/assets/clothes.png" },
        { id: 7, name: "Vertical Striped Shirt", price: 212, rating: 5.0, image: "/assets/clothes.png" },
        { id: 8, name: "Courage Graphic T-shirt", price: 145, rating: 4.0, image: "/assets/clothes.png" },
        { id: 9, name: "Loose Fit Bermuda Shorts", price: 80, rating: 3.0, image: "/assets/clothes.png" },
    ];

    return (
        <div className="flex-1">
            <div className="flex justify-between items-baseline mb-8">
                <h1 className="text-2xl md:text-3xl font-bold">Casual</h1>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>Showing 1-10 of 100 Products</span>
                    <div className="hidden md:flex items-center gap-1 cursor-pointer hover:text-black">
                        <span>Sort by: <span className="text-black font-medium">Most Popular</span></span>
                        <ChevronDown size={16} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10 mb-12">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
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
