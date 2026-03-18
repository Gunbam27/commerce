import { Product } from "@/features/products/types/product";

export interface CartItem {
  id: number;       
  productId: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}


export interface ServerCartItem {
  id: number;
  productId: number;
  quantity: number;
  size: string;
  color: string;
  product: {
    id: number;
    name: string;
    price: number;
    images: string[];
  }
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, quantity: number, size: string, color: string) => void;
  clearCart: () => void;
}
export interface CartState {
  items: CartItem[];
}

export interface AddToCartDto {
  productId: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface UpdateCartItemDto {
  productId: number;
  quantity: number;
  size?: string;
  color?: string;
}
