import Image from "next/image";
import StarRate from "../common/StarRate";

export default function ProductCard() {
    return (
        <div className="flex flex-col">
            <div className="bg-[#F0EEED] rounded-[20px] w-[295px] h-[295px] overflow-hidden">
                <Image src="/assets/clothes.png" alt="" width={200} height={200} className="w-full h-full object-contain"/>
            </div>
            <p className="pt-4 pb-2 font-bold text-xl">T-shirt withg Tape Details</p>
            <StarRate rating={4.5}/>
            <p className="pt-2 font-bold text-2xl">$120</p>
        </div>
    );
}