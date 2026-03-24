'use client';

import Image, { type ImageProps } from "next/image";
import MainBanner from "../components/common/MainBanner";
import BrandBanner from "../components/common/BrandBanner";
import ProductSection from "../features/products/components/ProductSection";
import ProductCard from "../features/products/components/ProductCard";
import ViewAll from "../components/common/ViewAll";
import DressStyle from "../components/common/DressStyle";
import Review from "../components/common/Review";
import { useProducts } from "../features/products/api/useProducts";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" alt="" />
      <Image {...rest} src={srcDark} className="imgDark" alt="" />
    </>
  );
};

export default function Home() {
  const { data, isLoading } = useProducts({ take: 4 });
  const newArrivals = data?.items || [];

  return (
    <>
      <MainBanner/>
      <BrandBanner/>
      
      <ProductSection title="NEW ARRIVALS">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col cursor-pointer">
                  <div className="bg-[#F0EEED] rounded-[20px] w-full aspect-square animate-pulse" />
                  <div className="pt-4 pb-2">
                      <div className="h-5 md:h-6 bg-gray-200 animate-pulse rounded max-w-[80%]" />
                  </div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded max-w-[40%]" />
                  <div className="pt-2">
                      <div className="h-6 md:h-7 bg-gray-200 animate-pulse rounded max-w-[30%]" />
                  </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {newArrivals.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id} 
                name={product.name} 
                price={Number(product.price)} 
                rating={4.5} 
                image={(product.images as any)?.[0] || "/assets/clothes.png"} 
              />
            ))}
          </div>
        )}
        <ViewAll/>
      </ProductSection>
      
      <DressStyle/>
      <Review />
    </>
  );
}
