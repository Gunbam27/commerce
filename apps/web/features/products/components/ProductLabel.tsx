interface ProductLabelProps {
    title: string;
}

export default function ProductLabel({ title }: ProductLabelProps) {
    return (
        <h2 className="font-integral text-3xl md:text-5xl text-center mb-10 uppercase">
            {title}
        </h2>
    );
}
