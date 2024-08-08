"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState, useEffect, MouseEventHandler } from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Star } from "lucide-react";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
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
}: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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
              <div className="flex justify-between items-center">
                <p className="font-semibold text-sm md:text-base">${price}</p>
                <div className="flex items-center">{ratingDisplay(rating)}</div>
              </div>
              <p className="text-sm md:text-base opacity-70 truncate">
                {description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Button size="lg">Learn more</Button>
              <Button size="lg" onClick={() => onAddToCart(id)}>
                Add to cart
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
