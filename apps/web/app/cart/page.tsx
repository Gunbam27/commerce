import React from 'react';
import CartItem from '../../features/cart/components/CartItem';
import OrderSummary from '../../features/cart/components/OrderSummary';
import { ChevronRight } from 'lucide-react';

export default function CartPage() {
    // Mock data from the screenshot
    const cartItems = [
        {
            id: 1,
            name: "Gradient Graphic T-shirt",
            size: "Large",
            color: "White",
            price: 145,
            image: "/assets/clothes.png",
            quantity: 1
        },
        {
            id: 2,
            name: "Checkered Shirt",
            size: "Medium",
            color: "Red",
            price: 180,
            image: "/assets/clothes.png",
            quantity: 1
        },
        {
            id: 3,
            name: "Skinny Fit Jeans",
            size: "Large",
            color: "Blue",
            price: 240,
            image: "/assets/clothes.png",
            quantity: 1
        }
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = Math.round(subtotal * 0.2); // 20% discount as per mockup
    const deliveryFee = 15;

    return (
        <main className="max-w-7xl mx-auto px-4 py-6 md:py-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-3 text-sm text-gray-500 mb-6 md:mb-10">
                <span>Home</span>
                <ChevronRight size={14} />
                <span className="text-black">Cart</span>
            </nav>

            <h1 className="font-integral text-3xl md:text-5xl mb-8 md:mb-10 uppercase">Your Cart</h1>

            <div className="flex flex-col lg:flex-row gap-5">
                {/* Cart Items List */}
                <div className="flex-1 border border-gray-100 rounded-[20px] p-4 md:p-6 lg:max-h-[800px] overflow-y-auto">
                    <div className="flex flex-col">
                        {cartItems.map((item) => (
                            <CartItem key={item.id} {...item} />
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-[505px]">
                    <OrderSummary 
                        subtotal={subtotal} 
                        discount={discount} 
                        deliveryFee={deliveryFee} 
                    />
                </div>
            </div>
        </main>
    );
}
