import { useQuery } from "@tanstack/react-query"
import apiClient from "../../../utils/apiClient"
import { ProductsResponse, Category } from "../types/product"

export interface ProductFilters {
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    colors?: string[];
    sizes?: string[];
    search?: string;
    skip?: number;
    take?: number;
}

export interface ProductsMetadata {
    categories: Category[];
    colors: string[];
    sizes: string[];
}

export const useProducts = (filters: ProductFilters = {}) => {
    return useQuery<ProductsResponse>({
        queryKey: ['products', filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (filters.categoryId !== undefined) params.append('categoryId', filters.categoryId.toString());
            if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
            if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
            if (filters.colors?.length) params.append('colors', filters.colors.join(','));
            if (filters.sizes?.length) params.append('sizes', filters.sizes.join(','));
            if (filters.search !== undefined) params.append('search', filters.search);
            if (filters.skip !== undefined) params.append('skip', filters.skip.toString());
            if (filters.take !== undefined) params.append('take', filters.take.toString());

            const response = await apiClient.get(`/products?${params.toString()}`);
            return response.data;
        },
    })
}

export const useProductsMetadata = () => {
    return useQuery<ProductsMetadata>({
        queryKey: ['products-metadata'],
        queryFn: async () => {
            const response = await apiClient.get('/products/metadata');
            return response.data;
        }
    })
}