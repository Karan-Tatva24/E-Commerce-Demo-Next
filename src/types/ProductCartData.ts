export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  productCart: CartItem[];
}
