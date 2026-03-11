import { components } from "../../../src/api/schema";

export type Product = components["schemas"]["CreateProductDto"] & {
    id: number;
};

export type Category = components["schemas"]["CreateCategoryDto"] & {
    id: number;
};
