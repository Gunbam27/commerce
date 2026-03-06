import { Twitter, Facebook, Instagram, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#F0F0F0] pt-16 pb-8">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-[100px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 flex flex-col items-start">
                        <h2 className="text-3xl font-bold font-integral text-black mb-6">SHOP.CO</h2>
                        <p className="text-sm text-gray-600 mb-9 leading-relaxed max-w-[248px]">
                            We have clothes that suits your style and which you're proud to wear. From women to men.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                <Twitter size={16} fill="currentColor" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center border border-black hover:bg-white hover:text-black transition-all">
                                <Facebook size={16} fill="currentColor" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                <Instagram size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                <Github size={16} fill="currentColor" />
                            </a>
                        </div>
                    </div>

                    {/* Links Sections (Responsive: 2 cols on mobile, 4 on desktop) */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold text-black tracking-[3px] uppercase mb-6">Company</h3>
                            <ul className="space-y-4 text-gray-600 text-sm">
                                <li><a href="#" className="hover:text-black transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Works</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Career</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-black tracking-[3px] uppercase mb-6">Help</h3>
                            <ul className="space-y-4 text-gray-600 text-sm">
                                <li><a href="#" className="hover:text-black transition-colors">Customer Support</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Delivery Details</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Terms & Conditions</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-black tracking-[3px] uppercase mb-6">FAQ</h3>
                            <ul className="space-y-4 text-gray-600 text-sm">
                                <li><a href="#" className="hover:text-black transition-colors">Account</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Manage Deliveries</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Orders</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Payments</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-black tracking-[3px] uppercase mb-6">Resources</h3>
                            <ul className="space-y-4 text-gray-600 text-sm">
                                <li><a href="#" className="hover:text-black transition-colors">Free eBooks</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Development Tutorial</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">How to - Blog</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Youtube Playlist</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-black/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-gray-600">Shop.co © 2000-2023, All Rights Reserved</p>
                    <div className="flex gap-3 h-[30px] items-center">
                        <div className="w-[46px] h-[30px] bg-white rounded-md border border-gray-200 flex items-center justify-center p-1">
                            <span className="text-[10px] font-bold text-blue-800 italic">VISA</span>
                        </div>
                        <div className="w-[46px] h-[30px] bg-white rounded-md border border-gray-200 flex items-center justify-center p-1 font-bold text-[10px]">
                            <span className="text-orange-500">M</span>C
                        </div>
                        <div className="w-[46px] h-[30px] bg-white rounded-md border border-gray-200 flex items-center justify-center p-1 font-bold italic text-[8px] text-blue-400">
                            PayPal
                        </div>
                        <div className="w-[46px] h-[30px] bg-white rounded-md border border-gray-200 flex items-center justify-center p-1 font-bold text-[10px]">
                            Pay
                        </div>
                        <div className="w-[46px] h-[30px] bg-white rounded-md border border-gray-200 flex items-center justify-center p-1 font-bold text-[10px]">
                            <span className="text-blue-800">G</span> Pay
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
