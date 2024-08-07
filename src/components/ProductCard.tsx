"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const ProductCard = ({
  description,
  title,
  price,
  imageUrl,
  stock,
}: ProductCardProps) => {
  return (
    <Card className="w-full h-full max-w-xs rounded-xl border width">
      <div className="grid gap-4 p-4">
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
        <div className="grid gap-1.5">
          <h2 className="font-semibold text-sm md:text-lg truncate">{title}</h2>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-sm md:text-base">${price}</p>
            <p className="font-semibold text-sm md:text-base">
              Available Stock: {stock}
            </p>
          </div>
          <p className="text-sm md:text-base opacity-70">{description}</p>
        </div>
        <Button size="sm">Add to cart</Button>
      </div>
    </Card>
  );
};

export default ProductCard;
