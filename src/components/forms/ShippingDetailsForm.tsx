"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SHIPPING_COST } from "@/data/constants";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { generateBill } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ShippingDetailsSchema } from "@/schemas/shippingDetailsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { placeOrder } from "@/store/slices/usersSlice";
import { useToast } from "@/components/ui/use-toast";
import { checkoutOrder } from "@/store/slices/productCartSlice";
import { PaymentMethod } from "@/types/UsersData";
import { CreditCardIcon, Loader2, WalletCardsIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ShippingDetailsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cart } = useAppSelector((state) => state.productsCart);
  const { user } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();

  const { tax, subtotal, total } = generateBill(cart);

  const form = useForm<z.infer<typeof ShippingDetailsSchema>>({
    resolver: zodResolver(ShippingDetailsSchema),
  });

  const onSubmit = async (data: z.infer<typeof ShippingDetailsSchema>) => {
    setIsSubmitting(true);
    try {
      await dispatch(
        placeOrder({
          orderValue: total,
          date: new Date(),
          userId: user?.id,
          shippingAddress: data.shippingAddress,
          deliveryStatus: "Delivered",
          items: cart,
          paymentMethod: data.paymentMethod as PaymentMethod,
        })
      );
      dispatch(checkoutOrder());
      router.replace("/");
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid-cols-1 md:grid-cols-2 gap-6">
      <Form {...form}>
        <form
          className="grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-2">
            <FormField
              name="shippingName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Shipping Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              name="shippingAddress"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your address"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              name="billingName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              name="billingAddress"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your address"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              name="paymentMethod"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      defaultValue="card"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="grid gap-2">
                        <Label
                          htmlFor="card"
                          className="flex items-center gap-2 border rounded-md p-4 cursor-pointer [&:has(:checked)]:bg-muted"
                        >
                          <RadioGroupItem id="card" value="card" />
                          <CreditCardIcon className="h-6 w-6" />
                          <span>Credit/Debit Card</span>
                        </Label>
                        <Label
                          htmlFor="upi"
                          className="flex items-center gap-2 border rounded-md p-4 cursor-pointer [&:has(:checked)]:bg-muted"
                        >
                          <RadioGroupItem id="upi" value="UPI" />
                          <WalletCardsIcon className="h-6 w-6" />
                          <span>UPI</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator className="my-6 col-span-2" />
          <div className="grid col-span-2 gap-4 w-full">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>
                  {SHIPPING_COST === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${SHIPPING_COST}`
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Button
                size="lg"
                className="w-full bg-slate-300"
                onClick={() => router.replace("/cart")}
                variant={"outline"}
              >
                Back
              </Button>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingDetailsForm;
