import { CircleCheck } from "lucide-react";
import StarRate from "./StarRate";

interface ReviewCardProps {
    name: string;
    rating: number;
    review: string;
    isVerified?: boolean;
}

export default function ReviewCard({ name, rating, review, isVerified = true }: ReviewCardProps) {
    return (
        <div className="min-w-[340px] md:min-w-[400px] bg-white border border-black/10 rounded-[20px] p-7 md:p-8 flex flex-col gap-3 h-full">
            <StarRate rating={rating} />
            <div className="flex items-center gap-1 mt-1">
                <span className="font-bold text-xl text-black">{name}</span>
                {isVerified && <CircleCheck size={20} fill="#01AB31" stroke="white" />}
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                "{review}"
            </p>
        </div>
    );
}
