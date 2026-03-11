import React from 'react';
import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
    id: number;
    name: string;
    size: string;
    color: string;
    price: number;
    image: string;
    quantity: number;
}

export default function CartItem({ name, size, color, price, image, quantity }: CartItemProps) {
    return (
        <div className="flex gap-4 py-6 first:pt-0 last:pb-0 border-b border-gray-100 last:border-0">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F0EEED] rounded-xl overflow-hidden flex-shrink-0">
                <Image src={image} alt={name} width={128} height={128} className="w-full h-full object-contain" />
            </div>
            
            <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg md:text-xl mb-1">{name}</h3>
                        <p className="text-sm text-gray-600">Size: <span className="text-gray-400">{size}</span></p>
                        <p className="text-sm text-gray-600">Color: <span className="text-gray-400">{color}</span></p>
                    </div>
                    <button className="text-red-500 hover:text-red-600 transition-colors">
                        <Trash2 size={24} />
                    </button>
                </div>
                
                <div className="flex justify-between items-end">
                    <span className="font-bold text-xl md:text-2xl">${price}</span>
                    <div className="flex items-center bg-[#F0EEED] rounded-full px-4 py-2 gap-5">
                        <button className="hover:text-gray-500 transition-colors">
                            <Minus size={18} />
                        </button>
                        <span className="font-medium">{quantity}</span>
                        <button className="hover:text-gray-500 transition-colors">
                            <Plus size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
