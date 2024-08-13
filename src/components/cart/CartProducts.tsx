"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CodeIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  checkoutOrder,
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
} from "@/store/slices/productCartSlice";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import EmptyCart from "../../../public/Images/empty-cart.jpg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function Component() {
  const { cart } = useAppSelector((state) => state.productsCart);
  const { user } = useAppSelector((state) => state.users);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const route = useRouter();

  const subtotal = cart.reduce(
    (total, product) => total + product.price * product.quantity!,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity({ id }));
    toast({
      title: "Success",
      description: "Add product successfully",
    });
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity({ id }));
    toast({
      title: "Success",
      description: "Remove product successfully",
    });
  };

  if (cart.length <= 0) {
    return (
      <>
        <div className="flex justify-center items-start h-[calc(100%-200px)]">
          <Image
            src={EmptyCart}
            alt="empty-cart"
            className="h-[calc(100%-140px)] w-auto"
          />
        </div>
      </>
    );
  }

  const handleRemoveProductToCart = (id: number) => {
    dispatch(removeProduct({ id }));
    toast({
      title: "Success",
      description: "Product remove from cart successfully",
    });
  };

  const handleCheckout = () => {
    if (!user.isLoggedIn) {
      // route.push("/sign-in");
      toast({
        title: "Failed",
        description: "Please sign in first",
        variant: "destructive",
      });
    } else {
      dispatch(checkoutOrder());
      toast({
        title: "Success",
        description: "Order placed successfully",
      });
    }
  };

  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-8 px-4 md:px-6 py-12">
      <div>
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <div className="space-y-6">
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b pb-6"
            >
              <div className="flex items-start gap-4">
                <div className="border border-gray-200">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover"
                    objectFit="cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-2xl mb-4">{product.title}</h3>
                  <p className="text-muted-foreground mb-0.5">
                    {product.tags.join(", ")}
                  </p>
                  <p className="text-muted-foreground mb-0.5">
                    {product.warrantyInformation}
                  </p>
                  <p className="text-muted-foreground font-semibold mb-2">
                    {product.shippingInformation}
                  </p>
                  <p className="text-lg mb-3">${product.price.toFixed(2)}</p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-lg text-red-400"
                      >
                        Remove
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove Item</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove this item?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleRemoveProductToCart(product.id)}
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleDecreaseQuantity(product.id)}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium">{product.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleIncreaseQuantity(product.id)}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-muted/40 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-start">
          <h2 className="text-lg font-semibold">Cart Summary</h2>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Subtotal (items {cart.length})
            </span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <Button size="lg" className="w-full" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
