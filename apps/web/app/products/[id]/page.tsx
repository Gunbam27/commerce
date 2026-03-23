'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import StarRate from "@/components/common/StarRate";
import { useCartManage } from "@/features/cart/hooks/useCartManage";
import { useModalStore } from "@/store/useModalStore";
import { useProduct } from "@/features/products/api/useProduct";

const COLOR_MAP: Record<string, string> = {
    Black: "#000000",
    White: "#FFFFFF",
    Blue: "#0000FF",
    Skyblue: "#87CEEB",
    Pink: "#FFC0CB",
    Yellow: "#FFFF00",
    Navy: "#000080",
};

export default function ProductDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const { addItem } = useCartManage();
    const { openModal } = useModalStore();

    const { data: product, isLoading, error } = useProduct(id);

    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [mainImage, setMainImage] = useState<string>("");

    // 메인 이미지 및 기본 선택 옵션 초기화
    useEffect(() => {
        if (product?.images?.length) {
            setMainImage(product.images[0] || "");
        }
        if (product?.colors?.length && !selectedColor) {
            setSelectedColor(product.colors[0] || "");
        }
        if (product?.sizes?.length && !selectedSize) {
            setSelectedSize(product.sizes[0] || "");
        }
    }, [product, selectedColor, selectedSize]);

    if (isLoading) return <div className="max-w-7xl mx-auto px-4 py-20 text-center">Loading...</div>;
    if (error || !product) return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-red-500">Product not found.</div>;

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            openModal({
                title: "선택 필요",
                message: "색상과 사이즈를 먼저 선택해주세요.",
                type: "warning"
            });
            return;
        }

        addItem({
            id: 0,
            productId: product.id,
            name: product.name || "",
            price: product.price,
            quantity: quantity,
            size: selectedSize,
            color: selectedColor,
            image: product.images[0] || ""
        });

        openModal({
            title: "장바구니 담기 완료",
            message: "상품이 장바구니에 정상적으로 담겼습니다.",
            type: "success"
        });
    };

    return (
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <nav className="text-sm text-gray-500 mb-8">
                Home &gt; Shop &gt; <span className="text-black">{String(product.name)}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="flex flex-col-reverse md:flex-row gap-4">
                    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto">
                        {product.images?.map((img: string, index: number) => (
                            <div 
                                key={index} 
                                onClick={() => setMainImage(img)}
                                className={`w-24 h-24 md:w-32 md:h-32 bg-[#F0EEED] rounded-xl flex-shrink-0 cursor-pointer overflow-hidden border-2 transition-all ${
                                    mainImage === img ? 'border-black' : 'border-transparent'
                                } hover:border-black`}
                            >
                                <Image src={img} alt="" width={128} height={128} className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 bg-[#F0EEED] rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-4">
                        {mainImage && (
                            <Image 
                                src={mainImage} 
                                alt={product.name} 
                                width={600} 
                                height={600} 
                                className="w-full h-full object-contain" 
                                priority
                            />
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <h1 className="font-integral text-3xl md:text-5xl mb-4 uppercase leading-tight">{product.name}</h1>
                    <div className="flex items-center gap-3 mb-6">
                        <StarRate rating={4.5} />
                    </div>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-3xl font-bold">${product.price}</span>
                    </div>
                    <p className="text-gray-600 mb-8 pb-8 border-b border-gray-100 leading-relaxed">
                        {product.description || "No description available."}
                    </p>

                    {/* Color selection */}
                    <div className="mb-8 pb-8 border-b border-gray-100">
                        <p className="text-gray-500 mb-4 font-medium">Select Colors</p>
                        <div className="flex gap-4">
                            {product.colors?.map((colorName: string) => (
                                <button 
                                    key={colorName} 
                                    onClick={() => setSelectedColor(colorName)}
                                    className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                                        selectedColor === colorName ? 'border-black ring-2 ring-gray-200' : 'border-gray-200'
                                    }`}
                                    style={{ backgroundColor: COLOR_MAP[colorName] || "#CCCCCC" }}
                                    title={colorName}
                                >
                                    {selectedColor === colorName && (
                                        <span className={`text-xs ${colorName === 'White' || colorName === 'Yellow' ? 'text-black' : 'text-white'}`}>✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size selection */}
                    <div className="mb-8 pb-8 border-b border-gray-100">
                        <p className="text-gray-500 mb-4 font-medium">Choose Size</p>
                        <div className="flex flex-wrap gap-3">
                            {product.sizes?.map((size: string) => (
                                <button 
                                    key={size} 
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                                        selectedSize === size ? 'bg-black text-white' : 'bg-[#F0EEED] text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to cart */}
                    <div className="flex gap-5">
                        <div className="flex items-center bg-[#F0EEED] rounded-full px-5 py-3 gap-8">
                            <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="text-2xl font-bold">-</button>
                            <span className="font-bold min-w-[20px] text-center">{quantity}</span>
                            <button onClick={() => setQuantity(prev => prev + 1)} className="text-2xl font-bold">+</button>
                        </div>
                        <button 
                            onClick={handleAddToCart}
                            className="flex-1 bg-black text-white rounded-full py-4 px-8 font-bold text-lg hover:bg-gray-800 transition-all transform active:scale-95"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
