import { API_BASE_URL, PRODUCT_LIMIT_PER_PAGE } from "@/data/constants";
import { Product } from "@/types/products";
import axios from "axios";

export const fetchAllProducts = async ({
  page,
  search,
}: {
  page?: number;
  search?: string;
}): Promise<{ products: Product[]; total: number }> => {
  const skip = PRODUCT_LIMIT_PER_PAGE * ((page || 1) - 1);
  try {
    const res = await axios.get(
      `${API_BASE_URL}/products/search?limit=${PRODUCT_LIMIT_PER_PAGE}&skip=${skip}&q=${search}`
    );
    return res.data;
  } catch (error) {
    console.error("Error while fetching products", error);
    throw new Error("Error fetching products");
  }
};

export const fetchSingleProductDetails = async ({
  productId,
}: {
  productId: number;
}): Promise<Product> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return res.data;
  } catch (error) {
    console.error("Error while fetching product details", error);
    throw new Error("Failed to fetch product details");
  }
};
