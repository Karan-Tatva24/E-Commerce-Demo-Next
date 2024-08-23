"use client";

import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import React from "react";

const CartItems = () => {
  const cartItems = useAppSelector((state) => state.productsCart.cart);
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Cart Items</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={64}
              height={64}
              className="rounded-md"
              style={{ aspectRatio: "64/64", objectFit: "cover" }}
            />
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-muted-foreground">Quantity: {item.quantity}</p>
            </div>
          </div>
          <span>{item.price * item.quantity!}</span>
        </div>
      ))}
    </>
  );
};

export default CartItems;
