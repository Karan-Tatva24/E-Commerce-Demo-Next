"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const ProductCardSkeleton = () => {
  return (
    <Card className="w-full h-full max-w-xs rounded-xl border">
      <div className="grid gap-4 p-4">
        <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
          <Skeleton className="h-[500px] w-[400px] aspect-[4/5] rounded-xl" />
        </div>
        <div className="grid gap-1.5">
          <Skeleton className="h-4 w-[200px]" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-[70px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;
