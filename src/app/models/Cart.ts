export interface CartItem {
  id: string;
  count?: number;
  qty: number;
  price: number;
  totalPrice: number;
  title: string;
  author?: string;
  level?: string;
  description?: string;
  cover?: string;
  tags?: string[];
}
