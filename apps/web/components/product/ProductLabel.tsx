interface ProductLabelProps {
    title:string;
}

export default function ProductLabel({title}:ProductLabelProps) {
    return (
        <div className="mb-14 w-full align-center text-center">
            <h2 className="text-5xl font-bold font-integral text-black">{title}</h2>
        </div>
    );
}   