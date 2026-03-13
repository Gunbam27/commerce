import Logo from "../common/Logo";
import { ChevronDown, CircleUserRound, Search, ShoppingCart, Menu } from "lucide-react";

export default function NavBar() {
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
                    <li className="text-black text-sm cursor-pointer hover:font-bold transition-all"><a href="#" className="flex items-center gap-1">Shop <ChevronDown size={14} /></a></li>
                    <li className="text-black text-sm cursor-pointer hover:font-bold transition-all"><a href="#">On Sale</a></li>
                    <li className="text-black text-sm cursor-pointer hover:font-bold transition-all"><a href="#">New Arrivals</a></li>
                    <li className="text-black text-sm cursor-pointer hover:font-bold transition-all"><a href="#">Brands</a></li>
                </ul>

                {/* Desktop Search Bar */}
                <div className="hidden lg:flex flex-1 items-center gap-2 relative max-w-[577px]">
                    <Search className="absolute left-4 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full h-12 bg-gray-100 rounded-full px-5 pl-12 text-black focus:outline-none focus:ring-1 focus:ring-black/10"
                    />
                </div>

                {/* Icons */}
                <div className="flex items-center gap-3 md:gap-4">
                    {/* Mobile Search Icon */}
                    <button className="lg:hidden p-1">
                        <Search size={22} />
                    </button>
                    <a href="#" className="p-1">
                        <ShoppingCart size={22} />
                    </a>
                    <a href="#" className="p-1">
                        <CircleUserRound size={22} />
                    </a>
                </div>
            </div>
        </nav>
    );
}