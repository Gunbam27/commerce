import Image, { type ImageProps } from "next/image";
import MainBanner from "../components/common/MainBanner";
import BrandBanner from "../components/common/BrandBanner";
import ProductSection from "../features/products/components/ProductSection";
import ProductCard from "../features/products/components/ProductCard";
import ViewAll from "../components/common/ViewAll";
import DressStyle from "../components/common/DressStyle";
import Review from "../components/common/Review";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <>
      <MainBanner/>
      <BrandBanner/>
      <ProductSection title="NEW ARRIVALS">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
           <ProductCard 
             id={1} 
             name="T-shirt with Tape Details" 
             price={120} 
             rating={4.5} 
             image="/assets/clothes.png" 
           />
           <ProductCard 
             id={2} 
             name="Skinny Fit Jeans" 
             price={240} 
             rating={3.5} 
             image="/assets/clothes.png" 
           />
           <ProductCard 
             id={3} 
             name="Checkered Shirt" 
             price={180} 
             rating={4.5} 
             image="/assets/clothes.png" 
           />
           <ProductCard 
             id={4} 
             name="Sleeve Striped T-shirt" 
             price={130} 
             rating={4.5} 
             image="/assets/clothes.png" 
           />
        </div>
        <ViewAll/>
      </ProductSection>
      <DressStyle/>
      <Review />
    </>
  );
}
