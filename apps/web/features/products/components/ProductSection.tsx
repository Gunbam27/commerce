import ProductLabel from "./ProductLabel";

interface ProductSectionProps {
    title: string;
    children: React.ReactNode;
}

export default function ProductSection({ title, children }: ProductSectionProps) {
    return (
        <section className="mx-1">
            <div className="container py-16">
                <ProductLabel title={title} />
                <div className="flex flex-col items-center gap-9">
                    {children}
                </div>
            </div>
        </section>
    );
}
