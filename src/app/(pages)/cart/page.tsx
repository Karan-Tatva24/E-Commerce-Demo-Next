import CartProducts from "@/components/cart/CartProducts";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Product Cart",
};

const Cart = () => {
  return (
    <div>
      <CartProducts />
    </div>
  );
};

export default Cart;
