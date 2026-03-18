'use client'

import React from 'react';
import { Tag, ArrowRight } from 'lucide-react';

interface OrderSummaryProps {
    subtotal: number;
    discount: number;
    deliveryFee: number;
}

export default function OrderSummary({ subtotal, discount, deliveryFee }: OrderSummaryProps) {
    const total = subtotal - discount + deliveryFee;

    return (
        <div className="border border-gray-100 rounded-[20px] p-6 h-fit sticky top-24">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-5 mb-6">
                <div className="flex justify-between">
                    <span className="text-gray-500 text-lg">Subtotal</span>
                    <span className="font-bold text-lg">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500 text-lg">Discount (-20%)</span>
                    <span className="font-bold text-lg text-red-500">-${discount}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500 text-lg">Delivery Fee</span>
                    <span className="font-bold text-lg">${deliveryFee}</span>
                </div>
            </div>
            
            <div className="flex justify-between border-t border-gray-100 pt-5 mb-8">
                <span className="text-xl md:text-2xl">Total</span>
                <span className="font-bold text-xl md:text-2xl">${total}</span>
            </div>
            
            <div className="flex gap-3 mb-6">
                <div className="flex-1 flex items-center bg-[#F0EEED] rounded-full px-4 py-3 gap-3">
                    <Tag size={20} className="text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Add promo code" 
                        className="bg-transparent outline-none text-sm w-full"
                    />
                </div>
                <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                    Apply
                </button>
            </div>
            
            <button className="w-full bg-black text-white rounded-full py-4 flex items-center justify-center gap-3 font-medium hover:bg-gray-800 transition-colors">
                <span>Go to Checkout</span>
                <ArrowRight size={20} />
            </button>
        </div>
    );
}
