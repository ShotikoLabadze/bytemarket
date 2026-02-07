export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  countInStock: number;
  image: string;
  gradient?: string;
  icon?: string;
}
