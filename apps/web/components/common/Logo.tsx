import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <h1 className="text-black text-2xl font-bold font-integral cursor-pointer">PORTSTYLE</h1>
        </Link>
    );
}