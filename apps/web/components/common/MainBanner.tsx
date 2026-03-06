import Image from "next/image";

export default function MainBanner() {
    return (
        <div 
        className="relative w-full h-[853px] lg:h-[663px] bg-[#F2F0F1] overflow-hidden bg-no-repeat bg-[center_bottom] lg:bg-right-bottom"
        style={{ 
            backgroundImage: 'url("/banner/main_banner.png")',
            backgroundSize: 'min(120%, 740px)',
        }}
    >
        <div className="max-w-[1440px] mx-auto h-full flex items-start lg:items-center px-4 pt-12 lg:pt-0 lg:px-[100px]">
            <div className="w-full lg:w-[600px] flex flex-col">
                <h1 className="text-4xl lg:text-5xl font-bold font-integral text-black leading-tight text-left leading-[34px] lg:leading-[64px]">
                    FIND CLOTHES THAT MATCHES YOUR STYLE
                </h1>
                <p className="pt-6 lg:pt-8 text-sm lg:text-base text-gray-600 max-w-[500px]">
                    Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                </p>
                <button className="mt-8 w-full lg:w-[210px] bg-black text-white px-8 py-4 rounded-full font-medium active:scale-95 transition-transform">
                    Shop Now
                </button>
                
                <div className="flex flex-row mt-10 lg:mt-12 justify-between lg:justify-start items-center lg:items-start gap-x-2 lg:gap-0">
                    <div className="flex flex-col items-start lg:pr-8 lg:border-r border-[#DAD8D9]">
                        <div className="text-2xl lg:text-4xl font-bold text-black whitespace-nowrap">200+</div>
                        <div className="text-[10px] lg:text-sm text-gray-600 whitespace-nowrap">International Brands</div>
                    </div>
                    <div className="flex flex-col items-start lg:px-8 lg:border-r border-[#DAD8D9]">
                        <div className="text-2xl lg:text-4xl font-bold text-black whitespace-nowrap">2,000+</div>
                        <div className="text-[10px] lg:text-sm text-gray-600 whitespace-nowrap">High-Quality Products</div>
                    </div>
                    <div className="flex flex-col items-start lg:pl-8">
                        <div className="text-2xl lg:text-4xl font-bold text-black whitespace-nowrap">30,000+</div>
                        <div className="text-[10px] lg:text-sm text-gray-600 whitespace-nowrap">Happy Customers</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}