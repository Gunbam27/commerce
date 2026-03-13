"use client";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReviewCard from "./ReviewCard";

const REVIEWS = [
    {
        name: "Sarah M.",
        rating: 5,
        review: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
        name: "Alex K.",
        rating: 5,
        review: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    },
    {
        name: "James L.",
        rating: 5,
        review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    },
    {
        name: "Mooen X.",
        rating: 5,
        review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    }
];

export default function Review() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const firstCard = scrollRef.current.firstElementChild as HTMLElement;
            const cardWidth = firstCard?.offsetWidth || 400;
            const gap = 20; // gap-5 is 20px
            const scrollAmount = cardWidth + gap;
            
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="mx-1">

            <div className="container pt-16 pb-20 overflow-hidden">
                <div className="flex items-end justify-between mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold font-integral text-black uppercase">
                        OUR HAPPY CUSTOMERS
                    </h2>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => scroll("left")}
                            className="w-6 h-6 flex items-center justify-center hover:opacity-50 transition-opacity"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <button 
                            onClick={() => scroll("right")}
                            className="w-6 h-6 flex items-center justify-center hover:opacity-50 transition-opacity"
                        >
                            <ArrowRight size={24} />
                        </button>
                    </div>
                </div>

                <div 
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 scroll-smooth snap-x snap-mandatory scroll-px-4"
                >
                    {REVIEWS.map((review, index) => (
                        <ReviewCard 
                            key={index}
                            name={review.name}
                            rating={review.rating}
                            review={review.review}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
