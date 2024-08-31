export interface Product {
  id: number; // Assuming id is a number
  productName: string;
  imgSource: string;
  prices: {
    USD: number;
    INR: number;
  };
  rating?: number;
}
