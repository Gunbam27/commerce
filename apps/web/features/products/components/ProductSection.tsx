import ProductLabel from "./ProductLabel";

interface ProductSectionProps {
    title: string;
    children: React.ReactNode;
}

export default function ProductSection({ title, children }: ProductSectionProps) {
    return (
        <section className="py-16 px-4 md:px-24">
            <ProductLabel title={title} />
            <div className="flex flex-col items-center gap-9">
                {children}
            </div>
        </section>
    );
}
