import CartItems from "@/components/checkout/CartItems";
import ShippingDetailsForm from "@/components/forms/ShippingDetailsForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Checkout",
};

const CheckOutPage = () => {
  return (
    <div className="flex-1 bg-muted/40 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        <div className="bg-background rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <ShippingDetailsForm />
        </div>
        <div className="bg-background rounded-lg shadow-lg p-8">
          <div className="grid gap-2">
            <CartItems />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
