"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SHIPPING_COST, TAX_RATE } from "@/data/constants";
import { generateBill } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkoutOrder } from "@/store/slices/productCartSlice";
import { placeOrder } from "@/store/slices/usersSlice";
import Image from "next/image";
import React from "react";

const CheckOutPage = () => {
  const cartItems = useAppSelector((state) => state.productsCart.cart);
  const { user } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { tax, subtotal, total } = generateBill(cartItems);

  const handlePlaceOrder = async () => {
    try {
      await dispatch(
        placeOrder({
          orderValue: total,
          date: new Date(),
          userId: user.id,
        })
      );
      dispatch(checkoutOrder());
      toast({
        title: "Success",
        description: "Order placed successfully",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error while placing order",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-1 bg-muted/40 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        <div className="bg-background rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="shippingName">Shipping Name</Label>
              <Input id="shippingName" placeholder="Enter your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="shippingAddress">Shipping Address</Label>
              <Textarea
                id="shippingAddress"
                placeholder="Enter your address"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="billingName">Billing Name</Label>
              <Input id="billingName" placeholder="Enter your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="billingAddress">Billing Address</Label>
              <Textarea
                id="billingAddress"
                placeholder="Enter your address"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="apple-pay">Apple Pay</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
          <Separator className="my-6" />
          <div className="grid gap-4">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>
                  {SHIPPING_COST === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    SHIPPING_COST
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span>{tax}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
            <Button size="lg" className="w-full" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </div>
        </div>
        <div className="bg-background rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold mb-4">Cart Items</h2>
          <div className="grid gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
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
                    <p className="text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <span>{item.price * item.quantity!}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
