import Logo from "../common/Logo";
import { ChevronDown, CircleUserRound, Search, ShoppingCart } from "lucide-react";

export default function NavBar() {
    return (
        <div className="w-full h-16 bg-white flex items-center justify-center">
            <div className="relative w-[1240px] flex items-center justify-center gap-10">
                <Logo />
                <ul className="flex items-center justify-center gap-10">
                    <li className="text-black text-sm cursor-pointer"><a href="#"><p className="flex items-center gap-1">Shop <ChevronDown size={14}/></p></a></li>
                    <li className="text-black text-sm cursor-pointer"><a href="#">On Sale</a></li>
                    <li className="text-black text-sm cursor-pointer"><a href="#">New Arrivals</a></li>
                    <li className="text-black text-sm cursor-pointer"><a href="#">Brands</a></li>
                </ul>
                <div className="flex items-center gap-2 relative"><label className="absolute left-3" htmlFor="search"><Search color="#909090" size={18}/></label><input type="text" placeholder="Search for products..." className="w-64 h-10 bg-gray-100 rounded-full px-4 pl-9" /></div>
                <div className="flex items-center gap-4">
                    <a href="#"><p className="text-black text-sm cursor-pointer"><ShoppingCart size={20}/></p></a>
                    <a href="#"><p className="text-black text-sm cursor-pointer"><CircleUserRound size={20}/></p></a>
                </div>
            </div>
        </div>
    );
}