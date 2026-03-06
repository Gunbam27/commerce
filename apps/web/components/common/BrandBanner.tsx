import Image from "next/image";

export default function BrandBanner() {
    return (
        <div className="flex justify-center items-center gap-10 bg-black h-[122px]">
            <div><Image src="/assets/gucci-logo.svg" alt="Gucci Logo" width={156} height={36}/> 
            </div>
            <div><Image src="/assets/zara-logo.svg" alt="Zara Logo" width={91} height={38}/></div>
            <div><Image src="/assets/calvin-logo.svg" alt="Calvin Klein Logo" width={156} height={36}/></div>
            <div><Image src="/assets/prada-logo.svg" alt="Prada Logo" width={156} height={36}/></div>
            <div><Image src="/assets/versace-logo.svg" alt="Versace Logo" width={156} height={36}/></div>
        </div>
    );
}   