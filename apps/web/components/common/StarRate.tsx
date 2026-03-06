import { Star, StarHalf } from "lucide-react"

interface StarRateProps {
    rating: number;
    maxRating?: number;
}

export default function StarRate({ rating, maxRating = 5 }: StarRateProps) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = Math.max(0, maxRating - fullStars - (hasHalfStar ? 1 : 0));

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={`full-${i}`} size={18} fill="#FFC633" stroke="#FFC633" />
                ))}
                {hasHalfStar && <StarHalf size={18} fill="#FFC633" stroke="#FFC633" className="relative" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star key={`empty-${i}`} size={18} stroke="#FFC633" className="text-[#FFC633]" />
                ))}
            </div>
            <div className="flex items-center gap-1 text-sm">
                <p className="font-medium text-black">{rating}</p>
                <span className="text-gray-400">/</span>
                <p className="text-gray-400">{maxRating}</p>
            </div>
        </div>
    );
}   