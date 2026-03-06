import Image from "next/image";

export default function DressStyle() {
    return (
        <section className="max-w-[1240px] bg-[#F0F0F0] rounded-[40px] pt-16 pb-20 px-4 md:px-16 mx-auto">
            <h2 className="text-center text-3xl md:text-5xl font-bold font-integral text-black mb-16 uppercase px-4">
                Browse by dress style
            </h2>
            
            <div className="grid grid-cols-12 gap-5">
                {/* CASUAL - 1/3 */}
                <div className="col-span-12 lg:col-span-4 h-[289px] bg-white rounded-[20px] relative overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer group">
                    <div className="p-6 relative z-10 font-bold text-3xl text-black">Casual</div>
                    <Image 
                        src="/banner/style1.png" 
                        alt="Casual Style" 
                        fill
                        className="object-cover object-right-top transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* FORMAL - 2/3 */}
                <div className="col-span-12 lg:col-span-8 h-[289px] bg-white rounded-[20px] relative overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer group">
                    <div className="p-6 relative z-10 font-bold text-3xl text-black">Formal</div>
                    <Image 
                        src="/banner/style2.png" 
                        alt="Formal Style" 
                        fill
                        className="object-cover object-right-top transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* PARTY - 2/3 */}
                <div className="col-span-12 lg:col-span-8 h-[289px] bg-white rounded-[20px] relative overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer group">
                    <div className="p-6 relative z-10 font-bold text-3xl text-black">Party</div>
                    <Image 
                        src="/banner/style3.png" 
                        alt="Party Style" 
                        fill
                        className="object-cover object-right-top transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* GYM - 1/3 */}
                <div className="col-span-12 lg:col-span-4 h-[289px] bg-white rounded-[20px] relative overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer group">
                    <div className="p-6 relative z-10 font-bold text-3xl text-black">Gym</div>
                    <Image 
                        src="/banner/style4.png" 
                        alt="Gym Style" 
                        fill
                        className="object-cover object-right-top transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            </div>
        </section>
    );
}
