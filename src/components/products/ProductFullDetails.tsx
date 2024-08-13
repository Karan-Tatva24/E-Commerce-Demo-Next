"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/legacy/image";
import { Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { Product } from "@/types/products";
import PlaceholderImage from "../../../public/Images/placeholder.jpg";
import { addProduct } from "@/store/slices/productCartSlice";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProductFullDetails({
  productId,
}: {
  productId: number;
}) {
  const [productDetails, setProductDetails] = useState<Product>();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.productsCart);
  const route = useRouter();

  const isProductInCart = cart.some(
    (product) => product.id === productDetails?.id
  );

  useEffect(() => {
    try {
      const fetchProductDetails = async () => {
        const res = await axios.get(
          `https://dummyjson.com/products/${productId}`
        );
        setProductDetails(res.data);
      };
      fetchProductDetails();
    } catch (error: any) {
      console.log("Error :: fetching product details ", error.message);
    }
  }, [dispatch, productId]);

  const ratingDisplay = (rating: number) => {
    const stars = [];
    for (let i = 0; i < Math.round(rating); i++) {
      stars.push(<Star key={i} fill="yellow" strokeWidth={0.3} />);
    }
    return stars;
  };

  const handleAddToCart = async (id: number) => {
    await dispatch(addProduct({ id }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4">
        <Image
          src={productDetails?.thumbnail || PlaceholderImage}
          alt={productDetails?.title!}
          width={600}
          height={600}
          loading="lazy"
          className="aspect-square object-cover border w-full rounded-lg overflow-hidden"
        />
        <div className="hidden md:flex gap-4 items-start">
          {productDetails?.images.map((image, index) => (
            <button
              key={index}
              className="border hover:border-primary rounded-lg overflow-hidden transition-colors"
            >
              <Image
                src={image}
                alt="Preview thumbnail"
                width={100}
                height={100}
                loading="lazy"
                className="aspect-square object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-2">
          <h1 className="font-bold text-3xl">{productDetails?.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              {ratingDisplay(productDetails?.rating!)}
            </div>
            <span className="text-sm text-muted-foreground">
              ({productDetails?.reviews.length} reviews)
            </span>
          </div>
          <ul>
            <li>
              <span className="font-semibold">Warranty Information: </span>
              <span className="text-muted-foreground">
                {productDetails?.warrantyInformation}
              </span>
            </li>
            <li>
              <span className="font-semibold">Return Policy: </span>
              <span className="text-muted-foreground">
                {productDetails?.returnPolicy}
              </span>
            </li>
            <li>
              <span className="font-semibold">Shipping Information: </span>
              <span className="text-muted-foreground">
                {productDetails?.shippingInformation}
              </span>
            </li>
            <li>
              <span className="font-semibold">Availability Status: </span>
              <span className="text-muted-foreground">
                {productDetails?.availabilityStatus}
              </span>
            </li>
          </ul>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">${productDetails?.price}</span>
            <Button
              size="lg"
              variant={isProductInCart ? "destructive" : "default"}
              onClick={() => {
                isProductInCart
                  ? route.push("/cart")
                  : handleAddToCart(productDetails?.id!);
              }}
            >
              {isProductInCart ? "Go to Cart" : "Add to Cart"}
            </Button>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <h2 className="font-bold text-2xl">Product Details</h2>
          <div className="grid gap-2 text-muted-foreground">
            <p>{productDetails?.description}</p>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <h2 className="font-bold text-2xl">Reviews</h2>
          {productDetails?.reviews.map((review, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-0.5">
                    {ratingDisplay(review.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {review.rating} out of 5
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold">{review.reviewerName}</h3>
                      <h3 className="text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </h3>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
