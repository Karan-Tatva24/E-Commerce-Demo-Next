import { SHIPPING_COST, TAX_RATE } from "@/data/constants";
import { Product } from "@/types/products";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export function generateBill(cartItems: Product[]) {
  const subtotal = cartItems.reduce(
    (total, product) => total + product.price * product.quantity!,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_COST;
  return { tax, subtotal, total };
}
