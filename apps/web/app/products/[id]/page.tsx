import Image from "next/image";
import StarRate from "../../../components/common/StarRate";
import { Product } from "../../../features/products/types/product";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product: Product & { 
        rating: number, 
        description: string, 
        images: string[], 
        colors: string[], 
        sizes: string[] 
    } = {
        id: Number(id),
        name: "One Life Graphic T-shirt",
        price: 260,
        rating: 4.5,
        description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
        images: ["/assets/clothes.png", "/assets/clothes.png", "/assets/clothes.png"],
        colors: ["#4F4631", "#314F4A", "#31344F"],
        sizes: ["Small", "Medium", "Large", "X-Large"],
        stock: 100,
        categoryId: 1
    };

    return (
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <nav className="text-sm text-gray-500 mb-8">
                Home &gt; Shop &gt; Men &gt; <span className="text-black">T-shirts</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="flex flex-col-reverse md:flex-row gap-4">
                    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto">
                        {product.images.map((img: string, index: number) => (
                            <div key={index} className="w-24 h-24 md:w-32 md:h-32 bg-[#F0EEED] rounded-xl flex-shrink-0 cursor-pointer overflow-hidden border border-transparent hover:border-black">
                                <Image src={img} alt="" width={128} height={128} className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 bg-[#F0EEED] rounded-2xl overflow-hidden aspect-square">
                        <Image src={product.images[0] as string} alt={product.name} width={600} height={600} className="w-full h-full object-contain" />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <h1 className="font-integral text-3xl md:text-5xl mb-4 uppercase">{product.name}</h1>
                    <div className="flex items-center gap-3 mb-6">
                        <StarRate rating={product.rating} />
                    </div>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-3xl font-bold">${product.price}</span>
                        <span className="text-gray-400 line-through text-2xl">$300</span>
                        <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm font-medium">-40%</span>
                    </div>
                    <p className="text-gray-600 mb-8 pb-8 border-b border-gray-100 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Color selection */}
                    <div className="mb-8 pb-8 border-b border-gray-100">
                        <p className="text-gray-500 mb-4">Select Colors</p>
                        <div className="flex gap-4">
                            {product.colors.map((color: string, index: number) => (
                                <button key={index} className="w-10 h-10 rounded-full border border-gray-200" style={{ backgroundColor: color }} />
                            ))}
                        </div>
                    </div>

                    {/* Size selection */}
                    <div className="mb-8 pb-8 border-b border-gray-100">
                        <p className="text-gray-500 mb-4">Choose Size</p>
                        <div className="flex flex-wrap gap-3">
                            {product.sizes.map((size: string) => (
                                <button key={size} className="px-6 py-3 rounded-full bg-[#F0EEED] text-gray-600 hover:bg-black hover:text-white transition-colors">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to cart */}
                    <div className="flex gap-5">
                        <div className="flex items-center bg-[#F0EEED] rounded-full px-5 py-3 gap-8">
                            <button className="text-2xl">-</button>
                            <span className="font-bold">1</span>
                            <button className="text-2xl">+</button>
                        </div>
                        <button className="flex-1 bg-black text-white rounded-full py-4 px-8 font-medium hover:bg-gray-800 transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
