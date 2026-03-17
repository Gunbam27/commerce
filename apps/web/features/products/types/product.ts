import { components } from "@/src/api/schema";

export type Product = components["schemas"]["ProductDto"];
export type Category = components["schemas"]["CreateCategoryDto"] & { id: number };

export type ProductsResponse = components["schemas"]["ProductsResponseDto"];
