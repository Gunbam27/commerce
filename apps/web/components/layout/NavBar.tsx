'use client';

import React, { useEffect, useState } from "react";
import Logo from "../common/Logo";
import { ChevronDown, CircleUserRound, Search, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCartManage } from "@/features/cart/hooks/useCartManage";

export default function NavBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { items } = useCartManage();
    
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsMobileSearchOpen(false);
        }
    };

    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="w-full h-[64px] md:h-[88px] bg-white border-b border-gray-100 flex items-center sticky top-0 z-50">
            <div className="container flex items-center justify-between gap-4 md:gap-10">
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Icon */}
                    <button className="lg:hidden p-1">
                        <Menu size={24} />
                    </button>
                    <Logo />
                </div>

                {/* Desktop Menu Links */}
                <ul className="hidden lg:flex items-center gap-10">
                    <li className="text-black text-sm cursor-pointer hover:font-bold transition-all"><Link href="/shop" className="flex items-center gap-1">Shop <ChevronDown size={14} /></Link></li>
                    <li className="text-black text-sm cursor-pointer hover:font-bold transition-all"><Link href="/shop">On Sale</Link></li>
                    <li className="text-black text-sm cursor-pointer hover:font-bold transition-all"><Link href="/shop">New Arrivals</Link></li>
                    <li className="text-black text-sm cursor-pointer hover:font-bold transition-all"><Link href="/shop">Brands</Link></li>
                </ul>

                {/* Desktop Search Bar */}
                <form onSubmit={handleSearch} className="hidden lg:flex flex-1 items-center gap-2 relative max-w-[577px]">
                    <Search className="absolute left-4 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for products..."
                        className="w-full h-12 bg-[#F0F0F0] rounded-full px-5 pl-12 text-black focus:outline-none focus:ring-1 focus:ring-black/10 transition-all placeholder:text-gray-400"
                    />
                </form>

                {/* Icons */}
                <div className="flex items-center gap-3 md:gap-4">
                    {/* Mobile Search Icon */}
                    <button 
                        onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                        className="lg:hidden p-1"
                    >
                        <Search size={22} />
                    </button>
                    <Link href="/cart" className="p-1 relative">
                        <ShoppingCart size={22} />
                        {mounted && totalQuantity > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {totalQuantity > 99 ? '99+' : totalQuantity}
                            </span>
                        )}
                    </Link>
                    <a href="/login" className="p-1">
                        <CircleUserRound size={22} />
                    </a>
                </div>
            </div>

            {/* Mobile Search Bar (Expandable) */}
            {isMobileSearchOpen && (
                <div className="absolute top-[64px] left-0 w-full bg-white p-4 border-b border-gray-100 lg:hidden shadow-lg animate-in slide-in-from-top duration-200">
                    <form onSubmit={handleSearch} className="relative flex items-center">
                        <Search className="absolute left-4 text-gray-400" size={18} />
                        <input
                            type="text"
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for products..."
                            className="w-full h-11 bg-[#F0F0F0] rounded-full px-5 pl-11 text-sm text-black focus:outline-none"
                        />
                        <button 
                            type="button" 
                            onClick={() => setIsMobileSearchOpen(false)}
                            className="ml-3 p-1 text-gray-400 hover:text-black transition-colors"
                        >
                            <X size={22} />
                        </button>
                    </form>
                </div>
            )}
        </nav>
    );
}
