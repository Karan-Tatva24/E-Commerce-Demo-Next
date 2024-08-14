import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
      <Skeleton className="aspect-[4/5] w-full h-[500px] object-cover border rounded-xl" />
    </div>
  );
};

export default ProductCardSkeleton;
