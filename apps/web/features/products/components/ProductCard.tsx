import Image from "next/image";
import StarRate from "../../../components/common/StarRate";
import Link from "next/link";
import { Product } from "../types/product";

interface ProductCardProps {
    id: Product["id"];
    name: Product["name"];
    price: Product["price"];
    rating: number;
    image: string;
}

export default function ProductCard({ id, name, price, rating, image }: ProductCardProps) {
    return (
        <Link href={`/products/${id}`} className="flex flex-col group cursor-pointer">
            <div className="bg-[#F0EEED] rounded-[20px] w-full aspect-square overflow-hidden">
                <Image 
                    src={image || "/assets/clothes.png"} 
                    alt={name} 
                    width={295} 
                    height={295} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <p className="pt-4 pb-2 font-bold text-lg md:text-xl truncate">{name}</p>
            <StarRate rating={rating}/>
            <p className="pt-2 font-bold text-xl md:text-2xl">${price}</p>
        </Link>
    );
}
