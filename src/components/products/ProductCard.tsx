"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Star } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  brand: string;
  tags: string[];
  onAddToCart: (id: number) => void;
}

const ProductCard = ({
  id,
  description,
  title,
  price,
  imageUrl,
  rating,
  onAddToCart,
  brand,
  tags,
}: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { cart } = useAppSelector((state) => state.productsCart);

  const isProductInCart = cart.findIndex((product) => product.id === id);
  const route = useRouter();

  useEffect(() => {
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
  }, [imageUrl]);

  const ratingDisplay = (rating: number) => {
    const stars = [];
    for (let i = 0; i < Math.round(rating); i++) {
      stars.push(<Star key={i} fill="yellow" strokeWidth={0.3} />);
    }
    return stars;
  };

  return (
    <Card className="w-full h-full max-w-xs rounded-xl border">
      <div className="grid gap-4 p-4">
        {!imageLoaded ? (
          <ProductCardSkeleton />
        ) : (
          <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
            <Image
              src={imageUrl}
              alt={title}
              width="400"
              height="500"
              className="aspect-[4/5] object-cover border w-full"
              loading="lazy"
            />
          </div>
        )}
        {imageLoaded && (
          <>
            <div className="grid gap-1.5">
              <h2 className="font-semibold text-sm md:text-lg truncate">
                {title}
              </h2>
              <h3>{brand ? `(${brand})` : `(${tags[0]})`}</h3>
              <div className="flex justify-between items-center">
                <p className="font-semibold text-sm md:text-base">${price}</p>
                <div className="flex items-center">{ratingDisplay(rating)}</div>
              </div>
              <p className="text-sm md:text-base opacity-70 truncate">
                {description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Button
                size="lg"
                onClick={() => {
                  route.push(`/product/${id}`);
                }}
              >
                Learn more
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  if (isProductInCart !== -1) route.push("/cart");
                  else onAddToCart(id);
                }}
                variant={isProductInCart === -1 ? "outline" : "destructive"}
              >
                {isProductInCart !== -1 ? "Go to cart" : "Add to cart"}
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
