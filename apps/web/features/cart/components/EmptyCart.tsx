import React from 'react';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={48} className="text-gray-300" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-500 max-w-md mb-10">
                Looks like you haven't added anything to your cart yet. 
                Go ahead and explore our latest arrivals!
            </p>
            <Link 
                href="/shop" 
                className="bg-black text-white px-10 py-4 rounded-full font-medium hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95"
            >
                Start Shopping
            </Link>
        </div>
    );
}
