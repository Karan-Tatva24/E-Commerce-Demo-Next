export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: "1 month warranty";
  shippingInformation: "Ships in 1 month";
  availabilityStatus: "Low Stock";
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: "30 days return policy";
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;
}
