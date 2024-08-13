import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const ProductCardSkeleton = () => {
  return (
    <Card className="w-full h-full max-w-xs rounded-xl border">
      <div className="grid gap-4 p-4">
        <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
          <Skeleton className="aspect-[4/5] w-full h-full object-cover border rounded-xl" />
        </div>
        <div className="grid gap-1.5">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-3 w-full" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;
