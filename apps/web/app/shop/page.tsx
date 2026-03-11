import FilterSidebar from "../../features/products/components/FilterSidebar";
import ProductList from "../../features/products/components/ProductList";
import { ChevronRight } from "lucide-react";

export default function ShopPage() {
    return (
        <main className="max-w-7xl mx-auto px-4 py-6 md:py-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-3 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
                <span>Home</span>
                <ChevronRight size={14} />
                <span className="text-black">Casual</span>
            </nav>

            <div className="flex gap-8">
                {/* Sidebar */}
                <FilterSidebar />

                {/* Main Content */}
                <ProductList />
            </div>
        </main>
    );
}
